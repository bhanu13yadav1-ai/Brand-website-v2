# Phase 4 upload guide (Hinglish)

1. Download `BLACKED_V3_PHASE4_COMBINED_FANTASY_NAVFIX.zip`.
2. Extract it. Copy its six root files into the EXISTING `Brand-website-v2` GitHub repository root.
3. Replace these existing files: `app.js`, `fallback.js`, `sw.js`.
4. Add these new files: `phase3-4-experience.js`, `phase4-diagnostics.html`, `phase4-diagnostics.js`.
5. `index.html` ko replace/delete mat karna. `styles.css`, image JSON/library, wheels, stories, aur Phase 4–8 ke current modules ko mat delete karna.
6. Commit all six files together, wait for GitHub Pages deployment, then open:
   `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase4-diagnostics.html`
7. Press “Run all live checks”. Any FAIL or WARN ka CSV export karke share karein. Android Chrome par purani tab close karke site dobara open karein. Hard refresh karna ho to Chrome site data ke cache ko clear karein, but local storage / site data clear na karein unless you have a backup—this can remove locally saved demo preferences.
8. Do not delete the legacy Phase 3 JS/CSS until the diagnostics are PASS and Android test is complete.
