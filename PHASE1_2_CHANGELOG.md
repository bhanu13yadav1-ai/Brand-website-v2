# Phase 1–2 Changelog — Current Review Copy

## Phase 1 — complete
- Captured the current GitHub Pages artifact for source head `12ae0b208d056b39bba4c4b5b981d08f59ba30f0` and made a separate untouched baseline backup ZIP.
- Inventoried the seven views, feature systems, root image files, service worker and prepared-but-not-loaded later phase modules.
- Compared protected core/data file hashes against the baseline; they are unchanged.

## Phase 2 — static repair complete; runtime check pending
- Fixed two direct homepage image paths.
- Corrected the active Part C image resolver so nested asset labels map to real root-level image files.
- Corrected 31 service-worker image precache paths and bumped cache version.
- Wired the already-prepared Phase 2 photo CSS/JS; no later phase modules are activated.
- Updated the older Phase 23/4 diagnostics so they test root-level image paths.
- Added current asset manifests, a local HTTP preview server and a diagnostic page with separate local/151-URL checks.

## Evidence / limitations
- Static QA: see `PHASE1_2_QA_RESULTS.json` and `.md`.
- 75/75 root image assets decode and all service-worker core paths exist.
- 151/151 external archive filenames exist in the matching upstream `main` trees; actual URL delivery remains **NOT TESTED**.
- Browser automation was blocked by the execution environment; live Pages after repair and Android Chrome are **NOT TESTED**.
- No GitHub branch, commit, PR or deployment was changed.
