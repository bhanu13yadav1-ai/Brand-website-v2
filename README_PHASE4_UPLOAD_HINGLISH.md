# V2 Phase 4 Upload Guide (Hinglish)

Target repository: https://github.com/bhanu13yadav1-ai/Brand-website-v2

## Before upload
1. Create a backup or a new branch.
2. Download and extract `V2_PHASE4_INTEGRATION_PACKAGE.zip` on your phone or computer.
3. Open the `V2_PHASE4_INTEGRATION_PACKAGE` folder.

## Upload
In GitHub, open the repository `main` branch → **Add file → Upload files**. Upload the contents of this folder to the repository root. Do not upload the ZIP as a single file and do not put the package folder inside another nested folder.

Replace these existing overlay files:
- `index.html`
- `part-c-enhancements.js`
- `part-c-enhancements.css`
- `sw.js`
- `manifest.webmanifest`
- `README.md`

Add/update these files and folders:
- `phase4-diagnostics.html`
- all `assets/...` paths from this package
- `PHASE4_ASSET_MANIFEST.csv`
- `PHASE4_IMPLEMENTATION_REPORT.md`
- `PHASE4_QA_RESULTS.json`
- `PHASE4_MEMORY_NOTE_COPY_PASTE.txt`
- `PHASE4_UPLOAD_FILE_LIST.txt`
- `README_PHASE4_UPLOAD_HINGLISH.md`
- `README_START_HERE.md`

**Do not replace or delete** `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, or `size-chart-template.json`. They are owned by the existing site. Existing unrelated assets/files must remain.

Commit message: `V2 Phase 4: add local campaign images and improve wheel collections`

## Check after GitHub Pages deploys
Open:
`https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase4-diagnostics.html`

Run **Run basic checks**, then **Test all four wheels**, then **Check bundled Phase 4 images**. Also run `phase23-diagnostics.html` for the previous 151-record external image archive.

## Important
The Threesome Fantasy cover/gallery remains behind an 18+ self-attestation gate (not formal age verification). Two family-themed images are held out; one exact duplicate is not shown twice. User-supplied assets should be publicly posted only if you have the rights/permission to use them.
