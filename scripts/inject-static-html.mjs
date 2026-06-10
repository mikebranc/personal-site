/**
 * Post-build step (runs after `react-scripts build`).
 *
 * Two jobs:
 *   1. Bake a static snapshot of the site's content (About / Experience /
 *      Projects / Education / Blog + JSON-LD) into build/index.html so the shell
 *      always carries a sensible fallback.
 *   2. Copy that shell to functions/index-template.html so the `prerender` Cloud
 *      Function can serve it (with correct, content-hashed asset URLs) and
 *      re-inject fresh Firestore data on every request — no rebuild needed when
 *      you only edit content.
 *
 * The template copy ALWAYS happens (even if Firestore is unreachable at build
 * time) because the function needs the shell to serve the React app; the
 * snapshot injection is best-effort and non-fatal.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createRequire } from "module";
import { ROOT, fetchSiteData } from "./site-data.mjs";

const require = createRequire(import.meta.url);
const { injectIntoHtml } = require("../functions/render.cjs");

const BUILD_INDEX = resolve(ROOT, "build", "index.html");
const FUNCTION_TEMPLATE = resolve(ROOT, "functions", "index-template.html");

function main() {
  if (!existsSync(BUILD_INDEX)) {
    throw new Error("build/index.html not found (run react-scripts build first).");
  }

  const shell = readFileSync(BUILD_INDEX, "utf8");

  // Always give the function a usable shell first (with correct asset hashes),
  // so it works even if the Firestore fetch below fails.
  writeFileSync(FUNCTION_TEMPLATE, shell, "utf8");

  return fetchSiteData()
    .then((data) => {
      const injected = injectIntoHtml(shell, data);
      writeFileSync(BUILD_INDEX, injected, "utf8");
      writeFileSync(FUNCTION_TEMPLATE, injected, "utf8");
      console.log(
        `✓ Baked static snapshot into build/index.html and functions/index-template.html ` +
          `(${data.experience.length} jobs, ${data.projects.length} projects, ${data.blogPosts.length} blog posts)`
      );
    })
    .catch((err) => {
      console.warn(
        "⚠ Skipped snapshot injection:",
        err.message ?? err,
        "\n  (functions/index-template.html holds the un-injected shell; the prerender function will inject live data at request time)"
      );
    });
}

Promise.resolve()
  .then(main)
  .catch((err) => {
    console.warn("⚠ inject-static-html failed:", err.message ?? err);
  });
