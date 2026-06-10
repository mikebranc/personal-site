/**
 * Regenerates public/llms.txt from live Firestore data.
 * Run with: npm run generate-llms-txt  (also runs automatically before `npm run build`)
 *
 * In production /llms.txt is served fresh by the `llmsTxt` Cloud Function, so it
 * stays current without a rebuild. This static copy is the deploy-time fallback
 * (and what's served if you ever host this without the function).
 *
 * Rendering lives in functions/render.cjs (shared with the Cloud Functions).
 * Requires REACT_APP_FIREBASE_PROJECT_ID (or SITE_DATA_FILE for offline runs).
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { createRequire } from "module";
import { ROOT, fetchSiteData } from "./site-data.mjs";

const require = createRequire(import.meta.url);
const { renderLlmsTxt } = require("../functions/render.cjs");

async function main() {
  const data = await fetchSiteData();
  const output = renderLlmsTxt(data);
  const outPath = resolve(ROOT, "public", "llms.txt");
  writeFileSync(outPath, output, "utf8");
  console.log(
    `✓ Generated public/llms.txt (${data.experience.length} jobs, ${data.projects.length} projects, ${data.blogPosts.length} blog posts)`
  );
}

main().catch((err) => {
  // Non-fatal: keep the previously committed public/llms.txt so a transient
  // Firestore/network issue (or missing env) never breaks the production build.
  console.warn(
    "⚠ Skipped llms.txt regeneration:",
    err.message ?? err,
    "\n  (using the existing public/llms.txt)"
  );
});
