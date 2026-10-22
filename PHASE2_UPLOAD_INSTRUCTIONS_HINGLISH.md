# Phase 1–2 Package Upload — Hinglish (Android-friendly)

**Important:** yeh package GitHub `main` par automatically upload nahi hua. GitHub connector ne safe branch create karte waqt HTTP 403 diya. Yeh files local ready hain, live website tab tak change nahi hogi jab tak inhe repository root mein upload aur do small integration changes nahi kiye jaate.

## 1. ZIP ke andar kya hai?
- `phase2-photo-collections.js` — new photo galleries aur large preview
- `phase2-photo-collections.css` — responsive gallery styling
- `assets/...` — eight optimized WebP photos
- `V3_MASTER_PROJECT_NOTES.md` — saare 15 phases aur next-session handoff
- `notes/PHASE1_BASELINE_AUDIT.md` aur `notes/PHASE2_IMAGE_AUDIT.md`
- `notes/PHASE2_IMAGE_MANIFEST.csv` — originals/published image hashes aur size record

## 2. GitHub par files upload karna
1. ZIP extract karo.
2. Repository kholo: https://github.com/bhanu13yadav1-ai/Brand-website-v2
3. Root folder mein `phase2-photo-collections.js` aur `phase2-photo-collections.css` upload karo.
4. ZIP ke andar ke `assets` folder ko merge karke uske subfolders/assets upload karo; `assets` folder ko nested `BLACKED_V3_Phase1_2_Package` ke andar mat chhodna.
5. `V3_MASTER_PROJECT_NOTES.md` aur `notes` folder ko repo root mein upload karo. Pehle se maujood file ko replace karne ke bajaaye unique filename use karo agar GitHub conflict dikhaye.

## 3. index.html mein do lines add karna
`<head>` mein existing line ke baad:

```html
<link rel="stylesheet" href="./part-c-enhancements.css">
```

ye add karo:

```html
<link rel="stylesheet" href="./phase2-photo-collections.css">
```

End of `index.html` ke script group mein existing line:

```html
<script src="./part-c-enhancements.js" defer></script>
```

iske turant baad add karo:

```html
<script src="./phase2-photo-collections.js" defer></script>
```

## 4. sw.js cache update
`CACHE_NAME` ko unique new value do, e.g.:

```js
const CACHE_NAME = 'blacked-v2-phase5-noor-gallery-1';
```

`CORE` list mein ye entries add karo:

```js
'./phase2-photo-collections.js','./phase2-photo-collections.css',
'./assets/noor-edit/noor-ka-nasha.webp',
'./assets/noor-edit/tradition-outside-desire-inside.webp',
'./assets/noor-edit/shaam-e-noor.webp',
'./assets/noor-edit/shaam-se-raat-tak.webp',
'./assets/innerwear-gallery-v3/made-for-quiet-moments.webp',
'./assets/innerwear-gallery-v3/rest-restore-rise.webp',
'./assets/grace-edit/sacred-elegance.webp',
'./assets/triad-gallery-v3/innerwere-campaign-trio.webp',
```

`CORE` array mein pehle se kisi comma ke baad entries add karna; duplicate comma ya bracket mat banana.

## 5. Deploy ke baad checks
- Website kholo aur browser/cache ko refresh karo.
- Sanskari Edit: `Noor Edit — Campaign Gallery` ke 4 cards dikhein; search/filter work karein; card tap se large preview khule.
- Innerwear: existing catalogue ke baad 2 naye editorial cards dikhein.
- Sanskari ka Grace Edit Coming Soon card existing rahe aur naya visual preview uske andar ho.
- Boyfriend & Couples → Threesome Fantasy: extra group image sirf existing 18+ gate accept karne ke baad hi dikhe.
- Broken photo ho to status mein exact local path show ho; image ko silently hidden/faked na samjho.
- Mobile widths 320, 360, 390 aur 430 CSS px; close button; Escape key; back button/navigation test karo.
- Existing diagnostics: `phase23-diagnostics.html`, `phase4-diagnostics.html`; new add-on diagnostics console: `window.BLACKED_V3_PHASE12.getDiagnostics()`.

## 6. Preserve these existing files
In files ko wholesale replace/delete mat karna: `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, `size-chart-template.json`. Existing sections, user data, saved preferences aur 3 original wheel locations must remain.
