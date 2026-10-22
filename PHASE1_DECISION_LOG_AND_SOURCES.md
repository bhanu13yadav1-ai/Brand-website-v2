# Phase 1 — Decisions, risks and source register

Status values: **BLOCKED** = a required approval/input is outstanding; **NOT TESTED** = not verified in a live runtime; **PASS** means only the stated static check passed.

| Decision / gate | Phase 1 status | Evidence/action required |
|---|---|---|
| Production host for suggestive 18+ content | BLOCKED | GitHub Pages e-commerce limits and sexual-content policy may conflict with this project. Select and verify a host that permits the real content and trade model before publishing. |
| GitHub repository content compliance | BLOCKED / REVIEW | Verify whether suggestive synthetic/marketing images and intended adult fiction fit the repository's current AUP. Keep new photos staged, not committed, until reviewed. |
| Payment processor | BLOCKED | Stripe India, PayU and Razorpay published policies list adult goods/content restrictions. Obtain written approval for exact product/content/legal entity before integration. |
| Product supplier & truth | BLOCKED | None of the 10 new posters establishes product specifications, certifications, stock, pricing or efficacy. Get actual manufacturer/SKU documents. |
| BLACKED vs INNERWERE vs BLXCKED brand hierarchy | BLOCKED | Confirm whether INNERWERE is a separate brand, collection or concept. The images use inconsistent brand spelling; do not silently mix. |
| New photo rights/likeness | BLOCKED | User supplied the images, but this alone doesn't prove commercial/public distribution rights or model releases. Preserve source traceability and verify permissions. |
| Current hosted site runtime | NOT TESTED | Browser could not reach the Pages URL from this environment; test on Android/normal network. This does not prove downtime. |
| Remote archive HTTP availability | NOT TESTED | 151 JSON records and unique IDs verified, but network responses must be checked from the real visitor environment. |
| 2027 e-commerce rule readiness | PLAN REQUIRED | Official Consumer Protection (E-Commerce) (Amendment) Rules, 2026 take effect 1 Jan 2027. Review seller/entity contact details, grievance handling, sponsored listing disclosure, reference-price history and dark-pattern controls with counsel. |

## Official/current sources checked on 22 Oct 2026

- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub sexually obscene-content policy: https://docs.github.com/en/site-policy/acceptable-use-policies/github-sexually-obscene-content
- Stripe India restricted businesses (page last updated 22 Sep 2026): https://stripe.com/in/legal/restricted-businesses
- PayU banned/restricted category list: https://payu.in/bannedrestrictedcategorylist/
- Razorpay terms/prohibited products: https://razorpay.com/terms/
- Department of Consumer Affairs latest news (rules published 11 Sep 2026): https://consumeraffairs.gov.in/pages/latest-news
- Consumer Protection (E-Commerce) (Amendment) Rules, 2026 Gazette PDF: https://consumeraffairs.gov.in/public/upload/admin/cmsfiles/whatsnews/E_Commerce_Amendment_Rules_2026_2026-09-11_18-12-58.pdf
- MeitY DPDP Rules 2025 page: https://www.meity.gov.in/dpdp-rules-2025

This is product/engineering research, not legal advice. Counsel and each prospective platform/payment provider should review the exact production model.
