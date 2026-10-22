# BLACKED Super Update — Phase 4 (Hinglish)

## Is phase mein kya cover hua

Tumne sahi point uthaya tha: pichhle Phase 3 package mein “More Dirty for Horny Girls” story universe aur tone controls usable feature ke roop mein integrate nahi hue the. Isliye is Phase 4 package mein **Phase 4 (four wheels + Boyfriend/Couples)** ke saath woh missed story/tone scope bhi include hai.

### New files
- `phase4-story-universe.js` — tone controls, four connected fictional Hinglish stories, branching reader, wheel-result-to-story links, boyfriend preference cards.
- `phase4-story-universe.css` — responsive phone-first layout, card states, accessible focus, reader dialog and mobile breakpoints.
- `phase4-story-universe.json` — story data with three distinct tone variants per scene and validated branches.
- `phase4-diagnostics.html` — hosted runtime diagnostics for routes, story/tone controls, preference cards and all four wheel alignments.
- `tests/phase4-static-validate.mjs` — JSON/story-graph/tone/math checks.
- `tests/phase4-repo-check.mjs` — run from the repo root after the two patches are applied.
- `patches/INDEX_PHASE4_INSERT.patch` — add the new CSS and script tags to existing `index.html`.
- `patches/SW_CACHE_PHASE4.patch` — bump cache version and precache the new feature assets plus the already-linked Phase 2 photo module.

## Integration steps

1. Download/unzip this package outside the production folder.
2. Confirm the repo is still on the base commit recorded in `docs/PHASE4_CHANGELOG.md`. If `index.html` or `sw.js` has changed since the base commit, stop and reconcile the small patches instead of forcing them.
3. Copy the three runtime files (`phase4-story-universe.js`, `.css`, `.json`) and `phase4-diagnostics.html` into the repository root.
4. In a review branch, apply:
   - `git apply patches/INDEX_PHASE4_INSERT.patch`
   - `git apply patches/SW_CACHE_PHASE4.patch`
5. Run `node tests/phase4-static-validate.mjs` from the package and `node tests/phase4-repo-check.mjs` from the repo root (copy the `tests/` folder or run via its path).
6. Deploy only to a review environment and run `phase4-diagnostics.html`. Manually test Android Chrome, keyboard navigation, reduced motion, back/close, and regression of old content before merge.

## Feature behaviour

- **Story tone:** Clean Hinglish, Desi Casual, Bold Hinglish + Gaali. Tone is in-memory only and is reset when the page reloads. The new Phase 4 universe is tone-aware; the original story library remains unchanged, so existing story text/bookmarks are not rewritten.
- **New story universe:** four adult-fiction stories with choices and cross-story routes. All characters have explicit adult ages. Content stays suggestive/non-graphic; this adds banter, plot choices and strong colloquial language without explicit sexual descriptions.
- **Boyfriend/Couples preferences:** height, appearance/complexion, build, style, personality and an optional fictional penis-size trope. The combination is user-selected fiction—not a body/anatomy inference or real-person prediction. Skin-tone/appearance and body-size controls are independent.
- **Privacy:** preference selections and tone remain in JS memory only; no localStorage, sessionStorage or server saving. The existing site's age gate is untouched.
- **Four wheels:** keep the current `part-c-enhancements.js` sector/result alignment logic. The new module appends a relevant-story CTA after a completed wheel result; it does not attach a second spin handler or replace the wheel algorithm.
- **Commerce:** no checkout, order, inventory or payment changes in this phase.

## Important boundary

The source images include different brand labels and the stories are fictional. No new product claims or real inventory assertions are introduced. The GitHub integration currently blocks write/branch creation with a 403, so this package is a reviewable additive patch; it has not been committed or deployed by this run.

## Local smoke test (optional)

From this package folder, run `python3 -m http.server 8765` and open `http://127.0.0.1:8765/tests/phase4-module-harness.html`. That is a synthetic DOM test of the new module only. Then, after applying the patches to a full review copy, open `phase4-diagnostics.html` for same-origin integration checks. The harness is not a substitute for the real-site regression suite.

No new photos were supplied in this Phase 4 request, so this ZIP contains no image files and does not duplicate Phase 1–3 image batches.
