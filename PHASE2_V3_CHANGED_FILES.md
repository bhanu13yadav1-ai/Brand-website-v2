# Phase 2 changed/new files

| File | Action | Why |
|---|---|---|
| `app.js` | Replace | Delay image-library manifest/gallery initialization until Innerwear opens; keep unit conversion correction; avoid repeat initialization. |
| `sw.js` | Replace | Remove photo batch from install precache, correct 4 SVG paths, cap concurrency at 6, bump cache version. |
| `phase2-performance-diagnostics.html` | Add | New opt-in mobile-friendly diagnostics page. |
| `phase2-performance-diagnostics.js` | Add | Measures homepage resources, checks core file responses and exports results CSV. |
| `PHASE2_V3_CHANGELOG.md` | Add | Implementation details and verification status. |
| `PHASE2_V3_HANDOFF.md` | Add | Upload steps and next test checklist. |
| `PHASE2_V3_PERFORMANCE_BASELINE.csv` | Add | Source-based before/after estimate and explicit live-test blanks. |
| `preview/PHASE2_V3_PERFORMANCE_PREVIEW.png` | Add | Visual preview of the diagnostics page; not a live production screenshot. |
