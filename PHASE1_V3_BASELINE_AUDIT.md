# BLACKED V3 — Phase 1 Baseline Audit

**Audit date:** 23 October 2026 (Asia/Kolkata)  
**Repository:** `bhanu13yadav1-ai/Brand-website-v2`  
**Branch:** `main`  
**Audited HEAD:** `966707852219bda9dcbf312cdbd3065439981f09`  
**Source method:** GitHub connector metadata, recursive tree, and read-only reads of `index.html`, `app.js`, `sw.js`, and `innerwear-image-library.json`.  
**Site/device access:** live page and physical Android testing were unavailable in this environment. They are marked **NOT TESTED**, not passed.

## Status

**Phase 1: SOURCE AUDIT COMPLETE; LIVE/PERFORMANCE BASELINE PARTIAL.** The repository source baseline and several measurable risks have been recorded. No application code, images, branch, or deployment were changed in this phase.

## Repository baseline

- Public GitHub repository; default branch `main`; current HEAD is `966707852219bda9dcbf312cdbd3065439981f09`.
- The current tree contains **457 files**, approximately **30.04 MB** of uncompressed tracked file content.
- Root HTML contains seven main views: `home`, `stories`, `innerwear`, `sanskari`, `wellness`, `boyfriend`, and `fit`.
- A static scan counted **158 HTML IDs with no duplicates**. All **32 distinct root-relative `href`/`src` references** inspected in `index.html` resolve to paths in the current Git tree.
- `index.html` links **12 JavaScript files** and **11 stylesheets** at page startup. The referenced JS files total about **279.4 KB** uncompressed, and the linked CSS totals about **92.0 KB**. All JS tags use `defer`, but stylesheets are still candidates for render-blocking work.
- `app.js` is about **105.8 KB** and has remote image dependencies from `Brand-website-4f` and `Brand-website-3` via `raw.githubusercontent.com`.
- `innerwear-image-library.json` parses as JSON and contains **151 records with 151 unique IDs**. This confirms the manifest structure, not that the 151 remote image URLs currently return HTTP 200.
- The root has **104 image/media files** totaling approximately **27.92 MB**. Four PNGs total approximately **12.20 MB**. Repository size is not the same as the amount downloaded on a normal page view: source references and live network requests still need measuring.

## Verified finding: service-worker precache path mismatch

`sw.js` lists 74 precache paths. Seventy are present in the current tree; four entries point into an `assets/` folder that does not exist in this repository. The actual SVG files are at the root:

- `assets/phase6-measurement-map.svg` → `phase6-measurement-map.svg`
- `assets/phase6-product-specs.svg` → `phase6-product-specs.svg`
- `assets/phase6-comfort-check.svg` → `phase6-comfort-check.svg`
- `assets/phase6-image-rights-workflow.svg` → `phase6-image-rights-workflow.svg`

The existing precache entries resolve to about **4.69 MB** of files, including roughly **4.1 MB of image assets**. `sw.js` fetches CORE entries concurrently during installation. This can add work on first install or after a cache-version change. We cannot infer the exact visitor-facing delay without a browser network trace.

## Verified finding: exact duplicate media blobs

Four pairs of root WebP files have matching Git blob SHA values and sizes. They are likely byte-identical duplicates, but **must not be deleted during Phase 1**. Phase 2 should first map every reference, then decide whether removing/redirecting any duplicate is safe:

- `1000201199(1).webp` / `1000201277.webp`
- `1000201200(1).webp` / `1000201281.webp`
- `1000201201(1).webp` / `1000201280.webp`
- `1000201203(1).webp` / `1000201279.webp`

## Performance risks ranked for Phase 2

1. **P0 — service-worker cache paths:** four confirmed incorrect SVG paths. Fix path alignment and retest install/update/offline behaviour.
2. **P1 — first-load work:** 11 linked stylesheets and 12 deferred scripts are loaded from the main document. Measure actual download/parse cost, then move nonessential screen code behind demand-based loading only where regression tests support it.
3. **P1 — image footprint:** 4 PNGs total about 12.20 MB, and duplicate image blobs were identified. Check real references and image dimensions before optimizing or removing files; do not assume all four PNGs load on the home view.
4. **P1 — external image reliability:** the 151-record library and app campaigns reference external raw-GitHub sources. Check actual HTTP status, latency, fallback behaviour, and mobile-network performance.
5. **P2 — cache strategy:** avoid precaching every heavy visual by default. Keep essential HTML/CSS/JS and small required assets in the core cache; use lazy/on-demand caching for lower-priority images after compatibility tests.

## Existing feature preservation contract

The next phases must preserve and regression-test the current seven views, story library/filters/branches and opt-in reading vault, innerwear catalogue, 151-record image archive, wishlist, product comparison, clearly demo-only bag, Sanskari/Noor/Grace collections, Wellness & Size Guide, Boyfriend/Couples, Fit Studio, local fit/measurement records, the three original wheels (Land/Boyfriend, Dildo, Butt Plug), Dirty/Wild, age self-attestation, privacy/data controls, PWA manifest and service worker.

Storage keys observed in the project notes/source history and to preserve unless a reviewed migration is necessary: `blackedV1Wishlist`, `blackedV1Bag`, `blackedV1FitNotes`, `blackedV1AdultConfirmed`, `blackedV1PartBStoryVault`, and `blackedV1MeasurementsOptIn`.

## V3 additions mapped

The 10 proposed additions are assigned across the seven-phase roadmap in `PHASE1_V3_FEATURE_PRESERVATION_MATRIX.csv`. The custom multi-step fantasy path is a must-have: initial mood/type → fictional adult character or toy preference → optional size preference → language/intensity → personalized fictional result. Every step needs Back/Edit/Skip/Restart; choices stay local and must not imply anything about real people.

## Tests and limitations

### Source-level checks completed

- Main branch/HEAD and recursive tree retrieved.
- Seven view IDs found.
- 158 HTML IDs scanned; no duplicates found.
- 32 distinct local references in `index.html`; no missing paths found in the current tree.
- JSON manifest parsed; 151 records and 151 unique IDs.
- 74 service-worker precache paths examined; 4 mismatches found.
- Root image/media inventory and exact-duplicate blob pairs enumerated.

### Not tested

- Current deployed Pages version/commit identity.
- Actual browser rendering, console errors, image HTTP success for all 151 records, or external source latency.
- Lighthouse/PageSpeed scores, Core Web Vitals, network waterfall, or repeat-visit cache timings.
- Physical Android Chrome, viewport/keyboard/touch, service-worker update, and offline use.
- Wheel pointer/result alignment, all button interactions, or saved-data regression on the current HEAD.

No live performance numbers or browser PASS claims are made.
