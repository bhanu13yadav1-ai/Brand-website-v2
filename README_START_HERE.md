# BLACKED V3 — Phase 5–8 Integration Delta

This is a **delta-only package**. It deliberately does not bundle the unchanged site, core scripts, or image files that already exist in the repository root.

## Why the earlier UI did not appear

The connected `main` source showed that `phase2-photo-collections.js`, `phase3-design-system.css`, `phase4-home-and-fantasy.js`, and the Phase 5–6 modules existed, but `index.html` did not load `phase5-6-loader.js`. On top of that, several scripts used `./assets/<folder>/<file>.webp` even though the actual image files are stored at the repository root (for example `./noor-ka-nasha.webp`, `./match-romantic.webp`). That path mismatch makes a valid image look missing.

## Files to replace in the repository root

- `phase2-photo-collections.js` — fixes the 11 local image paths to the files already at repository root.
- `phase6-boyfriend-studio.js` — the shared image resolver now uses root-level filenames.
- `phase5-6-asset-manifest.json` — aligns the diagnostic source paths with real file paths.
- `phase5-6-loader.js` — bumps cache-busting to v7.8.0 and loads Phase 7–8 styles/scripts after the earlier phases.
- `phase6-boyfriend-preview.html` — fixes root-level asset URLs in the standalone preview.

## Files to add

- `phase7-8-enhancements.js`
- `phase7-8-enhancements.css`
- `phase7-8-diagnostics.html`

## Two small integration edits

1. **index.html:** add the one script line in `INDEX_INSERT_PHASE78.patch` immediately after the existing `part-c-enhancements.js` script:
   `<script src="./phase5-6-loader.js?v=7.8.0" defer></script>`
2. **sw.js:** apply `SW_CACHE_PATCH.txt`—change the cache name and add the listed root-level CORE entries. Keep all existing entries.

The repository connector returned HTTP 403 for branch creation and file writes, so these edits have **not** been pushed by this assistant. Apply the delta files through GitHub's web editor/upload flow, then run diagnostics. No claim of live deployment is made.

## Expected visible changes

- Phase 5: image source paths match repository root assets; failed requests retain their cards and show retry/open-source controls.
- Phase 6: the Boyfriend Studio uses the root-level six character thumbnails and original “Choose Your Match” board.
- Phase 7: a redesigned three-card Noor / Sanskari / Grace collection hub with search, filter, image dimensions/status, and links into existing galleries.
- Phase 8: story mood quick-filters connected to the existing story dropdown, preserved language/sort/search/bookmarks/series, plus reader font-size and focus controls.

## Verification

After upload, open `phase7-8-diagnostics.html` on GitHub Pages and run **Runtime checks** and **Check bundled photos**. If the loader is not detected, the `index.html` script line was not applied or the browser is serving an old cached document. Hard-refresh / clear only the website's site cache after checking diagnostics. Test 320, 360, 390 and 430 CSS-pixel widths, the Noor gallery, all existing views and the three original wheels before treating the release as done.
