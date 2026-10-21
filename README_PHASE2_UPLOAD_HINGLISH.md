# V1 Phase 2 — Upload Guide (Hindi/Hinglish)

## Ye package kya hai?
Ye **overlay patch** hai jo current public repository `bhanu13yadav1-ai/Brand-website-4f` ke liye bana hai. Ye poori website source/assets ka ZIP nahi hai. Iska kaam current root-level `app.js`, `styles.css`, aur image files ko preserve karte hue broken nested paths ko resolve karna hai.

## Kya change hota hai?
- `css/styles.css`: existing root `styles.css` ka compatibility wrapper.
- `js/app.js`: existing root `app.js` load karta hai, legacy `assets/<root-file>` paths ko root file par map karta hai, aur corrected service worker register karta hai.
- `sw.js`: incorrect old precache paths ko correct root paths se replace karta hai; old `assets/<filename>` requests ke liye same-scope fallback deta hai; cache version update karta hai.
- `manifest.webmanifest`: app icon paths root files ke saath match karta hai.
- `phase2-diagnostics.html`: upload ke baad file routes, image previews aur original wheel markup check karne ke liye.

## Android se GitHub par upload
1. ZIP download karke extract karo.
2. GitHub par `Brand-website-4f` kholo aur confirm karo ki branch `main` hai.
3. `Add file` → `Upload files` kholo.
4. Extracted folder ke **andar ke contents** upload karo, folder ko ek extra nested directory ke andar upload mat karna.
5. Paths ko isi tarah preserve karo: `css/styles.css`, `js/app.js`, `sw.js`, `manifest.webmanifest`, `phase2-diagnostics.html`, aur ye README.
6. Existing `sw.js` aur `manifest.webmanifest` replace honge. Existing `index.html`, root `app.js`, root `styles.css`, aur saare original root image files ko delete/replace mat karna.
7. Commit message: `Phase 2: repair asset paths and app loading compatibility`.
8. Upload ke baad `phase2-diagnostics.html` ko GitHub Pages URL par open karo. Current Pages URL agar `https://bhanu13yadav1-ai.github.io/Brand-website-4f/` hai, toh diagnostics URL hoga `https://bhanu13yadav1-ai.github.io/Brand-website-4f/phase2-diagnostics.html`. Agar GitHub Pages ka actual URL alag ho, usi URL mein filename add karna.
9. First visit par service worker install hone do. Diagnostics ko ek baar refresh karke legacy `assets/` path tests dobara chalao.
10. `Open main website` par click karke navigation, images, search/filter, wishlist/bag, Boyfriend, aur original 3 wheels manually test karo.

## Limitations (please read)
- Ye package existing `Brand-website-4f` repo mein upload karne ke liye hai; blank/new repo mein standalone website nahi hai.
- Patch existing source files aur image binaries ko ZIP ke andar duplicate nahi karta. Original files repository mein maujood rehne chahiye.
- Path rewriting is repository ke current root-asset layout ko target karta hai. Nested future paths jaise `assets/new-gallery/photo.webp` ko root mein flatten nahi karega.
- Diagnostics page wheel controls ka source markup verify karta hai; complete real-browser wheel interaction manual testing phir bhi zaroori hai.
- Live GitHub Pages upload / Android device test assistant ne nahi kiya. Isliye deployment ko PASS tabhi mark karna jab tum apne live page par verify kar lo.
- Agar tumhare repo mein file structure is audit ke baad badal chuka hai, pehle `main` ka current structure dobara check karo.
