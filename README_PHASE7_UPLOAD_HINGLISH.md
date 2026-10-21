# Phase 7 Upload Guide — Hinglish

Target: `bhanu13yadav1-ai/Brand-website-v2`, branch `main`.

**Important finding:** when last checked, the current repo still showed Phase 5 source files, not the Phase 6 files. This ZIP is therefore a full root-ready release candidate based on the hardened Phase 6 working copy. Back up the repo before applying it.

1. Download and extract `V1_PHASE7_RELEASE_PACKAGE.zip` on your phone.
2. Open GitHub → `Brand-website-v2` → `main` → Add file → Upload files.
3. Upload the *contents* of `V1_PHASE7_RELEASE_PACKAGE` to repository root. Do not upload the ZIP as one file and do not add a second nested folder.
4. Replace the matching root source files (`index.html`, `app.js`, `styles.css`, `fallback.js`, `sw.js`, `manifest.webmanifest`, `innerwear-image-library.json`, and `size-chart-template.json`) and add the new `phase7-diagnostics.html`, CSV manifests and reports. Keep `app-icon.svg`. Do not delete unrelated existing files.
5. Commit with message: `V1 Phase 7: final QA, featured 18+ story previews and release candidate`.
6. Wait for GitHub Pages, then open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase7-diagnostics.html`. Tap **Run full QA** first; tap **Check all original image URLs** separately after that.
7. Test on Android manually: Home → Sex Stories (age gate) → category filter → Read story → close dialog; then check all three original wheels, Dirty/Wild wheel, image archive Load more, measurement save opt-in and privacy clear/cancel.

Do not treat green local tests as evidence that live pages/images work. If a source URL fails, the diagnostics report gives filename, repo and URL.
