# Phase 6 upload guide (Hinglish)

Target: `bhanu13yadav1-ai/Brand-website-v2`, branch `main`.

1. Back up the current repo first (Download ZIP or use GitHub branch).
2. Extract this package and upload the **contents** of `V1_PHASE6_UPLOAD_PACKAGE` into the repository root. Do not upload the ZIP as a single file.
3. Replace the existing root files included here: `index.html`, `app.js`, `styles.css`, `fallback.js`, `sw.js`, `manifest.webmanifest`, `innerwear-image-library.json`, `README.md`, `INNERWEAR_IMAGE_LIBRARY_MANIFEST.csv`, `size-chart-template.json`, and the diagnostics/report files.
4. Do not delete any other user-owned files that are not listed in the package.
5. Commit once with message: `V1 Phase 6: harden privacy accessibility performance and storage`.
6. Wait for GitHub Pages to deploy, then open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase6-diagnostics.html`. First click Run quality checks. Next click Verify all image URLs (this issues external image requests and may take time on mobile data).
7. Check at least one phone browser manually. Local/automated checks do not equal live Android testing.

## Main changes
- The 151 image records remain in `innerwear-image-library.json`; `app.js` no longer duplicates the full manifest.
- Archive initially renders 24 cards and loads further batches, preserving all records while reducing initial DOM/image work.
- Source image URLs are validated against HTTPS + an allowlist of the three known public GitHub repositories.
- Added skip navigation, strong keyboard focus, 44px touch targets, reduced-motion fallback and keyboard modal focus handling.
- Added a Privacy & data controls modal with explicit confirmation before clearing only BLACKED-owned storage keys.
- Fit notes, wishlist, demo bag and opt-in measurements remain local-browser storage and are not encrypted/synced. No personal photo is uploaded by this front-end.
- Service-worker cache version changes so old Phase 4/5 caches are removed after update activation.

## Important limitations
The original images remain remote public-GitHub URL dependencies; this phase does not embed original binaries or guarantee every upstream URL loads. The actual source test must be run after deployment. No verified brand size chart, account backend, real checkout, payment, inventory or encrypted account store is configured.
