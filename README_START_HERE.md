# Start here — V2 Phase 2+3 Combined Repair

This bundle is the concrete follow-up to the Phase 1 audit for `bhanu13yadav1-ai/Brand-website-v2`. It addresses why previous additions did not appear: the root HTML had not loaded the Part C enhancement files and its image paths did not match the files.

## What this fixes
- Connects `part-c-enhancements.css` and `part-c-enhancements.js` in `index.html`.
- Bundles the five boyfriend/Threesome reference images, two wheel posters, the red-lace campaign and seven Sanskari image variants under the exact `assets/` paths used by the app.
- Turns the four wheel overlays into labelled eight-segment wheels with one result/sector index, a real centre Spin button, repeat-spin correction, reset handling and reduced-motion support. The conic-gradient orientation is aligned with segment labels.
- Fixes a real narrow-phone overflow: a 220px minimum hero height combined with a 16:11 ratio could force a 320px-wide media card on a 320px screen. The mobile card now uses a fixed responsive height with an auto aspect ratio.
- Updates the service-worker cache and PWA manifest, and adds a diagnostics button that can check the entire existing 151-record external image archive in batches.

## Preserved
The core `app.js`, `styles.css`, `fallback.js` and `innerwear-image-library.json` are not replaced. Original views, catalogue and data handling remain the core app.

## Read first
Open `README_PHASE23_UPLOAD_HINGLISH.md`, make a backup, then upload the contents of this folder to the repository root. Use `phase23-diagnostics.html` after deployment.

## Test boundaries
Static validation: 11/11 PASS. Local Chromium fixture suite: 35/35 PASS. This is not a live GitHub Pages test or physical Android test. The 151-record library is still externally hosted; use the archive URL check to identify failures after upload.
