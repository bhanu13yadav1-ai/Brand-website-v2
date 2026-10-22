# Upload karne ke exact steps (Hinglish)

## Pehle kya download karna hai?
`BLACKED_V3_FINAL_RELEASE_PHASE9_15.zip` download karke extract karo. Ye puri website ki duplicate copy nahi—sirf new/required overlay files aur integration helper hai.

## Agar laptop/PC available hai
1. GitHub repo ka fresh clone/download lo: `Brand-website-v2`.
2. ZIP ke files ko repo ke root mein merge karo. Existing `app.js`, `styles.css`, `fallback.js` ya photos delete mat karna.
3. Terminal mein extracted ZIP folder se chalao:
   `python apply_final_release_patches.py /path/to/Brand-website-v2`
4. Git diff check karo. Is helper ko do baar chalane par duplicate script line ya duplicate cache entries nahi aane chahiye.
5. Changed files commit/push karo aur GitHub Pages build finish hone do.
6. Website aur `phase12-15-diagnostics.html` ko open karke report save karo.

## Agar sirf Android phone par GitHub use karte ho
1. ZIP extract karne wali app se files nikaalo.
2. Repository ke root mein files upload/merge karo; folders ko galti se nested duplicate folder ke andar mat upload karna.
3. `index.html` ke `<head>` mein `part-c-enhancements.js` ke baad final loader ki ek line add karo.
4. `sw.js` ka `CACHE_NAME` update karo aur CORE mein new JS/CSS/diagnostics files add karo. Existing valid CORE entries ko rehne do. `./assets/folder/file.webp` ko `./file.webp` tabhi badlo jab `file.webp` root folder mein present ho.
5. GitHub Pages deploy ke baad diagnostic page kholna. Browser cache purana ho toh site ko close/reopen karke retest karo—local user data clear mat karna.

## Kya verify karna hai?
- Home ke bilkul top par “WHAT’S NEW” panel.
- 3 original wheels aur Wild Wheel alag-alag open/spin/reset.
- Boyfriend page mein 6 Couples Studio cards, filters aur image preview.
- Wellness page, Fit Studio aur existing story filters.
- Privacy modal se JSON export sirf button dabane par.
- Diagnostic report mein missing JS/CSS, broken images, service-worker CORE install error = 0.

**Note:** ZIP/local checks pass hona live deployment ka proof nahi. GitHub write access pichhli baar 403 de raha tha; jab tak commit aur live diagnostics pass na hon, website ko updated mat maano.
