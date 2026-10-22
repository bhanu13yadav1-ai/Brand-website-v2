# Phase 5–8 Upload — Simple Hinglish

**Ye ZIP sirf changed/new files rakhta hai.** Existing core files aur images ki duplicate copies nahi hain.

## Step 1 — Changed files replace karo
GitHub repo `bhanu13yadav1-ai/Brand-website-v2` ke root folder mein jao. In 5 existing files ko package wale versions se replace karo:
- `phase2-photo-collections.js`
- `phase5-6-asset-manifest.json`
- `phase5-6-loader.js`
- `phase6-boyfriend-studio.js`
- `phase6-boyfriend-preview.html`

## Step 2 — New files add karo
- `phase7-8-enhancements.js`
- `phase7-8-enhancements.css`
- `phase7-8-diagnostics.html`

## Step 3 — index.html mein ek line add karo
`<head>` mein existing line ` <script src="./part-c-enhancements.js" defer></script> ` ke turant baad ye line add karo:

`<script src="./phase5-6-loader.js?v=7.8.0" defer></script>`

Patch file `INDEX_INSERT_PHASE78.patch` mein bhi diya hai. Is line ke bina naya design run nahi hoga.

## Step 4 — Service worker cache update
`sw.js` ke `CACHE_NAME` ko `blacked-v3-phase78-integration-1` karo aur `SW_CACHE_PATCH.txt` mein listed root files ko `CORE` array mein add karo. Purane CORE entries delete mat karna.

## Step 5 — Live tests
Pages publish hone ke baad `phase7-8-diagnostics.html` kholo, **Run runtime checks** aur **Check bundled photos** dono chalao. Phir mobile widths 320, 360, 390, 430 CSS px par manually check karo. Agar checks fail hon, report ka raw result copy karke bhejna.

**Important:** GitHub connector returned 403 for writes in this run, so remote changes haven't been published by the assistant. Static tests passing is not the same as a live browser pass.
