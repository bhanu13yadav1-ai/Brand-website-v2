# Patch Integration Notes — Phase 3

Repository: `bhanu13yadav1-ai/Brand-website-v2` · branch `main`.
Captured head SHA: `7c3b008f3da6511a3437839d9d42c343d2e35bfc`.
`index.html` blob SHA: `007b8e7d59486b5ba93c6534aa9dcc91066d040b`.
`sw.js` blob SHA: `675093dcd5bb4d9975c40dd07d65a5cac9018ee4`.

## Additive files
- Add the four files under `phase3-assets/` without renaming them.
- Add `super-phase3-content.json`, `super-phase3-experience.css`, `super-phase3-experience.js`, and `super-phase3-diagnostics.html` at repository root.
- The current `index.html` already loads `part-c-enhancements.*` and `phase2-photo-collections.*`; do not duplicate their tags. The new Super Phase 3 files have separate names to avoid collision with the old unused `phase3.js` / `phase3.css`.

## Patches
- Apply `INDEX_INSERT_PHASE3.patch` only if the current `index.html` blob SHA matches the recorded SHA. It inserts one CSS link and one deferred script after the current Phase 2 tags.
- Apply `SERVICE_WORKER_INSERT_PHASE3.patch` only if `sw.js` blob SHA matches. It bumps the cache version and adds the Phase 2 collection assets (previously linked by HTML but absent from CORE) plus this phase's manifest, diagnostics and four new WebP files.
- If either SHA differs, stop and reconcile by preserving unrelated changes. Never force-apply onto a changed baseline.
- Run `python tools/validate_phase3.py`, `node --check super-phase3-experience.js`, then open `super-phase3-diagnostics.html` on the hosted review build and run the Android/manual regression matrix.

This package does not contain or replace any existing application source/data/photo. It has not been committed or deployed.
