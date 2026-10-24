BLACKED V4 — UPDATE-ONLY ZIP (24 October 2026)

IMPORTANT: This is a DELTA package, not a full website backup. It contains only four existing files that must be replaced. It contains no copied image files and no unchanged website assets.

FILES TO REPLACE AT THE REPOSITORY ROOT:
1. index.html — connects the already-uploaded V4 loaders.
2. app.js — avoids a full-document image scan on each screen navigation, improving the Innerwear tap path.
3. sw.js — refreshes the service-worker cache version and includes the modules needed by the loaders.
4. manifest.webmanifest — corrects the PWA metadata from V2.4 to V4.

ANDROID / GITHUB STEPS:
1. Download and extract this ZIP on the phone.
2. Open https://github.com/bhanu13yadav1-ai/Brand-website-v2
3. Upload/replace ONLY the four files above in the repository root. Do not upload the README as a website file, and do not upload the ZIP itself.
4. Commit the changes to main.
5. Wait for the GitHub Pages action to finish, then open the live site and hard-refresh. If an installed PWA still shows the old build, close it and clear the site's cached data or unregister the old service worker.

DEPENDENCIES ALREADY PRESENT IN THE REPOSITORY:
phase1-foundation.js, phase2-core-experience.js, phase3-v4-experience.js, phase5-final-release-loader.js, and the phase 9–15 JS/CSS modules. This ZIP does not repeat those files or any old images because they already exist in main.

WHAT THIS UPDATE CHANGES:
- Connects Phase 1/2/3 V4 activation scripts from index.html.
- Activates Phase 5 release loading for Phase 10, 11, 14 and 15 modules after Phase 3 signals ready.
- Phase 3's loader activates Phase 9, 12 and 13 modules.
- Reduces navigation-time image rescanning to only the previous view and defers that work until idle.
- Changes service-worker cache name so the new HTML/JS is fetched rather than reusing the old cache key.
- Updates the app manifest name to V4.

VALIDATION NOTES:
- Static JavaScript syntax validation is expected before commit.
- Android live runtime behavior has NOT been remotely verified in this package-generation environment. After commit, use phase5-v4-release-diagnostics.html and test Home → Innerwear → Home → Innerwear repeatedly.
- Do not interpret a successful GitHub Pages build as proof every interactive feature works.
