const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

function fmtDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

async function fetchCollection(name) {
  const snap = await db.collection(name).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Bio lives in Home.js as JSX for full formatting control.
// When you update the bio in Home.js, update this constant too (and public/llms.txt).
const BIO = `I'm a Forward Deployed Engineer building production-ready AI systems.

I'm currently a Forward Deployed Engineer at Galileo (galileo.ai), where I work directly with Fortune 100 customers to design, evaluate, and deploy LLM applications in production. My work spans LLM guardrails, evaluation pipelines, monitoring, and cost control, with a focus on reliability and real world impact.

Before moving into tech full time, I worked in real estate operations, where I helped scale a boutique brokerage to over $100M in transaction volume. That experience sparked a long term interest in real estate and shaped how I think about building software for operational teams.

Outside of work, I focus on real estate technology, which is why I started Summit & Shark, LLC (summitandshark.com). Through Summit & Shark, I've built a production AI leasing chatbot for real estate clients and a Chrome extension for analyzing Zillow data that's now used by hundreds of users.

While I spend most of my time building reliable, end-to-end systems, I'm also a GenAI nerd and enjoy experimenting with creative ideas such as an AI-powered poem generator for couples (thestoryofus.love).

Outside of tech, I enjoy hiking, camping, spending time with my family, reading, and training.

If you're building AI for real world workflows, especially in real estate, I'd love to connect!`;

exports.llmsTxt = onRequest({ region: "us-central1" }, async (req, res) => {
  try {
    const [expDocs, projDocs, blogDocs] = await Promise.all([
      fetchCollection("experience"),
      fetchCollection("project"),
      fetchCollection("blog"),
    ]);

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
      ...BIO.split("\n\n").map((p) => p.trim()).filter(Boolean).flatMap((p) => [p, ""]),
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
      "**Awards:** LMU Arrupe Scholar, Heron CBA Scholar, John B. & Nelly Llanos Kilroy Endowed Scholar, LMU Hackathon Mozilla State of the Internet Award"
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
      "- **Twitter/X:** https://twitter.com/mike_branc"
    );

    res.set("Content-Type", "text/plain; charset=utf-8");
    // Cache for 5 minutes so repeated crawler hits don't spam Firestore
    res.set("Cache-Control", "public, max-age=300, s-maxage=300");
    res.status(200).send(lines.join("\n"));
  } catch (err) {
    console.error("llmsTxt error:", err);
    res.status(500).send("Error generating llms.txt");
  }
});
