# BLACKED Phase 1–2 Review ZIP (Hinglish)

## Is ZIP mein kya hai?
- Actual deployed GitHub Pages snapshot par based complete site files and root image assets.
- Phase 1 baseline audit + separate unchanged baseline backup archive (downloaded separately).
- Phase 2 source/asset audit, local image path fixes, the existing Phase 2 photo collection overlay, and a run-it-yourself diagnostics page.
- No Phase 3–15 scripts have been activated in this review copy.

## Confirmed fixes
Runtime paths also corrected in `phase23-diagnostics.html` and `phase4-diagnostics.html` so the bundled-image tests no longer use the old nested image paths.
1. Homepage ke do image URLs nested `assets/sanskari/` se root image path par correct hue.
2. `part-c-enhancements.js` ab root-level bundled images use karta hai, kyunki actual images root par hain.
3. `sw.js` ke 31 nested image pre-cache paths existing root-level filenames par correct hue; cache version changed.
4. Existing Phase 2 photo collections stylesheet/script ko `index.html` mein add kiya—Noor, Innerwear editorial, Grace preview aur already gated multi-adult gallery mein new local photo references.
5. All 151 remote archive filenames were checked against current upstream GitHub main-tree inventories. Runtime HTTP image delivery abhi browser se test karna baaki hai.

## Kaise check karein (PC)
1. ZIP extract karo.
2. Extracted folder ke andar `start-preview-windows.bat` (Windows with Python) ya terminal mein `python3 serve.py` chalao.
3. Browser mein `http://127.0.0.1:8765/index.html` kholo.
4. Image checks ke liye `http://127.0.0.1:8765/phase2-image-diagnostics.html` kholo.
5. Pehle **Check local images**, phir internet available hone par **Check 151 URLs**. Results ka CSV download karke share kar sakte ho.

## Android phone par check karne ke steps
Android ke browser ko local files se `fetch()`/service worker allow na karne ki wajah se double-click `index.html` ka result reliable nahi hota. Is ZIP mein source complete hai. Android par local server chalane ke liye Termux + Python use kar sakte ho:

```sh
termux-setup-storage
pkg update
pkg install python
cd /sdcard/Download/BLACKED_PHASE1_2_REVIEW
python -m http.server 8765 --bind 127.0.0.1
```

Folder location agar alag ho to `cd` path update karo. Same phone par Chrome kholkar `http://127.0.0.1:8765/index.html` visit karo. Agar Termux use nahi karna, review ZIP ko ek separate test branch/repository par upload karke preview check karo—live `main` ko overwrite mat karna.

## Important boundaries
- ZIP local review copy hai. It has **not** been pushed back to GitHub.
- Browser automation, user-network 151-image requests, live Pages after repair, and physical Android Chrome are **NOT TESTED** in this environment; use the diagnostics page.
- The `LOAD FAILED` browser result alone cannot distinguish 404 from DNS, connection, policy or temporary failure.
- Current site is a front-end prototype; no real stock/checkout/payment/backend is configured.
- Phase 3–15 are intentionally left inactive so this ZIP stays limited to the agreed Phase 1 and Phase 2 work.

## Snapshot info
- Repo: https://github.com/bhanu13yadav1-ai/Brand-website-v2
- Branch: `main`
- Captured Pages build head commit: `12ae0b208d056b39bba4c4b5b981d08f59ba30f0`
- Build workflow run: https://github.com/bhanu13yadav1-ai/Brand-website-v2/actions/runs/39769566213
