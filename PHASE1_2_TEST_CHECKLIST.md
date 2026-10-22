# Phase 1–2 Review Checklist — Run This Before Phase 3

This checklist contains user-run checks still pending; do not mark them PASS until actually performed.

## Run locally first
- [ ] Extract `BLACKED_PHASE1_2_WORKING_REVIEW.zip` and run `python3 serve.py` (or `start-preview-windows.bat` on Windows with Python).
- [ ] Open `/index.html`; confirm the page and all seven original views load.
- [ ] Open `/phase2-image-diagnostics.html`; run **Check local images** and expect all 75 listed local files to load.
- [ ] On an internet connection, run **Check 151 URLs**; download the CSV. Treat a browser load error as a lead, not proof of a 404.
- [ ] Open `/phase23-diagnostics.html`; run basic checks and bundled-image checks.
- [ ] Open `/phase4-diagnostics.html`; verify the four wheels and their displayed results match the selected sector.

## Regression / preservation
- [ ] Home, Stories, Innerwear, Sanskari, Wellness, Boyfriend & Couples, Fit Studio still navigate.
- [ ] Story search/filter/series/bookmarks still behave as before.
- [ ] Innerwear search/filter/sort, wishlist, comparison and demo bag still behave as before.
- [ ] Noor search/filter works; the three new Innerwear editorial cards and Grace preview appear.
- [ ] Additional multi-adult image cards remain hidden until the existing 18+ self-attestation step is accepted and hide again on exit.
- [ ] All three original wheel locations plus Dirty/Wild work independently; reset and repeat spin are tested.
- [ ] Existing fit notes, saved stories and other browser data have not been cleared.

## Responsive and release gates
- [ ] Check 320, 360, 390, and 430 CSS-pixel widths; no horizontal overflow.
- [ ] Check the actual website in Android Chrome over HTTP(S), not only the local source files.
- [ ] Verify the new cache version takes effect after a clean reload.
- [ ] Record failures with the exact screen, URL, browser/device, and diagnostic CSV before starting Phase 3.

## Known NOT TESTED here
- Browser interactions (sandbox blocked local navigation), external image HTTP responses, live GitHub Pages after repair, physical Android Chrome.
