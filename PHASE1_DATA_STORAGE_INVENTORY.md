# Phase 1 — Data & Storage Inventory

## Source-observed local/session keys

| Key | Purpose observed/inferred from call sites | Required preservation rule |
|---|---|---|
| `blackedV1Wishlist` | saved product/style IDs | Do not rename/drop; test reload and clear. |
| `blackedV1Bag` | sample/demo bag contents | Preserve, label as demo; never imply that an order/payment occurred. |
| `blackedV1FitNotes` | Fit Studio notes | Keep local-only description honest and test clear flow. |
| `blackedV1AdultConfirmed` | code constant used for adult confirmation path | Verify whether stored in session/local storage at every call site; do not call it formal age verification. |
| `blackedV1PartBStoryVault` | optional story bookmarks/progress | Keep explicit opt-in and clear action; storage is not described as encrypted/synced. |
| `blackedV1MeasurementsOptIn` | opt-in for measurement-related state | Preserve opt-in semantics; avoid storing sensitive measurements unless strictly needed and clearly consented. |

The code contains other browser storage access and key occurrences; before any data schema change, inspect every `getItem`, `setItem`, `removeItem`, `clear`, `sessionStorage` and service-worker cache key. This audit makes no storage changes and is not a full privacy/security assessment.

## No migration performed

No local data was read, changed, deleted or migrated during this read-only Phase 1. Future phases must test an upgrade path with seeded old keys, opt-in/off paths, clear controls, storage unavailable/quota errors, and rollback.
