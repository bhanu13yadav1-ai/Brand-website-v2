# BLACKED V4 280-Idea Repair — Hinglish Guide

## Pehle yeh samjho
ZIP upload karna aur PATCH apply karna alag kaam hain. Latest repo check mein Phase 5 files upload hain, lekin `index.html` abhi purane 12 scripts hi load karta hai. Isliye features show nahi honge jab tak patch apply na ho.

## Best method: laptop/PC ya Codespace terminal
1. Repo clone/update karo: `git clone https://github.com/bhanu13yadav1-ai/Brand-website-v2.git` (agar pehle clone hai to `git pull`).
2. Repo ke root mein `V4_INTEGRATION_FIX.patch` copy karo.
3. Terminal mein `git apply --check V4_INTEGRATION_FIX.patch` chalao. Agar error nahi, `git apply V4_INTEGRATION_FIX.patch` chalao.
4. Modified 5 source/plan files ko review karo: `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, `BLACKED_V4_MASTER_PLAN.md`.
5. Commit/push karo: `git add index.html app.js sw.js manifest.webmanifest BLACKED_V4_MASTER_PLAN.md && git commit -m "Activate V4 modules and fix Innerwear responsiveness" && git push origin main`.
6. GitHub Actions mein Pages build ka `success` aane ka wait karo.
7. Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase5-v4-release-diagnostics.html`; `Run live checks` dabao; JSON report download karo.
8. Android Chrome par Innerwear → Home → Innerwear ko 5+ baar test karo; phir `BLACKED_V4_280_FEATURE_MASTER_CHECKLIST.csv` ke verification column ko actual proof ke basis par update karo.

## Android-only note
GitHub ka `Add file → Upload files` `.patch` ko apply nahi karta. Aapko terminal/Codespace mein `git apply` chalana hoga ya har changed file ko manually edit karna hoga. `app.js` bada file hai; mobile web editor mein manually poori file replace karna galti ka risk hai, isliye patch-apply method recommended hai.

## Files
- `V4_INTEGRATION_FIX.patch`: integration + Innerwear performance patch.
- `BLACKED_V4_280_FEATURE_MASTER_CHECKLIST.csv`: all 280 idea statements.
- `BLACKED_V4_40_AREA_STATUS.csv`: area-level status.
- `BLACKED_V4_LIVE_REAUDIT_AND_280_FIX_REPORT.md`: current evidence/what is missing.
- `phase5-v4-release-diagnostics.html`: live test page.
- `PHASE5_V4_QA_CHECKLIST.csv`: 30 manual/automated tests.

No existing image or application source file is duplicated inside this delta package.
