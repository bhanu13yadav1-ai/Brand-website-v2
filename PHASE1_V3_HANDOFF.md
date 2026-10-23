# Phase 1 → Phase 2 Handoff (copy/paste)

Project: BLACKED / Brand-website-v2  
Current source branch: `main`  
Current inspected HEAD: `966707852219bda9dcbf312cdbd3065439981f09`  
Phase 1 status: `SOURCE AUDIT COMPLETE; LIVE/PERFORMANCE BASELINE PARTIAL`  
Website code/image changes in Phase 1: `NONE`  
New audit files: listed in `PHASE1_V3_CHANGED_FILES.md`

## Phase 2 priorities

1. Create a fresh backup from the current `main` branch and compare HEAD again before editing. Do not use the older `530b6d...` review archive as the source of truth.
2. Fix the four service-worker SVG paths. Actual assets are at repository root, so remove the incorrect `assets/` path in `sw.js` CORE entries; bump the cache version only with a validated list.
3. Map the four exact duplicate image pairs to all HTML/JS/CSS/JSON references; preserve both files until proven safe to deduplicate.
4. Trace the four large PNGs through all actual references and measure which ones load on the home view. Optimize only after reference/visual review; do not delete campaign assets in a performance pass without proof.
5. Record an actual baseline with a browser network waterfall / Lighthouse on the live deployment, then change one loading issue at a time and compare repeat visits. Do not invent before/after timings in lieu of a browser run.
6. Keep all existing features/data and all seven views. Performance work is additive and must not remove stories, images, wheels, catalogue, wishlist, comparison, demo bag, wellness, Fit Studio, privacy controls, or PWA support.
7. After performance repairs, test the current original three wheels and Dirty/Wild wheel separately before implementing the new Super Horny wheel and custom fantasy flow.

## Release conditions

- Run static JS/JSON/reference checks on the exact current checkout.
- Confirm all required CORE paths exist.
- Test fresh install, update, repeat visit and offline behaviour.
- Test on Android Chrome at 320–390 px wide and capture console/network errors.
- Deliver a complete current-source ZIP plus a separate changed-files/assets ZIP; list every changed and new file/image and mark PASS/FAIL/NOT TESTED honestly.
