# Personal Website
This repo is for my personal website. It is a full stack app that uses firebase’s auth and firestore DB. I have a user portal where I can add experience, projects, and blog posts (although I have the blog page just linking to medium until I can put some time into storing markdown files). Feel free to copy it (or portions of it) to build your own site!

[Site Link (michaelbranconier.com)](https://www.michaelbranconier.com/) 🔗
<hr />

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [firebase](https://firebase.google.com/).

## Making the site readable for AI agents & crawlers

The app is a client-side React SPA, so the Experience, Projects, and Blog sections are loaded from Firestore with JavaScript. Crawlers and AI agents that don't run JS would otherwise see an almost-empty page. To make everything scrapable straight from the raw HTML, the build emits machine-readable copies of the content:

- **`/llms.txt`** — a Markdown summary of the whole site ([llmstxt.org](https://llmstxt.org/)). In production it's served fresh from Firestore by the `llmsTxt` Firebase Function (see `functions/index.js`); a static copy in `public/llms.txt` is regenerated at build time and acts as a fallback.
- **Static HTML snapshot** — after `react-scripts build`, `scripts/inject-static-html.mjs` injects a full static rendering of About / Experience / Projects / Education / Blog into the `<noscript>` block of `build/index.html`, plus enriched schema.org JSON-LD (`Person` with full work history). No JavaScript or Firestore round-trip needed to read it.

The data layer and renderers are shared so every surface stays in sync:

- `scripts/site-data.mjs` — canonical profile/bio constants + Firestore fetching (with a `SITE_DATA_FILE` JSON-fixture escape hatch for offline builds/tests).
- `scripts/render.mjs` — pure renderers for `llms.txt`, the static HTML snapshot, and JSON-LD.

Both the `llms.txt` generation and the HTML injection are non-fatal: if Firestore is unreachable at build time, the previously committed `public/llms.txt` and the static fallback in `public/index.html` are used so the build never breaks.

The build wiring (`package.json`):

```
"build": "node scripts/generate-llms-txt.mjs && react-scripts build && node scripts/inject-static-html.mjs"
```

> When you update the bio, also update the `BIO` constant in `scripts/site-data.mjs` and `functions/index.js` (the bio lives as JSX in `src/pages/Home.js` for formatting control).
