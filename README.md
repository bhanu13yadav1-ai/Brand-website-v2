# BLACKED V1 Part B — Story Series & Desi Size Guide

This is a root-ready incremental update for `bhanu13yadav1-ai/Brand-website-v2`, based on the Part A source files currently present on its `main` branch.

## What Part B adds

- Three fictional adult story series, each with Part 1 preserved from existing stories, two additional chapters and two choice-based endings.
- Three new original Hinglish dark-romance/dirty-banter starter stories; Part A's 10 stories remain.
- Chapter navigation inside the story reader.
- Optional Continue Reading and bookmarks stored in a new app-owned localStorage key, `blackedV1PartBStoryVault`. Saving is off by default unless already opted in. The data is not encrypted and not synced. A clear control and the site's Privacy & Data Controls include this key.
- A researched, plain-language Hinglish glossary explaining the slang terms “chut”, “land”, “gand”, dildo dimensions and butt-plug safety.
- Dildo, Butt Plug and Land/Boyfriend wheel text, range labels, results and reset messages use desi Hinglish. Dark Romance prompts use colloquial Hindi/Hinglish gaali-banter, remain non-graphic, adult-only and skippable. Original wheel controls and option keys stay the same.
- Stories now use the existing 18+ self-attestation gate.
- Updated service-worker cache version and Part B diagnostics.

## Existing features kept

The package retains the Part A catalogue, all three original wheels, Dirty/Wild wheel, Boyfriend/Couples area, Sanskari/Noor/Grace collection previews, 151-record image archive, Wellness education, Fit Studio, wishlist, demo bag, comparison, privacy controls and image fallback source files.

## Upload

1. Back up the current repository first.
2. Extract this ZIP on the phone.
3. Upload the **contents** of `V1_PART_B_STORY_SERIES` to the root of the existing `main` branch in `Brand-website-v2`.
4. Replace matching root source files (`index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `README.md`) and add/update the listed JSON, CSV and diagnostics files. Do not create a nested second copy of the folder.
5. Commit once all files are present, then open `/part-b-diagnostics.html` on the published GitHub Pages URL.

## Honest testing boundary

The checked-in source passed syntax/static checks and 36 in-memory Chromium functional tests. The test fixture used the exact source and image-manifest JSON, isolated/mock browser storage and intentionally blocked public raw-GitHub image requests. That verifies local component behavior, not a live deployment, upstream image availability or a physical Android device. Those checks remain NOT TESTED until run from the hosted website/device.

## Medical accuracy

The size guide does not claim there is one “normal” vulva/vagina size or one best toy size. Listed wheel ranges are illustrative demo filters, not recommendations. Anal-use toys need a flared base or safe retrieval stop; product dimensions and lubricant/material compatibility must be checked. References are listed in `RESEARCH_NOTES_PART_B.md`.
