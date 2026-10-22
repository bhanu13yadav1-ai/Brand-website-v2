# BLACKED V3 — Phase 12–15 Changelog

## Phase 12 — Wheels
- Added an image-free, responsive directory for the three original wheels and separate Wild Wheel.
- Route actions navigate to the original view/selector rather than duplicating wheel state.
- Added runtime checks for the four existing wheel nodes and all shortcut buttons.
- Preserved existing wheel segments, gates, reset logic and result alignment code.

## Phase 13 — Couples Studio
- Added six gallery cards using already-bundled root-level campaign images.
- Added All / Couples / Romantic / Fiction filters and accessible large-image preview dialog.
- Added route actions for existing date, message, fictional story and match tools.
- Describes images as campaign references; no real-person marketplace, booking or body measurement is introduced.

## Phase 14 — Privacy, access and PWA reliability
- Added explicit, user-triggered JSON export for a short allow-list of app-owned localStorage keys; no automatic export/upload.
- Added root-path normalization for older `./assets/<folder>/<file>` image references when the image is bundled at the repository root.
- Adds readable error status in newly added galleries when an image truly fails.
- Adds clear focus-visible outlines, mobile touch targets and reduced-motion CSS.
- Added a patcher to bump `sw.js` cache and normalize cached image paths that would otherwise fail `cache.addAll`.

## Phase 15 — Release highlights and QA
- Adds a “BLACKED V3 · WHAT’S NEW” panel before the Home hero, with seven routes to key updated areas.
- Adds one same-origin diagnostics page that reads actual loader/module diagnostics from the deployed site.
- Final loader reports stylesheet/script errors rather than silently swallowing missing files.

## Integration assumptions that must be verified against the checkout
- Existing repo has Phase 2–8 modules and campaign photos at the root; the final loader loads them in order.
- Phase 9–11 modules are included here because they were not found on the target branch during audit.
- Service-worker paths must be normalized before deployment; old cache entries are versioned rather than browser localStorage being cleared.

## Status
- Package is prepared for merge into the original repository. Static/patch validation: 26/26 passed. A synthetic inline-DOM Playwright smoke test exercised After Dark prompt generation, wheel navigation, Couples Studio filter, and CM/inch conversion with no JS/page errors; its image/network and service-worker results are not representative of live GitHub Pages.
- No live GitHub commit/deployment is claimed; integration write requests were previously rejected by GitHub with HTTP 403.
