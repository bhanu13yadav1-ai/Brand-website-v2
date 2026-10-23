# BLACKED Phase 5 + Phase 6 — Review Package (Hinglish)

## Is update mein kya add hua hai?

### Phase 5 — Product Discovery + Sales
- Existing Innerwear catalogue ko replace nahi kiya gaya; additive filter + disclosure layer add hoti hai.
- Evidence filter: all / concept reference / verified product. Seller filter: seller not verified / sales-ready. Missing size, material aur final price focus filters bhi hain.
- Har existing catalog card par “Concept / reference — not verified for sale” badge aur sample-price disclaimer hai.
- Compare cards aur product detail modal par missing evidence / seller info disclosure hai.
- Sales model planning selector: editorial-only (current), own-brand (planned), affiliate (planned), marketplace (planned).
- **Sales disabled:** model dropdown select karne se checkout enable nahi hota. Verified product fields aur owner approval ke bina products sale-ready nahi hote.
- `PRODUCT_VERIFICATION_REGISTER.csv` ek SKU-by-SKU verification checklist hai.

### Phase 6 — Wellness + Collections + New Media
- Existing Wellness / Fit Studio functionality ko preserve karke 3 original SVG guides add kiye: measurement basics, dimensions comparison, consent & comfort.
- Sanskari / Noor / Grace collection jump navigation aur respectful labels. Noor/Grace ko future concepts hi bataya gaya hai; kisi model ki religion ya community endorsement infer nahi hoti.
- Fit Studio privacy reminder: notes browser storage mein unencrypted ho sakte hain; local photo preview page se upload nahi hota.
- Image-rights clearance panel + original workflow SVG; `IMAGE_RIGHTS_REGISTER.csv` file-by-file evidence register.
- Existing photo assets ki legal/commercial rights cleared hone ka claim **nahi** kiya gaya. Unknown rights remain pending.

## Local integration
1. Latest repo `main`/review build ka separate backup banao.
2. Package ke `patches/INDEX_PHASE5_6_INSERT.patch` aur `patches/SW_CACHE_PHASE5_6.patch` ko inspect karo.
3. `phase5-product-discovery.js/.css`, `phase6-wellness-collections.js/.css` aur `assets/phase6-*.svg` ko repo root / `assets/` path mein add karo.
4. CSS/JS tags ko current includes ke baad load karo; service worker cache version bump aur local assets list update karo. Patch files example context dikhate hain; agar current branch context badla hai, blind apply ke bajaye manually equivalent lines add karo.
5. `phase5-6-review-diagnostics.html` kholkar added module checks dekho. Existing `phase5-diagnostics.html` / `phase6-diagnostics.html` ko is package se replace mat karna.
6. `tests/phase56-module-harness.html` ek isolated mock page hai jo filter, sales gate aur collection toggles test karne ke liye diya hai. Isko local HTTP server se kholo; yeh full app ya Android test ka substitute nahi hai.
7. Desktop browser aur actual Android Chrome mein test karo: catalog search/sort/wishlist, demo bag, compare limit/actions, modal close/focus, Fit Studio local photo, Noor/Grace toggles, offline/service-worker cache.
8. Product register aur rights register ko real supplier/owner evidence ke saath review karne tak checkout/live sales mat chalao.

## Repo & deployment status
GitHub connector ne review branch create karne ki request `403 Resource not accessible by integration` se reject ki. Isliye repository mein commit/PR/deployment **nahi** hua. Yeh package current source structure ke liye ready-to-integrate additive change hai; live site par active hona confirm nahi hai.
