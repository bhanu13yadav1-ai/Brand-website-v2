# BLACKED — V2 Phase 4 Integration Package

This package builds on the V2 Phase 2+3 repair and adds the next layer of local campaign imagery, collection organization, and wheel/Boyfriend/Threesome integration.

## What is new in Phase 4
- Keeps the two existing wheel-poster cards inside the interactive Wheel Hub.
- Adds 10 local Innerwear & Editorial campaign cards, with search and category filtering.
- Adds 2 Couples Style Reference cards inside Boyfriend & Couples.
- Adds 4 supplied multi-adult campaign images inside the separate 18+ self-attestation-gated Threesome Fantasy section.
- Updates `sw.js` cache version and pre-cache list for the new WebP assets.
- Adds `phase4-diagnostics.html` for local image checks, wheel alignment checks, gallery counts, and responsive validation.

## Included reports
- `README_PHASE4_UPLOAD_HINGLISH.md` — upload instructions
- `PHASE4_IMPLEMENTATION_REPORT.md` — implementation summary and limitations
- `PHASE4_QA_RESULTS.json` — local Chromium test evidence
- `PHASE4_STATIC_CHECKS.json` — static validation evidence
- `PHASE4_ASSET_MANIFEST.csv` — source filenames, image category, display path, source hash, optimized hash and publication status
- `ASSET_CONTACT_SHEET.jpg` — visual overview of the 19 latest uploaded source images
- `PHASE4_MEMORY_NOTE_COPY_PASTE.txt` — next-phase handoff note

## Do not replace these existing root files
`app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, `size-chart-template.json`.

## Image review decisions
One exact duplicate upload is not rendered twice. Two family-themed images are held out of the live galleries: a sexualized sibling/family-theme poster and an artwork that includes children in family-photo frames alongside adult campaign imagery. Model identity, religion, performer identity, and body-size measurements are never guessed from photos.

## Live verification
Local QA passed, but this package has not been committed to the GitHub repository by the assistant. After uploading and deployment, open `phase4-diagnostics.html` and also run `phase23-diagnostics.html` for the previous external image archive. Live GitHub Pages and physical Android testing remain unverified.
