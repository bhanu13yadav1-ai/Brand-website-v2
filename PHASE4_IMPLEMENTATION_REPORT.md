# V2 Phase 4 — Wheels, Boyfriend & Collections

## Scope
- Keep the Phase 2+3 repair as the base.
- Add 10 locally bundled innerwear/editorial images with search and category filters.
- Add two new Couples Style Reference cards to the Boyfriend & Couples view.
- Expand the age-gated Threesome Fantasy section with four locally bundled multi-adult campaign images.
- Keep both supplied wheel posters in the home Wheel Hub; poster buttons open the related interactive Wild Wheel category.
- Version the service-worker cache and include new local assets.
- Add `phase4-diagnostics.html` to verify the rendered galleries, wheel sectors/results, and local image paths after deployment.

## Image review
- 19 uploaded image files were inspected; exact SHA-256 deduplication identified one duplicate (`1000201785(1).png` duplicates `1000201785.png`).
- 16 distinct new image assets are published in the UI: 10 innerwear/editorial cards, 2 couples cards, and 4 images inside the 18+ gated Threesome Fantasy collection.
- `1000201772.png` is held out because its campaign text depicts a sexualized sibling/family theme.
- `1000201775.png` is held out because children appear in family-photo frames alongside adult campaign imagery. It is not published in the adult gallery.
- Model religion, real identity, performer identity, and body/penis size are not inferred from supplied images.
- Images featuring religious styling are labelled as theatrical/editorial concepts and are not represented as official Muslim/Christian collections.

## Source changes
- `index.html`: version/title/footer text only.
- `part-c-enhancements.js`: new image galleries, local image status/error feedback, image filters, expanded diagnostics, Phase 4 boot sequence.
- `part-c-enhancements.css`: responsive campaign grids and accessible form/grid layout.
- `sw.js`: cache-version bump and local-asset precache additions.
- `manifest.webmanifest`: Phase 4 application label.
- `phase4-diagnostics.html`: new local assets and wheel tests.
- `assets/`: optimized locally bundled WebP variants for the images approved for display.

## QA status
- Static validation: 12 checks passed — JavaScript syntax, service-worker syntax, HTML parsing/unique IDs, manifest JSON, CSS brace balance, all 16 display assets existing, unique output paths, diagnostic-page parsing, held assets absent from runtime code, single-root ZIP structure and archive integrity. Evidence is in `PHASE4_STATIC_CHECKS.json`.
- Local Chromium functional tests: 34/34 passed. Evidence is in `PHASE4_QA_RESULTS.json`.
- NOT TESTED: live GitHub Pages after user upload, physical Android Chrome, and the old external 151-record archive URLs. Use `phase4-diagnostics.html` for new local image/wheel checks and `phase23-diagnostics.html` for the previous external archive test.

## Upload safety
This is a combined overlay/recovery package. Upload the folder contents into the `Brand-website-v2` repository root, preserving subfolders. Do not upload a nested parent folder. Do not delete `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, or `size-chart-template.json`.
