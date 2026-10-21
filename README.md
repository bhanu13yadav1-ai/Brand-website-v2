# BLACKED V1 Phase 4 — Recovery + Wheel & Couples Build

This is the **complete root deployment package** for `bhanu13yadav1-ai/Brand-website-v2` after the Phase 2/3 overlay-only uploads left the Pages site without a root `index.html`.

## Upload correctly
1. Back up/download the current `Brand-website-v2` branch first.
2. Extract this ZIP on your device.
3. Open the extracted folder `V1_PHASE4_RECOVERY_UPLOAD/` and upload its **contents** into the repository root (the same level where the existing `README.md`, `app.js` and `styles.css` currently sit).
4. Replace the root `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest` and `README.md`; add `index.html`, `fallback.js`, `app-icon.svg` and `phase4-diagnostics.html`.
5. Do not upload only the ZIP file, and do not create another nested `V1_PHASE4_RECOVERY_UPLOAD/` folder inside the repository.
6. Commit once all files are in the root.
7. Wait for GitHub Pages to rebuild and open the root website. If an old version remains, open the diagnostics page in a private tab and then refresh the site.

## Important diagnosis
Before this recovery package, the observed `Brand-website-v2` main branch had no root `index.html`, no original image files, and no `css/` or `js/` directories. The root `app.js` and `styles.css` were compatibility wrappers that expected a different folder layout and original source files that were absent from this repository. GitHub Pages therefore rendered the README heading instead of the intended website.

## Original image handling
This repository did not contain binary campaign assets at the time of the audit. To avoid replacing your supplied imagery with unrelated stock art, this package references known image files in the public `Brand-website-4f` and `Brand-website-3` repositories using `raw.githubusercontent.com`. A local inline fallback is used if an image fails. This means the site needs an internet connection for original photos; production delivery still depends on those public source repositories remaining available. The source image paths were checked against the repositories' current file trees, but live image loading has not been verified from this environment.

## Product scope
The package contains the core audited feature set: Home, Innerwear references, search/filter/sort, details, wishlist, comparison, demo bag, ten distinct Sanskari campaign images, Muslim/Christian Coming Soon previews, an eight-frame concept viewer, Wellness guides/converter, all three original wheel locations, a dedicated Dirty/Wild wheel, Boyfriend/Couples tools and local Fit Studio notes/photo preview. It is a frontend prototype only—no real inventory, checkout, payments, user accounts, dating service or formal age verification.

## Verify after upload
Open `/Brand-website-v2/phase4-diagnostics.html` on the deployed site and press **Run full checks**. Use that result—not this README—to determine which checks actually pass in your browser. The diagnostic page is best opened over GitHub Pages rather than from a local file.
