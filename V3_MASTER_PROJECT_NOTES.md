# BLACKED Website — V3 Master Project Notes / Source of Truth

Last updated: 22 October 2026  
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

## Current phase status

- Phase 1: **Audit report prepared**. Source read and existing Phase 4 test reports inspected. Remote branch creation was attempted but blocked by GitHub connector HTTP 403. No remote commit was made.
- Phase 2: **Photo audit and additive gallery overlay prepared locally**. Eight new photos selected and optimized; exact duplicate pair excluded; Noor/Grace/innerwear/gated-group placements prepared. Remote deploy is pending repository write access or manual upload.
- Phases 3–15: pending. Do not claim they are complete.

## Phase 1–2 package files

- `notes/PHASE1_BASELINE_AUDIT.md`
- `notes/PHASE2_IMAGE_AUDIT.md`
- `notes/PHASE2_IMAGE_MANIFEST.csv`
- `phase2-photo-collections.js`
- `phase2-photo-collections.css`
- `PHASE2_UPLOAD_INSTRUCTIONS_HINGLISH.md`

## Resume instruction for the next session

Read this note and the Phase 1/2 reports first. Start by reconnecting GitHub with write/ref permissions or upload the Phase 1–2 overlay. Do not restart planning from scratch, do not push unverified changes to `main`, and do not proceed to Phase 3 until the new image paths/gallery test on the actual hosted site passes. After upload, run `phase2-diagnostics.html`; then run the existing `phase23-diagnostics.html` and `phase4-diagnostics.html` for regression evidence. Verify on Android Chrome at 320–430 CSS-pixel widths and after a clean service-worker/cache refresh.
