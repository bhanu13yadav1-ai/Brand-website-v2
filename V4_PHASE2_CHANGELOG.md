# BLACKED V4 Phase 2 — Delta changelog

## New functionality in this package
- `phase2-core-experience.js`: adds a conditional Home Continue Reading card using the existing opt-in local Story Vault; it does not invent history, write to the old vault key, or bypass the age gate.
- Adds compact Clear Filters / Reset Styles / Reset Archive Filters controls for Story search, catalogue and image archive controls.
- Adds optional persistence for up to three comparison IDs using new local key `blackedV4CompareIds` and restores them once after Innerwear opens.
- Adds a minimal style layer aligned to the current dark-pink-gold theme.
- `phase2-live-diagnostics.html`: same-origin live runtime diagnostic with JSON export.
- Adds phase-1 re-audit, install instructions, 40-feature coverage map, QA checklist and source-diff patches.

## Preservation
- This is an additive delta. No existing `index.html`, `app.js`, `sw.js`, CSS, media, story JSON, image manifest or existing feature module is included.
- Existing storage names for story vault, wishlist, bag and fit notes are not replaced.
- Existing views, wheels, content, external asset archives and user data are not removed.
- Product records remain concept/reference only; no real checkout, stock or payment feature is added.

## Required existing-file edits (patch supplied)
- Add two defer script tags at the end of current head scripts to load the already-uploaded Phase 1 foundation then the new Phase 2 module.
- Bump service-worker cache name and precache both modules.
- Update stale V2.4 manifest labels.
- Update V4 master plan tracker without marking Phase 1 passed prematurely.

## Validation done during package build
- `node --check phase2-core-experience.js`: PASS.
- Extracted inline JavaScript in `phase2-live-diagnostics.html` and ran `node --check`: PASS.
- ZIP contents reviewed for duplicate images/current app source files: checklist included with build report.

## Not claimed
- No live browser pass: this environment could not inspect GitHub Pages interactively.
- No Android touch test, external image HTTP validation, PWA install test, screen-reader audit or performance certification.
- The package is not active until its two new script tags and service-worker/manifest patch are applied and committed.
