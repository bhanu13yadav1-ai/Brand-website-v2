# BLACKED V5 Phase 5 — ZIP upload instructions (Android-friendly)

## Important
GitHub Pages does **not** unpack a ZIP that is uploaded as a repository file. Uploading only this ZIP will not update the website. Extract it on your Android phone, then upload the extracted root files to the existing repository.

## Files to replace/add
Replace these existing root files with the versions from this ZIP:
- `index.html`
- `app.js`
- `sw.js`
- `manifest.webmanifest`
- `phase4-home-and-fantasy.js`
- `phase4-story-universe.js`

Add these three new root files:
- `phase5-v5-release-diagnostics.html`
- `phase5-v5-release-diagnostics.css`
- `phase5-v5-release-diagnostics.js`

`phase2-premium-ux.css/js` and `phase3-v5-interactive.css/js` are already in the current repository snapshot; this package references them but does not replace them.

The optional `PHASE5_DOCS/` folder contains the report and QA checklist; it is not required for the website to run.

## Upload from phone (no Codespaces)
1. Download the ZIP from ChatGPT and open the Android Files/Downloads app.
2. Tap the ZIP and choose **Extract**.
3. Open GitHub in Chrome and open `bhanu13yadav1-ai/Brand-website-v2` on branch `main`.
4. Choose **Add file → Upload files**. Select the nine extracted runtime files listed above. Keep all files at repository root; do not put them in a nested folder.
5. Review the file names and commit the upload. If GitHub's mobile page will not let you select multiple files, upload/replace one file at a time.
6. Wait for the Pages workflow to finish successfully. Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase5-v5-release-diagnostics.html` and choose **Run Phase 5 checks**.

## Expected Innerwear behaviour
The Innerwear view should appear quickly. Catalogue cards render after the first paint; the optional 151-record image archive loads separately. If its JSON fetch does not finish within 10 seconds, the archive shows a timeout message and Retry control instead of an endless loading label. Other views should remain navigable.

## Rollback
The ZIP includes a `ROLLBACK_BASELINE.md` file with the source commit and backup artifact reference. Before replacing files, keep the original files/downloaded baseline ZIP until live checks pass.
