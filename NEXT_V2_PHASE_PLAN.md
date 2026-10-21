# V2 — Proposed Implementation Phases

## Phase 1 — Current status: Audit & asset mapping
- Inspect the actual `main` source and list current screens/features.
- Identify why Boyfriend/Threesome content is missing.
- Audit new images, dimensions, source hashes and duplicates.
- Lock wheel acceptance tests and preservation checklist.
- Deliver: this audit package. **No live source changes yet.**

## Phase 2 — Integration & correct asset wiring
- Create a safe branch/working copy.
- Integrate `part-c-enhancements.css` and `part-c-enhancements.js` without double-binding event handlers.
- Correct the existing five Part C image URLs and any folder-path mismatch.
- Add the 10 unique uploaded image designs into intentional folders and create an image map.
- Update the service worker cache version and core file list.
- Verify the Boyfriend gallery and Threesome cover load from bundled local assets.

## Phase 3 — Wheel redesign & functional verification
- Use `1000201720.png` and `1000201714.png` as section poster art.
- Use real labelled eight-sector wheels for interactive selection.
- Ensure the final sector equals the result; fix reset, repeated spin, category-change and reduced-motion behavior.
- Test all four wheels separately on mobile and desktop.

## Phase 4 — Story/wheel cross-links and Boyfriend experience
- Link the wheel prompts to relevant stories and Boyfriend/couple pages.
- Keep optional/skip flows and 18+ gate.
- Keep personal measurements and fantasy choices out of public analytics.

## Phase 5 — Collections & content polish
- Put red-lace art under Innerwear Campaigns.
- Put “Sanskari Outside, Bold Within” and “Shaam…” art under their collection cards, avoiding duplicates.
- Preserve Wellness & Size Guide and current 151-record image archive.
- Keep product specs and claims evidence-based.

## Phase 6 — Security, accessibility, performance
- Review local storage, age gate, service worker, CSP, keyboard access, touch target size, responsive behavior and performance.
- Avoid destructive data changes.

## Phase 7 — Final regression and release
- Run static checks, local browser tests, image URL checks, mobile viewport checks, and live GitHub Pages verification after upload/deploy.
- Publish exact PASS/FAIL/NOT TESTED/BLOCKED statuses.
- Deliver one clean final ZIP and a copy-paste status note.
