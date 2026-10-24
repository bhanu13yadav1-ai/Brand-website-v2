# Phase 5 handoff — BLACKED V4

- Canonical source of truth: `BLACKED_V4_MASTER_PLAN.md`.
- Main branch audit found Phase 1/2/3 script tags missing from `index.html`; Phase 10/11/14/15 modules were also inactive.
- `PHASE5_INTEGRATION.patch` targets the current inspected main baseline. Apply it with Git, then upload the two new runtime files and commit all changes.
- `app.js` changes remove the full-page image deferral scan from every tap and delay Innerwear render until after first paint. This is a targeted fix for source-level main-thread work, not yet a verified Android pass.
- `phase5-final-release-loader.js` activates only Phase 10, 11, 14 and 15 after the Phase 3 loader is available; Phase 3 owns 9/12/13.
- The manifest and service-worker core asset list are versioned for Phase 5.
- Live diagnostic: `phase5-v4-release-diagnostics.html`; it downloads a JSON evidence file.
- `PHASE5_V4_FEATURE_COVERAGE.csv` maps all 40 feature areas. `PHASE5_V4_QA_CHECKLIST.csv` has 30 checks, still NOT_RUN until tested.
- Known limitation: direct GitHub write attempt returned 403; no live source commit/deploy was performed by this session. Latest workflow seen before edits was successful, but the requested fixes are not live until the patch is applied.
