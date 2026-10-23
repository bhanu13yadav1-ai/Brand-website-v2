# BLACKED V4 — MASTER BUILD PLAN (SOURCE OF TRUTH)

**Plan version:** V4.0 planning baseline  
**Prepared:** 23 October 2026  
**Project:** `bhanu13yadav1-ai/Brand-website-v2`  
**Live URL:** https://bhanu13yadav1-ai.github.io/Brand-website-v2/  
**Plan rule:** This file is the canonical handoff. At the start and end of every coding session, read/update this plan before implementation. Do not rely on chat memory alone.

## The mission

Build a genuinely useful, premium, bold, horny, teasing, high-energy adult-oriented brand experience for adult users—not a pile of disconnected cards or buttons. Each feature must complete a task: find, read, choose, create, compare, save, continue, learn, or manage something. Keep the dark luxury / fashion identity, strong Hinglish personality where suitable, and a phone-first interface that does not feel congested.

**Target content direction:** adult-only, opt-in, flirty, dirty-talking, suggestive, sensual, fictional adult story experiences, bold mood controls, playful wheels and user-directed intensity. Use clear boundaries, skip/pause/stop, reversible choices, and privacy-respecting defaults. Medical/wellness education remains evidence-based and visually distinct from erotic fiction. Never make the user accept an escalation they did not choose.

## The compact phase plan: only 5 delivery phases

> Five phases is the target. Each phase may have small checklist substeps, but do not split work into lots of extra “versions” or call an unfinished feature complete just because its file exists.

### PHASE 1 — Audit, foundation, repair & phone-first design

**Goal:** establish a safe, measured baseline and make the existing shell dependable before adding more features.

**Includes:**
- Audit deployed website, latest `main` branch, commit/deploy status, script/style loading order, data/storage keys, all existing views and features.
- Record existing behavior first; preserve all working features, story records, image archive/manifest, storage keys, wheels and views.
- Fix navigation state, tap reliability, modal open/close, double taps, keyboard/focus behavior and error feedback.
- Root-cause repair local image paths, asset URL validation, retry/fallback state, missing/duplicate asset references, and source/rights metadata.
- Define compact mobile design tokens: spacing, readable typography, contrast, responsive grids, touch target size, reduced-motion and focus styles.
- Establish the 18+ content gate and explicit content-area labels without presenting self-attestation as legal identity/age verification.
- Review `app.js` bundle loading and old/new module dependencies before merging. Avoid duplicate initialization; use one deliberate integration path per feature.
- Service-worker freshness/update strategy and safe migration of stale cache names. Never clear local user data just to force an update.

**Phase 1 exit gate:** current baseline report saved; all 7 base views accounted for; known features/storage keys documented; core local assets resolve; navigation and modals pass mobile-width regression; no feature removed without written approval.

### PHASE 2 — Core product, content, collections & discovery

**Goal:** make every non-adult-specific discovery feature easy to use and complete a real task.

**Includes:**
- Home hero, priority action, useful shortcuts and conditional “continue where you left off”.
- Main navigation/More layout polished for mobile.
- Story catalogue, full search/filter/sort, readable reader, chapter continuation, story universe, choices/endings, bookmarks, history and Story Vault.
- Clear status separation for “Available / In progress / Planned / Coming soon”. Finish the “More Dirty for Horny Girls” roadmap/poll only as real functionality; don't disguise a teaser as a working feature.
- Innerwear catalogue, product details, category/search/sort, full image library, spin-frame viewer, image retry and source/status labels.
- Sanskari, Noor and Grace collections plus home campaign/gallery entry points.
- Wishlist, compare and sample bag preserve existing behavior and local data. Clearly label any sample totals/prices as demo/reference.
- No fake order, checkout, payment, stock, seller verification, material claims or final pricing. Commerce remains reference-only until real sources, owners, terms and backend are approved.

**Phase 2 exit gate:** each button has a working action or clear disabled/coming-soon explanation; search/filter states are usable; image viewer works on touch; saved data survives view/sort changes; no dead ends; visual hierarchy remains clean at 320/360/390/430 px.

### PHASE 3 — Bold, horny, dirty, playful & interactive engine

**Goal:** make the adult-oriented part genuinely engaging through controls and interactions—not merely louder copy.

**Includes:**
- The existing four wheel experiences and their original positions/links; wheel hub; clear result card; reliable spin, reset, reroll, skip and category settings.
- Phase 3 bold mood mode, flirty/cheeky Hinglish and adjustable intensity.
- Phase 4 custom fantasy builder and story tone/character choices.
- Phase 9 After Dark Studio (integrate the existing module only after verifying its dependencies and avoid loading it twice).
- Phase 13 Couples Studio, date idea planner, message generator and copy actions.
- Adult-fiction mood/trope filters, branching choices, optional scene direction, replay/alternate outcome and private mood presets.
- Add mature atmosphere options and suggestive/dirty dialogue packs as opt-in; user controls tone and intensity, no forced escalation, all characters are adults, and fictional boundaries can stop a scene.
- Any result-producing action must actually alter the displayed result; any Copy/Save/Next/Reroll/Pause/Skip/Stop control must work.

**Phase 3 exit gate:** test every original wheel location and the Wild Wheel, repeated taps and reset; validate the 18+ gate; test at least one start-to-finish story/fantasy path, copy action and pause/skip; verify no real-person impersonation or non-consensual framing is introduced.

### PHASE 4 — Wellness, body education, fit & trust

**Goal:** make sizing, comfort and wellness tools helpful, privacy-conscious and honest.

**Includes:**
- Wellness/anatomy/health-guide content and Phase 10 education module after source/claim review.
- Measurement worksheet; cm/in conversion without reinterpretation bugs; saved measurement opt-in; fit cues, sizing guidance and clear limitations.
- Fit Studio / Fit Passport, local-only photo preview and fit notes; clear “not encrypted” storage disclosure; easy deletion and no silent uploads.
- Manufacturer dimensions and product-safety education distinct from entertainment wheels; educational result does not diagnose a person or guarantee compatibility/pleasure.
- Product Truth/status filters, seller-readiness/evidence controls and asset rights/source registers.
- Image/campaign claims must not imply the person’s religion/identity/endorsement, product availability or rights clearance without evidence.

**Phase 4 exit gate:** medical claims have reputable sources and review date; conversions are tested both directions; storage/clear behavior tested; the browser gives a clear status for concept versus verified product; no clinical diagnosis, fake product facts or unsupported seller/stock claims.

### PHASE 5 — Full integration, privacy hardening, PWA & V4 release QA

**Goal:** connect every approved module to the live experience, test it in real browsers, fix regressions and release with evidence.

**Includes:**
- Phase 11 Fit Studio; Phase 12 Wheels Hub; Phase 14 privacy/export/accessibility hardening; Phase 15 What’s New/release summary—integrate modules only once, in known order.
- Make the existing final loader question an explicit test: `phase12-15-final-loader.js` was present in the repository but was not referenced by the audited `index.html`; decide and test whether this loader or a deliberately different consolidated loader is the chosen architecture. Do not leave both wired in accidentally.
- Update web manifest name/description and service-worker core list/cache version to match the true V4 build. Verify new caches install/activate and old caches are safely retired. Keep saved data untouched.
- Diagnostics page must inspect the actual same-origin deployed `index.html` and report loader status, loaded modules, missing assets, all wheels, all views, story/fantasy/couples/fit flows, image failures, storage behaviors and service-worker/cache status.
- Test links and same-origin assets (HTTP success/status), console errors, runtime exceptions, accessibility, performance, network-failure behavior, browser refresh/deep links, and Android Chrome touch flows.
- Compare pre/post feature inventory; perform regression tests for existing views, saved data, 4 original wheels, image archive, wishlists, comparison, sample bag and story progress.
- Create final changelog, known-limitations list, test evidence, and rollback backup. Do not claim “100% perfect” based only on static checks or a mock/in-memory browser test.

**Phase 5 exit gate / release criteria:** every `MUST` item passes on the deployed site; no critical/high bug remains open; all 40 feature areas are accounted for; all 280 ideas are assigned a status (`implemented`, `deferred with reason`, or `not applicable with reason`); representative workflows pass on a real mobile browser; source/asset/rights and privacy notes are present; rollback package is available.

## Exact 40-feature coverage map

All 40 feature areas and their seven ideas are retained in the full appendix below. Phase assignment is the default implementation owner; shared dependencies are tested in Phase 1 and again at final release.

| ID | Feature area | Delivery phase |
|---:|---|---|
| 01 | Home screen, hero and quick actions | 2 |
| 02 | Main navigation, mobile menu and section switching | 1–2 |
| 03 | Story catalogue, search, category/language filters and sorting | 2 |
| 04 | Story reader, readability and chapter continuation | 2 |
| 05 | Branching story universe, character choices and tone controls | 2–3 |
| 06 | Bookmarks, saved reading progress, history and Story Vault | 2 |
| 07 | “More Dirty for Horny Girls” teaser, poll and roadmap | 2–3 |
| 08 | Innerwear catalogue, category filters and product discovery | 2 |
| 09 | Image library, search, filters and large image archive | 2 |
| 10 | Spin-frame image viewer, swipe and zoom | 2 |
| 11 | Product detail modal, claims and evidence/status | 2, 4 |
| 12 | Wishlist, saved styles and local favorites | 2 |
| 13 | Compare selected references | 2 |
| 14 | Sample bag, subtotal and demo checkout | 2 (demo only; no fake real checkout) |
| 15 | Campaign galleries, Home spotlight and Sanskari Edit | 2 |
| 16 | Noor Edit, Grace Edit and Coming Soon collections | 2 |
| 17 | 18+ access gate and mature-content separation | 1, 3, 5 |
| 18 | Wellness guide, anatomy and health education | 4 |
| 19 | Measurement worksheet, unit converter and saved measurements | 4 |
| 20 | Fit cues, sizing guidance and product-dimension education | 4 |
| 21 | Dildo wheel and size/safety education | 3–4 |
| 22 | Butt-plug wheel and safer-use information | 3–4 |
| 23 | Boyfriend/land preference wheel | 3 |
| 24 | Wild Wheel, original wheel locations and Wheels Hub | 3, 5 |
| 25 | Boyfriend/Couples date planner | 3 |
| 26 | Flirty message generator and copy action | 3 |
| 27 | Phase 3 bold / “Super Horny” mode and mood controls | 3 |
| 28 | Phase 4 custom fantasy builder | 3 |
| 29 | Phase 9 After Dark Studio (integration not yet confirmed) | 3, 5 |
| 30 | Phase 10 Women’s Wellness/Fluid Education (integration not yet confirmed) | 4, 5 |
| 31 | Phase 11 Fit Studio (integration not yet confirmed) | 4, 5 |
| 32 | Phase 12 Wheels Hub (integration not yet confirmed) | 3, 5 |
| 33 | Phase 13 Couples Studio (integration not yet confirmed) | 3, 5 |
| 34 | Phase 14 privacy/export/accessibility hardening (integration not yet confirmed) | 1, 5 |
| 35 | Phase 15 What’s New/release highlights (integration not yet confirmed) | 5 |
| 36 | Fit Passport, personal notes and local photo preview | 4 |
| 37 | Image error recovery, retry tools and rights/source tracking | 1, 5 |
| 38 | Product Truth, verified seller and sales-readiness controls | 4 |
| 39 | PWA installation, offline, caching and release freshness | 1, 5 |
| 40 | Diagnostics, feature status, bug reporting and release checklist | 1, 5 |

## Non-negotiable project rules

1. **Do not lose features or data.** Never delete views, wheels, stories, photos, archive entries, storage keys or user-facing tools without explicit owner approval. Keep a repo backup and before/after feature matrix.
2. **Inspect before coding.** Read the latest deployed entry point, actual current source, recent commits and any module diagnostics. Don't assume chat descriptions reflect the current branch.
3. **One integration architecture.** Avoid double-loading old and new modules, conflicting event listeners, duplicated sections/styles, or multiple “final loaders”. Use a dependency map and idempotent initializers.
4. **Mobile-first, no clutter.** One main action per screen, advanced options progressively disclosed, normal readable body text, sufficient contrast/tap targets, concise cards and no unnecessary borders/shadows.
5. **No fake success.** A button is done only after the real action and state change are verified. If it is intentionally unimplemented, label it honestly.
6. **Adult and consent controls.** Clearly 18+ area, opt-in intensity, fictional adult characters, explicit boundaries, skip/pause/stop, discreet exit and no forced escalation. A self-attestation gate is not age verification.
7. **Wellness stays trustworthy.** Cite reliable health sources, separate entertainment from guidance, avoid medical diagnosis and unsupported sizing or safety claims.
8. **Product truth.** No invented SKU, stock, seller, materials, prices, checkout, or rights clearance. Concept/reference items remain clearly labelled until owner evidence exists.
9. **Privacy by default.** Say what is stored and where; avoid sensitive data by default; don't silently upload photos or prompts; make clear/delete/export paths real; never promise encryption unless it exists.
10. **Testing must match the claim.** Label tests as static, mock/in-memory, deployed browser, or real-device. Repository build success is not the same as user-flow success.
11. **Short phase handoffs.** At the end of every phase, update this master plan's status, list files changed, tests run/results, open bugs, known limitations, next exact step and whether it was tested live. Copy that handoff into the next chat.
12. **Be honest on completion.** V4 is not complete until all 40 feature areas have a status and the release gates pass. “100x” means much more useful and reliable, not just more content.

## Phase tracker (update this in every handoff)

- [~] Phase 1 — Audit, foundation, repair & phone-first design (delta package prepared; live integration/diagnostics pending)
- [ ] Phase 2 — Core product, content, collections & discovery
- [ ] Phase 3 — Bold, horny, dirty, playful & interactive engine
- [ ] Phase 4 — Wellness, body education, fit & trust
- [ ] Phase 5 — Full integration, privacy hardening, PWA & V4 release QA

**Current plan status:** planning complete; implementation and live verification not yet signed off. Current known baseline from latest inspected main commit: V3 Phase 3/4 combined bundle was integrated into `app.js`; service worker cache changed to `blacked-v4-phase4-combined-experience-1`; GitHub Pages build workflow succeeded. The 40-feature audit still lists Phase 9–15 modules as unconfirmed live integrations until diagnostics prove otherwise.

## Copy/paste phase handoff template — mandatory every time

```text
BLACKED V4 HANDOFF
Current master plan: BLACKED_V4_MASTER_PLAN.md
Last completed phase: Phase __
Current phase/status: Phase __ — NOT STARTED / IN PROGRESS / BLOCKED / PASSED
Repository/branch + latest commit: __
Files changed: __
Feature IDs implemented (from the 40-feature map): __
Features preserved and verified: __
Tests run (mark STATIC / MOCK / LIVE BROWSER / ANDROID DEVICE): __
Pass/fail summary and evidence: __
Bugs still open (severity + reproduction steps): __
Data/storage/cache/asset risks: __
Known limitations / not yet live: __
Next exact actions: __
Do not redo or remove: __
Master plan tracker updated? YES / NO
```

---

# APPENDIX A — Full 40-feature, 280-idea inventory

The following appendix preserves the complete 7-ideas-per-feature research brief. Ideas 1–4 in each area are functional/UI improvements; 5–7 are bolder/adult-themed directions. Treat them as a complete backlog, not as claims that those functions already exist.

### 01. Home screen, hero and quick actions
**Current state:** Connected in main HTML; live click paths still need device verification.

1. **Improve:** Replace the generic hero with one clear choice: Read, Explore Looks, Get Fit Guidance, or After Dark; keep one primary CTA visible.
2. **Improve:** Add a compact ‘Continue where you left off’ strip only when the visitor has saved story progress or a recent local selection.
3. **Improve:** Show ‘New’, ‘Updated’, and ‘Coming soon’ labels from a single source of truth so teasers never look like working controls.
4. **Improve:** Let visitors dismiss/reorder optional home modules; save that preference locally and provide Reset layout.
5. **Bold / After Dark:** Add an opt-in ‘After Dark’ home skin with richer wine/black/rose lighting and restrained motion, not a totally different site layout.
6. **Bold / After Dark:** Offer a ‘Pick my mood’ entry—teasing, romantic, mysterious, bold, playful—then route to relevant stories, message prompts, or wheels.
7. **Bold / After Dark:** Use an adult-only ‘Tonight’s mood’ card with suggestive one-line fiction hooks; keep every scenario fictional, adult and skip-friendly.

### 02. Main navigation, mobile menu and section switching
**Current state:** Seven base views are defined in index.html; verify all tap flows on Android.

1. **Improve:** On small screens use a stable bottom navigation for the 4–5 most-used destinations and put secondary destinations under More.
2. **Improve:** Preserve a visible page title, selected-state indicator, and working Back/Close behavior in every section or modal.
3. **Improve:** Prevent double-tap or fast repeated navigation from opening duplicate modules or leaving the page in two active states.
4. **Improve:** Add keyboard focus, accessible labels, reduced-motion support and a minimum comfortable touch target; test 320–430 px widths.
5. **Bold / After Dark:** Give the adult-fiction area a discreet ‘After Dark’ label rather than explicit sexual text in the shared navigation bar.
6. **Bold / After Dark:** Add a direct ‘Bold mood’ shortcut that opens filters—not instantly a random explicit experience—and let users pick the intensity.
7. **Bold / After Dark:** Allow the menu to remember the last selected mature-content filter without saving private prompt text or sensitive details.

### 03. Story catalogue, search, category/language filters and sorting
**Current state:** Story search, category/language filters and sorting exist in the base view.

1. **Improve:** Add filter chips with counts and a one-tap Clear all; always show the number of matching stories.
2. **Improve:** Make search cover title, tags, characters and summary; add typo-tolerant matching and an honest empty state.
3. **Improve:** Include useful sort choices: Recently added, Short read, Continue reading and Most saved (only if real counts exist).
4. **Improve:** Add content labels such as romance, flirtation, mystery, dark romance, comedy, LGBTQ+ and intensity; don’t use misleading tags.
5. **Bold / After Dark:** Add opt-in ‘spice/intensity’ levels such as Sweet → Flirty → Bold → Dark tension, with plain descriptions of what each contains.
6. **Bold / After Dark:** Add trope bundles: secret crush, rivals-to-flirts, confident invitation, midnight confession and second-chance romance—clearly fictional adult characters only.
7. **Bold / After Dark:** Create a ‘Surprise me within my limits’ action that randomizes only among the user’s chosen categories, tones and exclusions.

### 04. Story reader, readability and chapter continuation
**Current state:** Story modal/reader and series controls exist in the base app.

1. **Improve:** Offer readable font size, line spacing, high-contrast theme and a distraction-free reading mode.
2. **Improve:** Show reading time, chapter progress and a reliable Resume from last paragraph control.
3. **Improve:** Provide Previous/Next chapter, Table of contents and ‘Mark as finished’; disable unavailable actions instead of pretending they work.
4. **Improve:** Make the reader modal keyboard-accessible, mobile-scroll-friendly and easy to close without losing progress.
5. **Bold / After Dark:** Let readers choose ‘slow burn’, ‘more banter’, ‘more tension’ or ‘more emotional’; adapt the next fictional scene rather than changing a static label only.
6. **Bold / After Dark:** Introduce optional sensual atmosphere cues—rain, low music, city lights, perfume notes or candlelight—without requiring graphic description.
7. **Bold / After Dark:** Add a ‘Steer the scene’ choice after a chapter: continue tension, switch to tender, add playful banter, pause, or end the scene.

### 05. Branching story universe, character choices and tone controls
**Current state:** Phase 4 story-universe module exists and is linked from index.html; retest on live deployment.

1. **Improve:** Show the consequence of each choice in a subtle way and keep a chapter map so branches don’t feel random.
2. **Improve:** Use consistent character cards (fictional name, adult status, personality, boundaries and current relationship state).
3. **Improve:** Support multiple endings and a replay-with-different-choice flow without duplicating the entire story listing.
4. **Improve:** Store chosen tone only for the story universe where intended; visibly distinguish current settings from saved settings.
5. **Bold / After Dark:** Add a ‘chemistry dial’: playful, confident, romantic, teasing or mysterious; map it to actual dialogue/scene options.
6. **Bold / After Dark:** Add consensual ‘power dynamic’ fiction tags only as clear fantasy tropes, with explicit limits and stop/skip choices; never frame coercion as consent.
7. **Bold / After Dark:** Create bold Hinglish dialogue routes with cheeky banter, double meanings and strong flirt energy, while keeping fictional adults and non-graphic scene boundaries.

### 06. Bookmarks, saved reading progress, history and Story Vault
**Current state:** Local bookmarks/progress and an opt-in story vault appear in app.js.

1. **Improve:** Let users bookmark a story, a chapter, or a specific scene—not just the whole title.
2. **Improve:** Add ‘Continue reading’, Recently opened and Finished lists with clear, reversible delete controls.
3. **Improve:** Explain which fields stay in local browser storage and provide export/restore for user-owned data.
4. **Improve:** Make saved progress resilient to sorting/filtering and avoid silently resetting it when content changes.
5. **Bold / After Dark:** Add private ‘Save this mood’ presets, without saving generated explicit text by default.
6. **Bold / After Dark:** Let the user build themed private shelves such as Slow Burn, Bold Banter, Dark Romance or Comfort Read.
7. **Bold / After Dark:** Offer discreet labels and a one-tap hide/clear path for a shared-device context; do not make false promises of encryption.

### 07. ‘More Dirty for Horny Girls’ teaser, poll and roadmap
**Current state:** A teaser/poll heading is present; full future feature completeness must be verified separately.

1. **Improve:** Clearly separate a working poll, an idea teaser and a Coming Soon card; no button should be a dead end.
2. **Improve:** Let users vote between content categories and show only real aggregated results if they are actually stored/collected.
3. **Improve:** Add a content roadmap with status labels: Available, In progress, Planned and Not available yet.
4. **Improve:** Provide a ‘Suggest a trope’ form with length limits, spam control, privacy notice and no expectation of public posting.
5. **Bold / After Dark:** Make the section more boldly branded with cheeky Hindi/Hinglish microcopy, high-contrast type and an opt-in mature accent palette.
6. **Bold / After Dark:** Add opt-in ‘extra teasing’ packs focused on flirt, double meaning, confident invitations and fictional tension—not forced or non-consensual scenarios.
7. **Bold / After Dark:** Offer a rotating adult-fiction prompt of the day with a clear ‘another one’ and ‘not for me’ control, no streak pressure.

### 08. Innerwear catalogue, category filters and product discovery
**Current state:** Catalogue, search, sort and concept product records exist; products are explicitly not verified retail stock.

1. **Improve:** Improve cards with concise labels, consistent image ratios, visible category and readable details on mobile.
2. **Improve:** Make search/filter/sort state shareable within the page and provide Clear filters plus result counts.
3. **Improve:** Separate ‘Editorial concept’, ‘Reference only’ and ‘Verified product’ into visibly distinct states; don’t imply a mock price is a live price.
4. **Improve:** Add accessible product cards with proper alt text, skeleton loading and a graceful missing-image state.
5. **Bold / After Dark:** Create editorial looks by mood—confident, romantic, bold, elegant and playful—without rating people’s bodies.
6. **Bold / After Dark:** Add an optional ‘Build a look’ mood board combining campaign references and styling notes, clearly labelled as concept art.
7. **Bold / After Dark:** Introduce ‘bold styling’ inspiration filters (colour, lace, silhouette, occasion) while avoiding unsupported comfort, fit or stock claims.

### 09. Image library, search, filters and large image archive
**Current state:** Image archive/library and filtering exist; source-file availability and image HTTP status need live checks.

1. **Improve:** Show asset name/category/source status and distinguish locally hosted images from external references.
2. **Improve:** Add robust search across title, filename, tags and collection; persist filter chips only for the current session by default.
3. **Improve:** Add progressive ‘Load more’ or virtualized batches, with a clear loaded/total count to control large galleries.
4. **Improve:** Provide retry for broken images while preserving the original asset record and showing a useful message.
5. **Bold / After Dark:** Offer a one-tap ‘bold editorial mood board’ that saves selected references—not images scraped from private accounts.
6. **Bold / After Dark:** Add themed discovery lanes such as Noir, Lace Editorial, Red Room Mood, Sanskari Contrast and After-Dark Lighting.
7. **Bold / After Dark:** Allow visitors to compare lighting, outfit styling and campaign mood as design attributes—not infer model identity, religion, sexual history or body measurements.

### 10. Spin-frame image viewer, swipe and zoom
**Current state:** A previous/next frame viewer and slider controls exist in the base code.

1. **Improve:** Make swipe left/right, large previous/next buttons and keyboard controls behave identically.
2. **Improve:** Keep the image ratio stable and prefetch only the adjacent frame so phone memory/network use stays reasonable.
3. **Improve:** Announce the frame count, support zoom/fit-to-screen and provide a visible reset zoom action.
4. **Improve:** Add loading/error states with retry, rather than a blank screen if a source image fails.
5. **Bold / After Dark:** Add optional ‘lookbook reveal’ transitions that respect reduced-motion preferences and never trap the user in animation.
6. **Bold / After Dark:** Offer a curated After-Dark look sequence with user-controlled pace, skip and exit controls.
7. **Bold / After Dark:** Let the user switch the viewer’s editorial mood—soft, noir, romantic, bold—without changing or misrepresenting the source image.

### 11. Product detail modal, claims and evidence/status
**Current state:** Product detail interaction exists; current records describe concepts, not a verified shop.

1. **Improve:** Show known facts separately from unknowns: image source, material, exact size chart, final price, stock and seller verification.
2. **Improve:** Keep ‘Save’, ‘Compare’ and ‘View campaign’ actions distinct; do not invent a buy link or availability.
3. **Improve:** Use a consistent detail layout with image, concept status, fit/measurement disclaimer and close/back action.
4. **Improve:** Add an owner-only product evidence checklist before a record can be labelled verified/sales-ready.
5. **Bold / After Dark:** Use editorial detail copy with confident, cheeky brand voice and tasteful styling descriptions.
6. **Bold / After Dark:** Add ‘pair this look with a mood/story’ links to fictional after-dark inspiration; label all imagery as reference where appropriate.
7. **Bold / After Dark:** Introduce a bolder ‘style intent’ selector—subtle, romantic, statement, playful—rather than claims that a product makes someone sexually desirable.

### 12. Wishlist, saved styles and local favorites
**Current state:** Wishlist uses browser-local state in app.js.

1. **Improve:** Add multiple named lists, reorder, remove and undo; keep a simple default wishlist for first-time users.
2. **Improve:** Add export/import with schema validation, a safe file-size cap and a clear overwrite/merge choice.
3. **Improve:** Handle stale or deleted product records without crashing or silently losing saved user picks.
4. **Improve:** Provide empty, loading and error states plus a clear ‘items saved on this browser’ note.
5. **Bold / After Dark:** Let users save curated ‘after dark style’ mood boards from campaign references.
6. **Bold / After Dark:** Add private themed collections such as ‘Date night’, ‘Bold editorial’ and ‘Maybe later’ without public sharing by default.
7. **Bold / After Dark:** Allow one-tap conversion of a mood board into a fictional story, message idea or date theme—never into a real purchase/booking unless that system exists.

### 13. Compare selected references
**Current state:** A comparison panel exists in the base app; verify compare capacity, empty state and removal paths.

1. **Improve:** Enforce a sensible maximum and explain why adding another item is disabled when full.
2. **Improve:** Compare only real available attributes; show ‘not supplied’ instead of guessing fit, material or sizing.
3. **Improve:** Allow removing any one item, clearing all, and restoring the previous comparison after accidental removal.
4. **Improve:** Make the comparison table responsive, with stacked rows on phones and no sideways overflow where possible.
5. **Bold / After Dark:** Compare editorial mood, colour, silhouette and occasion as creative references—not a ranking of bodies.
6. **Bold / After Dark:** Add a ‘which vibe fits tonight?’ chooser based on selected style tags; describe the result as subjective inspiration.
7. **Bold / After Dark:** Offer ‘turn this look into a fictional scene mood’ as an optional cross-feature action.

### 14. Sample bag, subtotal and demo checkout
**Current state:** Sample bag and demo checkout exist; actual sales/checkout are not enabled.

1. **Improve:** Keep all demo commerce unmistakably labelled ‘Preview only—no order or payment is placed’.
2. **Improve:** Validate quantities, stale records and subtotal math; never present sample prices as final commercial quotes.
3. **Improve:** Disable checkout with a helpful explanation until verified product, seller, delivery, returns, privacy and payment systems exist.
4. **Improve:** Add clear empty-bag, remove-item and undo interactions; test persistence and privacy controls.
5. **Bold / After Dark:** Allow adding editorial references to a ‘look board’ rather than pretending to add them to a real shopping bag.
6. **Bold / After Dark:** Use mature editorial storytelling around collections, not sexual pressure, artificial urgency or fake limited stock.
7. **Bold / After Dark:** Future commerce should be a separate approved phase with actual product evidence and secure payment provider integration—not a horny-themed fake checkout.

### 15. Campaign galleries, Home spotlight and Sanskari Edit
**Current state:** Home/Sanskari campaign sections are present; campaign records are reference artwork.

1. **Improve:** Unify card dimensions, loading state, image attribution/source note and a consistent modal close action.
2. **Improve:** Add collection search/filter, captions and keyboard-accessible lightbox controls.
3. **Improve:** Use responsive image sizes and lazy loading for below-the-fold campaigns; keep the hero image prioritized.
4. **Improve:** Make ‘save look’, ‘view related’ and ‘back to collection’ predictable and functional.
5. **Bold / After Dark:** Offer a bold contrast lane—traditional drape meets noir/editorial lighting—without suggesting a real model’s beliefs or endorsement.
6. **Bold / After Dark:** Add opt-in ‘Sanskari outside, daring inner monologue’ fictional captions with playful wordplay and non-graphic flirt energy.
7. **Bold / After Dark:** Let visitors switch campaign mood between elegant, mysterious, confident and teasing; preserve the original artwork and label generated copy.

### 16. Noor Edit, Grace Edit and Coming Soon collections
**Current state:** Collection previews/modules exist; verify which are visible after scripts initialize.

1. **Improve:** Keep unavailable collections in a clearly marked preview state and do not make preview cards appear purchasable.
2. **Improve:** Give each collection a distinct palette and art direction while using the same navigation and card components.
3. **Improve:** Show why a collection is different (styling direction, lighting, clothing references) in one short sentence.
4. **Improve:** Add content/cultural review before release; avoid guessing a model’s religion, identity or personal beliefs from styling.
5. **Bold / After Dark:** Make Noor’s mature aesthetic confident and refined with bold night-time editorials, not stereotypes.
6. **Bold / After Dark:** Make Grace’s dramatic/theatrical styling feel mysterious and daring with fantasy copy explicitly labelled fictional.
7. **Bold / After Dark:** Add user-requested theme voting only if privacy notice and real vote aggregation exist; otherwise make it a local preview selector.

### 17. 18+ access gate and mature-content separation
**Current state:** A self-attestation modal is present; that is not robust age verification on its own.

1. **Improve:** Keep adult material blocked until the age flow succeeds; verify no previews/scripts leak restricted material through the gate.
2. **Improve:** Explain the gate plainly and provide a safe cancel/exit route; don’t repeatedly nag after a valid session decision.
3. **Improve:** Store the minimum necessary age signal, separate it from preference/story data and document how long it persists.
4. **Improve:** Choose age assurance appropriate to the legal/user risk and jurisdiction; if stronger checks are needed, use a privacy-reviewed provider rather than collecting IDs casually.
5. **Bold / After Dark:** Use a confident mature brand voice after access is allowed, while keeping the age gate itself plain, discreet and non-eroticized.
6. **Bold / After Dark:** Let verified adults opt into an ‘After Dark’ navigation skin and content filter; don’t let a styling toggle bypass the gate.
7. **Bold / After Dark:** Keep all fantasy presets adult-only, fictional and clearly opt-in; never normalize pressure, incapacity, coercion or a refusal being ignored.

### 18. Wellness guide, anatomy and health education
**Current state:** Existing wellness text, guides and source links are in the main page.

1. **Improve:** Separate education cards from erotic fiction; health sections should remain clear, calm, medically responsible and sourced.
2. **Improve:** Add article-level reviewed date, source list, plain-language definitions and a ‘when to seek medical help’ callout.
3. **Improve:** Add topic search, reading time and a ‘save article’ option that does not track sensitive browsing unnecessarily.
4. **Improve:** Review mobile readability, diagrams, image alt text and whether each medical claim has a reliable source.
5. **Bold / After Dark:** Use a direct, shame-free adult-confidence voice for myths and communication topics; confidence is bold, not body-shaming.
6. **Bold / After Dark:** Add ‘myth vs fact’ cards on intimacy, anatomy and pleasure-related misconceptions, with medical sourcing rather than arousal claims.
7. **Bold / After Dark:** Offer opt-in conversation prompts for adults to discuss preferences, safety and comfort with a partner; keep medical advice outside the fantasy generator.

### 19. Measurement worksheet, unit converter and saved measurements
**Current state:** Measurement form, summary, unit conversion and opt-in save flow appear in the base wellness view.

1. **Improve:** Keep unit choice attached to each value and convert values when switching units; never reinterpret existing numbers silently.
2. **Improve:** Validate negative values, blank fields, implausible input and decimal precision; explain validation in human language.
3. **Improve:** Show a measurement summary, not a guaranteed bra size; recommend the exact manufacturer’s chart for any actual product.
4. **Improve:** Make Save explicitly optional and show whether values stay only in browser storage; support clear/export.
5. **Bold / After Dark:** Add a confidence-focused ‘fit, not judgement’ flow and let adults learn without uploading photos or entering measurements.
6. **Bold / After Dark:** Offer a private ‘what feels comfortable?’ checklist with fit and fabric preferences—not body ratings or sexual assumptions.
7. **Bold / After Dark:** Add bold editorial styling suggestions based on chosen garment/occasion, while stating that measurements do not predict attractiveness or compatibility.

### 20. Fit cues, sizing guidance and product-dimension education
**Current state:** Fit-cue explanation and sizing text exist; generic size prediction is intentionally limited.

1. **Improve:** Turn common fit cues into a short decision tree: strap pressure, band movement, cup gaping, waist/hip fit and fabric stretch.
2. **Improve:** Let users select garment type and concern, then show relevant guidance rather than one large wall of text.
3. **Improve:** Show how to read a real brand size chart; don’t convert a reference label into a promised size.
4. **Improve:** Add a ‘not sure’ path, return-policy reminder and clear boundary between education and diagnosis.
5. **Bold / After Dark:** Add ‘bold styling’ guidance on silhouette, layering and colour preferences without linking a body shape to sexual worth.
6. **Bold / After Dark:** Offer occasion-focused looks (date night, confident everyday, dramatic editorial) that respect user-selected comfort levels.
7. **Bold / After Dark:** Use assertive, body-positive copy that says comfort and preference matter more than size labels; keep health claims evidence-based.

### 21. Dildo wheel and size/safety education
**Current state:** An original wheel section exists in the wellness screen; exact live spin behavior requires regression testing.

1. **Improve:** Test spin, reset, repeat spin, rapid taps, keyboard use and result announcement; ensure only one spin runs at a time.
2. **Improve:** Label the result as a random educational/reference outcome, never as a recommendation about a real person’s body.
3. **Improve:** Make result cards explain the selection criteria and include safe, manufacturer-led product dimension/care guidance when applicable.
4. **Improve:** Add repeat/skip and a persistent close action; don’t trap users in an animation or modal.
5. **Bold / After Dark:** Add an opt-in ‘bold curiosity’ mode using cheeky, adult Hinglish phrasing without graphic instructions.
6. **Bold / After Dark:** Let a user choose between playful quiz, educational facts and fictional dare prompts; keep each clearly separated.
7. **Bold / After Dark:** Add a ‘spicy fiction seed’ button that turns a result into a suggestive fictional adult scene mood, not a literal instruction or body judgement.

### 22. Butt-plug wheel and safer-use information
**Current state:** A second original wheel section exists; content and behavior need live testing.

1. **Improve:** Use clear labels for width, length, flared base and intended use; don’t treat shape nicknames as universal specs.
2. **Improve:** Add safety information near the tool: body-safe materials, manufacturer guidance, cleaning and stop-if-pain advice.
3. **Improve:** Ensure random results cannot imply that a size is suitable for every person; show a clear reference-only disclaimer.
4. **Improve:** Test reset, repeat spin, result visibility, touch target size and mobile layout on narrow screens.
5. **Bold / After Dark:** Add a bold-but-non-graphic ‘curious / confident / just learning’ mode to adjust tone and education depth.
6. **Bold / After Dark:** Create adult fictional mood prompts around mystery, anticipation and playful negotiation—always skippable and non-coercive.
7. **Bold / After Dark:** Offer a one-tap switch from the wheel into safety education or a fictional story prompt; no pressure to continue.

### 23. Boyfriend/land preference wheel
**Current state:** A preference wheel and educational slang section exist; validate output wording and wheel location.

1. **Improve:** Make controls explain what the wheel selects and what it does not measure or predict.
2. **Improve:** Show a short rationale/source for any actual measurement education and clearly label fictional/random choices.
3. **Improve:** Add a result history that is opt-in and locally clearable; default to not saving sensitive results.
4. **Improve:** Verify rapid taps, reset, repeated outcomes, screen-reader announcements and result focus.
5. **Bold / After Dark:** Add fictional adult archetypes such as confident charmer, gentle romantic, witty flirt or mysterious stranger.
6. **Bold / After Dark:** Use cheeky Desi slang/wordplay at an adjustable level while making clear that preferences vary and nobody’s body is a score.
7. **Bold / After Dark:** Add ‘turn this result into a fictional character’ with adjustable dialogue tone and explicit choice to skip or reroll.

### 24. Wild Wheel, original wheel locations and Wheels Hub
**Current state:** Original wheels and Wild/Wild Challenge source modules exist across the repo; V2 live connections are not all confirmed.

1. **Improve:** Create one clean hub that links to each original wheel and Wild Wheel without duplicating the wheel logic.
2. **Improve:** Display labels, instructions and safety notes before a spin; show which tools are active versus planned.
3. **Improve:** Fix double-start races, stale results and timers; add a reset and allow the user to stop animations.
4. **Improve:** Add test coverage that spins each of the original wheel locations independently and checks result/reset behavior.
5. **Bold / After Dark:** Add selectable ‘light flirt’, ‘bold banter’, ‘dark-romance mood’ and ‘wild-but-safe’ packs.
6. **Bold / After Dark:** Make every prompt reversible: accept, swap, skip, or stop; adult partner prompts should use mutual-consent language.
7. **Bold / After Dark:** Add a ‘build a custom wheel’ option with user-selected categories, excluded prompts and local-only persistence.

### 25. Boyfriend/Couples date planner
**Current state:** Date mood, budget and result controls exist in the boyfriend view.

1. **Improve:** Add duration, indoor/outdoor, energy and accessibility preferences alongside budget and mood.
2. **Improve:** Give 3 realistic plans with estimated time, budget range and a ‘swap this idea’ button, not one generic answer.
3. **Improve:** Allow edit, copy, save locally and regenerate; retain the chosen settings if the visitor goes back a step.
4. **Improve:** Keep ideas honest about availability/weather: don’t claim venues are open or bookings are possible without checking live data.
5. **Bold / After Dark:** Add flirt level choices—sweet, playful, bold, mysterious—so the date theme feels tailored.
6. **Bold / After Dark:** Offer an opt-in ‘adult date-night mood’ set: private dinner, dress-up game, music exchange, confession cards and suggestive fiction prompts.
7. **Bold / After Dark:** Add ‘green/yellow/red’ comfort preferences so both adults can choose what sounds fun; never make a challenge compulsory.

### 26. Flirty message generator and copy action
**Current state:** Message tone/moment controls and copy action exist in the main boyfriend view.

1. **Improve:** Make tone and context inputs produce materially different text, not superficial rewording; include character limits and preview.
2. **Improve:** Ensure Copy shows accurate success/failure feedback and a manual-select fallback when clipboard access is blocked.
3. **Improve:** Provide variants and edit-in-place; don’t overwrite a message while a user is editing it.
4. **Improve:** Add a pressure check that favours honest invitations and makes it easy for the recipient to say no.
5. **Bold / After Dark:** Add flirt, teasing, bold, playful, romantic and cheeky Hinglish styles with adjustable slang intensity.
6. **Bold / After Dark:** Offer ‘double meaning’, ‘confident invitation’ and ‘late-night confession’ themes that remain respectful and easy to decline.
7. **Bold / After Dark:** Let user choose a boundary note such as ‘no pressure—only if you’re comfortable’; provide a spicy tone without guilt, threats or manipulation.

### 27. Phase 3 ‘Randi/Super Horny’ mode and mood controls
**Current state:** Combined Phase 3/4 bundle is dynamically requested by app.js in the latest commit; verify actual live init.

1. **Improve:** Check the bundle's loading state, global API, DOM injection and error handling; expose diagnostics and a retry button.
2. **Improve:** Make language, mood and slang settings respond instantly and persist only the intended preferences.
3. **Improve:** Prevent duplicate bundle loads and isolate feature CSS so styles do not leak into the other six views.
4. **Improve:** Add clear boundaries and a visible reset-to-default option; do not keep sensitive generated text unless asked.
5. **Bold / After Dark:** Add intensity presets: Playful, Bold, Naughty Banter and Dark Romance—describe each so users know what changes.
6. **Bold / After Dark:** Introduce optional Hinglish gali/dirty-word intensity levels for fictional adult dialogue; default to cheeky, user controls stronger wording.
7. **Bold / After Dark:** Provide reroll, skip, copy, clear and ‘switch to sweeter mood’ actions; never use pressure, non-consensual framing or minors.

### 28. Phase 4 custom fantasy builder
**Current state:** The 4-step prompt builder exists inside the combined bundle; synthetic test report says 24/24 passed but not live.

1. **Improve:** Make all four steps show progress, Back/Next, required choice validation and a persistent edit path.
2. **Improve:** Add a prompt preview before generation and make the generated result editable, copyable and rerollable.
3. **Improve:** Make saved settings optional and explain whether they stay in localStorage; add reset and export where appropriate.
4. **Improve:** Test keyboard, mobile viewport, reload behavior and every required/optional combination.
5. **Bold / After Dark:** Offer more adult fictional tropes, character chemistry, setting, style and dialogue tone, in clearly separated menus.
6. **Bold / After Dark:** Use a ‘heat’ control that changes flirt tension and atmosphere (banter, anticipation, confident dialogue) rather than just inserting more profanity.
7. **Bold / After Dark:** Add boundaries/exclusions and scene steering: continue, soften, change tone, skip or finish; every character is an adult and can opt out.

### 29. Phase 9 After Dark Studio — repository module, integration not confirmed
**Current state:** phase9-after-dark.js/css exist, but the final loader was not found in the current index/runtime chain.

1. **Improve:** Only call this feature ‘available’ after integrating its script/style once and verifying its diagnostics object in a live browser.
2. **Improve:** Test category/tone/intensity filters, generated prompt, skip/reroll, favourites and empty states.
3. **Improve:** Keep favourites explicitly session-only if code says memory-only; do not advertise durable saving unless implemented.
4. **Improve:** Add keyboard controls, reduced motion, scroll behavior and clear/exit on the mobile layout.
5. **Bold / After Dark:** Expand categories: romance, playful, roleplay, dark romance, suspense, confident teasing and affectionate banter.
6. **Bold / After Dark:** Add a user-controlled boldness ladder with non-graphic sensory atmosphere, dialogue and tension—never an auto-escalation without user input.
7. **Bold / After Dark:** Let the user steer each prompt with ‘more flirt’, ‘more mystery’, ‘softer’, ‘change trope’, ‘skip’ and ‘stop’.

### 30. Phase 10 Women’s Wellness/Fluid Education — repository module, integration not confirmed
**Current state:** phase10-wellness-education.js/css exist; do not assume live activation without diagnostics.

1. **Improve:** Connect it only after medical-content and UI review; keep educational language separate from erotic prompt copy.
2. **Improve:** Verify definitions, sources, date reviewed, uncertainty language and advice to seek clinical care when warranted.
3. **Improve:** Test that education cards, disclosures and related source links are accessible at mobile widths.
4. **Improve:** Keep content respectful and non-judgmental; avoid body scoring or treating normal variation as a problem.
5. **Bold / After Dark:** Offer a separate adult intimacy-confidence pathway about communication, comfort and common myths—clearly educational.
6. **Bold / After Dark:** Use bolder but respectful myth-busting headlines and short ‘what this means / what it does not mean’ cards.
7. **Bold / After Dark:** Link optional fictional romance prompts only after the user leaves medical education; never turn a health symptom/result into sexualized output.

### 31. Phase 11 Fit Studio — repository module, integration not confirmed
**Current state:** phase11-fit-studio.js/css exist; base measurement tools are present but phase 11 is not proved active.

1. **Improve:** Merge with the existing Fit view rather than duplicate the same form or measurement logic.
2. **Improve:** Verify cm/in conversion, form validation, notes save/delete, fit guidance, keyboard navigation and photo preview lifecycle.
3. **Improve:** Provide helpful output states: enough data, incomplete data, saved locally, save failed and cleared.
4. **Improve:** Keep personal measures and photo previews local unless a future reviewed backend is intentionally added.
5. **Bold / After Dark:** Add confidence-led ‘fit your mood’ styling themes such as subtle, bold, romantic and statement.
6. **Bold / After Dark:** Offer a private style board that associates campaign references with user-preferred fit notes—not real-person body data.
7. **Bold / After Dark:** Make the fit journey feel more daring with editorial language and outfit/occasion ideas, without suggesting measurements predict sex appeal.

### 32. Phase 12 Wheels Hub — repository module, integration not confirmed
**Current state:** phase12-wheels-hub.js/css exist; current page has original wheel sections but hub module is not confirmed live.

1. **Improve:** Integrate a single wheel directory and retain exact existing wheel IDs, algorithms and user data.
2. **Improve:** Test every wheel in its original location and through the hub; make sure all entry points reach the same tool, not clones.
3. **Improve:** Add a ‘recently used’ panel only if recent state is genuinely available; otherwise omit it.
4. **Improve:** Show each tool's purpose, time expectation, intensity and opt-out controls on its card.
5. **Bold / After Dark:** Group wheels into Flirty, Bold, Educational and Wild-but-safe modes with clear tone previews.
6. **Bold / After Dark:** Allow custom prompt packs filtered by language, cheekiness and mood with reroll/skip/stop always accessible.
7. **Bold / After Dark:** Add a private adults-only ‘choose our vibe’ wheel for mutually agreed fictional/date prompts—not a wheel that decides real consent.

### 33. Phase 13 Couples Studio — repository module, integration not confirmed
**Current state:** phase13-couples-studio.js/css exist; not confirmed connected to the current main page.

1. **Improve:** Integrate with the current Boyfriend view via one clear navigation path and avoid duplicating date/message controls.
2. **Improve:** Test card filters, count, layout and every CTA on 320/360/390/430 px widths.
3. **Improve:** Use consistent card anatomy: purpose, one-line explanation, primary action, privacy note where relevant.
4. **Improve:** Add save/copy/clear only where those actions actually work; make errors visible and recoverable.
5. **Bold / After Dark:** Add shared-adult prompts for playful flirting, compliments, date-night themes and romantic roleplay.
6. **Bold / After Dark:** Make ‘bold together’ sets with mutually selected limits and easy swap/skip/pause; no surprise escalation.
7. **Bold / After Dark:** Offer couple story arcs where two fictional adults choose the next turn, with choices for tenderness, teasing, mystery or ending the scene.

### 34. Phase 14 privacy/export/accessibility hardening — repository module, integration not confirmed
**Current state:** phase14-hardening.js/css exist; current app has some privacy/focus support, but phase 14 is not confirmed loaded.

1. **Improve:** Integrate export with a versioned schema and validate import; explain whether imports merge or replace local data.
2. **Improve:** Test keyboard focus, modal focus trap, focus restore, reduced-motion and screen-reader labels throughout all seven views.
3. **Improve:** Make clear-data operations scoped, confirm destructive action and never remove unrelated browser data.
4. **Improve:** Add a privacy inventory covering saved story progress, wishlist, bag, measurements, fit notes and age flag.
5. **Bold / After Dark:** Create a discreet reading mode with neutral labels and optional quick hide, clearly explaining that it is not a security lock.
6. **Bold / After Dark:** Add optional local PIN protection only after threat-modeling; do not promise encrypted private content if the implementation is not encrypted.
7. **Bold / After Dark:** Keep bold presets and saved adult-fiction preferences opt-in, locally scoped and deletable; never turn sexual preferences into ad/analytics profiles by default.

### 35. Phase 15 What's New/release highlights — repository module, integration not confirmed
**Current state:** phase15-whats-new.js/css exist; current main title/HTML doesn't prove the Phase 15 card is active.

1. **Improve:** Integrate one version-aware release summary sourced from actual shipped features rather than hard-coded claims.
2. **Improve:** Give every feature card a real destination and test its navigation/scroll target after view changes.
3. **Improve:** Add ‘New’, ‘Improved’, ‘Fixed’ and ‘Coming soon’ categories with dates and honest availability status.
4. **Improve:** Avoid showing the same banner every visit; let users dismiss it and reopen the changelog from More.
5. **Bold / After Dark:** Highlight new After Dark packs, story tropes, mood controls or bold editorial collections when they are genuinely shipped.
6. **Bold / After Dark:** Use a short ‘what changed in your experience’ preview for mature content, with intensity labels instead of explicit shock copy.
7. **Bold / After Dark:** Invite one-tap feedback on the update (helpful / confusing / missing) without collecting sexual preferences unnecessarily.

### 36. Fit Passport, personal notes and local photo preview
**Current state:** Fit notes, photo upload/preview and save/clear controls appear in the base Fit view.

1. **Improve:** Make preview object URLs revoke correctly when replacing/clearing photos; handle large files and unsupported formats.
2. **Improve:** Explain locally stored vs memory-only values and the effect of refreshing, clearing site data or using another device.
3. **Improve:** Provide independent clear buttons for photo, note and measurements, with a confirmation and undo where feasible.
4. **Improve:** Set file size/type limits, avoid uploading by default and surface save failures honestly.
5. **Bold / After Dark:** Allow a private ‘style confidence’ note with optional themes/occasion, separate from body measurements.
6. **Bold / After Dark:** Provide an opt-in bold editorial mood board from chosen reference images, not an analysis of the user's body or attractiveness.
7. **Bold / After Dark:** Add a neutral quick-hide/reset action for shared devices and avoid sensitive filenames or revealing notifications.

### 37. Image error recovery, retry tools and rights/source tracking
**Current state:** Phase 5 image reliability module and root-level assets exist; live HTTP availability is unverified.

1. **Improve:** Use a canonical asset manifest and check every displayed source URL/path against actual files or live HTTP response.
2. **Improve:** Show original failure, source and retry outcome; don't replace failures with unrelated photos that mislead the visitor.
3. **Improve:** Avoid repeated retries/MutationObserver loops; add retry caps, backoff and diagnostic counters.
4. **Improve:** Audit duplicate assets, large images, external-host dependency, licence/permission status and alt text.
5. **Bold / After Dark:** Use source-approved mature editorial collections with consistent art direction and explicit permission records.
6. **Bold / After Dark:** Offer a ‘mood reference’ fallback only if clearly marked as a separate editorial fallback—not as the missing original.
7. **Bold / After Dark:** Provide an owner-facing rights checklist before commercial/sexualized campaign use; a good-looking image is not proof of model consent or commercial rights.

### 38. Product Truth, verified seller and sales-readiness controls
**Current state:** Phase 5 product-discovery code appears linked in index.html; it intentionally keeps sales off without evidence.

1. **Improve:** Require source-backed values for stock, material, sizing, final price, seller identity and return terms before ‘Verified’ status.
2. **Improve:** Make the filter explain why a record is not ready; don't let ‘verified’ return conceptual items with missing evidence.
3. **Improve:** Keep paid promotion/sponsored ranking clearly labelled and avoid fake popularity counts or urgency.
4. **Improve:** Add a review checklist and change log for the owner so product claims can be audited.
5. **Bold / After Dark:** Use daring visual merchandising and editorial copy without presenting concepts as purchasable goods.
6. **Bold / After Dark:** Create adult-style themed collection landings that still show ‘reference-only’ status on every concept card.
7. **Bold / After Dark:** Turn on real selling only in a separate release after product evidence, policies, age handling, secure payment and privacy/security review are ready.

### 39. PWA installation, offline, caching and release freshness
**Current state:** Service worker and manifest exist; offline behavior and stale-client rollout require real-browser testing.

1. **Improve:** Update manifest name/short name/description to match the actual current release and shipped features.
2. **Improve:** Make the cache list include every required local module/style/JSON/SVG and exclude non-essential large images from install-time fan-out.
3. **Improve:** Use versioned caches, explicit update handling and a visible ‘new version available’ refresh option; don't leave stale code indefinitely.
4. **Improve:** Test first visit, second visit, offline reload, slow network, failed asset, old cached build and recovery after reconnect.
5. **Bold / After Dark:** Offer a discreet install label/icon and clear offline status; don't auto-trigger prompts that interrupt reading.
6. **Bold / After Dark:** Allow a user to keep already-opened fictional stories available offline only if licensing/content policies and actual cache behavior support it.
7. **Bold / After Dark:** Add a fast-exit/neutral view and cache-clearing explanation for shared devices; don't claim privacy from browser history or OS-level records.

### 40. Diagnostics, feature status, bug reporting and release checklist
**Current state:** Multiple diagnostic pages exist; main site still needs a single trustworthy release dashboard.

1. **Improve:** Combine current feature/API checks in one release diagnostic page and distinguish PASS, WARN, FAIL and NOT TESTED.
2. **Improve:** Verify console errors, failed scripts/styles, image naturalWidth, duplicate IDs, navigation and service-worker control.
3. **Improve:** Test all real wheel locations, the 18+ gate, reading progress, wishlist, comparison, bag, measurements and clear-data flow.
4. **Improve:** Record browser/version/viewport, commit hash and test timestamp; export a shareable CSV without sensitive saved content.
5. **Bold / After Dark:** Add a test for mature-mode gating and prompt-boundary controls in every new adult-themed feature.
6. **Bold / After Dark:** Add an ‘After Dark pack audit’ that checks each new pack for promised intensity, adult fictional framing, skip/stop and broken controls.
7. **Bold / After Dark:** Make ‘release-ready’ impossible unless all critical checks pass; show the exact blocking files and retest instructions instead of a green badge based on static checks alone.

## Recommended visual direction — premium, bold, never congested
1. **Home:** one hero + one primary action + a short row of quick destinations. Show only ‘Continue reading’ or ‘Tonight’s mood’ when it is relevant.
2. **Stories:** search first, filter chips second, cards below; keep intensity/trope filters inside a collapsible ‘Refine’ panel on small screens.
3. **After Dark:** a distinct black/wine/rose palette, expressive display type, atmospheric cover artwork, and clear mood/intensity controls. Avoid visual overload, flashing effects, and autoplay audio.
4. **Wheels:** one clear wheel, a visible spin action, result card, and `Reroll / Skip / Learn more / Stop`. Don't hide the stop control behind a gesture.
5. **Wellness/Fit:** calmer palette, readable body type, one focused guide at a time, trusted source/date reviewed, and a visible separation from fantasy content.
6. **Mobile:** target 320–430 px screens first, comfortable tap areas, no horizontal overflow, accessible contrast/focus, reduced-motion support, and modals with reliable close/back behavior.
7. **States matter:** every feature needs working/loading/empty/error/saved/coming-soon states. Never leave a button doing nothing or show ‘saved’ when storage failed.

## Best first 12 upgrades (priority order)
- P0 — Connect/verify runtime modules: establish a live module manifest; avoid duplicate loading; prove which phases actually initialize.
- P0 — Test every wheel at its original location: spin, stop/reset, repeat result, fast double-tap, keyboard and screen reader.
- P0 — Image reliability pass: resolve all local paths, test every visible external URL, show specific retry state, and stop fallback photos from misrepresenting a failed original.
- P0 — Mobile navigation and modal consistency across all seven views.
- P0 — Ensure mature content cannot display before the chosen age-assurance flow; review local jurisdiction needs before using a production adult-content gate.
- P1 — Stories: mood/intensity filters, branch steering, reading progress and saved shelves.
- P1 — Add the After Dark mode with clear levels, reroll, skip, softer/stronger tone and stop.
- P1 — Upgrade message/date tools with editable results and easy copy/save/clear.
- P1 — Fit/wellness: accurate unit conversion, optional local storage, source-backed claims and plain-language summaries.
- P1 — Wishlist/compare: robust empty/error states and import/export.
- P1 — Make product-reference/sales status unmistakable; keep real commerce disabled until evidence and payment/legal review.
- P1 — A single live diagnostic that records commit, time, viewport, image failures, JS errors, PWA cache/controller and per-feature results.

## Measurable definition of ‘100x better’
Don't use an arbitrary ‘100x’ marketing claim. Measure whether the product really got better:
- **Task success:** percent of testers who can finish each key action (open a story, resume, save bookmark, spin/re-spin/stop each wheel, save/clear fit note, use image retry) without help.
- **Reliability:** critical flow pass rate, JS exceptions, broken visible images, failed local script/CSS loads, duplicate initialization and stale-cache regressions.
- **Clarity:** time to understand a feature, mis-taps, dead-end taps, visible labels for concept-only vs working features and user confidence after the flow.
- **Mobile quality:** 320, 360, 390 and 430 px widths; no horizontal overflow; keyboard/focus/accessibility checks; Android Chrome real device retest.
- **Repeat usefulness:** voluntary return to reading progress, saved shelves, reusable mood presets and date/message tools—without manipulative streaks or excessive adult-content nudges.

## Research notes and references
These sources informed the product patterns; they're examples to learn from, not proof that any feature is best or should be copied verbatim.
- [VelvetVice — interactive romance fiction](https://velvetvice.app/): current product messaging covers user-set tropes/cast/setting, scene-by-scene steering, optional narration and private vault. Useful benchmark for story personalization and discreet reading.
- [Lush — Interactive Stories, Google Play](https://play.google.com/store/apps/details?hl=en_IN&id=interactive.romance.story): describes category browsing, character customisation, choices that alter endings, chapter updates, history and pause/resume. Useful benchmark for discoverability and continuity.
- [Blushed — interactive romance stories](https://blushed-app.com/): highlights meaningful choices, branching stories, characters, avatar/wardrobe and multiple endings. Useful benchmark for choices with visible consequences.
- [Planned Parenthood — How do I talk about consent?](https://www.plannedparenthood.org/learn/relationships/sexual-consent/how-do-i-talk-about-consent): clear asks, listening to the answer, checking in and not pressuring someone inform the prompt/interaction design.
- [RAINN — 5 rules for getting consent](https://rainn.org/5-rules-for-getting-consent/): consent must be freely given; silence or pressure is not consent. Informs ‘pause/skip/stop’ controls.
- [European Commission — age verification](https://digital-strategy.ec.europa.eu/en/policies/eu-age-verification): discusses privacy-preserving proof of age; relevant when designing future age assurance rather than relying only on a self-declaration.
- [UK ICO — Age assurance](https://ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/age-appropriate-design/age-assurance/): recommends risk-appropriate, effective age measures, minimal data and transparent handling.
- [Office of the Australian Information Commissioner — age assurance and privacy](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/age-assurance-technologies-and-privacy-obligations): highlights privacy impact assessment, proportionality, provider diligence and protecting personal information.
- [Privacy Commissioner of Canada — privacy-protective age assurance](https://www.priv.gc.ca/en/privacy-topics/age-assurance/aa-gd-web/): discusses data minimisation, purpose limitation and privacy-preserving methods.

## Shipping rules / acceptance criteria
- Don't label source-only Phase 9–15 modules as ‘live’ until live diagnostics finds the expected global API and working controls.
- Don't delete the existing stories, wheels, archive or storage keys during integration without a verified backup and preservation regression.
- Don't generate/adapt sexual content around minors, real-person sexual targeting, or non-consensual/forced situations. Adult-themed additions should be fictional, adults-only, consent-forward, adjustable and skippable.
- Don't collect or upload private stories, age documents, fit measurements or photos unless the data flow and retention are explicitly designed and approved.
- Don't call the release ‘100x better’ or ‘production-ready’ until functional tests, live image/network checks and a real Android Chrome regression pass.

---
**Implementation rule:** ship a small number of well-finished features per release. Measure task completion and reliability first; add more mature content packs only after their controls, content states, privacy and regression tests work.