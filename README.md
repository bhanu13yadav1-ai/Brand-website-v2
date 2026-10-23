# BLACKED — Phase 7 Final QA Package

This is a review-ready integration package for `bhanu13yadav1-ai/Brand-website-v2`, not a deployed release.

## Start here

1. Read `README_PHASE7_FINAL_HINGLISH.md`.
2. Keep a backup of the latest repository checkout.
3. Apply the safe, idempotent integration script:

   ```bash
   python3 apply_phase7_integration.py --repo /path/to/Brand-website-v2
   ```

4. Start the site using a local HTTP server from the repository root and open `phase7-diagnostics.html`.
5. Run `tests/phase7-static-validate.mjs` from this package, then follow `PHASE7_ANDROID_REGRESSION_CHECKLIST.md` against the integrated site on Android Chrome.

## What this package corrects

- Links the existing Phase 4, 5 and 6 module files from `index.html` without replacing the app.
- Bumps the service-worker cache version and adds the dependencies that otherwise could remain missing/offline-invisible.
- Fixes the Phase 4 wheel-to-story trigger to use the real completed-wheel marker.
- Converts filled measurement values when the worksheet unit changes.
- Fixes the Noor/Grace collection filter so it can hide/show the full Grace card.
- Adds a final diagnostic runner and regression checklist.

## Safety and release status

The installer backs up changed existing files and avoids replacing existing story data, catalog data, local-storage keys, Phase 5/6 customization, product register rows and rights register rows. It does not enable checkout or payment. Existing image rights and product facts are not automatically treated as verified.

**Not deployed.** GitHub branch creation was denied by the connected integration (`403 Resource not accessible by integration`). Browser/Android runtime testing remains pending; see `PHASE7_FINAL_RELEASE_REPORT.md`.
