# BLACKED Website — V3 Master Project Notes / Source of Truth

Last updated: 22 October 2026 · Phase 5–6 package preparation  
Repository: https://github.com/bhanu13yadav1-ai/Brand-website-v2  
Live site: https://bhanu13yadav1-ai.github.io/Brand-website-v2/

## User's governing priorities

- Upgrade the **existing website**, not replace it with an unrelated starter template.
- Treat the user’s existing 14-rule “MASTER PROMPT — NEXT MAJOR WEBSITE VERSION” as governing source of truth. Maintain the explicit project requirement to audit before changes and write phase handoff notes so work can resume.
- Do not silently delete existing sections, images, working functions, stored settings, saved stories, or original wheel positions.
- Diagnose image load failures at source/path/network/cache root cause; avoid hiding broken photos behind a generic placeholder and declaring them fixed.
- Identify and retest the three original wheels individually, plus the separate Dirty/Wild wheel.
- Keep adult content behind clear 18+ self-attestation and keep prompts voluntary, respectful and consent-forward. A checkbox is not formal age verification.
- Research wellness/body education responsibly. Do not invent medical claims, infer a real model's identity/religion, or imply image references mean actual stock or product dimensions.
- Mobile-first Android layout: clean premium presentation, no cramped desktop grid, readable body text, clear touch targets, accessible focus and reduced-motion support.
- Use additive changes first. Do not wholesale replace `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json` or `size-chart-template.json` without an evidence-based migration plan and validation.
- Every phase must end with: changed files, behaviour verified, bugs found, remaining risks, test results, and copy-paste handoff note.

## Existing source baseline (confirmed in Phase 1)

Seven existing views: Home, Sex Stories 18+, Innerwear, Sanskari Edit, Wellness 18+, Boyfriend & Couples, and Fit Studio. The site has a larger remote image archive, a local campaign-image layer, story filters/bookmarks/progress, measurement and sizing education, a sample bag/wishlist, Fit Studio notes, four total interactive wheels (three original locations plus Dirty/Wild), an 18+ gated multi-adult collection, and PWA/service-worker support. Refer to `PHASE1_BASELINE_AUDIT.md` for details and current test limitations.

## Phase roadmap (15 phases)

1. **Baseline audit & backup** — inventory files and routes, note all working behaviours, identify storage keys and original wheel locations; establish a safe working branch/copy.
2. **Image/source audit** — inspect all user images and archive URLs, detect duplicates/missing files, map categories, checksum assets, fix root causes and preserve source history.
3. **Design tokens & architecture** — set spacing, typography, colour/contrast, component consistency and additive boundaries.
4. **Home & navigation** — make the main entry page less congested and make all seven views discoverable.
5. **Innerwear catalogue** — search/filters, cards, quick view, compare, wishlist and sample bag.
6. **Image archive/galleries** — central manifest, reliable loading state, responsive sizes, deduplication, alt text and previews.
7. **Sanskari / Noor / Grace** — keep original campaigns; respectful Noor/Grace previews; publish only owner-approved and accurately described imagery.
8. **Stories** — mood and language filters, series/chapters, reader controls, opt-in bookmarks and progress.
9. **After Dark experiences** — separate mood/intensity options, voluntary prompts, skip/reroll and consent-first wording.
10. **Women's wellness education** — evidence-led anatomy, lubrication vs discharge vs squirting, normal variations, warning signs and credible sources.
11. **Measurements & Fit Studio** — correct units, non-misleading measurement summaries, fit cues and privacy-preserving notes.
12. **Wheel system** — preserve and separately test each original wheel position plus Dirty/Wild; validate sectors, pointer, results, resets and mobile readability.
13. **Boyfriend/Couples/18+ gallery** — date tools, messages, reference gallery, gated adult section, boundary and opt-out controls.
14. **Privacy/security/accessibility/PWA** — safe migration, explicit local-save choice, storage clear controls, keyboard/focus, cache version and offline behaviour.
15. **Full regression/deployment** — static checks, live host checks, Android layout, all images, all seven views, all four wheels, modals, filters, forms, saved data and post-cache-refresh verification.

## Current phase status (latest source of truth)

- Phase 1: **Baseline audit prepared locally**. Source files, seven views, storage keys, original wheel locations and existing Phase 4 reports were inspected. GitHub safe-branch creation returned HTTP 403; no remote commit was made.
- Phase 2: **Image/source audit and additive gallery layer prepared locally**. Image paths, source references and selected uploads were mapped; a near-duplicate pair remains documented so duplicates do not get displayed twice.
- Phase 3: **Design-system CSS exists on GitHub main but is not linked by `index.html`**. This was the concrete reason the visual overlay was not visible on the live site.
- Phase 4: **Home shortcuts and fictional preference-router JS exists on GitHub main but is not linked by `index.html`**. The actual main `index.html` currently loads only `fallback.js`, `app.js` and `part-c-enhancements.js`.
- Image path check: all **11 local WebP assets referenced by Phase 1–4 overlay code** were missing (GitHub API returned 404). The new Phase 5–6 delta restores those missing files; it does not re-copy the existing JS/CSS files.
- Phase 5: **Prepared locally** — one-line loader patch restores correct old-overlay load order, image failure recovery controls, asset checksum manifest and deployed diagnostic page for both local images and the 151-record external archive.
- Phase 6: **Prepared locally** — a redesigned Boyfriend Studio with six selectable fictional archetype cards, local-only preference flow, optional educational size-reference filter, and seven new group images within the existing second 18+ gate. Existing couple tools and wheels remain in the base code.
- The Phase 5–6 delta contains **27 WebP assets**: 11 missing images referenced by earlier overlay files, plus 16 outputs derived from the current 10 uploaded photos (the Choose Your Match board is used to create six clean archetype portrait crops).
- Phases 1–6 are **prepared locally but not verified on deployed GitHub Pages**. The previous Phase 3–4 code had not been wired into `index.html`, so it had no visible effect. The new bootstrap adds the single required script line; after upload, run the deployed diagnostics.
- Phases 7–15 remain pending.

## Phase 5–6 delta files

The delta package is `BLACKED_V3_PHASE5_6_CHANGED_FILES/` and its ZIP. It deliberately does **not** include full copies of unchanged `app.js`, `styles.css`, `fallback.js`, `index.html`, `sw.js`, `phase2-photo-collections.js`, `phase2-photo-collections.css`, `phase3-design-system.css`, or `phase4-home-and-fantasy.js`.

- `phase5-6-loader.js` — dynamic, versioned importer for the old phase overlays in the correct order.
- `phase5-image-reliability.js` / `.css` — original-source retry/open controls for image failures recorded by the existing fallback.
- `phase6-boyfriend-studio.js` / `.css` — six-card fictional match UI and the existing gated gallery additions.
- `phase5-6-asset-manifest.json` — exact local assets, byte sizes and SHA-256.
- `phase5-6-diagnostics.html` — deployed checks for integration, local assets and remote archive URLs.
- `INDEX_INSERT_PHASE56.patch` — single changed line required in `index.html`; without that line the loader is never executed.
- `PHASE5_6_UPLOAD_INSTRUCTIONS_HINGLISH.md`, `PHASE5_6_CHANGELOG.md`, `PHASE5_6_HANDOFF.txt`, `phase6-boyfriend-preview.html` and the photo preview.
- 27 required WebP assets: 11 absent from GitHub main but already referenced by old JS, and 16 new outputs from the recent user uploads/crops.

## Resume instruction for next session

Read this master note and `PHASE5_6_HANDOFF.txt`. The delta package is not deployed. GitHub safe-branch creation returned 403, so use a safe write path or manual merge rather than overwrite `main` blindly. Upload the ZIP contents into the repo root, then add the one line in `INDEX_INSERT_PHASE56.patch` beneath the existing `part-c-enhancements.js` script. The loader restores the previous Phase 2–4 overlays and loads the new Phase 5–6 modules in sequence.

Run `phase5-6-diagnostics.html`: first integration, then local bundle images, then the 151-record remote image archive. Report exact failed paths rather than assuming all external archive failures have the same cause. Review Boyfriend Studio on Android Chrome at 320, 360, 390 and 430 CSS px; test all seven original views, all four wheels, age gates, gallery filters, story tools, wishlist/bag, Fit Studio and storage preservation. Do not claim a live fix until the deployed diagnostics pass.
