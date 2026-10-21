# V2 Phase 2+3 Combined Repair — Hinglish Upload Guide

## Ye package kis repo ke liye hai?

Target: `https://github.com/bhanu13yadav1-ai/Brand-website-v2`

Package ek saath Phase 2 (integration, images, cache) aur Phase 3 (wheel redesign, Boyfriend gallery, Threesome Fantasy section) karta hai. Phase 1 audit mein jo main bugs mile the unhe bhi fix karta hai.

## Upload steps (Android phone)

1. Pehle current `main` branch ka ZIP/backup bana lo.
2. `V2_PHASE23_REPAIR_PACKAGE.zip` download karke extract karo.
3. GitHub repo → `main` branch → `Add file` → `Upload files` kholo.
4. Extracted `V2_PHASE23_REPAIR_PACKAGE` folder ke **contents** upload karo; nested `V2_PHASE23_REPAIR_PACKAGE/` folder mat banana.
5. In root files ko replace/add karo:
   - Replace: `index.html`, `part-c-enhancements.js`, `part-c-enhancements.css`, `sw.js`, `manifest.webmanifest`, `README.md`
   - Add: `phase23-diagnostics.html`
   - Add all folders/files inside `assets/`
   - `PHASE23_ASSET_MANIFEST.csv`, `PHASE23_IMPLEMENTATION_REPORT.md`, `PHASE23_QA_RESULTS.json`, `PHASE23_MEMORY_NOTE_COPY_PASTE.txt`, `UPLOAD_FILE_LIST_PHASE23.txt`, `WHEEL_SELECTION_ACCEPTANCE.md` are project records; upload them if you want the audit record in the repo, or keep them from the ZIP for reference.
6. **Do not replace `app.js`, `styles.css`, `fallback.js`, or `innerwear-image-library.json`.** This repair is additive and intentionally keeps the existing app core and its data files.
7. Commit message: `V2 Phase 2+3: repair Part C integration, local assets and wheel alignment`.
8. Wait for GitHub Pages to publish, then open the diagnostics page below.

## Live testing

Open: `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase23-diagnostics.html`

Run in order:
1. `Run basic checks`
2. `Check bundled images`
3. `Run all 4 wheel tests`

Open the site in a new tab afterwards and hard-refresh once. On Android Chrome you can clear only this site's cached data if the old service-worker page still appears; avoid deleting saved data unless you have a backup.

## What is and isn't claimed

The local tests below validate the add-on against a fixture made from the current repository HTML structure. They do **not** mean the GitHub Pages deploy or a physical Android phone has been verified. Use diagnostics to verify the actual live page after upload.

The wheel tips are conversation/safety prompts, not medical advice or predictions of a real person's anatomy. The male gallery uses generic labels. No real person's identity or penis size is inferred from a photo. The three-person section uses an 18+ self-attestation gate; this is not formal age verification.
