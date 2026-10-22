# BLACKED V3 — Phase 5–6 Upload Instructions (Hinglish)

## Is baar ZIP mein kya hai?

**Sirf changed/new files.** `app.js`, `styles.css`, `fallback.js`, `index.html`, `sw.js`, `phase2-photo-collections.js`, `phase2-photo-collections.css`, `phase3-design-system.css` aur `phase4-home-and-fantasy.js` ZIP mein full copies ke roop mein nahi hain.

Connected GitHub `main` ko check karte waqt Phase 3/4 JS/CSS files maujood mile, lekin `index.html` unko load nahi kar raha tha. Isi wajah se Phase 3/4 ka visible update activate nahi hua. Phase 2/4 photo code ke 11 referenced WebP files bhi GitHub par 404/missing mile. Package un missing local image assets ko restore karta hai, phir naya Phase 5/6 loader existing overlays ko sahi order mein load karega.

## Upload process

1. ZIP extract karo. Sab files/folders ko `Brand-website-v2` repo ke **root** mein merge karo. Nested `BLACKED_V3_PHASE5_6_CHANGED_FILES/` parent folder upload mat karna; `phase5-6-loader.js` root mein hona chahiye aur `assets/` root ke andar.
2. Existing image/source files ko delete ya replace mat karo. Jo 11 older Phase 1–4 assets missing the, wohi restore ho rahe hain; baaki 16 WebP files is turn ki nayi photos aur unke character-crops hain.
3. GitHub par `index.html` edit karo. `<head>` mein ye existing lines dhoondo:

   ```html
   <script src="./app.js" defer></script>
   <script src="./part-c-enhancements.js" defer></script>
   ```

   Unke turant neeche ye **ek nayi line** add karo:

   ```html
   <script src="./phase5-6-loader.js?v=5.6.0" defer></script>
   ```

   Exact one-line patch `INDEX_INSERT_PHASE56.patch` mein bhi hai.
4. `index.html` plus new files/assets ko commit karo. Loader purane Phase 2/3/4 overlays aur naye Phase 5/6 modules khud sahi order mein load karega. `sw.js` ko abhi replace karne ki zaroorat nahi: existing service worker successful same-origin GET requests ko first load par cache karta hai. Pehli image check online zaroor karna.
5. GitHub Pages deploy hone ke baad ye URL kholo:
   `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase5-6-diagnostics.html`
6. Pehle **Check integration**, phir **Check all bundled images** run karo. Uske baad **Check 151-record archive** run karke failed source URLs report se copy karo. Remote failure ko confirmed missing file, network block, ya temporary timeout mein separate karna zaroori hai.
7. Main site par hard refresh karo. Zaroorat ho to Chrome → Site settings → Storage → Clear site data se stale PWA cache clear karne ke baad phir open karo. Apne saved data clear karne se pehle soch lo, kyunki existing prototype notes/bookmarks browser storage mein ho sakte hain.

## Boyfriend page mein kya badlega?

- Existing “Flirt karo / Pressure nahi” page aur current tools preserve rahenge.
- Upar ek naya premium `Choose Your Match` hero, six selectable fictional archetype cards, preference form, optional size-reference filter, mood selection aur result card add hoga.
- “Couple + One”/“Multi-Adult” result existing second 18+ gate ki taraf le jayega. Multi-adult photos us protected section ke andar hi rahengi.
- Real person ko buy/book karne, verified penis size, inventory, profile, payment, ya companion availability ka koi feature nahi hai. Choice card fictional archetype preference hai; answer server ko send/save nahi hota.
- Nayi mirror photo Innerwear editorial collection mein jayegi, active/balance campaign Boyfriend page par, aur seven new multi-adult editorial references second 18+ gate ke andar.

## Deployment caution

GitHub connector ne pichhle safe-branch request par HTTP 403 diya tha. Isliye is package mein remote commit ya live deploy ka claim nahi kiya ja raha. Agar GitHub edit/upload permission nahi deti, branch/write access solve karna hoga; live `main` par unverified partial upload mat karna.
