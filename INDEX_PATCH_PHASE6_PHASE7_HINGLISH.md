# Exact index.html changes (Phase 6 complete + Phase 7 final)

**Do not replace the whole `index.html`.** Open the existing file on the `main` branch and make these exact reference changes only.

## Remove these 6 old direct-loading references

```html
<link rel="stylesheet" href="./phase6-boyfriend-studio.css">
<link rel="stylesheet" href="./phase6-wellness-collections.css">
<link rel="stylesheet" href="./phase7-8-enhancements.css">
<script src="./phase6-boyfriend-studio.js" defer></script>
<script src="./phase6-wellness-collections.js" defer></script>
<script src="./phase7-8-enhancements.js" defer></script>
```

## Add these 2 small lazy loaders once

Place them after the existing `<script src="./phase5-product-discovery.js" defer></script>` reference (or at the end of the existing script list, before `</head>`):

```html
<script src="./phase6-lazy-loader.js" defer></script>
<script src="./phase7-8-lazy-loader.js" defer></script>
```

No other markup needs to change. The two old Phase 6 modules and Phase 7/8 modules are already combined into `phase6-combined-ux.js` and `phase7-8-combined.js`; their styling is injected when those bundles are requested. Both bundles are deferred until a visitor first opens the relevant screen.

If any one of the six old reference lines is already absent in the repository you see, do not add it back—only add each loader once.
