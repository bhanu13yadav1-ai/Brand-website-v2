# BLACKED V5 — Phase 2 Premium UI/UX + Existing Feature Repair

**Baseline:** `bhanu13yadav1-ai/Brand-website-v2` at commit `16b76469fb274f5a65d3cfa2bd3d34765639bef3`
**Prepared:** 24 October 2026
**Scope:** additive UI/UX refinements and safe improvements to existing interactions. This package does not add Phase 3 adult/wellness features or change product data.

## What Phase 2 adds

1. A refined dark-luxury visual layer using the existing BLACKED burgundy/rose/gold theme.
2. More usable mobile navigation: one clear hamburger entry point on phone rather than the existing horizontal navigation and menu competing for space. Desktop navigation remains unchanged.
3. Larger, more consistent touch controls, refined focus states, reduced-motion support, responsive filter forms and more consistent card treatments.
4. Additive `Reset story filters`, `Reset style filters`, `Reset image filters` and `Reset product filters` actions, only when their matching existing controls are present.
5. Better navigation semantics: label the mobile navigation, keep `aria-expanded` and `aria-current` in sync, announce view changes and move keyboard focus to the destination heading.
6. `window.BLACKED_V5_PHASE2_UX.getDiagnostics()` for lightweight in-page DOM diagnostics.
7. A fresh service-worker cache version plus explicit cache entries for the new CSS/JS assets.

## Safety and preservation

- The existing `app.js`, story data, original four wheel engines, saved-data keys, product records, image manifest and 7 base views are not rewritten.
- No local storage key is renamed, migrated, cleared or newly introduced by this UX module.
- Reset buttons only reset current filter/search controls to their documented defaults; they do not clear bookmarks, wishlist, bag, measurement notes or saved favourites.
- Existing hidden/visible view handling and adult access gates remain owned by `app.js`.
- Product concepts remain concept-only; no real product, vendor, price, SKU, material or safety verification is introduced.

## Install — recommended safe way

1. Download the exact baseline source ZIP from:
   `https://github.com/bhanu13yadav1-ai/Brand-website-v2/archive/16b76469fb274f5a65d3cfa2bd3d34765639bef3.zip`
2. Extract the archive. Put these two assets and the helper scripts in the repository root alongside `index.html` and `sw.js`:
   - `phase2-premium-ux.css`
   - `phase2-premium-ux.js`
   - `install_phase2.py`
   - `validate_phase2.py`
3. From the repository root, run:
   `python install_phase2.py`
   The script checks insertion markers before editing, saves `index.html` and `sw.js` backups *outside* the website root, adds both new module references and advances the service-worker cache version. It is idempotent for the module references.
4. Run:
   `node --check phase2-premium-ux.js`
   `python validate_phase2.py`
5. Inspect `git diff` or compare the original backup before committing. Deploy only after review.

## Install on GitHub from a phone (without Python)

1. Upload `phase2-premium-ux.css` and `phase2-premium-ux.js` to the repository root.
2. In `index.html`, add this directly after the existing Phase 17 stylesheet:
   `<link rel="stylesheet" href="./phase2-premium-ux.css">`
3. In `index.html`, add this directly after the existing Phase 17 script:
   `<script src="./phase2-premium-ux.js" defer></script>`
4. In `sw.js`, add `./phase2-premium-ux.css` to `CORE`, and add `./phase2-premium-ux.js` to `CORE`. Change the cache name to `blacked-v4-phase2-premium-ux-20261024-1`.
5. Commit those changes and wait for GitHub Pages to publish, then run the QA checklist below. Keep the current `main` commit available for rollback.

Do not upload the ZIP itself as the website's `index.html`. Upload/extract the two actual assets.

## Current limitations

- The GitHub connector denied branch creation in this session (HTTP 403), so this phase has **not** been committed to the live repository or deployed.
- Browser-based click/touch tests are not run from this environment. Static checks and syntax checks are not a substitute for actual Android Chrome testing.
- The original app's 18+ gate is self-attestation, not verified age assurance.
