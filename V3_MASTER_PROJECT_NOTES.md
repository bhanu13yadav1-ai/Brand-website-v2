# BLACKED Website — V3 Master Project Notes / Source of Truth

Last updated: 22 October 2026 · Phase 3–4 package preparation  
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
- Phase 2: **Image/source audit and additive gallery layer prepared locally**. The first eight selected images remain documented; one near-duplicate pair was withheld from duplicate display.
- Phase 3: **Design-system and mobile readability overlay prepared locally** in `phase3-design-system.css`. This tunes spacing, readable text, target sizes, full-image framing and small-screen reflow without replacing `styles.css`.
- Phase 4: **Home shortcuts and fictional preference-router overlay prepared locally** in `phase4-home-and-fantasy.js`. Three compact links point to existing views. A fictional adult archetype selector supports romance, flirty/dark fiction, non-graphic multi-partner fantasy/boundaries and wellness/toy-safety guidance. Size labels are clearly fictional/educational; it does not sell/book people, claim real measurements, or bypass the current 18+ gate.
- Current overlay contains **11 unique local collection assets** (eight from original Phase 2 plus three newly supplied Phase 3–4 photos). The new solo pink photo goes to Innerwear; two new multi-adult campaign photos are held inside the existing `#v23ThreesomeProtected` gated gallery.
- Phases 1–4 are **prepared locally but not deployed**. Static package validation: **15/15 checks passed**. That does not imply that live GitHub Pages or Android browser testing passed.
- Phases 5–15 remain pending. Begin them after the overlay is uploaded and Phase 1–4 regressions pass on the deployed site.

## Current package files

- `phase2-photo-collections.js` / `phase2-photo-collections.css` — original V3 photo overlay, now including Phase 3–4 photo additions.
- `phase3-design-system.css` — additive responsive design layer.
- `phase4-home-and-fantasy.js` — Home links and adult preference router.
- `phase34-diagnostics.html` — hosted same-origin diagnostics page.
- `notes/PHASE1_BASELINE_AUDIT.md`, `notes/PHASE2_IMAGE_AUDIT.md`, `notes/PHASE3_DESIGN_AUDIT.md`, `notes/PHASE4_FEATURE_NOTES.md`.
- `notes/PHASE2_IMAGE_MANIFEST.csv` and `notes/PHASE3_4_IMAGE_MANIFEST.csv`.
- `PHASE3_4_UPLOAD_INSTRUCTIONS_HINGLISH.md`, `PHASE3_4_HANDOFF.txt`, `tests/PHASE3_4_STATIC_CHECKS.json` and test checklist.

## Resume instruction for next session

Read this master note and `PHASE3_4_HANDOFF.txt`. The combined local package is not deployed. First restore GitHub write/ref permission or upload the overlay to a safe branch/manually; do not push unverified files directly to `main`. Follow `PHASE3_4_UPLOAD_INSTRUCTIONS_HINGLISH.md` to merge assets, add the CSS/deferred JS links and bump `sw.js` cache entries. Run `phase2-diagnostics.html`, `phase34-diagnostics.html`, `phase23-diagnostics.html` and `phase4-diagnostics.html`, plus manual Android Chrome checks at 320, 360, 390 and 430 CSS px. Test all seven views, four wheels, modal gates, saved data, image archive, story tools, wishlist/bag, Fit Studio and cache refresh. Keep all phase notes and report any pre-existing external-image failures separately from the new local assets.
