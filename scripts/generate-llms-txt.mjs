/**
 * Regenerates public/llms.txt by reading live data from Firestore via the REST API.
 * Run with: npm run generate-llms-txt
 *
 * Uses the Firestore REST API (no browser SDK needed) — works cleanly in Node.js.
 * Requires your Firestore rules to allow public reads on experience, project, blog.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadEnv() {
  // Start with process.env so CI/Vercel environment variables are always available.
  const env = { ...process.env };
  try {
    // Overlay .env file for local development.
    const content = readFileSync(resolve(ROOT, ".env"), "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      env[key] = val;
    }
  } catch {
    // No .env file — relying on process.env (CI/Vercel).
  }
  return env;
}

function fmtDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Firestore REST returns values in a typed format like { "stringValue": "foo" }
// This unwraps them to plain JS values.
function unwrap(value) {
  if (value == null) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return parseInt(value.integerValue, 10);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) {
    return (value.arrayValue.values ?? []).map(unwrap);
  }
  if ("mapValue" in value) {
    const out = {};
    for (const [k, v] of Object.entries(value.mapValue.fields ?? {})) {
      out[k] = unwrap(v);
    }
    return out;
  }
  return null;
}

function docToObj(doc) {
  const obj = { id: doc.name.split("/").pop() };
  for (const [k, v] of Object.entries(doc.fields ?? {})) {
    obj[k] = unwrap(v);
  }
  return obj;
}

async function fetchCollection(projectId, collectionName) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore fetch failed for "${collectionName}" (${res.status}): ${text}`);
  }
  const json = await res.json();
  return (json.documents ?? []).map(docToObj);
}

async function main() {
  const env = loadEnv();
  const projectId = env.REACT_APP_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error("REACT_APP_FIREBASE_PROJECT_ID not found in .env");
  }

  console.log(`Fetching Firestore data from project "${projectId}"...`);

  const [expDocs, projDocs, blogDocs, aboutRes] = await Promise.all([
    fetchCollection(projectId, "experience"),
    fetchCollection(projectId, "project"),
    fetchCollection(projectId, "blog"),
    fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/about`
    ).then((r) => r.json()),
  ]);

  const aboutDoc = aboutRes.fields
    ? Object.fromEntries(
        Object.entries(aboutRes.fields).map(([k, v]) => [k, unwrap(v)])
      )
    : {};

  const DEFAULT_BIO =
    "Michael Branconier is a Forward Deployed Engineer based in Madison, WI, building production-ready AI systems at Galileo.";

  const bio = aboutDoc.bio || DEFAULT_BIO;

  const experience = expDocs.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  const projects = projDocs
    .filter((p) => !p.hidden)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const blogPosts = blogDocs
    .filter((p) => p.publishWebsite)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const lines = [
    "# Michael Branconier — Personal Site",
    "",
    `_Last updated: ${updated}_`,
    "",
    "## About",
    "",
    ...bio.split("\n\n").map((p) => p.trim()).filter(Boolean).flatMap((p) => [p, ""]),
  ];

  if (experience.length > 0) {
    lines.push("", "## Experience", "");
    for (const job of experience) {
      const start = fmtDate(job.startDate) ?? "";
      const end = job.endDate ? fmtDate(job.endDate) : "Present";
      const loc = job.location ? ` · ${job.location}` : "";
      const seasonal = job.seasonal ? " (seasonal)" : "";
      lines.push(`### ${job.position} at ${job.company}${loc}${seasonal}`);
      lines.push(`_${start} – ${end}_`);
      lines.push("");
      if (Array.isArray(job.description)) {
        for (const bullet of job.description) {
          lines.push(`- ${bullet}`);
        }
      }
      lines.push("");
    }
  }

  if (projects.length > 0) {
    lines.push("## Projects", "");
    for (const project of projects) {
      const year = project.year ? ` (${project.year})` : "";
      lines.push(`### ${project.name}${year}`);
      if (project.link) lines.push(`URL: ${project.link}`);
      if (project.description) lines.push(project.description);
      if (Array.isArray(project.skills) && project.skills.length > 0) {
        lines.push(`Technologies: ${project.skills.join(", ")}`);
      }
      lines.push("");
    }
  }

  lines.push(
    "## Education",
    "",
    "**Loyola Marymount University** — Los Angeles, CA · May 2021",
    "B.B.A. in Applied Information Management Systems, Minor in Computer Science",
    "Magna Cum Laude · GPA 3.89",
    "",
    "**Awards:** LMU Arrupe Scholar, Heron CBA Scholar, John B. & Nelly Llanos Kilroy Endowed Scholar, LMU Hackathon Mozilla State of the Internet Award",
  );

  if (blogPosts.length > 0) {
    lines.push("", "## Blog Posts", "");
    lines.push("Thoughts on AI, real estate tech, and building things.", "");
    for (const post of blogPosts) {
      const date = post.date ? ` (${post.date})` : "";
      lines.push(`- **${post.title}**${date} — /blog/${post.slug}`);
    }
  }

  lines.push(
    "",
    "## Contact & Social",
    "",
    "- **Email:** michaelbranconier@gmail.com",
    "- **GitHub:** https://github.com/mikebranc/",
    "- **LinkedIn:** https://www.linkedin.com/in/mbranconier/",
    "- **Twitter/X:** https://twitter.com/mike_branc",
  );

  const output = lines.join("\n");
  const outPath = resolve(ROOT, "public", "llms.txt");
  writeFileSync(outPath, output, "utf8");
  console.log(
    `✓ Generated public/llms.txt (${experience.length} jobs, ${projects.length} projects, ${blogPosts.length} blog posts)`
  );
}

main().catch((err) => {
  console.error("Error generating llms.txt:", err.message ?? err);
  process.exit(1);
});
