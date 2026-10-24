# BLACKED V4 Phase 3 — Hinglish Install Guide

## Pehle audit ka result samjho

Tumne Phase 2 ZIP ke files repo mein upload kiye hain. Current `main` branch ka source check karne par `phase1-foundation.js` aur `phase2-core-experience.js` dono milte hain, **lekin `index.html` unhe load nahi karta**. Isliye sirf files upload hona = feature live hona nahi. Phase 3 ke liye After Dark, Wheels Hub aur Couples Studio modules bhi repo mein the, lekin current `index.html` unhe load nahi karta.

Innerwear view mein pehle tap ke synchronous handler ke andar image-deferral scan + catalogue/archive render hote the. Is patch mein main view/navigation pehle switch hota hai; image scan aur Innerwear render next paint/idle task mein chalte hain. Ye main thread ko block karne ka risk kam karta hai. Phir bhi live phone test ke bina freeze fix ko final PASS nahi bolna hai.

## ZIP mein kya hai

ZIP sirf Phase 3 ke **new files + integration patch + test/checklist/report** rakhta hai. Ismein original images ya `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, `phase1-foundation.js`, `phase2-core-experience.js` ki copied files nahi hain.

## Android/GitHub upload steps

1. ZIP download karke extract karo.
2. Repo kholo: https://github.com/bhanu13yadav1-ai/Brand-website-v2
3. `main` branch confirm karo. `Add file` → `Upload files` mein ZIP extract kiye folder ke **andar ke files** upload karo; extra `BLACKED_V4_PHASE3_DELTA/` folder ke andar mat rakhna. Files root mein honi chahiye.
4. Commit message rakho: `Add V4 Phase 3 selective integration and diagnostics`.
5. Ab repository editor mein existing files edit karo. `PHASE3_INTEGRATION.patch` local git users ke liye exact diff hai; GitHub phone editor `.patch` ko automatic apply nahi karta.

## Existing source files mein required edits

### A) `index.html`
Current last scripts mein is line ko dhoondo:

```html
<script src="./phase7-8-enhancements.js" defer></script>
```

Iske turant baad, `</head>` se pehle add karo:

```html
<script src="./phase1-foundation.js" defer></script>
<script src="./phase2-core-experience.js" defer></script>
<script src="./phase3-v4-experience.js" defer></script>
```

### B) `app.js` — Innerwear tap ko non-blocking banana
`function setView(name)` dhoondo. `prioritizeInnerwearCatalog();` ke baad ye helper add karo. Ye tap-handler ke andar archive render nahi karta; render ko next paint ke baad chalata hai.

```js
let innerwearEntryToken = 0;
function scheduleInnerwearRender(token) {
  if (token !== innerwearEntryToken || state.view !== 'innerwear') return;
  try {
    // Paint the screen first; image index initialization remains deferred separately.
    renderCatalog();
    renderImageLibrary(false);
    showSpinFrame(0);
    scheduleImageLibraryInit();
  } catch (error) {
    state.diagnostic.errors.push('Innerwear view render failed: ' + String(error));
    console.error('[BLACKED] Innerwear render failed', error);
    const status = $('#imageLibraryStatus');
    if (status) status.textContent = 'The optional image archive could not be rendered. The style catalogue and other sections remain available.';
  }
}
```

Usi `setView(name)` mein age-gate checks ke baad aur `state.view = name;` se just pehle ye line add karo:

```js
const previousView = $('.view.active');
```

Phir `state.view` set karne ke baad `const activeView = $('#view-' + name);` wali line ke baad ye block lagao. Ye images ko sabhi views se ek saath scan nahi karta; sirf active view ko hydrate karta hai aur pichhle view ki images ko idle mein defer karta hai.

```js
const activateViewImages = () => {
  if (state.view !== name) return;
  restoreDeferredViewImages(activeView);
};
if ('requestAnimationFrame' in window) requestAnimationFrame(() => window.setTimeout(activateViewImages, 0));
else window.setTimeout(activateViewImages, 0);
const deferPreviousImages = () => { if (previousView && previousView !== activeView) deferInactiveViewImages(previousView); };
if ('requestIdleCallback' in window) window.requestIdleCallback(deferPreviousImages, { timeout: 900 });
else window.setTimeout(deferPreviousImages, 100);
```

Ab existing `if (name === 'innerwear') { ... }` block ko replace karo:

```js
if (name === 'innerwear') {
  const token = ++innerwearEntryToken;
  const catalog = $('#catalogGrid');
  const archive = $('#imageLibraryGrid');
  if (catalog && !catalog.childElementCount) catalog.innerHTML = '<p class="muted" role="status">Preparing the style catalogue…</p>';
  if (archive && !archive.childElementCount) archive.innerHTML = '<p class="muted" role="status">The image archive loads separately below.</p>';
  if ('requestAnimationFrame' in window) requestAnimationFrame(() => window.setTimeout(() => scheduleInnerwearRender(token), 16));
  else window.setTimeout(() => scheduleInnerwearRender(token), 40);
}
```

**Important:** `deferInactiveViewImages()` ko global replace mat karna. Other views ka existing feature code untouched rehna chahiye. Sabse safe method local git se `git apply --check PHASE3_INTEGRATION.patch` chala kar patch apply karna hai; GitHub phone editor mein snippet-wise manual edits sirf tab karo jab exact old block mil raha ho.

### C) `sw.js`

Cache version ko badlo:

```js
const CACHE_NAME = 'blacked-v4-phase3-innerwear-stability-3';
```

`CORE` array mein ye unversioned paths add karo (agar pehle se nahi hain). Loader bhi yehi paths use karta hai, isliye precache entries aur requests match karte hain:

```js
'./phase1-foundation.js', './phase2-core-experience.js', './phase3-v4-experience.js',
'./phase9-after-dark.js', './phase9-after-dark.css', './phase12-wheels-hub.js', './phase12-wheels-hub.css',
'./phase13-couples-studio.js', './phase13-couples-studio.css', './phase3-v4-live-diagnostics.html',
```

### D) `manifest.webmanifest`

`name`, `short_name`, `description` ko `PHASE3_INTEGRATION.patch` ke updated values se replace karo. `start_url`, `scope` aur icon ko as-is rakho.

### E) Master plan status

`BLACKED_V4_MASTER_PLAN.md` mein Phase 1, 2 aur 3 ko **IN PROGRESS** hi rakho. Live diagnostics + Android checks pass hone se pehle koi phase DONE nahi hoga. Master-plan file intentionally ZIP mein copy nahi hai.

## Patch apply karne ka easier local-git method

Repo ka fresh checkout lo, ZIP files root mein copy karo, phir:

```bash
git apply --check PHASE3_INTEGRATION.patch
git apply PHASE3_INTEGRATION.patch
```

Agar `--check` fail ho, patch ko force mat karna—source update hua ho sakta hai. Current GitHub files ka exact diff dobara check karke apply karo.

## Deploy ke baad live test

GitHub Actions → Pages workflow green hone ke baad pehle hard refresh karo. Phir kholo:

`https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase3-v4-live-diagnostics.html`

`Run live checks` dabao. Report mein Phase 1/2 API, Phase 3/4 bundle, After Dark, four-wheel hub, Couples Studio, Innerwear tap dispatch + 75ms timer heartbeat, duplicate IDs aur mobile overflow statuses dikhenge. `Download JSON report` se report save karke chat mein upload karna.

## Jo is phase mein intentionally nahi chheda

Phase 10 Wellness Education, Phase 11 Fit Studio aur Phase 14/15 final privacy/release modules ko is Phase 3 loader se load nahi kiya jaata. Ye Phase 4/5 exit gates hain, forgotten nahi. Existing products/images/storage keys delete ya replace nahi hote. Product/order/checkout/payment ko real commerce ke roop mein present nahi karna hai.
