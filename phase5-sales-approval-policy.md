# Phase 5 — Product & sales approval policy

## Default state
Current catalogue entries are campaign/concept references. They must not be treated as purchasable goods until an owner verifies the complete record. The selector in this review build is a planning tool only; it cannot enable sales.

## Minimum record before approval
1. Identifiable SKU and source-of-truth page or signed supplier specification.
2. Seller / brand owner legal identity and working contact route.
3. Confirmed material, exact measurements and size chart for the specific product; instructions and warnings where relevant.
4. Final selling price, stock status with a timestamp, applicable charges, delivery terms, and customer-support / return / refund / warranty terms.
5. Commercial image rights and model releases for the intended channels, where required.
6. Human reviewer and approval date; a review must be renewed after material changes.
7. A production architecture that actually handles secure orders/payment and customer data; static demo buttons are not a checkout.

## Planned sales paths
- **Editorial-only (current):** concept images, general information and transparent labels. No offer, checkout, purchase/payment or implied inventory.
- **Own-brand retail:** use only after ownership/supplier, SKU, specifications, supply/stock, pricing, terms and applicable legal/tax obligations have been reviewed.
- **Affiliate referral:** requires an approved destination and current seller information; disclose the affiliate/commercial relationship next to the recommendation in plain language. Do not claim to have tried a product when not true.
- **Third-party marketplace:** requires a defined operator and seller responsibilities, accurate seller/product disclosures, complaint handling, order/refund processes and privacy responsibilities.

## India regulatory watch
As of 23 October 2026, the Department of Consumer Affairs has announced that the Consumer Protection (E-Commerce) (Amendment) Rules, 2026 take effect on **1 January 2027**. The actual operating model should be checked against the current official rules and legal advice before launch; this document is a product-control checklist, not legal advice or a compliance certificate.

Sources:
- Government of India, Press Information Bureau, 10 September 2026: https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=294532
- Department of Consumer Affairs — Consumer Protection rules and amendments: https://consumeraffairs.gov.in/acts-and-rules/consumer-protection/consumer-protection
- ASCI guide for influencers (disclosure and substantiation reminders): https://www.ascionline.in/social/wp-content/uploads/2024/03/ASCIs-Guide-For-Influencers-1.pdf

## Release rule
A `sales_approved=YES` value must not be a casual toggle. It requires complete source evidence, seller/business approval and a tested production sales system. In this package, all eight current rows start `NO` and the frontend sales gate remains disabled.
