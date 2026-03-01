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

## Styling

- Dark theme: background `#1e1e1e`, text `#FAFAFA`, accent `#92F2F2`.
- Font: Raleway (body), Kaushan Script (name heading).
- Match existing patterns in `src/styles.css`, `src/blogAll.css`, `src/editDetail.css`.
