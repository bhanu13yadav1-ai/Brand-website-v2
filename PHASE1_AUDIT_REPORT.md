# V2 Phase 1 — Repository Audit & Asset Mapping

## 1. Scope
- Target repository checked: `https://github.com/bhanu13yadav1-ai/Brand-website-v2`
- Branch: `main`
- Current tree at audit time: 76 tracked files; the core files (`index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`) and Part A/B/C reports/add-on assets are present.
- The uploaded files are user-provided references included in this audit package. No repository commit or live deployment was made in Phase 1.

## 2. Primary root cause: Boyfriend photos are not visible
Observed in current source:
1. `index.html` references `./fallback.js` and `./app.js`, and `./styles.css`.
2. It does **not** load `./part-c-enhancements.js` or `./part-c-enhancements.css`.
3. The intended gallery and wheel implementation are inside `part-c-enhancements.js`, including `addBoyfriendGallery()`, `buildWheel()`, and the Threesome view. Since that script is not loaded, those enhancement functions do not run and their styles do not apply.
4. Even if the script were linked, it requests `./assets/fantasy-gallery/male-reference-01.webp` etc. The actual `male-reference-01.webp` through `male-reference-04.webp` and `threesome-fantasy-cover.webp` are at repository root, not under `assets/fantasy-gallery/`. The existing references therefore do not match the current file paths.
5. The existing app's legacy `spinWheel(kind)` selects its result separately from its rotation angle. That means a wheel can visually stop at a sector that does not correspond to the reported result. The Part C wheel implementation is intended to solve this, but it is not integrated.

**Required fix in implementation phase:** integrate Part C CSS/JS safely after the core files, correct all photo paths (or move/copy files with a deliberate path plan), update `sw.js` cache entries/version, then test the 4 wheels and all five local assets independently. Don't replace the core app before testing for duplicate event listeners and duplicate nav handlers.

## 3. Uploaded images — proposed destinations
- `1000201720.png`: “Tease & Guess Wheel” poster reference. Use as the Wheel section's promotional/hero art. Do not use it as the actual interactive wheel: poster text is a flat image and cannot rotate or report the actual selected sector.
- `1000201714.png`: “After-Dark Questions” wheel poster reference. Use as a second Wheel idea/card or alternate section art. The real wheel should remain a functional labelled wheel.
- `1000201721.png`: red-lace BLACKED campaign art with a supplied suggestive tagline. Put in the Innerwear Campaigns/Red Lace collection, with 18+ content labelling as appropriate. Treat marketing claims written on the image as creative copy, not verified product facts.
- `1000201284.webp`: “Sanskari Outside, Bold Within” hero/campaign option.
- `1000201295.png` and `1000201287.webp`: alternate renders of a similar “Sanskari Outside, Bold Within” idea. Review quality/rights, select one main card and preserve the other as an alternate rather than showing duplicate campaign cards.
- `1000201281.webp`: “Shaam Se Raat Tak” campaign.
- `1000201280.webp`: “Shaam Ki Roshni” campaign.
- `1000201277.webp`: “Shaam-e-Noor” campaign.
- `1000201279.webp`: “Noor Ka Nasha” campaign.
- `1000201200(1).webp`, `1000201201(1).webp`, `1000201199(1).webp`, `1000201203(1).webp`: exact byte-for-byte duplicates of 1000201281.webp, 1000201280.webp, 1000201277.webp, and 1000201279.webp respectively. Keep them in the source archive, but don't render duplicates as separate gallery cards.

The exact file hashes, sizes and dimensions are in `PHASE1_ASSET_MANIFEST.csv`; a visual contact sheet is `ASSET_CONTACT_SHEET.jpg`.

## 4. Existing feature inventory
Preserve these existing sections and capabilities unless a reviewed test proves a fix is required:
- Home, 18+ story library and Part B chapter/ending features.
- Innerwear catalogue, image library, search/filter/sort, product detail, wishlist, compare and demo bag.
- Sanskari/Noor/Grace previews.
- Wellness & Size Guide, measurement input and fit-cue education.
- Boyfriend/Couples section and Fit Studio.
- Original Boyfriend/Land wheel, Dildo wheel, Butt Plug wheel, Dirty/Wild wheel.
- Part B story filters, reading progress/bookmarks where already present.
- Phase C's intended labelled-wheel layer, boyfriend reference gallery and separate Threesome Fantasy view (currently not wired into the core HTML).
- Privacy controls, image fallback, diagnostics, PWA/service worker.

## 5. Names and measurement claims
- Do not identify real people from these photographs.
- Do not infer or publish a person's penis size from a photo, physique, role or rumor.
- In the implementation, use neutral cards such as “Reference 01 — Classic Editorial” unless the owner supplies an authorized public display name and verifiable license-safe content.
- Provide a product size/measurement guide for dildo and butt-plug dimensions (overall length, insertable length, widest diameter, flared base), clearly labelled as product measurement—not a measurement of a person.
- Don't claim a product is available, medical-size advice is verified, or a model's body details are factual unless sourced and checked.

## 6. Wheel implementation acceptance checklist
- Four separate wheel instances and result areas: Boyfriend/Land, Dildo, Butt Plug, Dirty/Wild.
- Eight visible labels per wheel (category-specific).
- The animation's final pointer sector must be the exact item shown in the result.
- Category change refreshes the visible labels as well as result data.
- Disable repeat spins while in motion; reset cancels pending timers/animation safely.
- Result text is accessible to screen readers and keyboard users.
- Respect reduced-motion and touch interactions.
- Verify all 4 wheels separately at narrow mobile widths, not only by checking that the buttons exist.
- Use uploaded poster images as promotional references; never pretend a static poster is a working wheel.

## 7. Findings status
- Repository source inspected: **PASS**
- Part C CSS/JS linkage mismatch identified: **PASS**
- Boyfriend/Threesome nested asset-path mismatch identified: **PASS**
- New uploads classified and exact duplicates found: **PASS**
- Live GitHub Pages runtime and physical Android testing: **NOT TESTED**
- Code changes or repository commit made: **NO — Phase 1 only**
