# BLACKED V3 Phase 5–8 Delta Changelog

## Root cause correction
- The loader link was absent from `index.html`, so the overlay modules never ran on the live page.
- Many actual image files are stored at repository root while the Phase 2 and Phase 6 code looked under nested `assets/` folders.
- Updated the Phase 2 local-photo paths, Phase 6 asset resolver and Phase 5–6 manifest to use verified root-level filenames.
- Bumped dynamic cache-buster to `7.8.0`.

## Phase 7
- Added a dedicated Noor / Sanskari / Grace collection guide with search, category filter, image status, responsive card layout and jump links into existing collection sections.
- The labels distinguish modest-inspired / traditional-drape / theatrical styling concepts and avoid inferring religion or endorsement from model appearance.

## Phase 8
- Added quick mood filter chips connected to the existing story category dropdown. Existing search, language, sort, bookmarks, series and optional local progress remain owned by `app.js`.
- Added reader font-size controls (14–26 px) and optional focus mode to the existing story modal; no new reader data is saved.

## Status
- JavaScript syntax and package/path consistency checks passed locally.
- Live deployment and live browser interaction remain **not verified**. GitHub connector write operations returned HTTP 403, so these changes were not pushed.
