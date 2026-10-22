# HANDOFF — Phase 2 to Phase 3

## Current status
Phase 2 connected-architecture patch ZIP is prepared for review. It has not been pushed to GitHub and is not deployed. Phase 1 live/Android and hosting/content/rights gates remain open; Phase 2 static deliverables do not close them.

## Source baseline
- Repo: `bhanu13yadav1-ai/Brand-website-v2`
- Branch: `main`
- Captured HEAD: `530b6d2339e68f0ae3bd78a01ec36981d570576b`
- `index.html` blob SHA: `007b8e7d59486b5ba93c6534aa9dcc91066d040b`
- `app.js` blob SHA: `245d9c4dc32a4f27e5d05eef646d97bcf8b0177a`
- `sw.js` blob SHA: `675093dcd5bb4d9975c40dd07d65a5cac9018ee4`

## Phase 2 outputs
- Single-source graph: `phase2-content-graph.json`
- Schema: `architecture/phase2-content-graph.schema.json`
- Tokens: `architecture/mobile-design-tokens.json`
- New additive gallery/navigation/dialog: `phase2-experience-architecture.js/.css`
- Eight new WebP assets in `phase2-assets/`
- Small index/service-worker patch files; no full existing app files
- Validator: `tools/validate_phase2.py`
- New asset manifest and static test report

## Exact next action
1. Fetch current `main` HEAD again. If it is not the captured SHA, diff the changes before applying patches.
2. Verify file blob hashes before applying the two patches. Use a separate review branch/repository (never overwrite `main` unreviewed).
3. Run `python tools/validate_phase2.py --root .` and `node --check phase2-experience-architecture.js`.
4. Test all seven existing views, cross-navigation including age self-attestation, eight media load/fallback cases, lightbox keyboard/focus, all existing wheels, story filters/choices/vault, catalogue/wishlist/compare/demo bag, service-worker online/offline upgrade, and sizes 320/360/390/430/768/1024/1440.
5. Check current live site and physical Android Chrome. Document each result as PASS/FAIL/BLOCKED/NOT TESTED.
6. Only move to Phase 3 once the phase gate is approved and brand / image rights / host policy restrictions are known.

## Preserve / do not do
- Do not re-add `1000202897.png` and `1000202895.png`; they are already staged in Phase 1.
- Do not copy existing site files or all 151 existing asset records into a ZIP.
- Do not merge BLACKED, BLXCKED, CLAM COOLER 3000 and INNERWERE identities automatically.
- Do not create a real product SKU, price, inventory entry, health claim or checkout from the campaign images.
- Do not change existing story/product IDs or browser-storage keys.
