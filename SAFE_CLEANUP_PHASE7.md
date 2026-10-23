# Safe cleanup policy

This release does not delete old repository files. Once the live Phase 7 diagnostics are green on Android Chrome and a backup ZIP is available, an owner may consider removing these old direct-load modules after a repository-wide reference search:
- `phase6-boyfriend-studio.js`
- `phase6-boyfriend-studio.css`
- `phase6-wellness-collections.js`
- `phase6-wellness-collections.css`
- `phase7-8-enhancements.js`
- `phase7-8-enhancements.css`

Do not remove original wheel scripts, story files/data, `innerwear-image-library.json`, product/campaign images, app.js, index.html, phase3/4/5 modules, or existing diagnostics as part of this cleanup. Keep source files as rollback material until the deployment passes.
