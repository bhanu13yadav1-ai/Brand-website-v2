# V1 Phase 3 — Upload Guide (Hinglish)

## Is ZIP mein kya hai?
Ye **Phase 2 + Phase 3 combined overlay** hai. Agar Phase 2 pehle upload nahi kiya tha, toh ye ZIP Phase 2 compatibility files bhi include karta hai. Agar Phase 2 pehle upload kar chuke ho, toh ye same paths ko Phase 3 version se update karega.

Phase 3 mein Home par clear Collections directory add hota hai, existing Sanskari gallery ko retain karta hai, aur current Noor/Grace previews ko clearly `Muslim-Inspired Collection — Coming Soon` aur `Christian-Inspired Collection — Coming Soon` labels deta hai. Coming Soon cards jaan-boojhkar non-clickable hain; fake shops/features nahi khulte.

## Upload steps (Android/GitHub)
1. ZIP download karke extract karo.
2. `Brand-website-4f` kholo: https://github.com/bhanu13yadav1-ai/Brand-website-4f
3. Branch `main` confirm karo. `Add file` → `Upload files` kholo.
4. ZIP ke top folder `V1_PHASE3_UPLOAD_PACKAGE` ke **andar ke contents** upload karo, extra nested folder mat banao. `css/` aur `js/` subfolders same rakhna.
5. Existing `sw.js` aur `manifest.webmanifest` ko replace karo; `css/styles.css` aur `js/app.js` overlay files ko replace/add karo. Root `index.html`, `app.js`, `styles.css`, product data aur original image files ko touch/delete mat karna.
6. Commit message: `V1 Phase 3: add collections directory and Coming Soon previews`.
7. Commit ke baad Pages build complete hone do; phir open karo: `https://bhanu13yadav1-ai.github.io/Brand-website-4f/phase3-diagnostics.html`. Agar actual Pages URL different hai, us URL ke aakhir mein `/phase3-diagnostics.html` lagao.
8. Pehli baar diagnostic khulne ke baad agar service worker install/update hua hai, page refresh karo aur `Run checks again` dabao.
9. Diagnostic mein collection directory, Sanskari button, updated previews, asset files aur wheel markup ke results dekho. Uske baad `Open main website` karke manually confirm karo.

## Is phase mein preserve kiya gaya
- Existing six views: Home, Innerwear, Sanskari Edit, Wellness, Boyfriend, Fit Studio.
- Existing Sanskari gallery and source campaign images.
- Existing catalogue, wishlist, demo bag, three original wheel experiences, fit notes, wellness and relationship tools. Ye features Phase 3 mein rebuild/replace nahi kiye gaye.
- Original root `app.js`, `styles.css`, `index.html`, and source images are not included for overwrite.

## Limits
- This is an overlay for the existing `Brand-website-4f` root layout, not a standalone website package.
- No new original campaign photography is added; the live Sanskari card uses an existing repository image. Upcoming faith-inspired cards use intentionally designed CSS art, not mislabeled stock photography.
- No new collection is presented as available for sale.
- Assistant has not pushed these files to GitHub and has not tested the published site or a physical Android device. Treat live functionality as NOT TESTED until your diagnostic page reports results.
- Phase 3 does not implement Phase 4 Dirty/Wild Wheel, Phase 5 wellness expansion or later hardening; those remain separate planned phases.
