# Master Prompt — 14-Rule Phase Map

This file keeps the user's 14-rule Master Prompt as the governing release contract for V1. The 7-phase order is deliberate; do not skip a phase or mark a requirement PASS without evidence.

| Rule | Requirement | How this V1 sequence handles it | Status now |
|---|---|---|---|
| 1 | Audit the real site first | Inspected the three public source repositories and then the actual `Brand-website-v2` branch after the screenshot. | PARTIAL — static source/tree audit; live Pages still pending |
| 2 | Preserve features/data | Recovery package restores core feature areas and audited advanced wheels; original localStorage from another GitHub Pages origin cannot be migrated automatically. | PARTIAL — this recovery build does not yet restore all advanced legacy features; see Phase 4 report for Fit Passport, Fit Detective, manual Try-On, style quiz/board and full catalogue gaps; check regression after upload |
| 3 | Fix image paths at root cause | Diagnosed missing root `index.html`/assets in V2; added early fallback script; uses verified public source-path references. | PARTIAL — live image requests pending; assets remain external |
| 4 | Identify/test three original wheels | Boyfriend size/fantasy, Dildo size reference, Butt Plug size reference are separate locations; all have individual controls and reset. | PASS in local headless functional tests; live test pending |
| 5 | Maintainable architecture | Root `index.html`, `styles.css`, `fallback.js`, `app.js`, `sw.js`, manifest; separated concerns and real root paths. | PASS for package structure; production smoke test pending |
| 6 | Research adult relationship themes responsibly | Dirty/Wild categories use non-graphic optional prompts emphasizing consent, skip and boundaries. | PARTIAL — wider research/report belongs in Phase 5/6 before public release |
| 7 | Wellness/body education | Basic bra/waist/hip guide, vulva/vagina guide, virginity myth guide, converter and citations included. | PARTIAL — complete evidence-reviewed section remains Phase 5 |
| 8 | Clear information architecture | Six clear views and Home directory; separate Wellness and Boyfriend areas; mobile nav. | PASS in local navigation tests; hosted check pending |
| 9 | Sanskari + faith-inspired previews | Ten individually mapped campaign references; separate Muslim-Inspired Noor and Christian-Inspired Grace Coming Soon cards. | PASS in local source/UI tests; live image loads pending |
| 10 | New Dirty/Wild wheel | Dedicated wheel with ten categories, spin/retry/reset and no immediate repeat within a category until options cycle. | PASS in local functional tests; live touch test pending |
| 11 | Boyfriend/Couples | Date planner, messages/copy, conversation prompts, original Boyfriend wheel and integrated Dirty/Wild wheel. | PASS in local functional tests; live test pending |
| 12 | Design/performance/accessibility/security | Mobile-first CSS, focus-visible, reduced-motion support, image fallback, local-only photo preview, explicit prototype boundaries. | PARTIAL — production/security/accessibility review remains |
| 13 | Strict test/release | Local headless checks and hosted diagnostic page supplied; device and production checks remain NOT TESTED. | PARTIAL |
| 14 | Senior report and evidence | This report, root-cause note, asset manifest, QA results and copy-paste handoff are included. | PASS for package documentation; final release report comes after live QA |

## Mandatory status vocabulary
- **PASS** — a stated test ran and passed.
- **FAIL** — a stated test ran and failed.
- **NOT TESTED** — no valid test evidence exists yet.
- **BLOCKED** — access, credentials, source bytes or hardware are unavailable.

## Phase sequence
1. Baseline audit.
2. Safe source/assets and root-path recovery.
3. Navigation/collections and preview cards.
4. Three original wheels + Dirty/Wild wheel + Boyfriend/Couples integration.
5. Complete researched Wellness & Size Guide.
6. Performance, accessibility, security, data/cache hardening.
7. Production regression, deployment checks and final release report.

Phase 4 cannot be called fully released until the ZIP has been uploaded to V2 and `/phase4-diagnostics.html` has passed in GitHub Pages. The external-image requests and a physical Android browser are specifically NOT TESTED here.


## Phase 7 — Final regression, story spotlight and release candidate

- Re-check current repository before deployment; it was still Phase 5 source at the last audit even though Phase 6 files exist in the working package.
- Run final local validation and preserve all Phase 4–6 behaviors.
- Feature a self-attestation-gated `Sex Stories · After Dark 18+` destination with four short suggestive/non-graphic fictional stories; all characters are adults and consent is central.
- Add the `MORE DIRTY FOR HORNY GIRLS` next-update teaser; long-form story library stays roadmap-only.
- Run `phase7-diagnostics.html` locally and after deployment; distinguish source/local checks from live GitHub Pages, external image availability and real Android testing.
- Release report must mark each check PASS / FAIL / NOT TESTED / BLOCKED honestly.
