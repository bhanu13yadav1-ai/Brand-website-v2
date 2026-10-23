# BLACKED Website V3 — Phase 3 changelog

Date: 23 October 2026
Target: `bhanu13yadav1-ai/Brand-website-v2`, branch `main`

## Phase 3 feature work

- Adds a prominent **SUPER HORNY / RANDI MODE** panel below the existing Home hero.
- Adds four selectable moods: **Flirty, Teasing, Bold, Wild**.
- Adds **Hindi, Hinglish, and English** prompt language choices.
- Adds an opt-in **Desi Gaali Mode** toggle. It is off by default and only adds mild slang to a generated fictional line.
- Adds an 18+ checkbox before generating a prompt, a reset action, a close/skip action, and links to existing Stories 18+ and Boyfriend & Couples destinations.
- Generates short, non-graphic fictional prompts locally in the browser. It does not call an API or send mood selections to a server.
- Saves only this new mode's preferences under `blackedV3RandiModeSettings`. It does not clear or rewrite the site's existing wishlist, sample bag, saved stories, Fit Studio notes, or other local-storage keys.

## Performance work in the same update

- Stops rendering hidden Innerwear catalog cards, all ten Sanskari campaign cards, and the Stories list during initial Home startup. Existing `setView()` handlers render them when the matching view is opened.
- Defers static `<img>` sources found in inactive views, then restores them when the visitor opens that view.
- Removes the startup call that loaded the hidden Innerwear spin-frame image; the frame initializes when Innerwear is opened.
- Keeps Home campaign cards and all existing view-specific behaviour.
- Adds the two new mode files to the service-worker app-shell cache and versions the cache for this release.
- Narrows old-cache cleanup to this project's `blacked-v3-*` caches instead of deleting every cache name beginning `blacked-`.
- Adds a bounded network-first navigation strategy: after 1.8 seconds, a cached app shell can display on a slow connection while the network request continues to refresh the cache.
- Repairs the four Phase 6 SVG URL references at app startup/DOMContentLoaded: the files exist at repository root, not under the missing `./assets/` folder.

## Preservation

This is a merge/update overlay. It intentionally does **not** replace `index.html`, remove existing screens, change the three original wheel experiences, or replace the separate Dirty/Wild wheel. Existing mode routing still uses the site's original navigation controls and original age modal for Stories, Wellness, and Boyfriend & Couples.

## Future features remain on the plan

Phase 4: multi-step fantasy builder with mood, fictional archetype/toy preferences, language and intensity.

Phase 5: Super Horny Fantasy Wheel, Desi Dirty Talk / Gaali Generator, and Visual Attraction mode.

Phase 6: mood-based adult stories, Boyfriend & Couples tools, personal preference settings, More Dirty / More Horny intensity and Wild Challenge Deck.

Phase 7: full regression, accessibility/mobile checks, performance verification, and release.

See `PHASE3_V3_FEATURE_PRESERVATION.csv` for the preserved feature inventory and phase mapping.
