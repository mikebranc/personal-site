# Agent Instructions

## Project

React personal website with Firebase (Firestore, Auth, Storage). Uses Create React App with react-scripts 5.

## Build & Verify

Always verify changes compile cleanly before committing:

```
CI=true npx react-scripts build
```

`CI=true` is critical — it mirrors the production CI environment and treats all ESLint warnings as errors. A plain `npx react-scripts build` will not catch these.

## Common Lint Pitfalls

- **Unused variables/imports**: Remove them or use `const [, setter] = useState()` when only the setter is needed.
- **Missing useEffect dependencies**: Include all referenced values (`navigate`, state ids, etc.) in the dependency array.
- **Anonymous default exports**: Use `const data = [...]; export default data` instead of `export default [...]` for data files.

## Firebase

- Config lives in `src/firebase/config.js` and reads from `REACT_APP_FIREBASE_*` env vars.
- Data helpers are in `src/dbHelpers.js` (`getFirestoreCollection`, `getFirestoreDocument`, `deleteFirestoreDocument`).
- The `setLoading` callback pattern is used across all pages — keep it even if the `loading` value isn't read directly.

## Content & llms.txt

The site has two types of content:

- **Dynamic (Firestore)**: Experience, Projects, Blog — edited via the `/edit/*` admin pages.
- **Static (code)**: About/bio, hero text, education — hardcoded in `src/pages/Home.js` as JSX for full formatting control.

`public/llms.txt` is the plain-text summary of the site read by LLMs and crawlers. It must stay in sync with the actual site content.

**Rule: whenever the bio, hero text, or any static about content in `Home.js` is updated, you MUST also update these two places to match:**

1. **`public/llms.txt`** — the static plain-text version (About section, roughly lines 5–20).
2. **`functions/index.js`** — the `BIO` constant near the top of the file, which the live Cloud Function uses to serve `/llms.txt` dynamically.

Keep the bio text consistent across all three files. `public/llms.txt` and `functions/index.js` use plain text (no JSX, no HTML) — strip links down to readable text, e.g. "Galileo (galileo.ai)" instead of `<a href>`.

The dynamic sections (Experience, Projects, Blog) in `llms.txt` are kept in sync automatically — do not manually edit those sections in `public/llms.txt` or `functions/index.js`.

## Styling

- Dark theme: background `#1e1e1e`, text `#FAFAFA`, accent `#92F2F2`.
- Font: Raleway (body), Kaushan Script (name heading).
- Match existing patterns in `src/styles.css`, `src/blogAll.css`, `src/editDetail.css`.
