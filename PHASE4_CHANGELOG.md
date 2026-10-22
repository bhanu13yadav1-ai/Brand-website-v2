# Phase 4 Changelog

Base repository: `bhanu13yadav1-ai/Brand-website-v2`
Base branch: `main`
Base commit: `7c3b008f3da6511a3437839d9d42c343d2e35bfc`

## Delivered in this package
- Adds four connected, branching original fictional Hinglish stories with tone-specific copies.
- Adds Clean Hinglish / Desi Casual / Bold Hinglish + Gaali controls; tone stays in memory and affects the new story universe only.
- Replaces the obsolete Phase 3 story roadmap banner at runtime with the active “More Dirty for Horny Girls” experience label.
- Adds six preference-card groups near the top of Boyfriend & Couples: height, complexion/appearance, build, style, personality and optional fictional body-size trope.
- Keeps race/complexion and body-size independent; no anatomy prediction from photos.
- Adds a related-story link after completed results for boy/dildo/plug/wild wheel outcomes, using the current wheel handler's result host.
- Adds hosted diagnostics and review patches for `index.html` and `sw.js`.
- Bumps the service-worker cache name and adds the new data/module/style/diagnostics files plus the existing linked Phase 2 photo-collection module to precache.

## Deliberately untouched
- Original `app.js`, its 13 starter stories, existing story vault/storage keys, product catalogue, wishlist/bag, Fit Studio, the four existing wheel algorithms and original photos.
- No new image assets in this phase, so the ZIP does not duplicate earlier photo batches.
- No payment, checkout, seller inventory or live deployment changes.

## Validation boundaries
Static JSON/graph/tone/math checks are run by `tests/phase4-static-validate.mjs`. `tests/phase4-repo-check.mjs` checks the current repo anchors before integration. Browser, live hosting, PWA update and physical Android testing are **NOT TESTED** until the patch is deployed to a review URL and `phase4-diagnostics.html` is run there.
