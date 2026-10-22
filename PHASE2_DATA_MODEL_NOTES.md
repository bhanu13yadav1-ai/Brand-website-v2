# Phase 2 Data Model Notes

## Why a graph first

The current app is a static multi-view site. In this phase, avoid a framework rewrite. The content graph defines stable route IDs and media placements while preserving `app.js` story/catalogue stores and their existing IDs. It intentionally does not duplicate the existing 151-record image archive or hard-code all current stories a second time.

## Next schema expansion

In Phase 3, inventory current story IDs, series/chapter IDs, choice branches and both endings directly from `app.js`. Then add those items and explicit edge types (`next_chapter`, `alternate_ending`, `mood_match`) to the graph, validated against the original data. In Phase 4, add actual wheel sector IDs/result handlers; the `existingKey` aliases in this phase are references, not a replacement for runtime wheel logic. Product SKU nodes must wait for verified supplier/brand data.

## Stable ID convention

- `route.*` — existing app views.
- `wheel.*` — existing wheel keys.
- `asset.p2.*` — media introduced in Phase 2.
- `component.*` — additive interface components.

Keep IDs immutable after a release. For renames, use redirects or a documented migration and tests, rather than silently changing a saved reference.
