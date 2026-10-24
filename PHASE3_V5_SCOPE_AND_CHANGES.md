# BLACKED V5 Phase 3 — scope and feature coverage

## Governing scope

Follow `BLACKED_V4_MASTER_PLAN.md` Phase 3: the bold/playful interactive engine, not a replacement website. Keep Phase 4 wellness/fit work for its own phase; existing modules remain untouched.

## Scope delivered in this package

1. **Phase 2 wiring:** activates the uploaded `phase2-premium-ux.css` and `.js` via `index.html`, and caches both files in the service worker.
2. **Phase 3/4 recovery:** adds a small warning only when expected feature markers remain missing after the dynamic-loader window. A retry triggers a normal reload; no saved state or cache is cleared.
3. **Feature diagnostics:** exposes a no-data `window.BLACKED_V5_PHASE3.getDiagnostics()` report for seven views, Phase 1/2 APIs, mood studio, fantasy builder, After Dark, Wheels Hub, Couples Studio, four wheel nodes, age-gate selectors, duplicate IDs and references.
4. **Innerwear responsiveness:** delays catalogue/archive render until after the navigation frame paints; ignores stale queued render requests after users navigate away; catches rendering errors and reports status.
5. **PWA update:** versions the service-worker cache and includes Phase 2/3 diagnostics assets in its root-level core list.
6. **Brand metadata:** updates the document title, app manifest name and short name from V4 to V5.
7. **Existing photos:** uses asset references already tracked in root, including the local images referenced by `phase13-couples-studio.js`. It does not copy, regenerate, rename or delete image binaries.

## Phase 3 features retained and checked

- Existing Dildo, Plug, Boyfriend and Wild wheel selectors/engine ownership.
- Existing 18+ self-attestation gate on protected screens and adult studio.
- Existing language, mood, optional slang, reset/skip and fictional prompt flow.
- Existing Phase 4 fantasy builder remains in the combined bundle; this package does not duplicate it.
- Phase 9 After Dark, Phase 12 Wheels Hub and Phase 13 Couples Studio keep their original modules and API names.
- Existing date planner, message generator, copy fallback and consent/boundary wording remain in their current modules.
- Seven views, product/story assets, local-storage keys and product/story IDs stay unchanged.

## Out of scope / not claimed

- No backend accounts, payments, real checkout, booking, current inventory or real people data.
- No actual wheel animation, button, clipboard or Android test is auto-simulated by the new diagnostic page.
- No claim that image rights, brand ownership or publication rights have been independently cleared.
- No production commit/deploy is claimed.
