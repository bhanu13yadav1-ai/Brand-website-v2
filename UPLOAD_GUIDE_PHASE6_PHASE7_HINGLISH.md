# BLACKED V3 final update — phone-friendly upload guide

## Files to upload

1. Download `BLACKED_V3_PHASE7_FINAL_RELEASE_PHASE6_COMPLETE.zip` and extract it.
2. Copy the ZIP's root files into the existing `Brand-website-v2` GitHub repository. Do **not** delete other repository files.
3. Replace `sw.js`, `phase6-diagnostics.html`, and `phase7-diagnostics.html`.
4. Add `phase6-combined-ux.js`, `phase6-lazy-loader.js`, `phase6-diagnostics.js`, `phase7-8-combined.js`, `phase7-8-lazy-loader.js`, and `phase7-final-diagnostics.js`.
5. Open your existing `index.html`, then apply only the six-reference/two-loader edit from `INDEX_PATCH_PHASE6_PHASE7_HINGLISH.md`. Do not replace the full HTML file.
6. Commit these changes together and wait for GitHub Pages to finish publishing.
7. Open `https://bhanu13yadav1-ai.github.io/Brand-website-v2/phase7-diagnostics.html`, press **Run all release checks**, and export the CSV. Also open `phase6-diagnostics.html` for details of the Studio, Wellness, image paths and preference interactions.

## What Phase 6/7 adds

- Screenshot-inspired Boyfriend & Couples Studio header and 18+ fiction badge.
- Match / Fantasy / Couples Deck / Wellness shortcuts; secondary Campaigns/Gated Gallery routes stay available under **More**.
- Six existing fictional archetypes retained in searchable/filterable two-column desktop and one-column mobile cards.
- Couples Connection Deck with illustration, Done / Another / Skip controls and a consent-first note.
- Compact floating mobile bottom navigation, local preference saving behind explicit opt-in, Wellness quick jumps, and root-path Wellness diagrams.
- Phase 7/8 collection and story-reading enhancements load only when Sanskari or Stories is opened.
- One new service-worker cache version; only the small loaders are app-shell precached. Feature payloads are cached after being requested.

## Do not delete old code yet

Leave `phase6-boyfriend-studio.js/.css`, `phase6-wellness-collections.js/.css`, and `phase7-8-enhancements.js/.css` in the repository as rollback copies. Remove them only after the live diagnostic is green on Android Chrome, searching the whole repository confirms no remaining references, and you have a complete backup ZIP. No data/image/story/wheel file should be removed for this release.
