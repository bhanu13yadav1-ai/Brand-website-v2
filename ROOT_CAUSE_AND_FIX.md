# Innerwear tap-freeze — source-backed fix

## Exact source state checked
- Repository: `bhanu13yadav1-ai/Brand-website-v2`
- Baseline `app.js` Git blob: `1e11dfac00b93ebc2374990116a31d1afaf48315` (111,501 bytes)
- Baseline `sw.js` Git blob: `01c9e496acb4d3732e88f47ef7a4661de0ea2d4f` (4,079 bytes)
- `index.html` is intentionally not modified. No images, archive records, existing screens, stories, wheels, or saved-data keys are deleted.

## Root cause found in code
1. On Innerwear tap, `setView('innerwear')` immediately started the 151-record JSON/gallery path. Once the manifest resolved, it inserted the first 24 cards at once.
2. The old image deferral only scanned the original DOM. Later feature scripts append extra gallery images inside hidden screens, and those newly inserted images retained a live `src` while Home was showing. They could issue unnecessary external image requests and compete for mobile bandwidth/image decoding.
3. The original DOM placed the archive before the simple product catalogue. This put the heavy optional section before the eight immediately usable product cards.
4. The service-worker cache name identified an earlier release, so a browser can keep using old cached JavaScript until the worker/app is updated and the page is reloaded.

## Fixes made in this update
- A targeted `MutationObserver` now defers `src` for images appended to inactive views, and also catches later `src` changes. Deferred URLs load as their screen becomes active and images approach the viewport (using `IntersectionObserver` where available).
- The eight immediate product cards and compare panel move above the large archive.
- Archive initialization is scheduled after a paint and an idle window; if the user leaves before it starts, the scheduled work is cancelled and can be attempted next time.
- The initial archive batch changes from 24 to 8. The existing “Load next 8” control still exposes the complete **151-record** manifest; the records were not deleted.
- The existing Wellness SVG-path repair now also repairs an image path after the deferral system has moved that path into `data-deferred-src`.
- Service-worker cache version is bumped so a new installation retires older `blacked-v*` app caches. App local storage is not cleared.
- Added a same-origin browser diagnostics page to check Innerwear activation, initial batch, all archive entries, repeat navigation, seven views and four original wheels after deployment.

## Controlled test evidence
The controlled test used Chromium with a 390 × 844 mobile viewport, injected current source scripts and a local fixture containing the same 151-record JSON manifest. External remote image requests were deliberately aborted; this keeps the interaction test deterministic but does not test the public image host.

| Check | Baseline source | Patched source |
|---|---:|---:|
| Images in inactive views with an active `src` at startup | 64 | 0 |
| Initial archive batch | 24 | 8 |
| Catalogue before archive | No | Yes |
| Complete archive entries available | 151 | 151 |
| Original app views | 7 | 7 |
| Original wheel discs | 4 | 4 |
| Uncaught app/ page exceptions during controlled run | 0 | 0 |

A separate five-sample same-harness comparison showed median synchronous button dispatch around 119 ms on baseline versus 79 ms patched. These timings vary by run and must not be treated as a guaranteed Android speed score. In a fuller patched regression, 18 “Load next 8” clicks exposed all 151 cards; repeat Home → Innerwear navigation worked; no uncaught JavaScript exceptions were observed. Console “failed to load” messages in this simulation are expected because external image requests were intentionally blocked.

## Validation boundary
The public GitHub Pages page and a physical Android phone could not be interactively opened by this environment (network/browser access restriction). Nothing in this package has been pushed or deployed. **Do not mark the live bug fixed until the uploaded files are published and `innerwear-fix-diagnostics.html` passes in the user's Android browser.**
