/**
 * Pure rendering helpers shared by the build scripts. These take already-shaped
 * site data (from site-data.mjs) and return strings/objects. Keeping them pure
 * makes them easy to test without touching the network.
 */

import {
  PROFILE,
  BIO,
  AI_NOTE,
  AI_NOTE_TITLE,
  TAGLINE,
  fmtDate,
} from "./site-data.mjs";

export function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraphs(text) {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

/* ----------------------------- llms.txt (Markdown) ----------------------------- */

export function renderLlmsTxt({ experience, projects, blogPosts }) {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const lines = [
    `# ${PROFILE.name} — Personal Site`,
    "",
    `_Last updated: ${updated}_`,
    "",
    `> ${PROFILE.title} · ${PROFILE.location} · ${PROFILE.email}`,
    "",
    `## ${AI_NOTE_TITLE}`,
    "",
    ...paragraphs(AI_NOTE).flatMap((p) => [p, ""]),
    "## About",
    "",
    ...paragraphs(BIO).flatMap((p) => [p, ""]),
  ];

  if (experience.length > 0) {
    lines.push("## Experience", "");
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
          const b = String(bullet).trim();
          if (b) lines.push(`- ${b}`);
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

  const edu = PROFILE.education;
  lines.push(
    "## Education",
    "",
    `**${edu.school}** — ${edu.location} · ${edu.graduated}`,
    `${edu.degree}, ${edu.minor}`,
    edu.honors,
    "",
    `**Awards:** ${edu.awards.join(", ")}`
  );

  if (blogPosts.length > 0) {
    lines.push("", "## Blog Posts", "");
    lines.push("Thoughts on AI, real estate tech, and building things.", "");
    for (const post of blogPosts) {
      const date = post.date ? ` (${post.date})` : "";
      lines.push(`### ${post.title}${date}`);
      lines.push(`URL: ${PROFILE.url.replace(/\/$/, "")}/blog/${post.slug}`);
      lines.push("");
      if (post.body) {
        lines.push(String(post.body).trim());
        lines.push("");
      }
    }
  }

  lines.push(
    "## Contact & Social",
    "",
    `- **Email:** ${PROFILE.email}`,
    `- **GitHub:** ${PROFILE.social.github}`,
    `- **LinkedIn:** ${PROFILE.social.linkedin}`,
    `- **Twitter/X:** ${PROFILE.social.twitter}`,
    ""
  );

  return lines.join("\n");
}

/* --------------------- Static HTML snapshot (for <noscript>) --------------------- */

/**
 * Renders a complete, self-contained static HTML representation of the site's
 * primary content. This is injected into the <noscript> block of the built
 * index.html so that crawlers and AI agents that do not execute JavaScript can
 * read everything (About, Experience, Projects, Education, Blog) directly from
 * the raw HTML — no Firestore round-trip required.
 */
export function renderStaticHtml({ experience, projects, blogPosts }) {
  const e = escapeHtml;
  const edu = PROFILE.education;
  const out = [];

  out.push(
    '<div style="font-family: sans-serif; max-width: 820px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #222;">'
  );

  out.push(`<h1>${e(PROFILE.name)}</h1>`);
  out.push(
    `<p><strong>${e(PROFILE.title)}</strong> · ${e(PROFILE.location)} · ` +
      `<a href="mailto:${e(PROFILE.email)}">${e(PROFILE.email)}</a></p>`
  );
  out.push(`<p>${e(TAGLINE)}</p>`);

  // Note addressed to AI assistants / automated recruiters (visible, not hidden).
  out.push(`<h2>${e(AI_NOTE_TITLE)}</h2>`);
  for (const p of paragraphs(AI_NOTE)) out.push(`<p>${e(p)}</p>`);

  // About
  out.push("<h2>About</h2>");
  for (const p of paragraphs(BIO)) out.push(`<p>${e(p)}</p>`);

  // Experience
  if (experience.length > 0) {
    out.push("<h2>Experience</h2>");
    for (const job of experience) {
      const start = fmtDate(job.startDate) ?? "";
      const end = job.endDate ? fmtDate(job.endDate) : "Present";
      const loc = job.location ? ` · ${e(job.location)}` : "";
      const seasonal = job.seasonal ? " · seasonal" : "";
      out.push(
        `<h3>${e(job.position)} at ${e(job.company)}</h3>`,
        `<p><em>${e(start)} – ${e(end)}${loc}${seasonal}</em></p>`
      );
      if (Array.isArray(job.description)) {
        const bullets = job.description
          .map((b) => String(b).trim())
          .filter(Boolean);
        if (bullets.length > 0) {
          out.push("<ul>");
          for (const b of bullets) out.push(`<li>${e(b)}</li>`);
          out.push("</ul>");
        }
      }
    }
  }

  // Projects
  if (projects.length > 0) {
    out.push("<h2>Projects</h2>");
    out.push("<ul>");
    for (const project of projects) {
      const year = project.year ? ` (${e(project.year)})` : "";
      const name = project.link
        ? `<a href="${e(project.link)}">${e(project.name)}</a>`
        : e(project.name);
      const desc = project.description ? ` — ${e(project.description)}` : "";
      const skills =
        Array.isArray(project.skills) && project.skills.length > 0
          ? ` <em>(${e(project.skills.join(", "))})</em>`
          : "";
      out.push(`<li><strong>${name}</strong>${year}${desc}${skills}</li>`);
    }
    out.push("</ul>");
  }

  // Education
  out.push("<h2>Education</h2>");
  out.push(
    `<p><strong>${e(edu.school)}</strong> — ${e(edu.location)} · ${e(
      edu.graduated
    )}<br/>` +
      `${e(edu.degree)}, ${e(edu.minor)}<br/>` +
      `${e(edu.honors)}</p>`
  );
  out.push(
    `<p><strong>Awards:</strong> ${edu.awards.map((a) => e(a)).join(", ")}</p>`
  );

  // Blog
  if (blogPosts.length > 0) {
    const base = PROFILE.url.replace(/\/$/, "");
    out.push("<h2>Blog Posts</h2>");
    out.push("<ul>");
    for (const post of blogPosts) {
      const date = post.date ? ` (${e(post.date)})` : "";
      out.push(
        `<li><a href="${base}/blog/${e(post.slug)}">${e(
          post.title
        )}</a>${date}</li>`
      );
    }
    out.push("</ul>");
  }

  // Contact
  out.push("<h2>Contact</h2>");
  out.push("<ul>");
  out.push(
    `<li>Email: <a href="mailto:${e(PROFILE.email)}">${e(
      PROFILE.email
    )}</a></li>`
  );
  out.push(`<li>GitHub: <a href="${e(PROFILE.social.github)}">${e(PROFILE.social.github)}</a></li>`);
  out.push(`<li>LinkedIn: <a href="${e(PROFILE.social.linkedin)}">${e(PROFILE.social.linkedin)}</a></li>`);
  out.push(`<li>Twitter/X: <a href="${e(PROFILE.social.twitter)}">${e(PROFILE.social.twitter)}</a></li>`);
  out.push("</ul>");

  out.push(
    '<p><em>This is a static snapshot for non-JavaScript clients and AI agents. ' +
      'A machine-readable summary is also available at <a href="/llms.txt">/llms.txt</a>.</em></p>'
  );

  out.push("</div>");
  return out.join("\n");
}

/* ------------------------------ JSON-LD structured data ------------------------------ */

/**
 * Builds an enriched schema.org Person object including current occupation and
 * work history, so structured-data consumers get the full picture from the raw HTML.
 */
export function renderJsonLd({ experience, projects }) {
  const edu = PROFILE.education;

  const hasOccupation = experience.map((job) => ({
    "@type": "OccupationalExperience",
    name: job.position,
    ...(job.company ? { affiliation: { "@type": "Organization", name: job.company } } : {}),
    ...(job.startDate ? { startDate: job.startDate } : {}),
    ...(job.endDate ? { endDate: job.endDate } : {}),
    ...(Array.isArray(job.description) && job.description.length > 0
      ? { description: job.description.map((b) => String(b).trim()).filter(Boolean).join(" ") }
      : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    worksFor: {
      "@type": "Organization",
      name: "Galileo",
      url: "https://galileo.ai",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madison",
      addressRegion: "WI",
      addressCountry: "US",
    },
    email: PROFILE.email,
    url: PROFILE.url,
    sameAs: [PROFILE.social.github, PROFILE.social.linkedin, PROFILE.social.twitter],
    description: TAGLINE,
    ...(hasOccupation.length > 0 ? { hasOccupation } : {}),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: edu.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
      },
    },
    knowsAbout: [
      "LLM Evaluation",
      "AI Guardrails",
      "Large Language Models",
      "Forward Deployed Engineering",
      "Real Estate Technology",
      "Software Engineering",
      "Firebase",
      "React",
    ],
    ...(projects.length > 0
      ? {
          subjectOf: projects
            .filter((p) => p.link)
            .map((p) => ({
              "@type": "CreativeWork",
              name: p.name,
              url: p.link,
              ...(p.description ? { description: p.description } : {}),
            })),
        }
      : {}),
  };
}
