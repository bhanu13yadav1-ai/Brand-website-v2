# Wheel Selection Acceptance — V2 Phase 2+3

For each of the four wheel controls (`boy`, `dildo`, `plug`, `wild`):

1. Exactly eight visible labels are present.
2. A spin chooses an index in 0–7 and computes the stop angle from the centre of that exact sector.
3. The result view uses the same index to choose its title and explanation.
4. A second spin accounts for the previous wheel angle.
5. Reset cancels any pending completion, returns the disc to zero degrees and clears the selected result.
6. For `wild`, changing category replaces both wheel labels and result options.
7. The wheel pointer stays fixed while the disc rotates.
8. `prefers-reduced-motion` shortens the animation and keeps the same selection math.
9. Every prompt is optional; the safety wording is shown in the result area.

The deterministic geometry check calculates the angular distance between the selected sector's centre and the fixed pointer. A passing runtime result should report `< 0.5°` error.
