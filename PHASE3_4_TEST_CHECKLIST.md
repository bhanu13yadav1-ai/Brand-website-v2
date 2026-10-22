# Phase 3–4 verification checklist

## Automated/static checks (included in JSON report)
- JavaScript syntax for Phase 1–2 photo layer and Phase 4 preference router.
- CSS curly-brace balance.
- All referenced Phase 1–4 image assets exist and decode as WebP.
- Three new Phase 3–4 photos are unique and represented once each in the intended collection mapping.
- The two multi-adult new photos map only to the existing 18+ gated group gallery; the pink solo campaign maps to Innerwear.
- CSS / JavaScript / diagnostics files exist; manifest checksums/byte sizes recorded.

## Live checks still required
- Run `phase34-diagnostics.html` after integrating and deploying.
- Test 320 / 360 / 390 / 430 CSS-pixel widths, in portrait, on Android Chrome.
- Verify existing nav and all seven views; no duplicate sections after back/forward navigation.
- Open/close campaign preview, Escape behavior and focus return.
- Test the fantasy selector for all six routes, selected size tag and reset/change actions.
- Confirm every new multi-adult photo is within the existing hidden `#v23ThreesomeProtected` gate and none is visible in Home, Innerwear or other ungated sections.
- Test all four wheels, story filters/bookmarks, form validation, wishlist, sample bag, Fit Studio notes, privacy/data controls and cache refresh.
- Record any pre-existing source-image failures separately from the new local assets.
