# Phase 1–2 test checklist

- [ ] `node --check phase2-photo-collections.js`
- [ ] All eight paths in `notes/PHASE2_IMAGE_MANIFEST.csv` exist after extraction.
- [ ] Each photo loads and has its actual dimensions; broken images display an error status.
- [ ] Noor search and category filter update result count correctly.
- [ ] Preview opens with accessible title/alt and closes via close button, Escape and backdrop.
- [ ] Focus returns to the image card that opened preview.
- [ ] Innerwear still has all old cards plus exactly two new editorial cards.
- [ ] Grace preview does not remove `COMING SOON` or the existing description.
- [ ] Group reference is nested within `#v23ThreesomeProtected` and stays hidden before gate confirmation.
- [ ] All seven existing views and all four wheels still work.
- [ ] No horizontal overflow at 320/360/390/430 CSS px.
- [ ] Service-worker version changed so new JS/CSS/assets do not stay stale.
- [ ] After deployment, run existing phase23 and phase4 diagnostic pages and capture the results.

Reference: https://web.dev/learn/design/responsive-images/ (responsive sizing, explicit dimensions, lazy loading)  
Reference: https://www.w3.org/TR/WCAG22/ (reflow and touch interaction accessibility).
