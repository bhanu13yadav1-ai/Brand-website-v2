# Phase 17 Update — Install Guide (Hinglish)

## Is ZIP mein kya hai?

Yeh **update-only** package hai, poori website nahi. Ismein sirf changed/replacement files, nayi Phase 17 files/images aur idea/QA documentation hain. Purani photos, unchanged JS/CSS aur unrelated website assets repeat nahi kiye.

## Upload se pehle

Phase 16 ka update pehle merge hua hona chahiye, kyunki Phase 17 shared `phase16-preference-first.js` ko extend karta hai. Agar Phase 16 ke files repo mein nahi hain, pehle Phase 16 update install karo.

## GitHub root mein kya karna hai?

1. ZIP extract karo.
2. `index.html`, `sw.js` aur `phase16-preference-first.js` ko repository root mein **replace** karo.
3. Ye nayi files root mein **add** karo: `phase17-ultra-urge-wellness.js`, `phase17-ultra-urge-wellness.css`, `phase17-wellness-catalog.json`, `phase17-product-dildo.svg`, `phase17-product-anal.svg`, `phase17-product-lube.svg`, `phase17-product-care.svg`.
4. `PHASE17_IDEA_MASTER_PLAN_HINGLISH.md`, `PHASE17_RESEARCH_AND_SOURCES.md`, `PHASE17_FEATURE_BACKLOG.csv`, `PHASE17_QA_CHECKLIST.csv` team documentation hain; app chalne ke liye inhe website root mein upload karna mandatory nahi.
5. GitHub Pages commit/push ke baad browser mein hard refresh karo. Agar old CSS/JS dikhe toh site data/cache clear karke dobara open karo.

## Actual change

- Randi/Mood/Boyfriend supported generated output controls mein `Ultra Desi` gaali intensity add hoti hai.
- Stories mein Ultra Desi Studio + quick Urge mode, tone/language selectors, Remix/branch actions, copy aur local saved scenes add hote hain.
- Wellness mein dildo, butt plug, anal beads, prostate massager, lubricant, cleaning/care aur storage category concepts, search/filter/sort, compare up to 3, product shortlist aur safety notes add hote hain.
- Four new SVGs are abstract category illustrations, not photos of real products.
- Product records are deliberately marked as concepts. No SKU, price, seller or inventory is asserted.

## Must-test before calling complete

Run `PHASE17_QA_CHECKLIST.csv` on the actual deployed Android browser. Especially confirm age checkbox allows generation, all five gaali levels change text, copy/save/delete works, product search/filter/compare works, and original wheels/stories/Boyfriend/Innerwear screens still work. A successful GitHub Pages build alone does not prove runtime behavior.
