# BLACKED V3 · Phase 3–4 upload and check instructions

**Status: local package prepared; not deployed.** GitHub safe-branch creation returned HTTP 403 in the connected integration, so no remote commit was made. Phase 3–4 is layered on top of the prepared Phase 1–2 overlay. Verify Phase 1–2 first after uploading the combined package.

Repository: https://github.com/bhanu13yadav1-ai/Brand-website-v2
Live site: https://bhanu13yadav1-ai.github.io/Brand-website-v2/

## Files added or changed
- `phase3-design-system.css` — additive readability, spacing, responsive cards, full-image display, 320–430px mobile layout, target sizes and reduced motion.
- `phase4-home-and-fantasy.js` — three compact Home quick links and an interactive fictional adult fantasy-preference router.
- `phase2-photo-collections.js` — adds one pink editorial photo and two multi-adult reference photos to the existing phase 1–2 add-on; group photos remain inside the existing protected 18+ collection.
- `phase34-diagnostics.html` — same-origin smoke-check dashboard after deploy.
- `assets/innerwear-gallery-v3/soft-rose-evening-edit.webp`
- `assets/triad-gallery-v3/innerwere-campaign-trio-two.webp`
- `assets/triad-gallery-v3/innerwere-campaign-trio-three.webp`
- `notes/PHASE3_4_IMAGE_MANIFEST.csv`, `notes/PHASE3_DESIGN_AUDIT.md`, `notes/PHASE4_FEATURE_NOTES.md`, `tests/PHASE3_4_STATIC_CHECKS.json`, `tests/PHASE3_4_TEST_CHECKLIST.md`

## Additive upload
1. Extract the ZIP.
2. Merge its `assets/` folders into the existing repository `assets/` folder, keeping all previous assets.
3. Upload `phase2-photo-collections.js`, `phase2-photo-collections.css`, `phase3-design-system.css`, `phase4-home-and-fantasy.js` and `phase34-diagnostics.html` into the repository root.
4. Upload/merge the `notes/` and `tests/` files. Do not remove older phase reports.
5. Do not replace or delete core app files wholesale: `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, `size-chart-template.json`.

## index.html integration
In `<head>`, after `part-c-enhancements.css`, add both CSS lines in this order:

```html
<link rel="stylesheet" href="./phase2-photo-collections.css">
<link rel="stylesheet" href="./phase3-design-system.css">
```

In the deferred script group, after `part-c-enhancements.js`, add these scripts in this order:

```html
<script src="./phase2-photo-collections.js" defer></script>
<script src="./phase4-home-and-fantasy.js" defer></script>
```

The order matters: original app → existing Phase 4 integration → Phase 1–2 photos → Phase 3/4 overlay.

## sw.js cache update
Use a fresh version label, for example:

```js
const CACHE_NAME = 'blacked-v3-phase4-overlay-1';
```

Add to the existing `CORE` array (without removing the old entries):

```js
'./phase2-photo-collections.js','./phase2-photo-collections.css',
'./phase3-design-system.css','./phase4-home-and-fantasy.js','./phase34-diagnostics.html',
'./assets/innerwear-gallery-v3/soft-rose-evening-edit.webp',
'./assets/triad-gallery-v3/innerwere-campaign-trio-two.webp',
'./assets/triad-gallery-v3/innerwere-campaign-trio-three.webp',
```

## What the new fantasy feature does
- Lets an adult visitor choose a fictional archetype/mood, an optional size-reference label, and a safe route.
- Romantic/flirty/dark fiction leads to existing stories or couple prompts.
- Three-person and multi-partner fantasy leads to the existing protected 18+ collection; it does not bypass the gate.
- Anal-play selection links to the existing non-graphic body/toy-safety guide.
- Size labels are clearly labelled fictional/educational only, not real-person measurements, medical advice, or guarantees.
- It is not a marketplace: the site does not sell/book people, verify real profiles, or offer real inventory/checkout.
- Answers are not persisted or sent by the feature.

## Deploy tests
1. Open `./phase34-diagnostics.html` and run Phase 3–4 checks.
2. Test Android Chrome at 320, 360, 390 and 430 CSS-pixel widths.
3. Check Home quicklinks, all seven original views, Noor images, three Innerwear editorial images, and all three protected multi-adult image cards.
4. Ensure new multi-adult campaign photos appear only under `#v23ThreesomeProtected` after the existing self-attestation step.
5. Test the size selector, each fantasy result, all four wheels, story filters, measurement form, wishlist, sample bag, Fit Studio, privacy actions and Escape/keyboard navigation.
6. Test after a hard refresh / service-worker update. If any existing feature regresses, revert the overlay assets/scripts before modifying core files.

## Honest verification boundary
Static tests in the package cover JavaScript syntax, CSS structure, local image files, image gate mapping and expected feature records. They cannot establish that GitHub Pages has been updated or that every Android interaction works. Mark live QA complete only after the deployed checks pass.
