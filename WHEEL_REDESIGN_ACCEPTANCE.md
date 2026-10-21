# Wheel Redesign — Research & Acceptance Plan

## Uploaded visual references
- `1000201720.png` — “Tease & Guess Wheel”: use as a featured wheel poster/cover.
- `1000201714.png` — “After-Dark Questions”: use as a second prompt-wheel cover/idea.
- Both are flat, portrait poster images with text and a drawn wheel. Neither can safely serve as the interactive wheel itself, because the image cannot expose live sector selection or guarantee the displayed result matches where the pointer stops.

## Current source problem
`index.html` currently loads `app.js` but does not load `part-c-enhancements.js`. The core `spinWheel(kind)` in `app.js` chooses a result using `chooseDifferent(...)`, then independently randomizes rotation (`1900 + randomInt(1400)`). Because the visual angle is not derived from the selected index, the displayed result can disagree with the segment under the pointer.

Part C has code for labelled segments and target rotation, but that code is currently unreferenced by `index.html`; it also expects the five local male/threesome images beneath `./assets/fantasy-gallery/` when their binaries are in the repository root.

## Acceptance criteria for implementation
1. Separate labelled wheel component for Boyfriend/Land, Dildo, Butt Plug and Dirty/Wild.
2. Use eight clear category-appropriate segments in the live wheel.
3. Pick a segment index first. Calculate the final rotation from that exact index plus the fixed pointer offset. Never randomly select result separately from rotation.
4. After animation, derive displayed title/description from the same selected index.
5. Category changes must update both visible labels and result dataset.
6. Prevent multiple spins during animation; reset must cancel pending timers/animation and unlock all controls.
7. Add accessible name/description and live result announcements. Keyboard users can focus and trigger each control.
8. Respect reduced motion settings; no endless spin or animation-only feedback.
9. Use poster assets as section marketing images; make the wheel itself real HTML/CSS/SVG, not a single static image.
10. Test each of all four wheels independently at 320, 360, 390, 430 and desktop viewport sizes.
11. Live diagnostics must report the selected segment index, segment title, final angle and mismatch state.
12. Test after refresh and after navigating between sections.

## Status
Audit only — no source changes applied to GitHub in Phase 1.
