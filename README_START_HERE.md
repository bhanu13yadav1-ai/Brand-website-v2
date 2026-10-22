# Start Here — BLACKED V3 (Phases 1–4)

This is a **safe, additive local overlay package** for the existing `bhanu13yadav1-ai/Brand-website-v2` site, not a replacement website and not a deployed commit.

1. Read `V3_MASTER_PROJECT_NOTES.md` for the long-term 15-phase roadmap.
2. Read `PHASE3_4_UPLOAD_INSTRUCTIONS_HINGLISH.md` for exact integration order and GitHub Pages steps.
3. Review `PHASE1_4_CHANGELOG.md`, `PHASE3_4_ALL_PHOTOS_PREVIEW.jpg`, and `tests/PHASE3_4_STATIC_CHECKS.json`.
4. Upload/merge assets into the existing repository and add the CSS/JS references in `index.html`; preserve the existing `sw.js` core entries and bump its cache version.
5. After deployment, run `phase2-diagnostics.html`, `phase34-diagnostics.html`, and existing repository diagnostics. Manually test all seven views and four wheels in Android Chrome.

## What's included
- Phases 1–2: baseline notes, additive photo galleries and enlarged image preview.
- Phase 3: responsive design/readability stylesheet.
- Phase 4: Home quick links and fictional adult preference router.
- 11 local images total in the collection overlay: original Phase 2 set plus three new photos.
- Tests, source/output image manifests, diagnostics, changelog and handoff.

## Non-destructive contract
No existing core files are included for wholesale replacement. Do not delete `app.js`, `styles.css`, `fallback.js`, `innerwear-image-library.json`, `size-chart-template.json`, old assets, data or the original wheel locations. All multi-adult reference images must remain inside the existing `#v23ThreesomeProtected` section and its existing self-attestation gate.

## Honest status
- Package/static checks: 15/15 pass.
- GitHub safe-branch creation: blocked by integration HTTP 403; no remote changes committed.
- Live GitHub Pages / Android Chrome end-to-end QA: pending; do not describe the live site as updated until those checks pass.
