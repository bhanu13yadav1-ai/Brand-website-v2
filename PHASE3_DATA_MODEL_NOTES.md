# Phase 3 Data & Interaction Notes

## Unified media records
Each new media record has a stable ID; a route/group, exact relative asset path, alt text, brand status, rights status and claim status. Its `relatedRoutes` list powers navigation buttons. Concept artwork stays separate from sellable SKUs.

## Fictional partner vibe card
The card is deliberately not a profile/account. It exists only in the current JavaScript runtime memory. Nothing is persisted, synced, analysed or sent remotely. A page reload clears it. No preference affects the wheel automatically.

### Separation of attributes
- Appearance/complexion describes visual character casting only.
- Size trope and natural pigmentation are separate optional fields.
- Never infer genital anatomy from race, ethnicity, face, physique, clothing or an image.
- “Longer-size fantasy” is a story trope, not a numerical claim or real-world recommendation.
- “Darker natural pigmentation” is written as individual natural variation and is not attached to the selected race/complexion.
- Consent is not a preference field and never implied by card selection.

## Navigation relationships
- Wellness concept → existing Boyfriend & Couples view (optional).
- Innerwear T-string study → Collections (optional).
- Noor/modest concept → Innerwear gallery (optional).
- Vibe card → optional scroll to existing Wild wheel; it does not spin the wheel.
