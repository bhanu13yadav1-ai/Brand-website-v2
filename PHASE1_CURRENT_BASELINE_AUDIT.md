# BLACKED V5 — Phase 1 Current Baseline Audit

**Audit date:** 24 October 2026  
**Repository:** https://github.com/bhanu13yadav1-ai/Brand-website-v2  
**Branch:** `main`  
**Baseline HEAD:** `16b76469fb274f5a65d3cfa2bd3d34765639bef3`  
**Commit time:** 2026-10-24 11:54:50 UTC  
**Latest observed Pages workflow:** run #44, id `40091793252`, conclusion `success` (build and deploy jobs succeeded at 11:55:33–11:55:48 UTC).  
**Audit type:** read-only source inspection + metadata + existing QA-evidence review. No app source files were changed.

## Executive summary

**Phase 1 result: source baseline captured; rollback reference identified; backup operation and live-browser verification remain blocked.** The source is sufficiently mapped to plan safe follow-up work, but Phase 1 must not be described as fully release-verified because this environment could not render the deployed website or create a backup branch.

### What was confirmed

- Repository is public, not archived, and uses `main` as its default branch.
- Latest observed commit is `16b76469fb274f5a65d3cfa2bd3d34765639bef3`.
- Recursive GitHub tree contains 600 tracked files; repository metadata reports size 32,397 KB.
- Current `index.html` defines 7 primary views: `home`, `stories`, `innerwear`, `sanskari`, `wellness`, `boyfriend`, `fit`.
- Current entry point directly references 18 JavaScript files and 13 CSS files. All parsed local script, stylesheet, manifest and icon references were found in the tracked tree.
- Regex-based static scan counted 158 HTML IDs and found no duplicate IDs in `index.html`.
- Four original wheel discs are present: `dildo`, `plug`, `boy`, `wild`.
- Service worker `CORE` list contains 64 local paths; every path exists in the tracked tree.
- Phase 17's `phase17-ultra-urge-wellness.js` and stylesheet are linked by `index.html`; the Phase 17 catalogue JSON has 11 concept entries, all `verified: false`.
- The catalogue explicitly disclaims real SKUs, prices, sellers, stock and certifications. Keep that honesty in future UI.
- `innerwear-image-library.json` contains 151 records. `EXTERNAL_ASSET_MANIFEST.csv` has 151 remote image URLs distributed across 3 source repositories.
- Latest observed GitHub Pages workflow completed successfully. This confirms the build/deploy workflow result, not that every runtime interaction works on a phone.

## Important baseline findings

| ID | Priority | Finding | Evidence / implication | Next action |
|---|---|---|---|---|
| P1-01 | Blocker | Live website DOM and real Android interaction could not be tested in this environment. | Browser reader returned `DisabledError`; local network/DNS also prevented downloading the repo archive. This is an environment limitation, not proof that the site is down. | Run the manual Chrome checklist on the deployed URL using a real Android phone and record evidence. |
| P1-02 | Blocker | Full source backup branch could not be created. | GitHub ref creation returned HTTP 403 `Resource not accessible by integration`. No source changes were pushed. | Owner should download the exact baseline ZIP from the pinned commit URL in `PHASE1_BACKUP_AND_ROLLBACK.md`, or create a backup branch through GitHub UI. |
| P1-03 | Medium | PWA manifest still names the app “BLACKED V4 — Complete Experience” while the service-worker cache and source include Phase 17. | `manifest.webmanifest` metadata may look stale when the next release is installed or shared. | Update branding/version metadata during a planned release, not during this read-only audit. |
| P1-04 | Medium | Image archive relies on remote raw GitHub URLs from 3 separate source repositories. | 151 references exist in the manifest; repository presence does not prove each URL returns HTTP 200, remains available, or has cleared usage rights. | Test each image URL from a real browser/network; record HTTP status, load result, source ownership and rights status. Prioritize broken images over visual cleanup. |
| P1-05 | Medium | Multiple historical browser-storage key families remain in source. | Examples include `blackedV1*`, `blackedDelta*`, `blacked31*`, plus V4/Phase 17 preference and favourite keys. | Map every read/write/clear call and test old-data preservation before any key rename or migration. Never call `localStorage.clear()` as a cache fix. |
| P1-06 | Medium | User preferences and favourites are kept in browser local storage. | Source shows preference, language/gaali and product-favourite persistence. Local storage is not encryption and may remain on a shared device. | Add clear plain-language notice, easy clear/delete actions, and test that deletion survives reload. Do not collect sensitive answers during usability research. |
| P1-07 | Medium | The Phase 17 catalogue does not yet cover all categories described in the V5 feature wish list. | 11 concept entries cover dildo, butt-plug, anal-beads, prostate, lubricant, care and storage. Vibrators/external massagers and harness/strap-on categories are not separate catalogue categories in the inspected JSON. | Add those categories later as clearly labelled concept records only, then source-verify before calling any product verified. |
| P1-08 | Low/Medium | Duplicate content blobs and old patch/report variants remain in the repository. | Static tree scan found 12 groups of identical blob SHAs across 24 paths; examples include repeated image files and identical legacy/current patch or report files. | Treat as maintenance debt only. Build a reference map before removing anything; do not clean in Phase 1. |
| P1-09 | Low/Medium | Page root language is English while the UI mixes English and Hinglish. | Language choices and visible Hinglish content exist; screen readers may pronounce language switches incorrectly without appropriate spans. | Add accurate language annotations to mixed-language passages; do not blanket-change the entire document language. |
| P1-10 | Low | `styles.css` and `style.css` both exist in the tree. | Current `index.html` links `styles.css`, not `style.css`. Other standalone diagnostics/legacy pages may still use older files. | Search references before any deletion or consolidation. |

## Entry-point and module map

### Direct entry-point references

`index.html` directly loads: `fallback.js`, `app.js`, `part-c-enhancements.js`, `phase2-photo-collections.js`, `phase3.js`, `phase4-home-and-fantasy.js`, `phase4-story-universe.js`, `phase5-image-reliability.js`, `phase5-product-discovery.js`, `phase6-boyfriend-studio.js`, `phase6-wellness-collections.js`, `phase7-8-enhancements.js`, `phase1-foundation.js`, `phase2-core-experience.js`, `phase3-v4-experience.js`, `phase5-final-release-loader.js`, `phase16-preference-first.js`, and `phase17-ultra-urge-wellness.js`.

### Deliberately selective loaders

- `phase3-v4-experience.js` owns the dynamic loading path for Phase 9 After Dark, Phase 12 Wheels Hub, and Phase 13 Couples Studio.
- `phase5-final-release-loader.js` owns dynamic loading for Phase 10 Wellness education, Phase 11 Fit Studio, Phase 14 hardening, and Phase 15 What's New.
- Phase 17 script and stylesheet are linked directly by `index.html` and listed in the service-worker cache.

This is a source-level map, not proof that every asynchronous module finishes successfully in the deployed browser. Runtime loader statuses and console errors still need on-device verification.

## Current data and feature preservation contract

Do not delete or rename any of the following without an approved migration and before/after test:

- All seven main views and their navigation controls.
- Four wheel discs and their existing positions/entry points.
- Story library, story universe, bookmarks/progress and optional vault.
- Innerwear catalogue and its 151-record image library.
- Wishlist, compare (maximum three references), sample/demo bag and campaign collections.
- Sanskari / Noor / Grace previews.
- Wellness guides, measurements, unit converter, fit cues, and original sizing wheels.
- Boyfriend/Couples, message generator and Fit Studio notes/photo preview.
- Existing local-storage keys, service-worker caches, source manifest and image-rights register.

Visible catalogue price fields are labelled sample/reference values in the existing product model. They must not be presented as current retail pricing or inventory.

## Static checks performed during this audit

| Check | Outcome | Qualification |
|---|---|---|
| Latest commit metadata | PASS | GitHub API response captured. |
| Recursive tree count | PASS | 600 tracked files reported. |
| Main HTML view identifiers | PASS | Seven expected view names found. |
| Four wheel discs in source | PASS | Presence only; sector/result alignment is not tested. |
| Duplicate static HTML IDs | PASS | Regex scan found none; this is not a rendered-DOM scan. |
| Direct local src/href existence | PASS | Parsed paths exist in GitHub tree. This does not test HTTP/cache behaviour. |
| Service-worker core path existence | PASS | 64 listed paths found in source tree. This does not test actual installation/offline behaviour. |
| Phase 17 catalogue state | PASS | 11 entries parse; all are marked unverified. |
| Live page render / console / network | NOT TESTED | Browser reader disabled; no claim of live success/failure. |
| Android touch / clipboard / localStorage / cache upgrade | NOT TESTED | Requires real browser/device. |
| External images and image rights | NOT TESTED | Presence in manifest does not verify live response or licensing. |
| Human usability sessions | NOT RUN | This audit contains a research protocol, not fabricated participant results. |

The repository already contains `PHASE17_STATIC_CHECKS.md` and `PHASE17_QA_CHECKLIST.csv`. The existing static report records syntax/JSON/path checks as passing and specifically lists live Android and interaction tests as not yet verified. This audit did not independently rerun those Node checks against a local checkout.

## Phase 1 close criteria

Phase 1 is **partially complete**. The source baseline and risk register are ready. Do not mark the phase fully closed until:

1. A backup branch or ZIP is saved by the repo owner.
2. Live site loads on Android Chrome and all seven views can be navigated.
3. All four wheels are spun, reset and checked for result/pointer alignment.
4. Image failures, script/network errors and responsive overflow are measured on-device.
5. Existing storage data is tested in a clean QA profile and no test uses real private user data.
6. At least one round of adult-user usability sessions is conducted and notes are reviewed.

## Research sources

- GOV.UK Service Manual — [Using moderated usability testing](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing): task-led tests, think-aloud, neutral prompts, consent and secure handling of notes.
- GOV.UK Service Manual — [Plan user research for your service](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service): typically 4–8 participants for a qualitative research round; run iterative rounds rather than treating a small sample as statistical measurement.
- W3C — [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/wcag/): accessibility criteria including focus, labels, keyboard operation and minimum target sizing.
- MeitY / PIB — [DPDP Rules, 2025 notified](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655): official privacy-framework context for future notice, purpose and data handling review. This audit is not a legal-compliance determination.
