# GitHub Pages par final ZIP kaise upload karein (Hinglish)

## Pehle ek important baat

GitHub Pages ZIP file ko khud extract nahi karta. Isliye **sirf `.zip` ko repository mein upload mat karna**. ZIP ko phone/computer par extract karo, phir uske andar ke files aur folders upload karne hain. `index.html` ko existing repository root mein hi rehna chahiye—ek extra nested folder ke andar nahi.

## Android phone par

1. Is ZIP ko download karke Files / Downloads app mein **Extract** karo.
2. GitHub mein `bhanu13yadav1-ai/Brand-website-v2` repository kholo aur confirm karo ki branch `main` selected hai.
3. Pehle current repo ka backup rakh lo (Code → Download ZIP).
4. Browser mein **Add file → Upload files** kholo.
5. Extracted folder ke andar ke files/folders select karo; `index.html`, `app.js`, `styles.css`, `sw.js`, sab phase `.js`/`.css`, root images, JSON, `assets/` SVG folder aur diagnostics pages root structure ke saath upload hone chahiye.
6. Commit message likho: `Connect consolidated BLACKED phases 1-7 release`, phir Commit changes karo.
7. GitHub Pages ke rebuild complete hone ke baad live site open karo. Agar files bahut zyada hone ki wajah se Android upload picker folders ko preserve nahi kar raha, phone par upload continue mat karo—desktop browser ya GitHub Desktop easier aur safer rahega.

## Upload ke baad verification

1. `phase7-diagnostics.html` kholo aur **Run final checks** dabao.
2. `phase5-6-review-diagnostics.html` mein Phase 4/5/6 loaded, original wheels, Dirty/Wild, seller gate aur collection selectors check karo.
3. `phase4-diagnostics.html` aur `phase2-image-diagnostics.html` se story / wheel / image loading check karo.
4. Android Chrome mein old cached version ho toh site data/service worker ko refresh karke dobara test karo. Cache version is build mein `blacked-v3-phases1-7-final-1` hai.

## Live sales ko enable mat samajhna

Product cards abhi concepts hain; seller, stock, final price, sizes/material aur commercial image rights independently verify nahi hue. Checkout intentionally disabled hai.
