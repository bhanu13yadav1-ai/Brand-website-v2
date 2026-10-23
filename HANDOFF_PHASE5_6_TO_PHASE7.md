# Handoff — Phase 5 + 6 → Phase 7

## Source of truth
Keep the existing BLACKED V2 site and app modules intact. Do not replace the site template or drop existing catalog, image archive, wishlist, demo bag, compare, wheels, story universe, wellness calculator/worksheet, collections, or Fit Studio behaviors.

## Phase 5 status
- Discovery filters / evidence tags / seller-transparency panels authored in `phase5-product-discovery.js/.css`.
- All current eight product concepts intentionally remain reference-only.
- Planned sales model choices are guidance only: no sales toggle, purchase URL, stock claim, live checkout or payment flow.
- Fill the product register from the real supplier/brand owner, then require human approval before any listing becomes sale-ready.

## Phase 6 status
- Additive wellness module with original SVG diagrams.
- Collection jump-nav for existing Sanskari, Noor and Grace previews; religious/cultural disclaimers preserved.
- Fit Studio privacy hint; image rights panel and register. Rights are not yet verified for all existing assets.

## Files to integrate
- `phase5-product-discovery.js`, `phase5-product-discovery.css`
- `phase6-wellness-collections.js`, `phase6-wellness-collections.css`
- `assets/phase6-measurement-map.svg`
- `assets/phase6-product-specs.svg`
- `assets/phase6-comfort-check.svg`
- `assets/phase6-image-rights-workflow.svg`
- `phase5-diagnostics.html`, `phase6-diagnostics.html`
- `patches/INDEX_PHASE5_6_INSERT.patch`, `patches/SW_CACHE_PHASE5_6.patch`

## Gate to Phase 7
Do not call Phase 5–6 production-complete until browser diagnostics pass, every original wheel and existing UI is regression-tested, all critical images load locally/offline, mobile layout and keyboard focus are tested on an actual Android browser, and a human approves any real product/seller/media rights evidence. A failed/unknown check remains visibly pending.
