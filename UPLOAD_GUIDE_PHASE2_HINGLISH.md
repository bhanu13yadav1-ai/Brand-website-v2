# BLACKED V3 — Phase 2 upload guide (Hinglish)

1. Keep your current GitHub repository as-is; make a backup first.
2. Download and extract `BLACKED_V3_PHASE2_PERFORMANCE_UPDATE.zip`.
3. In the SAME repository root, replace only `app.js` and `sw.js`. Add `phase2-performance-diagnostics.html` and `phase2-performance-diagnostics.js`. Keep all other files. The ZIP's `reports/` and `previews/` folders are documentation and can be uploaded too.
4. Do **not** replace `index.html`; this Phase 2 merge deliberately leaves the current script wiring untouched.
5. After Pages redeploys, open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase2-performance-diagnostics.html`. Tap `Run homepage test`, `Check local app files`, and `Check key images`; export the CSV.
6. Open the existing `phase2-image-diagnostics.html` to inspect the 151-record image archive.
7. On Android Chrome, test Home → Innerwear, image search/filter/load-more/retry, all three original wheels + Dirty/Wild, stories, wishlist, comparison, demo bag, wellness, Fit Studio and an offline reload.

This is an **upload-ready merge update ZIP**, not a whole-site replacement archive. It avoids downgrading current Phase 3–7 modules. Current GitHub main archive: https://github.com/bhanu13yadav1-ai/Brand-website-v2/archive/refs/heads/main.zip

The GitHub integration denied branch writes with HTTP 403, so no changes were pushed or deployed in this run.
