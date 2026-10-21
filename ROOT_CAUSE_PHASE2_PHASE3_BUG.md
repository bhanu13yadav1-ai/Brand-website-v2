# Root Cause — Phase 2/3 Upload Blank Page

## Observed repository state
Repository: `https://github.com/bhanu13yadav1-ai/Brand-website-v2`
Branch inspected: `main`

The inspected tree contained the following relevant facts:

- No root `index.html` existed.
- The root `README.md` contained only `# Brand-website-v2`.
- Root `app.js` was a 7 KB Phase 2/3 compatibility loader, not the audited main app source.
- Root `styles.css` was a short `@import` wrapper, not the real stylesheet.
- The repository had no `css/` or `js/` directories and no original campaign image files.
- `phase3.js`, `phase3.css`, two diagnostics pages, a manifest and service worker had been uploaded without the original page/application and image files those files expected.

## Cause
GitHub Pages did not have a root `index.html` to render as the website entry point, so the published page showed the repository README heading. The uploaded Phase 2/3 items were overlay/compatibility files designed for an already-populated existing repository; they were not a complete deployable website. The helper files also expected files or nested paths that were absent from `Brand-website-v2`.

## Fix in this package
- Add a complete root `index.html`.
- Replace the root loader `app.js` with actual application code.
- Replace the short root import-wrapper `styles.css` with the actual stylesheet.
- Replace the service worker with a project-scoped cache setup that does not delete unrelated `blacked-*` caches for other GitHub Pages projects.
- Supply the correct manifest and icon.
- Keep all main files at the repository root and include a diagnostics page.
- Use verified public source image URLs plus a fallback because the binary originals were not present in `Brand-website-v2`.

## Limitations
This is a recovery build based on the feature and source audit. It cannot preserve browser `localStorage` from the separate `Brand-website-4f` origin automatically. The original images are external public-repository dependencies in this package; bundle them locally later when full binary source access is available. Live GitHub Pages and physical Android testing must be performed after upload.
