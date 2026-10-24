# Phase 17 — Research Notes and Source Boundaries

Prepared 24 October 2026. This is a double-pass desk research summary for a fictional adult dialogue feature and an adult wellness product discovery section.

## Pass 1: feature and taxonomy scan

The repository already has `phase3-horny-mode.js`, Phase 16 language/gaali preferences, Phase 6 Boyfriend Studio, the dildo and butt-plug sizing wheels, and Wellness education. The gap is not simply missing words/cards: the existing profanity setting was largely a fixed line appended to generated output, and the Wellness section lacks a browsable catalog for several product types.

2026 adult retail coverage emphasizes customized experiences, privacy and discreet shopping: Shopify's guide (30 June 2026) covers app-connected products, customization, wellness positioning, inclusive design, privacy and age/compliance planning. XBIZ reporting about India's adult product market highlights discretion and plain product education. Sources:
- https://www.shopify.com/blog/sell-sex-toys
- https://www.xbiz.com/features/298356/why-discretion-has-been-the-defining-force-in-indias-sex-toy-market

## Pass 2: safety and privacy cross-check

Planned Parenthood covers dildos, butt plugs, anal beads and prostate massagers; advises a flared base or retrieval stop for anal-use toys; recommends appropriate lubrication, cleaning and material awareness; and explains safer sharing. NHS Sexual Health Oxfordshire clarifies that water-based lubricant works broadly with toys and that silicone lubricant can damage some silicone toys. Source links:
- https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-toys
- https://www.plannedparenthood.org/learn/ask-experts/whats-anal-sex-what-are-the-risks-of-it
- https://www.sexualhealthoxfordshire.nhs.uk/services/psychosexual-therapy/lubricants/

India data/privacy planning reference: MeitY's explanatory note to the Digital Personal Data Protection Rules 2025 emphasizes clear standalone notices, plain language, specifying personal data and purpose, and withdrawal mechanisms where applicable:
- https://www.meity.gov.in/writereaddata/files/Explanatory-Note-DPDP-Rules-2025.pdf

## Decisions derived from research

1. Use a true language/tone/gaali setting with output differences, not a single repeated curse line.
2. Keep “Ultra” user-selected; don't silently escalate language or content.
3. Clearly identify the 11 Wellness entries as category previews; no invented price, stock, material or dimensions.
4. Surface the manufacturer/specification fields that need verifying before a product can be recommended or sold.
5. Keep preferences and saved drafts local by default, with clear delete controls. Do not imply the public GitHub Pages website is private or team-only without access controls.
6. Make the UI mobile-first and simple. More settings are useful only when discoverable and understandable.

## Limits

Desk research cannot verify actual product availability, a seller, a supplier's claim, image rights, product safety for a particular person, or legal compliance of this specific site. The actual deployed website and Android interactions still need a manual regression run after installation.
