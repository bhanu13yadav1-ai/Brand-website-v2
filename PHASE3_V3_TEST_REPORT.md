# Phase 3 source validation report

Date: 23 October 2026

## Status summary

- **PASS — source syntax:** `app.js`, `sw.js`, `phase3-horny-mode.js`, `phase3-diagnostics.js` pass `node --check`.
- **PASS — CSS structure:** `phase3-horny-mode.css` has balanced curly braces (100 opening / 100 closing at validation time).
- **PASS — diagnostics markup:** `phase3-diagnostics.html` parses (39 HTML tags inspected by Python parser) and includes its external JS file.
- **PASS — static contract checks:** Four mood choices; three language options; profanity toggle; 18+ confirmation; dedicated mode-only storage key; new JS/CSS in service-worker CORE; project-scoped cache cleanup; bounded navigation timeout with cached fallback.
- **PASS — broken-asset correction:** Verified that all four Phase 6 SVG files exist at repository root and that the current Phase 6 module incorrectly points to a missing `./assets/` folder. The updated app repairs those exact URLs, and the included live diagnostics checks that no wrong paths remain.
- **PASS — preservation source check:** seven expected `.view[data-view]` sections and the four wheel selectors (`boy`, `dildo`, `plug`, `wild`) are present in the live-main source inspected during this session. Package does not include `index.html` or delete any existing view/module.
- **PASS — startup code path review:** hidden catalog/gallery/story rendering is no longer called at startup; each existing navigation path still calls its view's renderer.
- **BLOCKED — full browser smoke:** Chromium navigation to even a local HTTP test server returned `ERR_BLOCKED_BY_ADMINISTRATOR`. A later isolated Playwright driver process exited with `EPIPE`; no UI interaction is claimed as passing from that attempt.
- **NOT TESTED — live deployment:** GitHub Pages, Android Chrome, external images, service-worker activation, all wheels' actual spin states, and standardized Lighthouse metrics.

## Performance change evidence (source-level, not a speed score)

| Work previously done at Home startup | Phase 3 behaviour |
|---|---|
| 8 Innerwear reference cards generated | Generate only when Innerwear opens |
| 10 Sanskari campaign cards generated | Generate only when Sanskari opens |
| 13 story cards generated | Generate only when Stories opens |
| Hidden-view static image URLs kept active | Defer the four current hidden-view static `<img>` sources and restore them on navigation |
| First Innerwear spin frame initialized while its view is hidden | Initialize when Innerwear opens |

These changes reduce synchronous DOM construction, attempt to defer inactive-view image requests once the app script runs, and allow a repeat navigation to fall back to cached HTML after a 1.8-second network wait. Actual milliseconds/bytes saved depend on the device, cache, connection and browser and have not been measured in production.

## Known remaining performance risk

The Innerwear image archive depends on external raw GitHub image URLs. This update does not mirror all 151 archive images locally; image-server/network latency can still be noticeable after opening that archive. Run the included live diagnostics after upload to see current browser results before deciding on the next optimization.
