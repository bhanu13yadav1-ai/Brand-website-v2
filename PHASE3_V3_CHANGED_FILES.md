# Phase 3 changed files

## Replace existing files in the repository root

- `app.js` — lazy screen rendering, inactive-view image deferral, dynamic loader for the new Phase 3 module, and repair of four confirmed broken Phase 6 SVG paths.
- `sw.js` — new cache version, precache the new Phase 3 files, limit stale-cache cleanup to `blacked-v3-*`, and return the cached app shell when navigation network response takes over 1.8 seconds.

## Add new root files

- `phase3-horny-mode.js` — mode controls, local prompt generation and preferences.
- `phase3-horny-mode.css` — mobile-first styling.
- `phase3-diagnostics.html` and `phase3-diagnostics.js` — same-origin file, homepage and feature checks with CSV export.

## Deliberately not included for replacement

`index.html`, `styles.css`, `fallback.js`, existing phase modules, image archives, catalogue JSON, story data, asset files, and any user local data.

The ZIP contains source files at its root to support a merge/update. Documentation and the mockup live in `reports/` and `previews/` folders.
