# BLACKED V3 — Phase 2: Performance & Loading Reliability

## Changes prepared for the current `main` branch

1. **Service worker:** reduced the install-time cache from 74 entries / approximately 4.69 MB to 33 explicit app-shell files / approximately 0.527 MB based on the GitHub tree sizes. This is an estimated **88.77% reduction in precache bytes**, not a measured speed-score improvement.
2. **Bounded install concurrency:** no more than six app-shell requests are processed at once.
3. **Media on demand:** removed the local photo batch from `CORE`. Same-origin images and other files are cached only after the user requests them. Cross-origin `raw.githubusercontent.com` images are not falsely represented as service-worker cached.
4. **Missing paths:** four SVGs are addressed at their actual repository-root paths (`phase6-measurement-map.svg`, `phase6-product-specs.svg`, `phase6-comfort-check.svg`, `phase6-image-rights-workflow.svg`) rather than the nonexistent `assets/` subfolder.
5. **Image archive lazy init:** app.js no longer fetches `innerwear-image-library.json` or builds the first 24 image cards on the Home startup. It initializes the archive when the user enters Innerwear, with a guard against duplicate requests. The existing gallery, load-more, filters and retry flow remain.
6. **Measurement-unit correction retained:** the cm ↔ in switch converts filled values and tells the user to review the summary, rather than silently reinterpreting the numbers.
7. **Diagnostics:** new `phase2-performance-diagnostics.html` and `.js` provide opt-in homepage timing, local app-file checks, a 42-URL external image test, and CSV export. The page does not auto-run tests or send data to a backend. The separate existing `phase2-image-diagnostics.html` remains available for the 151-record archive.

## Existing features deliberately left in place

No index, story data, wheel UI, catalogue records, campaign images, localStorage keys, measurement opt-in, wellness text or age-gate content is removed by this delta. The current `index.html` is intentionally not part of the patch so the deployed `main` branch's existing Phase 3–7 script wiring remains untouched.

## Verification status

- `node --check app.js`: see packaged test report.
- `node --check sw.js`: see packaged test report.
- `node --check phase2-performance-diagnostics.js`: see packaged test report.
- Static core-path audit against the inspected current GitHub `main` tree: PASS (33 of 33 paths exist).
- Browser navigation/screenshot attempt: BLOCKED by the execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR` on localhost). No browser smoke test is claimed as passed.
- Live GitHub Pages performance timing, external image HTTP availability, live service-worker takeover and physical Android Chrome: **NOT TESTED here**. Run the diagnostic page after you upload the two changed source files and add the two new diagnostic files.

## Upload safety

Extract this update ZIP into the repository root as a **merge**, replacing only `app.js` and `sw.js` and adding `phase2-performance-diagnostics.html` and `phase2-performance-diagnostics.js`. Do not delete unlisted repo files. Do not upload this delta ZIP as if it were the whole website.
