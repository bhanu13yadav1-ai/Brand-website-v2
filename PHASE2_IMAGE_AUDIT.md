# Phase 2 — Image and Asset Audit

**Audit date:** 22 October 2026  
**Source:** ten user-uploaded WebP files mounted for this task.

## Findings

- All ten supplied files could be opened as images and their dimensions were inspected.
- `1000202036.webp` and `1000202039.webp` are visually near-identical duplicate uploads (mean RGB difference 0.48 after the same 64×96 resize). Do not render both in the same collection.
- `1000202036.webp` also visually matches the existing Sanskari campaign direction and is held for verification against the exact repository asset before being re-added; no existing campaign is overwritten.
- Eight distinct image assets are prepared for new placement. Original 1024-ish pixel width and portrait framing are retained; each asset is re-encoded as WebP quality 82. The CSV manifest records original/published hashes, byte size, dimensions and reduction.
- Four hijab-inspired black-and-gold campaign images are assigned to **Sanskari → Noor Edit — Campaign Gallery**. The label identifies the requested creative direction only; it does not infer the models' faith or represent all Muslim women.
- Two pink-toned editorial images are assigned to **Innerwear → New Innerwear Editorials**.
- The cross-necklace styling image is a preview inside the existing **Grace Edit** `COMING SOON` card, explicitly labelled as theatrical/editorial concept rather than an official Christian/church collection.
- The multi-adult campaign image is assigned inside the existing **18+ self-attestation-gated** Threesome Fantasy content area; it is not placed in an un-gated gallery.

## Prepared implementation

- `phase2-photo-collections.js`: add-on script; does not overwrite legacy code. Creates photo cards, Noor and innerwear galleries, Grace preview and gated multi-adult reference; reports visible image failures; provides an accessible enlarged preview with close button, Escape and backdrop handling.
- `phase2-photo-collections.css`: responsive 2-column mobile / 3-column wider-screen gallery, consistent portrait image framing, readable text and visible image-failure status.
- New assets are under `assets/noor-edit/`, `assets/innerwear-gallery-v3/`, `assets/grace-edit/`, and `assets/triad-gallery-v3/`.
- `PHASE2_UPLOAD_INSTRUCTIONS_HINGLISH.md` explains exact insertion points for `index.html` and `sw.js`.

## Not yet completed

- This local overlay is not committed to the remote repository because branch creation was blocked by the GitHub connector's HTTP 403 integration permission error.
- Live hosted image load, current Android Chrome, cache invalidation after publish, and the legacy 151-record URL list still require a real deployment/browser pass.
- The new gallery assumes the existing `part-c-enhancements.js` has created `#v24InnerwearCollection` and `#v24TriadGrid`; the script is included **after** that enhancement script, and a pre-deploy check should confirm those selectors on `main`.


## Phase 3–4 addendum (22 October 2026)

The combined local package now has **11 unique local gallery references** in total: the original eight selected in Phase 2 plus three new photos supplied after that package. The new solo pink editorial is assigned to Innerwear. The other two new multi-adult campaign photos remain under the existing `#v23ThreesomeProtected` element behind the existing 18+ self-attestation. New optimised files and source/output checksums are recorded in `PHASE3_4_IMAGE_MANIFEST.csv`. This is still a local overlay only; no remote files were changed.
