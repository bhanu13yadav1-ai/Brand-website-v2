# Phase 4 — Home shortcuts and adult preference router

Status: **prepared locally; not deployed or live-browser verified**.

## Home changes
- Adds three compact links to the existing hero area: Noor Edit, new photo edits and Fantasy Studio.
- These links navigate to existing views/sections; existing Home cards, campaigns, wheel hub and other content are not removed.

## Adult preference router
- Adds fictional character-energy/fantasy categories: romantic, flirty, dark-romance fiction, three-person fantasy, multi-partner fantasy/boundaries, and anal-play/toy-safety education.
- Adds an optional size-reference preference using the existing demo ranges (up to 10 cm, 10–12 cm, 12–14 cm, 14+ cm) but clearly labels them fictional/educational tags, not actual measurements or predictions about a person.
- Results route to the existing story view, couple prompts, Wellness guide, or existing gated Threesome Fantasy collection. The new router never bypasses the gate.
- It does not sell/book people or create real-person profiles, and it does not add a checkout or real-product inventory. No answers are persisted or transmitted.
- Three multi-adult campaign references remain inside `#v23ThreesomeProtected`. Only the single-adult pink reference is in the Innerwear gallery.

## Product decision
The user asked for a “buy a boyfriend based on size/fantasy” concept. A human cannot be treated as an item for sale, and the site currently states it has no companion-booking or real checkout. This phase provides a preference-driven fictional archetype/story/guide router. A future legitimate adult-product catalog can separately use verified manufacturer dimensions, clear specifications and relevant toy-safety guidance.

## Test boundary
Static source checks cover expected controls and routes. Real click paths and the existing gate must be checked after upload through `phase34-diagnostics.html` and manual regression.
