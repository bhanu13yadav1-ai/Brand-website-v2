# BLACKED V5 — Phase 2 Fix + Phase 3 Check + Phase 4

## Audit ka result

Latest observed GitHub `main` commit: `83c36772fd2338076db89cdc915c253f27a1199f`.

- **Phase 2:** `phase2-premium-ux.css/js` upload ho chuke hain, lekin audited `index.html` aur `sw.js` mein references nahi the. Isi wajah se reset/accessibility layer activate/cache nahi ho rahi thi.
- **Phase 3:** `phase3-v5-interactive.css/js` aur diagnostics file repo mein upload hain, lekin `index.html` aur service worker wiring missing thi. Ye current recovery/diagnostics layer hai; original wheel engine ko replace nahi karta.
- **Phase 4:** existing `phase4-story-universe.js/css/json`, `phase4-home-and-fantasy.js`, four wheel source modules aur Phase 10/11/14/15 loader files repo mein hain. `phase5-final-release-loader.js` Wellness/Fit/Privacy/Release modules load karta hai. Package in files ko duplicate/replace nahi karta; service-worker entries aur live-check coverage ensure karta hai.
- **Photo rule:** is ZIP mein naye model/product photos nahi hain. Existing repository photos ko hi reuse kiya jayega.
- **GitHub write:** integration HTTP 403 se block hua. Is attempt mein assistant ne `main` ke source files commit nahi kiye aur deploy hone ka claim nahi hai.

## Is ZIP ke andar kya hai

- `install_phase2_phase3_phase4.py` — additive installer; `index.html`, `app.js`, `sw.js`, `manifest.webmanifest` aur ek Phase 4 diagnostic reference ko update karta hai. Source changes se pehle sibling backup banata hai.
- `validate_phase2_phase3_phase4.py` — source/route/cache, seven views, four wheel markers, Phase 4 story graph, Wellness/Fit loader aur JavaScript syntax validate karta hai.
- `phase4-wellness-fit-diagnostics.html` — upload ke baad Wellness, Fit Studio, Phase 10/11/14/15 APIs aur local asset HTTP status check karne ke liye.
- Report, static status aur manual QA checklist.

**Phase 2/3 runtime CSS/JS ko ZIP mein duplicate nahi kiya hai.** Ye files aapke current repo mein already upload hain, isliye stale copies se overwrite nahi honge. `phase3-v5-diagnostics.html` bhi repo ki current copy se hi use hogi.

## Installation — Codespaces ya local checkout

1. Repository kholo: `https://github.com/bhanu13yadav1-ai/Brand-website-v2`.
2. Codespaces available ho toh **Code → Codespaces → Create codespace on main** use karo; warna repo ko local folder mein clone karo.
3. Is ZIP ko extract karo aur **ZIP ke root files** ko repository root mein copy/upload karo. Naya `phase4-wellness-fit-diagnostics.html`, installer, validator aur reports `index.html` ke saath same root mein hon.
4. Root mein terminal khol kar pehle **dry run**:

   ```bash
   python3 install_phase2_phase3_phase4.py --root . --dry-run
   ```

5. `DRY_RUN_OK` aaye toh installer run karo:

   ```bash
   python3 install_phase2_phase3_phase4.py --root .
   ```

6. Phir validator:

   ```bash
   python3 validate_phase2_phase3_phase4.py --root . --report PHASE2_PHASE3_PHASE4_QA.json
   ```

7. Diff review:

   ```bash
   git diff --check
   git diff --stat
   git diff
   ```

   Agar unexpected deletion ya content replacement dikhe toh **commit mat karna**. Installer backup repository ke sibling folder mein banata hai, taaki rollback kar sako.

## Installer kya badlega

- `index.html`: Phase 2 CSS/JS + Phase 3 V5 CSS/JS ke single references; existing Phase 4 story/home/fantasy references aur Phase 5 final loader preserve; page metadata V5.
- `app.js`: Innerwear catalogue + optional image archive rendering ko next paint ke baad schedule karega. Existing 7 view names aur 18+ self-attestation guard preserve.
- `sw.js`: cache namespace refresh aur Phase 2/3 diagnostics + Phase 4 Wellness/Fit diagnostic ki entries.
- `manifest.webmanifest`: V5 app name/description; current icon list exactly preserved.
- `phase4-home-and-fantasy.js`: Wheels Hub diagnostics ka naam fallback ke saath correct karta hai (`BLACKED_V3_PHASE12_WHEELS` / legacy `BLACKED_V3_PHASE12`).

Existing user storage keys, story/product IDs, image binaries, wheel algorithms, wishlist, bag, saved notes aur story progress ko delete/migrate nahi karta. `localStorage.clear()` add nahi hota.

## Upload ke baad diagnostics

GitHub Pages build/deploy finish hone ke baad isi site se open karo:

- `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase3-v5-diagnostics.html`
- `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase4-diagnostics.html`
- `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase4-wellness-fit-diagnostics.html`

Wellness/Fit diagnostics dynamic modules settle hone ke liye 20–25 seconds le sakti hai. JSON report local download hoti hai; automatically upload nahi hoti.

## Manual QA — mandatory before release

Phone par 320/360/390/430px width check karo. Home, Stories, Innerwear, Sanskari, Wellness, Boyfriend/Couples aur Fit Studio open karo. Four wheels ko actual spin/reset/reroll karo. Story tone/choice/copy, Phase 2 filter resets, age gate, image archive, wishlist/bag aur saved notes regress karo. Consent/skip/stop/close behavior aur keyboard/Escape bhi verify karo. Site storage ko sirf cache refresh ke liye clear mat karna—usmein local notes/save data ho sakta hai.

**Static PASS browser PASS nahi hota.** GitHub Pages, live image responses, wheel animations, physical Android Chrome, keyboard/screen reader aur real measurement conversions abhi pending rehte hain jab tak aap deployed page par unhe test na kar lo.
