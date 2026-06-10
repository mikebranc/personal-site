/**
 * Post-build step: injects a full static HTML snapshot of the site's content
 * into build/index.html so that crawlers and AI agents that DON'T execute
 * JavaScript can read everything (About, Experience, Projects, Education, Blog)
 * straight from the raw HTML.
 *
 * It does two things to build/index.html:
 *   1. Replaces the <noscript> fallback with a freshly generated full snapshot.
 *   2. Replaces the JSON-LD (application/ld+json) block with enriched structured
 *      data that includes the full work history.
 *
 * Runs after `react-scripts build` (see the "build" script in package.json).
 * This is intentionally non-fatal: if Firestore is unreachable, the build still
 * succeeds with the static fallback baked into public/index.html.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { ROOT, fetchSiteData } from "./site-data.mjs";
import { renderStaticHtml, renderJsonLd } from "./render.mjs";

async function main() {
  const indexPath = resolve(ROOT, "build", "index.html");
  if (!existsSync(indexPath)) {
    throw new Error(`build/index.html not found (run react-scripts build first).`);
  }

  const data = await fetchSiteData();
  let html = readFileSync(indexPath, "utf8");

  // 1) Replace the <noscript> fallback with the full static snapshot.
  const noscriptHtml = renderStaticHtml(data);
  const noscriptRe = /<noscript>[\s\S]*?<\/noscript>/i;
  if (noscriptRe.test(html)) {
    html = html.replace(noscriptRe, `<noscript>${noscriptHtml}</noscript>`);
  } else {
    console.warn("⚠ No <noscript> block found in build/index.html; appending one to <body>.");
    html = html.replace(/<body([^>]*)>/i, `<body$1><noscript>${noscriptHtml}</noscript>`);
  }

  // 2) Replace the JSON-LD structured data with the enriched version.
  const jsonLd = JSON.stringify(renderJsonLd(data), null, 2);
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i;
  const ldBlock = `<script type="application/ld+json">\n${jsonLd}\n</script>`;
  if (ldRe.test(html)) {
    html = html.replace(ldRe, ldBlock);
  } else {
    console.warn("⚠ No JSON-LD block found in build/index.html; inserting before </head>.");
    html = html.replace(/<\/head>/i, `${ldBlock}\n</head>`);
  }

  writeFileSync(indexPath, html, "utf8");
  console.log(
    `✓ Injected static HTML snapshot into build/index.html ` +
      `(${data.experience.length} jobs, ${data.projects.length} projects, ${data.blogPosts.length} blog posts)`
  );
}

main().catch((err) => {
  console.warn(
    "⚠ Skipped static HTML injection:",
    err.message ?? err,
    "\n  (build/index.html keeps the static fallback from public/index.html)"
  );
});
