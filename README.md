# BLACKED — V2 Phase 2+3 Repair

This repository contains a mobile-first innerwear concept catalogue, an educational Wellness & Size Guide, fictional adult stories, interactive conversation wheels and campaign reference collections. This is a front-end prototype: there is no verified stock inventory, checkout/payment backend, account system or booking system.

## What the V2 Phase 2+3 repair fixes

- Connects the Part C enhancement CSS/JavaScript to the actual `index.html`. Before this repair, those files existed but were not loaded, so new sections did not appear.
- Locally bundles the supplied boyfriend reference photos, wheel posters, red-lace campaign image and Sanskari campaign visuals at the exact `assets/` paths used by the page.
- Rebuilds all four wheel overlays with eight labelled sectors. The pointer, sector label and result now share the same selection index; the centre Spin button also uses the same wheel logic.
- Fixes a 320px mobile overflow caused by an intrinsic `aspect-ratio` combined with a minimum height on the home hero image.
- Updates the service-worker cache and PWA manifest, and adds a diagnostics page for the four wheels, locally bundled assets and the existing 151-record external image library.

## Verify after deployment

Open `phase23-diagnostics.html` on the deployed GitHub Pages site. Run **Run basic checks**, **Run all 4 wheel tests**, **Check bundled images**, and **Check all archive URLs**. The larger 151-record archive still uses public source URLs; diagnostics will identify records whose source URLs no longer load.

## Upload / preservation rules

Back up the branch before uploading. Apply the contents of the combined repair package to the repository root, preserving the `assets/` directory structure. The existing `app.js`, `styles.css`, `fallback.js` and `innerwear-image-library.json` are intentionally retained.

## Testing boundaries

Static validation passed 11/11 and the local Chromium fixture passed 35/35 interaction checks. Those are local tests, not proof that GitHub Pages or a physical Android device has been tested. The 18+ gate is self-attestation, not formal age verification.
