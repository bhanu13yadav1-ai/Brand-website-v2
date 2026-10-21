# V1 Phase 2 — Implementation & QA Report

## Scope
Target: existing `bhanu13yadav1-ai/Brand-website-4f` repository. Phase 2 scope is a conservative additive runtime path/loader repair; this package does not merge the other two repos or implement new feature sections yet.

## Source findings carried forward from Phase 1
- Current `index.html` expects `css/styles.css` and `js/app.js`, but the inspected current repository tree held `styles.css` and `app.js` at the root, with no `css/` or `js/` folders.
- Root image files exist, while some page/app references use `assets/<filename>`.
- The prior `sw.js` precache list used `assets/...` paths although the inspected files are at the root; a wrong precache path can prevent installation.
- PWA manifest icon paths pointed to `assets/icon-192.png` and `assets/icon-512.png`, while the icons exist at the root.

## Implemented in this patch
1. Added `css/styles.css` wrapper that imports the existing root stylesheet.
2. Added `js/app.js` compatibility loader that sets up a path normalizer before loading the original `../app.js`, so the original feature code is not overwritten.
3. Added proactive rewriting for static/dynamic HTML `src`, `href`, `poster`, `srcset`, and same-origin CSS `url(...)` references when they use the broken one-level `assets/<root-filename>` form.
4. Added capture-phase image retry for remaining path failures.
5. Replaced the service worker with a new versioned cache, correct root-level precache files, network-first navigation, and a fallback resolver for direct `assets/<filename>` URLs.
6. Corrected PWA manifest icon paths and dynamically connects the manifest when absent from the page.
7. Added `phase2-diagnostics.html` for route checks, image preview and original wheel-markup checks.

## Preservation guarantees / boundaries
- Existing `index.html`, root `app.js`, root `styles.css`, catalogue data, user browser storage and original images are not part of this overlay and should remain untouched during upload.
- No new product prices, stock, medical claims, external image content or user accounts are introduced.
- The shim intentionally does not flatten nested folders, so future `assets/new-gallery/...` additions remain distinct.

## Test status
- PASS: generated JavaScript shim syntax checked with Node.js.
- PASS: generated service-worker syntax checked with Node.js.
- PASS: manifest parses as JSON.
- PASS: diagnostics HTML parses and required CSS/JS loader routes are represented in package.
- PASS: ZIP package contains the expected single folder and nested upload paths.
- NOT TESTED: actual GitHub Pages deployment after upload.
- NOT TESTED: real Android physical-device image loads and taps.
- NOT TESTED: end-to-end wheel animation, bag/wishlist persistence and every feature after this patch; these require a deployed browser run.
- BLOCKED: direct repository write/deployment through the available GitHub connection; it is read-only for the three supplied repositories.

## Phase 2 exit criteria
Phase 2 is packaged for user upload but must remain **PARTIAL / NOT VERIFIED LIVE** until:
1. The overlay has been committed to the intended repository.
2. `phase2-diagnostics.html` passes on the deployed site.
3. Main website images load after a fresh visit and refresh.
4. The three original wheel experiences are manually tested.
5. No regression or console/network errors are observed.
