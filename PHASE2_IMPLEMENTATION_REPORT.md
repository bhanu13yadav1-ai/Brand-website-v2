# Phase 2 — Image Audit & Root-Cause Repair

**Base commit:** `12ae0b208d056b39bba4c4b5b981d08f59ba30f0`  
**Repair scope:** correct current root-image path mismatch, activate only the already-authored Phase 2 photo collection module, and make the service-worker cache address the files that actually exist.

## Root cause (not just symptoms)

The project bundles its campaign images in the repository root. The active Part C helper created URLs below `./assets/` instead. Only `assets/css/style.css` was present beneath `assets/`; the expected image subfolders were absent. The requested image names themselves were not missing: their root-level counterparts existed. This mismatch affected the homepage hero, wheel posters, editorial/campaign images, the Threesome cover, and the service-worker image pre-cache entries.

## Changes made in the working copy
1. `index.html`: corrected the two direct homepage image paths to `./sanskari-outside-bold-within.webp` and `./shaam-se-raat-tak.webp`.
2. `index.html`: added only `phase2-photo-collections.css` and `phase2-photo-collections.js` after the existing Part C files. Later Phase 3–15 modules remain unloaded. This enables the prepared Phase 2 galleries without activating the full future roadmap.
3. `part-c-enhancements.js`: changed the asset helper to resolve bundled image basenames from repository root.
4. `sw.js`: normalized all 31 pre-cache image entries from non-existent `./assets/<folder>/<file>` paths to the corresponding existing root-level `./<file>` paths and bumped cache name to `blacked-v2-phase2-image-repair-2`.
5. `manifest.webmanifest`: updated the description to identify the Phase 2 image repair review build.
6. Added `phase2-image-diagnostics.html` for local-image decoding and optional browser-side checks of all 151 external archive URLs. Added an external asset source-tree audit CSV and local asset hash/dimension manifest.

## 151-record remote archive review
- Archive JSON records: **151**; all record IDs are unique: **True**.
- Source repos and counts: `Brand-website-4f` **42**, `Brand-website-3` **83**, `Brand-website-full-finally-` **26**.
- Every referenced filename exists in the corresponding upstream GitHub `main` tree against the upstream `main` tree SHAs documented in `PHASE2_EXTERNAL_ASSET_SOURCE_AUDIT.csv`; no missing tree paths were identified.
- **Important limitation:** this validates path existence in GitHub repository trees, not the actual HTTP/CDN response on the user's device. Runtime availability is deliberately marked **NOT TESTED** until the included browser diagnostic is run.
- `phase23-diagnostics.html` and `phase4-diagnostics.html` were also updated to test root-level paths.
- The local hash manifest documents four pairs of exact duplicate source images. Originals are preserved in the archive; the current collection additions do not intentionally render duplicate cards from those pairs.

## Phase 2 acceptance criteria
- All current active local images resolve to root paths where their source files exist.
- The Phase 2 gallery images have correct local root paths and visible load/error status.
- Protected multi-adult gallery cards remain inside the existing 18+ self-attestation protected container.
- Existing views, story/product data, original wheels and browser-storage logic are not replaced.
- Service worker points at existing root assets and uses a new cache namespace.
- No statement claims live deployment or Android testing has passed.

## Validation status
See `PHASE1_2_QA_RESULTS.json`, `PHASE2_LOCAL_ASSET_MANIFEST.csv`, and `PHASE2_EXTERNAL_ASSET_SOURCE_AUDIT.csv`. Static syntax/path/manifest checks are run during packaging. Browser navigation is blocked by this execution environment, so live interaction and Android verification remain **NOT TESTED**.

## Files changed in this review copy

- `index.html` — root image URLs corrected; Phase 2 collection CSS/JS linked after the current Part C files; diagnostics link added.
- `part-c-enhancements.js` — asset helper resolves root-level image basenames.
- `sw.js` — all 31 image precache paths corrected; cache namespace bumped to `blacked-v2-phase2-image-repair-2`.
- `manifest.webmanifest` — description marks the Phase 2 review build.
- `phase23-diagnostics.html`, `phase4-diagnostics.html` — checks updated to use real root-level image paths.
- `phase2-photo-collections.css/js` — existing modules integrated, not rewritten.
- `phase2-image-diagnostics.html`, the local/external asset manifests and reports — added for review/testing.

## Current quality gate

- Static/syntax/path checks: see `PHASE1_2_QA_RESULTS.json`.
- Browser automation: **NOT TESTED** because this execution environment blocked local browser navigation.
- Runtime checks of the 151 external archive URLs, live GitHub Pages after repair and physical Android Chrome: **NOT TESTED**.
- No remote branch, commit, PR or Pages deployment was changed by this task.
