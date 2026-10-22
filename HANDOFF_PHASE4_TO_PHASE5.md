# Handoff: Phase 4 → Phase 5

## Project and base
- Repository: `bhanu13yadav1-ai/Brand-website-v2`
- Base branch: `main`
- Base head observed at start: `7c3b008f3da6511a3437839d9d42c343d2e35bfc`
- Current package does not include or replace core website files.

## Phase 4 scope
1. Four wheel reliability remains handled by existing `part-c-enhancements.js`, which contains sector labels, matching index calculation and alignment diagnostics.
2. Add a CTA linking each completed wheel result to a related new story.
3. Add four new connected adult-fiction stories with Clean Hinglish / Desi Casual / Bold Hinglish + Gaali variants, choices, alternate endings and cross-story links.
4. Add Boyfriend/Couples preferences for height, complexion/appearance, build, style, personality, and optional fictional penis-size trope.
5. Keep choices and tone in memory only. Do not infer anatomy from photos or link anatomy preferences to ethnicity/skin tone.
6. Add the Phase 4 diagnostics page and versioned service-worker precache patch.

## New files
- `phase4-story-universe.js`
- `phase4-story-universe.css`
- `phase4-story-universe.json`
- `phase4-diagnostics.html`
- `tests/phase4-static-validate.mjs`
- `tests/phase4-repo-check.mjs`
- `patches/INDEX_PHASE4_INSERT.patch`
- `patches/SW_CACHE_PHASE4.patch`
- docs / tracker

## Critical steps before closure
- Verify current `index.html` and `sw.js` still match the base SHA in the changelog; rebase the patches if not.
- Apply the two patches only on a review branch.
- Run static validation scripts.
- Upload new runtime files to the same directory as `index.html`.
- Run `phase4-diagnostics.html`; confirm 8 sectors per wheel, aligned final result and story CTA for all four wheels.
- Manually test: 3 tone settings, branch changes, story-to-story links, close/Escape, preference choose/create/edit/skip/clear, no persistence after refresh, all original story filters/vault, catalog/wishlist/demo bag/Fit Studio and existing age gate.
- Test Android Chrome and service-worker update after deploy. Until this is done, Phase 4 is package-ready but not accepted as live.

## Phase 5 should not start until
- Phase 4 runtime diagnostics are clean on a review deployment.
- Wheel regression and core-screen regression are checked.
- Phase 5 next scope remains product catalogue truth/sales-path decision and evidence-based wellness/size guide; no live payments until host/provider approval.
