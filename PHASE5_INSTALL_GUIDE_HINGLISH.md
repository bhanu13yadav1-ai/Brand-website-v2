# BLACKED V4 Phase 5 — Upload/Integration Guide (Hinglish)

## Live audit result — pehle ye samajhna zaroori hai

24 October 2026 ko `main` branch ke source ko dobara check kiya. Phase 3 ZIP ke naye files repo mein maujood hain, lekin `index.html` abhi `phase1-foundation.js`, `phase2-core-experience.js`, ya `phase3-v4-experience.js` ko load nahi kar raha tha. `sw.js` ka cache ab bhi `blacked-v7-innerwear-interaction-fix-2` tha aur manifest V2.4 bol raha tha. Isliye files upload ho jana aur app mein chalna alag cheezein hain.

GitHub write integration ne source edit par 403 diya, isliye live branch ko yahan se commit nahi kar paya. Ye ZIP ready-to-apply package hai; live fix tabhi hoga jab patch apply/commit ho aur Pages deploy ho.

## Is ZIP ke andar

- `phase5-final-release-loader.js` — Phase 10/11/14/15 modules load karta hai; Phase 2–8 ko duplicate load nahi karta.
- `phase5-v4-release-diagnostics.html` — same-origin live app check, Innerwear tap latency check aur JSON report download.
- `PHASE5_INTEGRATION.patch` — existing `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, aur `BLACKED_V4_MASTER_PLAN.md` ke targeted changes.
- `PHASE5_V4_FEATURE_COVERAGE.csv` — saare 40 feature areas ka current state aur acceptance test.
- `PHASE5_V4_QA_CHECKLIST.csv` — 30 release checks.
- `PHASE5_V4_RELEASE_REPORT.md` aur `PHASE5_V4_HANDOFF.md` — re-audit, known limitation aur handoff record.

ZIP mein existing source copies/images nahi hain. Patch `.patch` file hai; woh sirf upload karne se apply nahi hota.

## Android/GitHub workflow

1. ZIP extract karo. Runtime files `phase5-final-release-loader.js` aur `phase5-v4-release-diagnostics.html` ko repo root mein upload karo. Extra nested folder mat banana.
2. `PHASE5_INTEGRATION.patch` ko apne local Git checkout/desktop par `git apply --check PHASE5_INTEGRATION.patch` se check karo, phir `git apply PHASE5_INTEGRATION.patch` chalao. Ye patch existing files ko edit karta hai; manually merge conflict aaye to live file ke existing content ko delete/replace blindly mat karna.
3. Changed files (`index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, `BLACKED_V4_MASTER_PLAN.md`) aur do new runtime files commit/push karo.
4. GitHub Actions mein Pages build successful hone ka wait karo. Purana installed PWA ho to site tab reload karo; zaroorat par app/browser cache refresh karke dobara kholo.
5. Open: `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase5-v4-release-diagnostics.html`.
6. **Run live checks** dabao, phir **Download JSON report**. Report share karo.
7. Android Chrome par Innerwear → Home → Innerwear ko kam se kam 5 baar repeat karo. Har tap ke baad 2 seconds ke andar controls respond karne chahiye; browser ka freeze/blank page aaye to screenshot aur JSON report bhejo.

## Acceptance note

Build successful hona UI/UX correctness ka proof nahi hai. Phase 5 tracker jaan-boojhkar features ko `INTEGRATED_NOT_LIVE_VERIFIED` ya `NOT_RUN` label karta hai jab tak runtime/Android evidence na ho. Kisi feature ko PASS sirf tab mark karna jab uska visible action aur expected result test hua ho.
