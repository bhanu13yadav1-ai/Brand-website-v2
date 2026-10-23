# Phase 7 · Android Chrome Regression Checklist

Run after deploying to a review URL. Test on your Android phone at normal text scale and at 200% browser zoom where practical.

- [ ] Home view opens with no blank gallery/campaign sections.
- [ ] Main navigation opens Home, Stories, Innerwear, Sanskari, Wellness, Boyfriend/Couples and Fit Studio; age gate still protects 18+ views.
- [ ] Existing story search, mood/language/sort filters, story reader, branch choices and optional local bookmarks still work.
- [ ] Phase 4 displays 4 interconnected stories, 3 tone controls and 6 optional character preference groups. Tone changes content; preferences can be skipped, edited and cleared.
- [ ] Dildo, Butt Plug, Boyfriend and Dirty/Wild wheels spin/reset. After a completed wheel result, the related Hinglish story button appears. Every result remains optional and non-predictive.
- [ ] Catalog search, category, sort, image archive and spin viewer still work; original campaign/product images are not silently removed.
- [ ] Phase 5 evidence/seller/specification filters update card visibility and result count; verified/sales-ready selections show zero until real evidence is approved.
- [ ] Product comparison permits no more than 3 distinct products; removing a comparison and clearing all still work.
- [ ] Wishlist save/remove/count and demo bag add/quantity/remove/total still work; no real order/payment is created.
- [ ] Product detail modal opens/closes, disclosure appears, image fallback remains usable, and no raw HTML user input is introduced.
- [ ] Wellness guides, measurement worksheet, fit-cue helper and cm ↔ in conversion work both directions. After unit conversion, review summary before saving. Wrong/empty ranges produce understandable messages.
- [ ] Local measurement save requires opt-in; delete removes saved values. Size calculation does not claim a specific SKU size without a verified chart.
- [ ] Fit Studio photo is local-only, under 12 MB, remove/clear works; fit notes save/clear behave as before.
- [ ] Sanskari/Noor/Grace selection shows the correct full cards; coming-soon labels remain visible when appropriate. No religion or endorsement is inferred.
- [ ] Image-rights panels are visible in collections and Fit Studio; pending rights never appear cleared.
- [ ] All 4 Phase 6 SVG guides load; `phase7-diagnostics.html` source endpoints are HTTP 200.
- [ ] Tap every primary button. Focus indication visible; no text clipped or <escape>below 11px</escape> for important content; no sideways page scrolling at 320–390px width.
- [ ] Check `prefers-reduced-motion`; no forced long animation blocks a wheel interaction.
- [ ] After deployment, reload once and test a fresh tab. If possible, test offline; confirm service worker has the Phase 7 cache version and all new files are precached.
- [ ] Existing data survives update: saved wishlist, sample bag, fit notes and story opt-in records remain present. Do not clear storage to “fix” a migration problem.
- [ ] Final result from QA diagnostic has no unexplained FAILs. Capture any pending results and console/network errors before declaring done.
