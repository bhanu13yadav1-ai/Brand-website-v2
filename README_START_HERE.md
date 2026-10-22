# BLACKED V3 Final Release Overlay — Phases 9–15

**Target repository:** `bhanu13yadav1-ai/Brand-website-v2`  
**Release:** `V3 Final · Phase 9–15`  
**This is an additive deployment overlay, not a copy of the full repository.** It reuses the existing app files, collections, story data, and bundled images.

## New features in this release

- **Phase 12 — Wheel Hub:** one directory for all three original wheel locations plus the separate Wild Wheel; existing wheel code/results remain the source of truth.
- **Phase 13 — Couples Studio:** organized campaign cards, filters and a large preview dialog using images already at the repository root. It does not sell or book real people.
- **Phase 14 — Privacy / reliability:** optional local-data JSON export, visible failure status for gallery images, root-path repair for assets incorrectly referenced under `./assets/`, reduced-motion support and clearer keyboard focus.
- **Phase 15 — What's New at the top:** seven quick feature cards on the first screen, plus same-origin live diagnostics.
- **Final loader:** loads the already-present Phase 2–8 overlays plus Phase 9–15 in a single ordered chain and reports exact failed file names.
- **PWA repair script:** changes the service-worker cache version and corrects root-level image paths inside `CORE` before adding the new files to the cache list.

## Install against the existing repo

1. Download and extract this ZIP.
2. Merge its files into the root of a fresh checkout of `Brand-website-v2`. Do not delete existing files or folders.
3. From the extracted folder run:

   ```bash
   python apply_final_release_patches.py /path/to/Brand-website-v2
   ```

   This idempotently patches only `index.html` and `sw.js`: one final-loader script tag, release title/meta, `CACHE_NAME`, the nested image paths whose basenames exist at repository root, and the additive list of overlay assets.
4. Review the git diff. Commit the overlay files and the two patched core files together. The helper never clears browser storage or removes old features.
5. Publish with the repo's existing GitHub Pages workflow.
6. Open `phase12-15-diagnostics.html` on the deployed site. Check all four wheels, the story grid, Fit Studio, Wellness, Couples Studio, loader file status and image failures.
7. On Android Chrome, test every navigation view, the adult self-attestation gates, a wheel spin, a story filter, a couple gallery filter and preview, the measurement unit switch, privacy export, and a fresh reload after the service worker updates.

### Manual integration if Python is not available

- Add `<script src="./phase12-15-final-loader.js?v=12.15.0" defer></script>` in `index.html` immediately after `part-c-enhancements.js`.
- In `sw.js`, rename `CACHE_NAME` to `blacked-v3-final-15-1`.
- Replace each `./assets/<folder>/<filename>` CORE path with `./<filename>` **only when that filename exists in the repository root**; this repo stores those images in the root.
- Add every file listed in `CORE_FILES` inside `apply_final_release_patches.py` to `CORE`, keeping all prior valid entries too.

## What is included / not included

This ZIP contains the new Phase 9–15 modules required by the final loader, the final release loader, diagnostics, a patching script, static and synthetic UI smoke-test reports, and handoff notes. It deliberately does not duplicate the site's existing images, `app.js`, `styles.css`, `fallback.js`, `index.html`, or `sw.js`.

## Honest verification status

- Static/patch verification: 26/26 checks passed, including JavaScript syntax, installer idempotence, loader ordering, cache-path repairs, data-preservation constraints and required source links. See `PHASE12_15_STATIC_CHECKS.md`.
- A synthetic Playwright DOM smoke test exercised the top-of-home highlights, After Dark prompt generation, wheel navigation, Couples Studio filtering, and CM↔inch conversion with no JavaScript/page errors. This was an inline mock fixture, not the deployed site. Image loading failed in that `about:blank` fixture (no same-origin bundled assets), and its service-worker/focus-styles diagnostics are not a live result. See `tests/SYNTHETIC_UI_SMOKE_TEST.json`.
- The live repository write API previously returned HTTP 403, so this package does **not** claim that a remote commit or GitHub Pages deployment has happened. Live Android/browser and image-path verification can only be confirmed after merge and publication; use the same-origin diagnostic page then.
