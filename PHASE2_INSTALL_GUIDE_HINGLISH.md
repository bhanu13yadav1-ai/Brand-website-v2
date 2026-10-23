# BLACKED V4 Phase 2 — Upload & Integration Guide (Hinglish)

## Pehle ek zaroori finding
Phase 1 ki JavaScript aur diagnostic file repository mein present hain, lekin current `index.html` mein `phase1-foundation.js` ka script tag abhi nahi mila. Isliye Phase 1 files upload hui hain, par foundation runtime abhi active hone ka proof nahi hai. Phase 2 ke integration patch mein dono scripts connect karne ke exact changes hain.

## ZIP ka rule
Ye **delta ZIP** hai: ismein sirf naye Phase 2 files, diagnostics aur patches hain. Purani images, `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, existing story data, wheels aur existing JS/CSS files ko ZIP mein duplicate nahi kiya gaya.

## Upload steps
1. ZIP extract karo.
2. Sirf new files ko existing `Brand-website-v2` repository ke root mein upload karo. Existing image ya source files delete/replace mat karna.
3. `PHASE2_INTEGRATION.patch` kholo. GitHub web editor use kar rahe ho toh neeche diye edits manually apply karo; local checkout ho toh patch apply kar sakte ho.

### `index.html` mein two script tags
Is existing line ko search karo:

```html
<script src="./phase7-8-enhancements.js" defer></script>
```

Iske turant neeche ye dono lines add karo, order same rakhna:

```html
<!-- BLACKED V4 Phase 1 foundation -->
<script src="./phase1-foundation.js?v=4.1.0" defer></script>
<!-- BLACKED V4 Phase 2 core experience -->
<script src="./phase2-core-experience.js?v=4.2.0" defer></script>
```

### `sw.js`
- `CACHE_NAME` ko `blacked-v4-phase2-core-experience-1` par update karo.
- `CORE` list mein `./phase1-foundation.js` aur `./phase2-core-experience.js` add karo.
- Baaki cache behavior ko rewrite mat karna aur local user data clear mat karna.

### `manifest.webmanifest`
- `name` ko `BLACKED — V4 Core Experience` karo.
- `short_name` ko `BLACKED V4` karo.
- Description ko current V4 core experience / adult fiction / wellness prototype ke hisaab se update karo; start URL, scope aur icon paths unchanged rakho.

### Master-plan progress
`PHASE2_INTEGRATION.patch` mein `BLACKED_V4_MASTER_PLAN.md` tracker ke liye bhi patch hai. Phase 1 ko complete mark mat karo jab tak diagnostic mein Phase 1 API `PASS` na ho. Phase 2 ko in progress mark karna hai.

## Deploy ke baad
1. GitHub Pages action ka result `success` hona chahiye.
2. Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase1-live-diagnostics.html`; run checks aur JSON download karo.
3. Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase2-live-diagnostics.html`; Run live checks aur JSON download karo.
4. Actual Android Chrome par Home, Stories, continue reading, catalogue reset, image archive reset, viewer swipe, wishlist, comparison reload, bag quantity controls aur age-gated screens check karo.

## Data safety
- Existing story reading data key `blackedV1PartBStoryVault`, wishlist and sample bag keys ko delete/rename mat karna.
- Phase 2 comparison uses a new local-only key `blackedV4CompareIds`; it stores only up to three concept IDs, not personal details.
- Continue-reading card only appears when Story Vault was explicitly enabled and a last-read record exists. It does not auto-confirm 18+.
- Bag and prices remain sample/demo only. The website still has no real order, seller, stock or payment backend.
