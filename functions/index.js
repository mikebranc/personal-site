const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { readFileSync } = require("fs");
const { join } = require("path");

const {
  shapeData,
  renderLlmsTxt,
  injectIntoHtml,
  renderStaticHtml,
} = require("./render.cjs");

initializeApp();
const db = getFirestore();

const REGION = "us-central1"; // Firebase Hosting only proxies functions in us-central1.

async function fetchCollection(name) {
  const snap = await db.collection(name).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetches all collections from Firestore and shapes them for the renderers.
 */
async function getSiteData() {
  const [experience, project, blog] = await Promise.all([
    fetchCollection("experience"),
    fetchCollection("project"),
    fetchCollection("blog"),
  ]);
  return shapeData({ experience, project, blog });
}

// The built index.html shell (with correct, content-hashed asset URLs) is copied
// into this package at build time by scripts/inject-static-html.mjs. We read it
// once per cold start and inject fresh Firestore content into it per request.
const TEMPLATE_PATH = join(__dirname, "index-template.html");
let templateCache = null;
function loadTemplate() {
  if (templateCache != null) return templateCache;
  try {
    templateCache = readFileSync(TEMPLATE_PATH, "utf8");
  } catch (err) {
    console.error("Could not read index-template.html:", err.message ?? err);
    templateCache = null;
  }
  return templateCache;
}

/**
 * Serves the SPA shell for all HTML routes, injecting the latest Firestore data
 * into the <noscript> fallback and JSON-LD at request time. Real browsers boot
 * the React app as usual; non-JS crawlers and AI agents get always-fresh, fully
 * populated HTML without any rebuild.
 *
 * Robust by design: if the template is missing or Firestore is unreachable, it
 * degrades gracefully instead of erroring.
 */
exports.prerender = onRequest({ region: REGION }, async (req, res) => {
  const template = loadTemplate();

  let html;
  try {
    const data = await getSiteData();
    if (template) {
      html = injectIntoHtml(template, data);
    } else {
      // No shell available (shouldn't happen post-deploy) — serve a minimal,
      // still-useful HTML document built from the rendered snapshot.
      html =
        "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/>" +
        "<title>Michael Branconier — Forward Deployed Engineer</title></head><body>" +
        renderStaticHtml(data) +
        "</body></html>";
    }
  } catch (err) {
    console.error("prerender: serving un-injected shell:", err.message ?? err);
    // Firestore hiccup: fall back to the shell as-is (it carries the
    // build-time snapshot baked in by scripts/inject-static-html.mjs).
    html = template;
  }

  if (!html) {
    res.status(500).send("Temporarily unavailable");
    return;
  }

  res.set("Content-Type", "text/html; charset=utf-8");
  // Let the CDN cache for a few minutes so most requests don't invoke the
  // function or hit Firestore; content still refreshes within minutes of an edit.
  res.set("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=600");
  res.status(200).send(html);
});

/**
 * Serves /llms.txt fresh from Firestore (see https://llmstxt.org/).
 */
exports.llmsTxt = onRequest({ region: REGION }, async (req, res) => {
  try {
    const data = await getSiteData();
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=600");
    res.status(200).send(renderLlmsTxt(data));
  } catch (err) {
    console.error("llmsTxt error:", err);
    res.status(500).send("Error generating llms.txt");
  }
});
