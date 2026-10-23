# BLACKED V3 Phase 3 handoff

## Package state

Prepared locally on 23 October 2026. This package has **not** been committed or deployed to GitHub Pages by the assistant.

Repo: https://github.com/bhanu13yadav1-ai/Brand-website-v2
Live site: https://bhanu13yadav1-ai.github.io/Brand-website-v2/

## Apply as a merge/update

Replace root `app.js` and `sw.js` with the versions in this package. Add these four files at the existing repository root:

- `phase3-horny-mode.js`
- `phase3-horny-mode.css`
- `phase3-diagnostics.html`
- `phase3-diagnostics.js`

Do not replace `index.html`; the updated `app.js` loads the new mode JS/CSS additively. Do not delete any other files, folders, data JSON, original assets, or previous phase modules.

## Verified in this environment

- `node --check`: `app.js`, `sw.js`, `phase3-horny-mode.js`, `phase3-diagnostics.js`.
- CSS brace balance and diagnostics HTML parse.
- Static feature checks for 4 mood choices, 3 languages, profanity toggle, 18+ checkbox, local preference key, service-worker references, existing seven view IDs, and all four wheel IDs.
- Verified the four Phase 6 SVG assets exist at the repository root; app.js now repairs the current module's broken `./assets/phase6-*.svg` references after the module content is inserted.
- Added a 1.8-second bounded wait to service-worker navigation requests before using a cached app shell, while allowing the network request to update cache in the background. Production behaviour not browser-tested here.
- Current-source `app.js` and `sw.js` before this patch matched the files inspected from `main` by Git blob SHA.
- Package is a merge update, not a full-site ZIP; `index.html` is deliberately not included.

## Not verified / blocked

- Full app browser test was blocked by the environment browser policy (`ERR_BLOCKED_BY_ADMINISTRATOR` navigating even to a local test server). An isolated browser runner also exited with a Playwright-driver `EPIPE`; it is not counted as a passing test.
- Live GitHub Pages behaviour, Android Chrome layout, real-world cold/warm load timings, remote-image HTTP status, PWA update flow and the original wheels' spin behaviour remain **NOT TESTED**.
- The performance changes remove unnecessary startup rendering and inactive-view image requests, but no numeric speed improvement is claimed until measured on the deployed site.

## Next step after upload

Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase3-diagnostics.html` and run **Run all checks** and **Measure Home load**. Export the CSV and keep the exact PASS/FAIL output. Then on Android Chrome test the new mode and manually regress Home, Stories, Innerwear, Sanskari, Wellness, Boyfriend & Couples, Fit Studio, wishlist/bag, saved-story flow and all four wheels. Do not clear site storage as a cache workaround; it can erase locally saved data.
