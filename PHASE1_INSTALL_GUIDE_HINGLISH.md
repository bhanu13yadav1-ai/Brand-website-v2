# BLACKED V4 Phase 1 — Upload Guide (Hinglish)

## Package rule
This is a **delta ZIP**: it intentionally does not duplicate existing repository images or unchanged app files. It includes new Phase 1 code/diagnostics, planning records, and a one-line integration patch.

## Files to copy to the existing repository root
Upload these new files to the root of `bhanu13yadav1-ai/Brand-website-v2`:
- `phase1-foundation.js`
- `phase1-live-diagnostics.html`
- `BLACKED_V4_MASTER_PLAN.md`
- `BLACKED_V4_Horny_Bold_Complete_Feature_Ideas_2026-10-23.md`
- `BLACKED_V4_HANDOFF_NOTE.txt`

Do not upload the `.patch`, `.csv` or `PHASE1_TEST_REPORT.md` as if they were executable site files; they are integration/evidence documents and can also be kept in the repository for tracking.

## One required integration line
The new JavaScript has to be loaded from the current site; uploading a `.js` file alone does not make a static website execute it.

1. Open the existing repository's `index.html` on GitHub and choose Edit.
2. Find the last existing script near the top of the file:
   `<script src="./phase7-8-enhancements.js" defer></script>`
3. Directly below it, add this line:
   `<script src="./phase1-foundation.js?v=4.1.0" defer></script>`
4. Do **not** replace `index.html`, `app.js`, `styles.css`, `sw.js`, image libraries, stories or existing module files with this delta package. Do not delete existing files/images.
5. Commit the new files + the one-line `index.html` insertion. Wait for the GitHub Pages workflow to finish successfully.

The same integration insertion is recorded in `PHASE1_INDEX_INSERT.patch`. If your local checkout is available, apply the patch there; in GitHub's web editor, add the exact line manually.

## Run the live smoke test
Open:
`https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase1-live-diagnostics.html`

Press **Run live checks** and download the JSON report. Share the report or screenshots before Phase 2. A warning is not automatically a failure, but every warning must be reviewed. If the foundation module is not detected, check that the script tag is in `index.html` and that `phase1-foundation.js` is at the repository root.

## What Phase 1 adds
- Low-risk mobile touch-target/focus/reduced-motion usability improvements, preserving the existing color/visual identity.
- Accessible mobile-menu state labels and Escape-to-close behavior while leaving existing navigation as the owner of view changes.
- Safe one-time recovery when a same-origin image URL under `/assets/` fails but the asset may be at repository root.
- Runtime diagnostics for seven views, navigation links, wheel control presence, duplicate IDs, image loading, service-worker state and overflow.
- A same-origin iframe smoke test which opens Innerwear then returns to Home; it does not clear localStorage/sessionStorage or enter adult-gated views.

## Honesty / limits
- This package does not contain images and intentionally does not copy existing unchanged repository files.
- Phase 1 foundation code is not active until the one-line script tag has been added to the existing `index.html`.
- The diagnostic is not a complete security audit, screen-reader certification, performance benchmark or real-device substitute. Android Chrome tests must still be performed.
- No existing repository files were removed or pushed by this package. The GitHub connector write attempt returned 403, so the owner must upload/commit the delta.
