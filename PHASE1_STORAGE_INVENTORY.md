# Phase 1 — Browser Storage and Privacy Inventory

**Scope:** source inspection only. No browser storage from real visitors was read, changed or exported.

| Key / key family | Purpose observed or source-indicated | Phase 1 rule |
|---|---|---|
| `blackedV1Wishlist` | Saved styles/product IDs | Preserve; test save, remove, reload. |
| `blackedV1Bag` | Sample/demo bag contents | Preserve and clearly label demo-only; no real checkout is enabled. |
| `blackedV1FitNotes` | Fit Studio notes | Preserve; test save and delete. |
| `blackedV1AdultConfirmed` | Legacy adult confirmation state | Treat as self-attestation only, not verified age. Verify actual storage call sites. |
| `blackedV1PartBStoryVault` | Optional story bookmarks/progress | Keep opt-in; preserve and test clear/export if present. |
| `blackedV1MeasurementsOptIn` | Measurement-related opt-in state | Preserve opt-in semantics; never silently store measurements. |
| `blackedDeltaSaved`, `blackedDeltaBag`, `blackedDeltaFitNotes` | Legacy/alternate module keys observed in `app.js` | Map all reads/writes before migration; do not delete based on key name alone. |
| `blacked31FitNote`, `blacked31Adult` | Legacy/alternate module keys observed in `app.js` | Verify remaining callers and data-migration needs before any cleanup. |
| `blackedV4PreferenceFirst` | Preference-first profile: vibe, optional size/thickness references, appearance/build, language and tone preferences | Sensitive by context; provide clear notice and user-controlled clear/reset. Local storage is not encryption. |
| `blackedV4GaaliLevel` | Dialogue intensity preference | Preserve existing preference; test language/level sync. |
| `blackedV4Phase17` | Phase 17 generation selections/state | Inspect call sites and retention; keep local by default and offer a clear action. |
| `blackedV4Phase17Favourites` | Saved generated-item/favourite records | Test save/load/delete/clear after refresh. |
| `blackedV4P17ProductFaves` | Saved wellness category/product references | Test add/remove/reload and deletion. |
| `blackedV4DatePlan` | Couples/date planning state (source-observed in Phase 3 V4 module) | Verify whether stored plan includes personal details; test clear. |
| Other keys accessed through variable names | Module-local helpers may read/write keys via constants such as `STORY_VAULT_KEY` or `COMPARE_KEY` | Complete call-site inventory before touching the schema. |

## Required tests before Phase 2/3 changes

- Use a fresh QA browser profile; do not inspect a visitor's existing personal data.
- Seed dummy records under legacy keys and verify they remain readable after updates.
- Save, reload, edit and delete wishlist, bag, fit notes, story progress, preferences, favourites and date plan where applicable.
- Test storage disabled, malformed JSON and quota/error handling.
- Verify each clear/delete control removes only its own data, and stays cleared after reload.
- Never call `localStorage.clear()` to force a cache update.
- Clearly state that browser-local data can remain on a shared device and is not necessarily encrypted.
