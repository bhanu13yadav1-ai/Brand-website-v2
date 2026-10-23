# Phase 4 V3 — combined experience + navigation recovery

## What changed
- Consolidated the Phase 3 mood UI, CSS, and Phase 4 four-step fictional prompt builder into one same-origin file: `phase3-4-experience.js`.
- Updated `app.js` to request one bundle instead of a separate Phase 3 JS and CSS request; asks the service worker to check its update when the app loads.
- Updated `sw.js` cache version to `blacked-v4-phase4-combined-experience-1`; the new worker retires old `blacked-v*` caches at activation.
- Added a dormant navigation fallback in `fallback.js`. It is active only if the main application never exports `BLACKED_V1`; a visible diagnostic notice appears when fallback navigation is used.
- Added an on-device live diagnostic page and CSV export.
- Added a four-step builder: mood, fictional adult character/story setup, non-literal visual styling preference, and language/intensity/boundary options. It requires an 18+ confirmation, builds a non-graphic fictional starter prompt locally, and stores settings only in localStorage.
- Existing seven views and four wheels are preserved. `index.html` and the original Phase 4–8 source files are not replaced or deleted.

## Performance/bug diagnosis
- This bundle reduces the Phase 3 feature’s two dynamic requests to one. It does not prove actual page load speed improves; that must be measured in the visitor’s real browser.
- Current source in `app.js` and the service-worker script were inspected and the static in-memory smoke test verified navigation logic. The live GitHub Pages site and Android browser could not be interactively navigated from this environment. Therefore this release includes a diagnostic runner instead of a fabricated live-pass claim.
- Do not delete old `phase3-horny-mode.js` / `.css` yet. The new app loader no longer references those files directly, but only delete after live diagnostic pass and a reference scan.

## Merge instructions
Extract the complete ZIP into the existing repository root, allowing the five code/diagnostic files to merge. Replace only `app.js`, `fallback.js`, and `sw.js`; add `phase3-4-experience.js`, `phase4-diagnostics.html`, and `phase4-diagnostics.js`. Do NOT replace `index.html` or delete any existing files. Commit/upload the files together, publish GitHub Pages, then open `phase4-diagnostics.html`.
