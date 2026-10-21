# V1 Phase 5 — Upload Guide (Hinglish)

## Is ZIP mein kya hai
- `index.html`, `app.js`, `styles.css`, `fallback.js`, `sw.js`, `manifest.webmanifest`: complete existing Phase 4 recovery site, updated for Phase 5.
- `innerwear-image-library.json` + `INNERWEAR_IMAGE_LIBRARY_MANIFEST.csv`: 151 exact public image-file records, source repo, path, category and note ke saath.
- `size-chart-template.json`: abhi BLACKED ki verified size chart configured nahi hai; isliye calculator size guess nahi karta.
- `phase5-diagnostics.html`: deployed file and original-image load checks. “Load all archive images” now tests 12 URLs in parallel with a 7-second timeout per image and reports the first failed source URLs.
- `PHASE5_IMPLEMENTATION_REPORT.md`, `RESEARCH_NOTES_PHASE5.md`, `ROOT_CAUSE_IMAGE_COLLECTION_PHASE5.md`, `PHASE5_MEMORY_NOTE_COPY_PASTE.txt`.

## GitHub par upload
1. ZIP extract karo.
2. `bhanu13yadav1-ai/Brand-website-v2` ki `main` branch kholo.
3. Is folder ke contents repository ROOT mein upload karo (ZIP ya nested folder nahi).
4. Existing `index.html`, `app.js`, `styles.css`, `fallback.js`, `sw.js`, `manifest.webmanifest` ko updated versions se replace hone do.
5. Naye JSON/CSV/diagnostics/report files add karo.
6. Commit message: `V1 Phase 5: expand image library and wellness size guide`.

## Local QA result
Local Chromium test: **32/32 PASS**. External image requests were blocked during local testing, so original photo loads are still unverified until the live diagnostics is run.

## Upload ke baad test
- Website: `https://bhanu13yadav1-ai.github.io/Brand-website-v2/`
- Diagnostics: `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase5-diagnostics.html`
- Diagnostics page par pehle **Run checks**, phir **Load all archive images** dabao.
- `Original image loads` count ya failures ke screenshot bhejo. Jo exact source URLs fail hongi, unko hum identify karenge.

## Important
`Brand-website-v2` repository mein original photo binaries nahi the. Is release ka image gallery exact public source URLs use karta hai; source repo private/down/renamed ho ya network raw images block kare to image fail ho sakti hai. Fallback photo original ki replacement nahi—diagnostics us distinction ko report karta hai. Is ZIP mein fake BLACKED size chart nahi hai. Product-specific official chart milne ke baad hi size recommendation configure ki jayegi.
