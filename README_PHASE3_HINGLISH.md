# BLACKED Super Update — Phase 3 (Hinglish)

## Is ZIP mein kya hai
- 4 new user-supplied image variants, optimized as WebP under `phase3-assets/`.
- `super-phase3-content.json`: media placements, brand/rights warnings, connected routes, and preference-field specification.
- `super-phase3-experience.js` / `.css`: additive collection galleries, accessible image preview and Boyfriend & Couples fictional-vibe cards.
- `patches/`: minimal `index.html` + service-worker insertion notes. Full existing site files are not bundled.
- `super-phase3-diagnostics.html` for the hosted integration checks, plus a local mock-page smoke preview.
- Reports, updated phase tracker, asset manifest and next-phase handoff.

## Photos ka sahi placement
1. `blxcked-personal-wellness-triptych.webp` → Wellness 18+ → Personal Wellness Concept Gallery.
2. `blxcked-t-string-collection-study.webp` → Innerwear → T-String Collection Studies.
3. `blxcked-modest-style-grace-study.webp` → Collections → Modest-Styling Editorial Concepts.
4. `blxcked-noor-faith-comfort-study.webp` → Collections → Noor / Faith & Comfort Direction.

Ye 4 uploads Phase 3 package ke new variants hain. Existing site's similarly themed Noor/Grace assets ko overwrite nahi kiya gaya. Exact perceptual duplicate comparison against every remote root image was unavailable in this run; the assets are kept separately labelled as new variants, not claimed to be wholly novel concepts.

## Boyfriend entry preference card
- Shows at the top of the existing Boyfriend & Couples view.
- Cards ask about fictional adult character height vibe, build, appearance/complexion, personality, clothing style, optional size trope and optional natural-pigmentation detail.
- Appearance is independent from anatomy. The app will not link race/ethnicity to genital traits or infer body details from a photo.
- `Create my fictional vibe card`, `Surprise me`, `Skip preferences`, `Change preferences`, and `Clear this card` work locally in memory.
- Build/Skip/Edit/Reopen/Clear states are distinct: when the summary is shown, the initial action bar hides; Skip leaves only “Open preferences”; clearing restores an empty form.
- No values are saved in localStorage/sessionStorage or sent to a server. This card is a story-vibe selector, not a real partner assessment, body prediction, or consent signal.
- The “Surprise me” action deliberately leaves sensitive anatomy preferences unspecified.

## Apply carefully
1. Check `index.html` blob SHA matches `007b8e7d59486b5ba93c6534aa9dcc91066d040b`.
2. Check `sw.js` blob SHA matches `675093dcd5bb4d9975c40dd07d65a5cac9018ee4`.
3. If either file changed, stop and reconcile; do not force-apply.
4. Upload only the new `phase3-assets/` directory and 3 new root files first.
5. Insert CSS/JS tags and service worker CORE/cache changes using the patch notes.
6. Run the static validator and hosted diagnostic; test the actual website on Android before marking complete.

## Important
- No existing `index.html`, `app.js`, stylesheets or existing photos included.
- No real checkout, inventory, product specs or verified brand claim is added.
- Product and health/comfort claims inside the supplied posters remain unverified.
- Public/commercial image permissions and host/content policy must be checked before production.
- GitHub repository code was not changed by this package creation.


## Local smoke preview chalane ka tareeqa
1. ZIP extract karo.
2. Package folder ke andar terminal/Termux mein `python -m http.server 8765` chalao.
3. Browser mein `http://127.0.0.1:8765/previews/PHASE3_RUNTIME_SMOKE_PREVIEW.html` kholo.
4. Ye mock harness naya Phase 3 module check karta hai; ye full production site ka substitute nahi hai.
5. Hosted review build par root `super-phase3-diagnostics.html` kholo aur manual regression matrix bhi chalao.

Browser automation for this package was blocked by the creation environment, so browser/Android smoke remains NOT TESTED in the included report.
