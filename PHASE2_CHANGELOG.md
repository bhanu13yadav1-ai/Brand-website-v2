# Phase 2 Changelog — Connected Architecture

## Added
- `phase2-content-graph.json`: single source of truth for seven current views, four existing wheel keys, new media, and route relationships.
- `architecture/phase2-content-graph.schema.json`: JSON Schema for the graph.
- `architecture/mobile-design-tokens.json`: current brand-aligned design and accessibility contract.
- `phase2-experience-architecture.js` / `.css`: additive media galleries, related-destination rail, click-to-preview dialog, and missing-image status.
- Eight new WebP assets in `phase2-assets/`.
- `tools/validate_phase2.py`, source-diff patches, photo manifest, preview and QA/handoff reports.

## Existing features preserved by design
- No modifications to existing story or product records.
- No changes to existing storage keys or saved data.
- No real payment/cart/stock claims added.
- No wheel logic or adult gate implementation replaced.
- No full existing HTML/CSS/JS/data files included in this ZIP.

## Scope / publication guards
- The visual assets are concept/editorial references, not live inventory.
- Claims embedded in cooling/fabric/battery/fitness-themed posters are unverified.
- Brand labels BLACKED, BLXCKED, CLAM COOLER 3000 and INNERWERE are not automatically treated as the same brand.
- Image permissions and the production host's current content policy are not confirmed.
