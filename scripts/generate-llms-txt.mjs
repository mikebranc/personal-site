/**
 * Regenerates public/llms.txt from live Firestore data.
 * Run with: npm run generate-llms-txt  (also runs automatically before `npm run build`)
 *
 * Data + rendering live in scripts/site-data.mjs and scripts/render.mjs so this
 * stays in sync with the static HTML snapshot injected into build/index.html.
 *
 * Requires REACT_APP_FIREBASE_PROJECT_ID (in .env or the build environment) and
 * Firestore rules that allow public reads on experience, project, blog. You can
 * also point SITE_DATA_FILE at a JSON fixture to run offline.
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { ROOT, fetchSiteData } from "./site-data.mjs";
import { renderLlmsTxt } from "./render.mjs";

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
