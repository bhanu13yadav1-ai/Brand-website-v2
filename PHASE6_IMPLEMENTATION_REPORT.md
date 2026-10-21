# V1 Phase 6 — Performance, accessibility, privacy and security hardening

## Scope
Incremental hardening of the Phase 5 root-ready website. Existing screens and features are retained. No framework migration is introduced.

## Changes
1. **Performance:** extracted 151 image records from the 111KB application script into the existing same-origin JSON manifest; the image gallery now renders up to 24 cards per batch and exposes Load more. Images stay lazy-loaded and get intrinsic width/height to reduce layout shift.
2. **Accessibility:** added skip link, visible focus ring, screen-reader loading/status text, larger minimum touch targets, reduced-motion CSS, dialog focus trapping/restoration and page focus continuity.
3. **Privacy & data integrity:** added a dedicated privacy/data controls dialog. Explicit confirmation removes only known BLACKED local/session storage keys (not other websites’ data). Measurements remain opt-in and are disclosed as non-encrypted browser storage. Local photo preview uses an object URL and revokes it on pagehide.
4. **Security:** same-origin image-manifest fetch with a source-host allowlist; storage JSON has a size bound; stored bag fields are bounded/sanitized; persisted image URLs are restricted to HTTPS raw.githubusercontent.com paths under the three approved repositories; CSP and no-referrer metadata added.
5. **Service worker:** versioned cache namespace, tolerant install pre-cache, old Phase 4/5 cache cleanup, same-origin-only caching, network-first navigation, and cache fallback. External source images are not copied into the service-worker cache.
6. **Diagnostics:** Phase 6 diagnostics check app assets, manifest, runtime features, progressive image rendering, privacy controls and provide a batched external-image URL test.

## Data preservation
The existing current storage keys remain the primary keys. The new clear-data action is opt-in and confirmed. No automatic storage wipe or destructive migration occurs.

## Status
- Source edits generated from the current Phase 5 root-ready package in this workspace.
- Local Chromium/Playwright tests: **32/32 PASS**, 0 FAIL; no uncaught page errors. External image requests were blocked deliberately during this run.
- Node syntax checks, JSON validation, HTML parse, package reference checks and local browser tests are performed separately and recorded in `PHASE6_QA_RESULTS.json`.
- Public source-image HTTP tests and live GitHub Pages deployment remain **NOT TESTED** until Phase 6 files are uploaded and diagnostics run against the deployed site.
- Physical Android Chrome testing remains **NOT TESTED** by the local harness.

## Known limitations
- Image binaries are not bundled; the 151-record library is retained with public raw-GitHub paths.
- Browser local storage is not encryption and should not be described as a private vault.
- The site is a front-end prototype; no accounts, server, analytics endpoint, real inventory or checkout is added.
