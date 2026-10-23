# BLACKED · Phase 7 Final QA — Hinglish Setup

## Audit se kya pakda?

1. **Phase 4/5/6 ki JS/CSS files repository mein present hain, lekin audited `index.html` mein linked nahi thi.** Isliye modules files hone ke baad bhi user-facing page par unke naye controls appear nahi hote. Phase 7 integration script unko existing scripts ke baad, correct dependency order mein link karta hai.
2. **Wheel → story CTA bug:** old check wheel title ko `1/8` jaisa heading samajh raha tha, lekin `app.js` actual output mein descriptive title + `[data-wheel-retry]` button banata hai. Ab completed spin identify karne ke liye real retry button use hota hai.
3. **Measurement units bug:** worksheet mein `cm` se `inches` switch karne par existing values convert nahi hoti thin, phir naye unit ke rules se interpret hoti thin. Ab filled values convert hoti hain aur summary dobara review karne ko kehti hai.
4. **Noor/Grace filter:** Grace selection pe pehle sirf embedded image hide hoti thi, card ka text reh sakta tha. Ab poora Grace card filter hota hai.
5. **Service worker cache:** naye modules/JSON/SVGs ke liye cache version aur `CORE` list update hoti hai, taaki purana cache update ko chhupa na de.

## Sabse safe integration method

1. Latest `main` ka backup lo aur repo ki local copy kholo. `index.html`, `app.js`, `sw.js`, `phase2-photo-collections.js` aur `part-c-enhancements.js` same repo root mein hone chahiye.
2. Is Phase 7 ZIP ko extract karo. Terminal/command prompt mein run karo:

   ```bash
   python3 apply_phase7_integration.py --repo /path/to/Brand-website-v2
   ```

   Windows par `python apply_phase7_integration.py --repo C:\\path\\to\\Brand-website-v2` chala sakte ho.
3. Script duplicate tags add nahi karti. Existing `index.html`, `app.js`, `sw.js`, targeted Phase 4/6 modules aur purane Phase 7 diagnostics ka timestamped backup `.phase7-backup-YYYYMMDD-HHMMSS/` mein banega. Current Phase 4 story JSON/CSS, Phase 5 module/CSS, Phase 6 CSS aur existing rights/product registers overwrite nahi hote. Agar kisi targeted bug anchor ka shape unexpected ho ya SVG filename collision ho, script fail-safe tareeke se rukegi.
4. Repo ko local HTTP server par kholo; direct `file://` mode se mat test karo, kyunki story JSON, iframe aur service-worker checks ko same-origin HTTP chahiye.
5. `phase7-diagnostics.html` kholo → **Run final checks**. Koi `FAIL` ho toh deployment se pehle fix karo. `PENDING` aaye toh required module/asset/link ya manual test complete karo.
6. Existing project ka complete regression test karo: wishlist, demo bag, original 3 wheels, Dirty/Wild, old stories, measurements, image archive, Fit Studio aur collection previews. Pehle se saved browser data ko reset karne ki zaroorat nahi honi chahiye.
7. Changes ko review branch ya GitHub editor se commit karo. GitHub integration is session mein branch-write se `403` de chuka hai; is ZIP ne repo ko commit, push ya deploy nahi kiya.

## Current product/business truth

- Catalogue entries concept/reference records hi rehte hain. Example prices real price offer nahi hain.
- No live inventory, verified seller, product-specific size/material chart, payment, checkout ya order endpoint add kiya gaya hai.
- Product seller register aur image rights register pending proof ko show karte hain. Publicly hosted image hona commercial permission ka proof nahi hai.
- Wellness summary measurements ko format karti hai; size tab tak calculate nahi karegi jab tak exact, owner-approved BLACKED size chart supply nahi hota.

## Testing status

Static validation aur safe-integration fixture tests included hain. Headless Chromium is container mein hang hua, isliye browser interaction test yahan successfully complete nahi hua. Final same-origin checks aur actual Android Chrome regression tumhare integrated build par chalne chahiye. `phase7-diagnostics.html` ka PASS bhi physical device test ka substitute nahi hai.
