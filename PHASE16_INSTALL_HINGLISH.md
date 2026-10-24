# BLACKED V4 — Preference-first + gaali levels (update only)

**Full website ZIP nahi hai.** Sirf 4 existing files replace karo aur 3 new runtime assets add karo. Purani product images, innerwear library, stories, wheels, messages aur untouched modules dobara upload nahi karne.

## ZIP ke 7 runtime files

### Replace these 4 root files
1. `index.html` — existing V4 entrypoints plus Phase 16 preference-first JS/CSS connect karta hai.
2. `app.js` — navigation par poora document scan karne ke bajay previous screen ka image work idle time par schedule karta hai.
3. `sw.js` — cache version bump + Phase 16 files precache.
4. `manifest.webmanifest` — BLACKED V4 app metadata.

### Add these 3 root files
5. `phase16-preference-first.js`
6. `phase16-preference-first.css`
7. `phase16-host-avatar.svg` — new lightweight fictional-adult-host illustration. Purani images copy nahi hain.

`PHASE16_INSTALL_HINGLISH.md` aur `PHASE16_UPDATE_FILE_MANIFEST.csv` package guidance hain, website ke runtime ke liye upload nahi karne.

## New functionality

- Boyfriend & Couples screen ke intro ke turant baad fictional adult host pehla question poochti hai.
- 3-step mobile wizard: (1) character vibe + optional size/thickness reference, (2) skin-shade styling + body build, (3) Hindi/Hinglish/English + Clean/Light/Medium/Full Desi Gaali.
- Optional choices; back/next, progress bar, surprise, reset, explicit 18+ confirmation, and local-only saved preferences.
- Preferences selected character/style, language and gaali intensity ko existing Boyfriend Studio/Fantasy form se connect karti hain. Duplicate matcher nahi banaya.
- Super Randi Mode mein selectable gaali levels; language selector Hindi, Hinglish, English. Compatible generated Phase 4 / Phase 5 prompts aur dialogue ke liye intensity use hoti hai.
- Gaali level generated text par apply hoti hai; existing story archive ko silently auto-translate/rewrite nahi karti. Agar archive localization chahiye, woh alag reviewed update hoga.
- Body/skin choices fictional styling references hain; unhe personality/behaviour ke stereotypes se link nahi kiya.
- Old wheels, stories, date messages, copy buttons, wishlist, sample bag, innerwear, Wellness, Sanskari aur Fit content remove nahi kiya.

## Android/GitHub upload

1. ZIP ko phone ke Downloads folder mein extract karo.
2. Repo kholo: `https://github.com/bhanu13yadav1-ai/Brand-website-v2`.
3. Root mein 3 new runtime files add karo: `phase16-preference-first.js`, `phase16-preference-first.css`, `phase16-host-avatar.svg`.
4. Root ki `index.html`, `app.js`, `sw.js`, `manifest.webmanifest` files ko ZIP versions se replace karo.
5. Changes commit karo, Pages build successful hone do, phir website reload karo. Sirf ZIP file ko root mein upload karne se changes activate nahi hote.

## Verification status

Static JavaScript syntax, integration references, CSS braces, SVG XML, file manifest aur ZIP integrity are checked. Browser/Android live runtime is **not verified remotely**. Publish ke baad Boyfriend 3-step wizard, size/thickness choices, 18+ gate, gaali levels (Clean/Medium/Full), language sync, old wheels/stories, wishlist/bag aur Innerwear navigation test karo.
