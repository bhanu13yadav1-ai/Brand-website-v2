# BLACKED Super Update — Phase 2: Connected Architecture

**Status:** Additive patch package for review. **Not committed/pushed to GitHub.**

## What Phase 2 delivers

- A versioned content/route graph so route names, media placement and cross-links have one source of truth.
- A JSON Schema plus a local validator for route IDs, asset IDs, graph links, local files and image hashes.
- A compact navigation rail connecting existing views without replacing `index.html` or `app.js`.
- Local media galleries inserted into current views: AirComfort cooling concepts, separate CLAM COOLER concept, unbranded pink satin editorial, a brand-review campaign group, and Partner Yoga campaign reference.
- Accessible image-preview dialog (explicit click only; close button, Escape, focus return), visible asset-loading status and missing-image diagnostics.
- Eight new, optimised WebP photos from the latest uploaded batch.
- A minimal patch for `index.html` and a minimal patch for `sw.js`; existing site files are not bundled.

## Exact baseline inspected

- Repository: https://github.com/bhanu13yadav1-ai/Brand-website-v2
- Branch: `main`
- Current inspected HEAD: `530b6d2339e68f0ae3bd78a01ec36981d570576b`
- `index.html` blob SHA: `007b8e7d59486b5ba93c6534aa9dcc91066d040b`
- `app.js` blob SHA: `245d9c4dc32a4f27e5d05eef646d97bcf8b0177a`
- `sw.js` blob SHA: `675093dcd5bb4d9975c40dd07d65a5cac9018ee4`

**Guard:** Before applying the patches, recheck the current `main` HEAD and the base-file SHAs. If either differs, do not blindly apply; reconcile against the newest source first.

## New files to copy to repository root

- `phase2-content-graph.json`
- `phase2-experience-architecture.js`
- `phase2-experience-architecture.css`
- `architecture/phase2-content-graph.schema.json`
- `phase2-assets/` (eight new WebP files)

Other folders (`architecture/`, `tools/`, `patches/`, `previews/`, and reports) are for source control / review as desired; the app only needs the listed runtime files and assets.

## Integration instructions

1. Keep a fresh backup of current `main` and use a separate review branch/repository for integration. Do not overwrite `main` directly.
2. Copy the new runtime files and `phase2-assets/` into the working copy.
3. Apply `patches/INDEX_INSERT_PHASE2.patch` only if `index.html` SHA matches the recorded baseline.
4. Apply `patches/SERVICE_WORKER_PHASE2.patch` only if `sw.js` SHA matches the recorded baseline. It bumps the cache namespace and precaches the new graph, JS, CSS and eight images.
5. Serve over HTTP (not `file://`) and run `python tools/validate_phase2.py --root .` from the package. The validation report is separate from live browser testing.
6. Verify each existing view, all injected galleries, Escape/close/focus restoration, missing-asset fallback, cross-nav into the existing age self-attestation, all wheels, story choices, wishlist/compare/demo bag, and service-worker update on a real Android device.
7. Do not publish the new media until the exact host's content policy, image rights/model releases, brand spelling, and claims are approved. All photos are treated as user-supplied references, not proof of rights or product performance.

## New-photo placement summary

See `reports/PHASE2_NEW_ASSET_MANIFEST.csv`. Re-uploaded `1000202897.png` and `1000202895.png` were excluded: their source SHA-256 values exactly match Phase 1's two already-staged images. They are not duplicated in this ZIP.

## Test status

- `tools/validate_phase2.py`: 134/134 static checks PASS.
- JSON Schema: valid; no schema errors.
- JavaScript syntax (`node --check`): PASS.
- Patch format/application: PASS against baseline header fixtures; actual target blob SHA must still be rechecked before integration.
- JavaScript syntax: checked separately with Node.
- New image decodability and hashes: checked at packaging time.
- Browser interaction / deployed GitHub Pages / network image delivery / physical Android: **NOT TESTED in this environment**.
- GitHub writes: no source file, branch, or commit was changed in this run.
