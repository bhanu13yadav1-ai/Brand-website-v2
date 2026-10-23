# Innerwear button freeze — upload guide (Hinglish)

## Sirf ye 4 files upload/replace karo
Extract the ZIP, then copy these files into the **existing** `Brand-website-v2` repository root:

1. `app.js` — replace current file
2. `sw.js` — replace current file
3. `innerwear-fix-diagnostics.html` — add new file
4. `innerwear-fix-diagnostics.js` — add new file

**`index.html` ko replace mat karna.** Kisi aur JS/CSS, image file, story JSON, 151-record image manifest, wheel, saved data key, ya existing feature ko delete mat karna. Ye ZIP whole-site replacement nahi hai; ye merge/update package hai.

## GitHub se publish
1. GitHub par `Brand-website-v2` repository kholo.
2. Upar ki dono existing files ko replace karo, dono diagnostics files add karo.
3. Chaaro files ko **ek hi commit** mein save karo.
4. GitHub Pages ko update hone do.
5. Android Chrome mein current website tab ko poori tarah close karke phir kholo. Cache update ke baad bhi purana tab app.js ka old in-memory code chala sakta hai. **Browser/site data clear mat karna**—isse locally saved wishlist, sample bag, notes ya preferences affect ho sakte hain.

## Live test
Deployment ke baad ye URL kholo:
`https://bhanu13yadav1-ai.github.io/Brand-website-v2/innerwear-fix-diagnostics.html`

`Run Innerwear checks` dabao. FAIL/WARN ho to `Export CSV` dabao aur CSV ya screenshot share karo. Test usi browser origin mein navigation aur archive batches check karega. Network par image host fail hota hai to image problem aur navigation problem alag report hongi.

## Kya expected hai?
- Innerwear tap par pehle catalogue ke 8 cards dikhein.
- 151-record archive ka initial batch 8 ho; `Load next 8` se baaki records aate rahen.
- Home par hote hue hidden screens ki images ke `src` active na hon.
- Home par wapas jaakar phir Innerwear kholne par bhi app rukna nahi chahiye.

GitHub par upload/deploy karna is ZIP se automatically nahi hota. Ye files live hone ke baad actual phone ka report dekhein; abhi ka Chromium report controlled local test hai.
