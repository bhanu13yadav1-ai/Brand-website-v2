# BLACKED V4 — Phase 17 Master Plan (Hinglish)

**Release name:** Ultra Desi Studio + Quick Urge Mode + Wellness Product Vault  
**Prepared:** 24 October 2026  
**Purpose:** Add a genuinely different language/dialogue experience and fill the missing Wellness catalog categories without replacing the original website or duplicating its images.

## Product principle

Gaali ek language/tone preference hai; use by itself galat maan kar hide nahi karna. Adult users apni language aur intensity select kar saken. `Clean`, `Light Desi`, `Medium Desi`, `Full Desi`, `Ultra Desi` options ka output waqai badalna chahiye. Ultra setting ko ek fixed sentence append karne tak limited nahi rakhna: language, tone, prompt structure aur branch choices se full result badle. Real people ko target karne, coercion ko glamorize karne, minors, hate-targeted slurs, impersonation ya non-consensual real-person content ko dirty-fiction style ke saath mix na karein.

## Phase 17 mein code ke saath included

1. **Five-level Gaali setting** — clean se Ultra Desi; existing Phase 16 preference form, Randi/Mood mode aur supported Phase 5/4 output selectors mein `ultra` option add kiya.
2. **Language-aware dialogue** — Hindi, Hinglish aur English ke liye different line/prompt sets.
3. **Tone switcher** — teasing, savage banter, bold confidence, dark-romance drama, flirty chemistry, friendly fictional roast.
4. **Quick Urge Mode** — quick, medium ya deep scene starter; 18+ confirmation aur one-tap remix.
5. **Scene Remix / branches** — generated prompt ke baad new beat, alternate mood, continue ya end choices.
6. **Copy and private saved scenes** — save, load, delete single scene, clear all; local browser storage only.
7. **Wellness Product Vault** — missing categories: classic/curved/suction-base dildo, butt plugs, anal beads, prostate massagers, lubricants, cleaning/care and storage.
8. **Catalog UX** — search, category filter, A–Z sort, up-to-three comparison, local product shortlist and “specs needed” details.
9. **Honest product status** — cards clearly say `category preview / not a verified SKU`; no invented price, seller, availability, material, certification or dimensions.
10. **Original new illustration assets** — four small SVG category illustrations. They are illustrative category artwork, not real product photos.
11. **Safety information** — flared-base/retrieval-stop reminder, lubrication, material compatibility, cleaning, sharing/barrier guidance, and links to Planned Parenthood and NHS Sexual Health Oxfordshire.
12. **Service-worker refresh** — new cache version and Phase 17 assets in the offline shell.

## More unique ideas (next backlog; not falsely marked as implemented)

### A. Ultra Desi / dialogue engine

- **Dial-Pack Presets:** `Dilli Hinglish`, `UP-flavoured Hinglish`, `Neutral Hindi`, `English` — labels must be user-selected style presets, not claims that everyone in a region speaks the same way.
- **Gaali Mix Board:** separately tune profanity intensity, frequency (`rare / balanced / frequent`), banter vs romance, and sentence punchiness. Show a preview before saving.
- **Custom Phrasebook:** users add favourite phrases, mark phrases “never use”, and export/delete the wordlist. Do not silently send it to a server.
- **No-Repeat Engine:** keep a small local history of recently used lines and avoid duplicates; reset history from Settings.
- **Character Voice Cards:** save several fictional voices (e.g., teasing, dramatic, savage, romantic) with their own language and intensity.
- **Scene Branch Map:** each choice changes the next story beat, not just the heading; include explicit `switch / skip / end` paths.
- **Two-Sided Dialogue:** alternate character A/B lines and let the user edit either before continuing.
- **Intensity Ramp:** off by default; only increase intensity if the user explicitly taps “more bold”. Never escalate automatically after a refusal or stop.
- **Quick Mood Deck:** `flirty`, `banter`, `roast`, `story`, `couple conversation`, `wellness`; one tap opens the matching feature, not a duplicate copy of it.
- **Local Draft Recovery:** offer recover/discard after an accidental refresh, without sending story text to analytics.
- **Share-Safe Copy:** copy plain text by default; offer a separate sanitized title card rather than sharing explicit preferences in a URL.
- **Feedback without tracking:** local thumbs-up/down for a generated line; aggregate only if the site owner later obtains explicit opt-in and implements privacy review.

### B. Quick Urge Mode

- **Three-question entry:** pick mood, language/intensity, and short/medium/deep; no long onboarding.
- **One-screen result:** a clear result, one Continue action, one Remix action, one Exit action.
- **“Not in the mood for a story?” alternative:** offer a romantic prompt, a funny dialogue, a wellness guide, or exit — never frame it as diagnosis or treatment.
- **Session breadcrumb:** show `Beat 1/3` or `Beat 1/5`, so users know how long the flow is.
- **Private mode:** visible “this device only” label, one-tap clear saved scenes, optional no-save mode.

### C. Wellness Product Vault

- **Need-based finder:** asks what category the user wants to learn about, intended use, experience and cleaning needs. It should show education before suggesting any category.
- **Product Truth Score:** a *data completeness indicator*, not a safety certification. Track verified seller/SKU, manufacturer material, exact dimensions, use label, care/warnings, price/stock/date checked and image rights.
- **Compatibility checker:** product material × lubricant × condom compatibility. `Unknown` must return “check the exact manufacturer label”, never a guessed green tick.
- **Dimension compare:** when real suppliers provide data, compare *total length vs insertable/usable length*, *widest diameter*, base/handle and shape; do not treat generic `XL` as a standard.
- **Anal-use guardrail:** a visible check for a wide flared base or an effective retrieval stop; missing evidence means `not verified`, not `safe`.
- **Material explainer:** distinguish verified 100% silicone, hard plastic, stainless steel and break-resistant glass from material blends or unknown formulations; do not infer from photos.
- **Care timeline:** optional local reminder to review manufacturer cleaning instructions; do not use browser notifications without explicit opt-in.
- **Privacy shortlist:** save product categories locally without putting names or preferences into the page URL.
- **Product provenance panel:** date/source for image, source for specifications and seller verification state.
- **Retail readiness switch:** keep prototype/reference cards separate from verified retail SKUs; no checkout until supplier, price, stock, returns, delivery and required compliance are real.

### D. Reuse existing features instead of burying them

- Home Quick Launch cards for Super Randi, Urge, original Wheels, Stories, Boyfriend Studio and Wellness Vault.
- Shared language/intensity settings between existing supported generators; each module retains its own purpose.
- Keep original three Wheels, story archive, messages/date ideas, Boyfriend archetypes, saved styles/bag, Innerwear, Sanskari and Fit Studio intact.
- Add a **Feature Health Check** panel that reports loaded modules, broken images, missing catalog JSON, console/runtime errors if detectable, and buttons that actually respond.
- Add `Reset only this module` as well as `Clear all local data`, with confirmation and a clear description of what is deleted.
- Provide large tap targets, visible focus states, readable body type and reduced-motion support on Android.

## Research rounds (24 Oct 2026)

### Round 1 — product taxonomy + sexual-health guidance

- Planned Parenthood describes dildos, butt plugs, anal beads and prostate massagers and notes flared base/retrieval-stop, lube, cleaning, material and sharing precautions: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys
- Planned Parenthood's anal-health guidance explains lubrication, gradual/comfortable use, barrier use and stopping if painful: https://www.plannedparenthood.org/learn/ask-experts/whats-anal-sex-what-are-the-risks-of-it
- Sexual Health Oxfordshire (NHS service) explains lubricant and toy-material compatibility: https://www.sexualhealthoxfordshire.nhs.uk/services/psychosexual-therapy/lubricants/
- Shopify's 2026 adult-retail guide highlights customization, discreet privacy, wellness positioning and careful age/compliance planning: https://www.shopify.com/blog/sell-sex-toys

### Round 2 — privacy, Indian context and design direction

- Government of India's explanatory note for DPDP Rules 2025 emphasizes clear, standalone notices, understandable purposes and easy consent withdrawal where applicable: https://www.meity.gov.in/writereaddata/files/Explanatory-Note-DPDP-Rules-2025.pdf
- XBIZ's India-market reporting discusses privacy, discretion, product education and localized trust concerns: https://www.xbiz.com/features/298356/why-discretion-has-been-the-defining-force-in-indias-sex-toy-market
- A 2026 industry article notes that product UX reliability and straightforward controls matter more than adding settings that make a product difficult to use: https://www.xbiz.com/news/299601/a-look-at-the-latest-trends-in-pleasure-products

These are product/design inputs, not proof that any specific shop or product is safe, legal, available or well-reviewed. The site still needs an India-specific legal review before broad public launch. A public GitHub Pages URL is not private just because its intended audience is a team.

## Release gate

Do not call Phase 17 “fully tested” until the module is installed on the actual repository and tested in Chrome on Android. Run all rows in `PHASE17_QA_CHECKLIST.csv`; retest the original 3 wheels, existing story results, Boyfriend Studio, settings persistence, image loading, service-worker refresh and navigation. Phase 17's product records remain category concepts until genuine supplier information is supplied and verified.
