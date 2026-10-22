# Phase 3 — Design tokens, responsive layout and visual hierarchy

Status: **prepared locally; not deployed or visually verified against live GitHub Pages**.

## Scope
- Added `phase3-design-system.css` as an additive layer after existing core and Phase 1–2 styles.
- Reuses the site's existing dark palette and sets consistent spacing, readable body text and card radii rather than replacing the theme.
- Makes form controls and primary touch controls at least 44 CSS pixels high where the overlay can safely target them.
- Fixes campaign/reference images to use contained framing inside reserved-aspect-ratio cards so poster headlines, bottom labels and branding are not cropped off.
- Adds 320–390 px single-column fallbacks and 391–760 px two-column destinations, then wider editorial grids.
- Adds clear focus rings and reduced-motion behavior.
- Keeps the existing view IDs, DOM structure, original feature stylesheets and controls intact.

## Research basis
- WCAG 2.2 Reflow calls for preserving content/functionality at a 320 CSS-pixel viewport without two-dimensional scrolling where the content does not inherently require it: https://www.w3.org/TR/WCAG22/#reflow
- MDN explains that intrinsic width/height or aspect-ratio reserves space and reduces image layout shifts, and `object-fit: contain` preserves the full image rather than clipping it: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img and https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit

## Test boundary
Static CSS structure was checked. Live viewport, contrast, focus, screen-reader and Android Chrome verification still require the new overlays to be deployed and tested using `phase34-diagnostics.html` plus manual browser checks.
