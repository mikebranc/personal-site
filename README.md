# Personal Website
This repo is for my personal website. It is a full stack app that uses firebase’s auth and firestore DB. I have a user portal where I can add experience, projects, and blog posts (although I have the blog page just linking to medium until I can put some time into storing markdown files). Feel free to copy it (or portions of it) to build your own site!

[Site Link (michaelbranconier.com)](https://www.michaelbranconier.com/) 🔗
<hr />

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [firebase](https://firebase.google.com/).

## Making the site readable for AI agents & crawlers

The app is a client-side React SPA, so Experience, Projects, and Blog are loaded from Firestore with JavaScript. Crawlers and AI agents (e.g. ChatGPT fetching the page) generally **don't run JS**, so they'd otherwise see an almost-empty page. To make everything readable from the raw HTML — and to keep it fresh **without a rebuild** when content changes in Firestore — HTML and `/llms.txt` are served through Cloud Functions.

### How it's served (important: static files shadow rewrites)

Firebase Hosting always serves an exact-match static file before evaluating any function rewrite ([priority order](https://firebase.google.com/docs/hosting/full-config#hosting_priority_order)). So if `index.html` / `llms.txt` were left in the deployed `build/` folder, they'd shadow the functions and you'd be stuck with build-time content. To avoid that, `firebase.json` **ignores** `index.html` and `llms.txt` from the static deploy and routes them through functions:

- **`prerender` function** (`source: "**"`) serves the SPA shell for every HTML route. It reads the built shell (`functions/index-template.html`), then injects the latest Firestore data into the `<noscript>` fallback and JSON-LD at request time. Real browsers boot the React app as usual; non-JS agents get always-fresh, fully-populated HTML.
- **`llmsTxt` function** (`source: "/llms.txt"`) renders the Markdown summary ([llmstxt.org](https://llmstxt.org/)) fresh from Firestore.
- Static assets (`/static/**`, images, favicon, manifest) stay static and are served directly — they take precedence over the `**` rewrite, so they never hit the function.

Both functions are **CDN-cached** (`s-maxage=300`) and **failure-safe**: if Firestore is ever unreachable, `prerender` serves the shell with its baked-in build-time snapshot instead of erroring.

### Shared rendering / single source of truth

- `functions/render.cjs` — the one place that owns the content constants (`BIO`, `AI_NOTE`, `PROFILE`, …) and all rendering (`renderLlmsTxt`, `renderStaticHtml`, `renderJsonLd`, `injectIntoHtml`, `shapeData`). It's CommonJS and lives in `functions/` because Cloud Functions can only `require` files inside their own package; the build scripts import it from there too.
- `scripts/site-data.mjs` — build-time Firestore fetching (with a `SITE_DATA_FILE` JSON-fixture escape hatch for offline builds/tests).
- `scripts/generate-llms-txt.mjs` / `scripts/inject-static-html.mjs` — build steps that produce the deploy-time fallbacks and the `functions/index-template.html` shell.

The build wiring (`package.json`):

```
"build": "node scripts/generate-llms-txt.mjs && react-scripts build && node scripts/inject-static-html.mjs"
```

`scripts/inject-static-html.mjs` always copies the built shell to `functions/index-template.html` (so the function has the correct content-hashed asset URLs), even if the Firestore fetch fails.

> When you update the bio, change the `BIO` constant in `functions/render.cjs` (the bio also lives as JSX in `src/pages/Home.js` for layout control). Everything else — `/llms.txt`, the static snapshot, JSON-LD — is generated from that single source.

### Deploy

```
npm run build && firebase deploy
```

After deploy, editing content in Firestore (via the edit portal) shows up for crawlers within ~5 minutes (the CDN cache window) — **no rebuild required**. You only need to rebuild + redeploy for code/design changes.
