/**
 * Build-time data layer: reads live data from Firestore via the REST API (no
 * browser SDK needed) for the build scripts:
 *   - scripts/generate-llms-txt.mjs  (writes public/llms.txt)
 *   - scripts/inject-static-html.mjs (bakes a snapshot into the shell)
 *
 * Content constants and all rendering live in functions/render.cjs (the single
 * source of truth shared with the Cloud Functions). This module only handles
 * environment loading, fetching, and shaping.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { shapeData } = require("../functions/render.cjs");

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "..");

export function loadEnv() {
  // Start with process.env so CI / hosting environment variables are always available.
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
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      env[key] = val;
    }
  } catch {
    // No .env file — relying on process.env (CI / hosting).
  }
  return env;
}

// Firestore REST returns values in a typed format like { "stringValue": "foo" }.
function unwrap(value) {
  if (value == null) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return parseInt(value.integerValue, 10);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
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
    throw new Error(
      `Firestore fetch failed for "${collectionName}" (${res.status}): ${text}`
    );
  }
  const json = await res.json();
  return (json.documents ?? []).map(docToObj);
}

/**
 * Fetches and shapes all site data from Firestore.
 *
 * Set SITE_DATA_FILE to a JSON file path to load a local fixture instead of
 * hitting Firestore (useful for offline builds and tests). The fixture should
 * look like: { "experience": [...], "project": [...], "blog": [...] }.
 *
 * Returns { experience, projects, blogPosts } already sorted/filtered.
 */
export async function fetchSiteData(env = loadEnv()) {
  let raw;
  if (env.SITE_DATA_FILE) {
    const fixture = JSON.parse(readFileSync(resolve(env.SITE_DATA_FILE), "utf8"));
    raw = {
      experience: fixture.experience ?? [],
      project: fixture.project ?? fixture.projects ?? [],
      blog: fixture.blog ?? fixture.blogPosts ?? [],
    };
  } else {
    const projectId = env.REACT_APP_FIREBASE_PROJECT_ID;
    if (!projectId) {
      throw new Error(
        "REACT_APP_FIREBASE_PROJECT_ID not found (set it in .env / the build environment, or set SITE_DATA_FILE)."
      );
    }
    const [experience, project, blog] = await Promise.all([
      fetchCollection(projectId, "experience"),
      fetchCollection(projectId, "project"),
      fetchCollection(projectId, "blog"),
    ]);
    raw = { experience, project, blog };
  }

  return shapeData(raw);
}
