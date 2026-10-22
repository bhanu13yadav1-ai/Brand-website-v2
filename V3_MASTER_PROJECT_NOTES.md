# BLACKED Website — V3 Master Project Notes / Source of Truth

Last updated: 22 October 2026 · Phase 12–15 final overlay prepared
Target repository: https://github.com/bhanu13yadav1-ai/Brand-website-v2
Live site: https://bhanu13yadav1-ai.github.io/Brand-website-v2/

## Governing rules
- Improve the real existing repository; do not replace it with an unrelated template.
- Preserve all existing functions, views, story data, saved data, images and three original wheel locations.
- The 4th Dirty/Wild wheel stays a separate tool. A wheel result is optional and never proves consent, desire, anatomy or compatibility.
- Mobile-first Android layout; readable type, no cramped card rows, visible keyboard focus, touch targets around 44px, reduced-motion support.
- Do not infer a real person’s identity/religion/body measurements from photos. Images are editorial/reference art, not proof of stock, SKU or price.
- Wellness/body guidance is general education, linked to reliable sources, not diagnosis. Distinguish everyday discharge, arousal lubrication and orgasm-associated fluid; do not portray wetness as proof of desire/consent.
- No actual person marketplace, companion booking, real inventory, or checkout should be implied by fictional character cards.
- Never clear `localStorage`, user preferences, saved stories, wishlist, sample bag or fit notes as an update side effect.
- Phase handoffs must record exact files, checks, known limitations and the next safe step.

## Current site architecture observed
Main source files include `index.html`, `app.js`, `styles.css`, `fallback.js`, `part-c-enhancements.js`, `sw.js`, `innerwear-image-library.json`, `size-chart-template.json`, and multiple previous phase modules/assets.
The `index.html` base page contains Home, Stories 18+, Innerwear, Sanskari, Wellness 18+, Boyfriend & Couples and Fit Studio views. The app already has measurement worksheet, fit cues, external image library, story filters/bookmarks/progress, demo wishlist/bag, privacy modal and four wheel discs: `boy`, `dildo`, `plug`, `wild`.
Repository image files are stored at the root in the audited checkout, while many older add-on and `sw.js` paths used `./assets/<subfolder>/<file>`. That mismatch must be fixed/normalized before trusting image or PWA behavior.

## V3 Phase roadmap and state
- Phase 1: baseline audit and backup notes. Historical reports exist; run live tests after the final overlay merge.
- Phase 2: photo collection overlays (Noor, Innerwear, Grace preview, multi-adult gallery). Existing JS has a runtime root-path repair in the final loader.
- Phase 3: design-system CSS and readable mobile layout.
- Phase 4: Home links and fictional preference router.
- Phase 5: image-reliability module and diagnostics.
- Phase 6: redesigned fictional Boyfriend Studio with no real-person marketplace.
- Phase 7: Noor/Sanskari/Grace collection hub.
- Phase 8: story quick filters, reading controls and optional saved progress.
- Phase 9: After Dark prompt studio; voluntary fictional prompts, skip/stop.
- Phase 10: Women's Wellness education with references and symptom-information boundaries.
- Phase 11: Fit Studio, worksheet and unit-safe conversions.
- Phase 12: new directory to the 3 original wheels + separate Wild Wheel.
- Phase 13: organized Couples Studio with filterable campaign reference cards.
- Phase 14: root-image path correction, visible errors, local JSON export (user-initiated only), focus/mobile/reduced-motion support and PWA cache repair.
- Phase 15: “What's New” panel at the very top of Home plus same-origin deployment diagnostics.

## Final overlay files
`phase9-after-dark.js/css`, `phase10-wellness-education.js/css`, `phase11-fit-studio.js/css`, `phase12-wheels-hub.js/css`, `phase13-couples-studio.js/css`, `phase14-hardening.js/css`, `phase15-whats-new.js/css`, `phase12-15-final-loader.js`, `phase12-15-diagnostics.html`, `apply_final_release_patches.py`, tests, changelog, file manifest and install guide.
Phase 2–8 modules and images are reused from the target repo and deliberately are not duplicated in the final overlay ZIP.

## Integration contract
Run `python apply_final_release_patches.py /path/to/repo` only after all overlay files are merged into the repository root. It modifies only `index.html` and `sw.js`. Review the resulting diff before commit. It inserts a single final loader line, updates V3 title/description, advances service-worker cache name, corrects only nested asset paths whose root basename exists, and adds overlay file paths to the existing CORE list. It must preserve old valid entries and must not clear any client data.

## Verification requirement
Static checks and the synthetic Playwright mock-DOM smoke test do not prove that GitHub Pages is live. The mock exercised After Dark generation, wheel routing, Couples Studio filtering and measurement conversion without JavaScript/page errors; image loading and service-worker status remain unverified because the fixture is `about:blank`. After deployment use `phase12-15-diagnostics.html`, verify loader status and all 4 wheels, 7 views, 6 Couples Studio cards, story filters, Fit Studio/Wellness cards, current broken image count and service-worker controller. Manually test on Android Chrome.

## GitHub status / honesty
GitHub App write operations returned HTTP 403 for branch and file-write endpoints during earlier sessions. Therefore do not claim an automatic commit or deployment. This package is a merge-ready local overlay until its commit SHA and live diagnostic results can be verified.
