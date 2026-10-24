# BLACKED V5 — Phase 3 Complete Package (Hinglish Guide)

## Phase 1 aur 2 ka fresh repo check

Repo: https://github.com/bhanu13yadav1-ai/Brand-website-v2
Current `main` HEAD at audit time: `94a853defd885a4d53a9e5da428e0e6e68469a6b`.

- Aapke uploads `main` par aa gaye hain. Latest commit ne Phase 2 premium CSS/JS aur Phase 2 installer/validator/report files add kiye.
- `phase2-premium-ux.css` aur `phase2-premium-ux.js` repo root mein hain, lekin fresh `index.html` inhe reference nahi karta aur `sw.js` inhe precache nahi karta. Sirf files upload karne se features active nahi hote.
- Seven original views (`home`, `stories`, `innerwear`, `sanskari`, `wellness`, `boyfriend`, `fit`) abhi `index.html` mein maujood hain.
- Four wheel selectors (`dildo`, `plug`, `boy`, `wild`) existing code/modules mein hain. Is package ka kaam unki logic copy karna nahi hai.
- Phase 3/4 combined bundle `app.js` se dynamically load hota hai. Existing selective loader Phase 9 After Dark, Phase 12 Wheels Hub aur Phase 13 Couples Studio ke modules ko load karne ke liye bana hua hai. Live runtime/Android verification phir bhi pending hai.
- `app.js` mein Innerwear view activate hote waqt catalogue aur large image archive abhi synchronous render hote hain. Is package ka installer us work ko next paint ke baad schedule karta hai, taaki tap par main thread ka kaam kam ho.
- Repo ke local assets—jaise `own-your-balance.webp`, `same-room-different-feelings.webp`, `same-girl-different-stories.webp`, `garden-lace-trio.webp`, `poolside-trio-editorial.webp`, aur `phase16-host-avatar.svg`—ko hi reference kiya gaya hai. Koi naya/generated duplicate photo bundle mein add nahi kiya.
- Repo mein backup/rollback documentation hai, lekin `main` ke alawa koi backup branch fresh branch listing mein nahi thi. Installer apne local use par original files ka backup repository ke bahar banata hai.

## Phase 3 mein kya hai?

1. Phase 2 premium UX CSS/JS ko actually link aur service-worker cache mein add karna.
2. Existing four wheels, original wheel logic aur locations ko preserve karna.
3. Existing mood/language/Desi-gaali controls, 18+ self-attestation, fantasy builder, After Dark, Wheels Hub, Couples Studio, date planner aur message tool ko replace nahi karna.
4. Module/API checks aur failure recovery banner add karna. Missing script detect hone par “Retry loading tools” normal page reload karega—localStorage ya caches ko clear nahi karega.
5. Innerwear catalogue/image archive ko asynchronous entry render mein shift karna; generation/load error par recoverable status dikhana.
6. Same-origin diagnostics page dena jo modules, 7 views, 4 wheel nodes aur existing local image paths report kare. Wheel action ko diagnostics khud spin nahi karega.

## Local checkout par install (recommended)

1. GitHub repo ka fresh ZIP download/extract karo. `main` par manual edits se pehle latest files lo.
2. Is package ke `phase3-v5-interactive.css`, `phase3-v5-interactive.js`, `phase3-v5-diagnostics.html`, `install_phase3_v5.py`, aur `validate_phase3_v5.py` ko repo root mein copy karo.
3. Python 3 wale terminal/Codespace mein repo root se pehle `python install_phase3_v5.py --root . --dry-run` chalao. Anchor ya source mismatch aaye toh force mat karo—diff inspect karo.
4. Dry run expected ho, tab `python install_phase3_v5.py --root .` chalao. Ye original `index.html`, `app.js`, `sw.js`, `manifest.webmanifest` ka backup **repo ke bahar** banata hai; source files rewrite karta hai aur report print karta hai. Ye GitHub par commit/deploy nahi karta.
5. `python validate_phase3_v5.py --root . --report PHASE3_V5_VALIDATION.json` aur `node --check phase3-v5-interactive.js` run karo.
6. `git diff` review karo. Sirf correct changes hon tab branch par commit/push/PR karo. `main` par bina test merge mat karo.

## Agar sirf GitHub mobile website se files upload kar rahe ho

- Package ke CSS, JS, diagnostic HTML aur documentation files root mein upload kar sakte ho.
- Lekin upload akela implementation activate nahi karega. `index.html`, `app.js`, `sw.js`, aur `manifest.webmanifest` mein jo changes installer karta hai, woh bhi apply karne honge. Mobile web editor mein `app.js` ka function replacement error-prone hai; isliye CodeSpace/local checkout recommended hai.
- ZIP mein purane app ke full replacements nahi hain. `app.js`/`index.html` ko is ZIP se replace mat karna.

## Live verification

Deploy ke baad open karo:
`https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase3-v5-diagnostics.html`

`Run checks` dabao, JSON report download karo, phir Android Chrome par manual checklist complete karo. Diagnostic PASS sirf DOM/API markers ka proof hai—not a full interaction pass. Manual testing mein chaaron wheels ko spin/reset/re-roll, age gate, date planner, message copy fallback, After Dark skip/favourites, Couples filters/CTAs aur Innerwear image archive zaroor test karo.

## Bilkul mat karna

- `localStorage.clear()` mat use karo.
- Existing storage keys, user notes, wishlist, demo bag, story progress ya product IDs rename/delete mat karo.
- Existing wheel logic/nodes ko duplicate ya rewrite mat karo.
- Campaign reference ko verified stock/SKU, price, medical claim ya product safety certification mat batao.
- Live/Android checks ko PASS mat bolo jab tak actual device par verify na ho.
