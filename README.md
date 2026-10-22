# BLACKED — Phase 1–2 Review Build

> **Current review package.** Use this README instead of older phase-upload notes retained in the archive. This ZIP is a local working copy; it has not been pushed to GitHub.

## Start here

1. Read [`README_PHASE1_2_REVIEW_HINGLISH.md`](README_PHASE1_2_REVIEW_HINGLISH.md) for how to run and inspect the site.
2. Read [`PHASE1_BASELINE_AUDIT.md`](PHASE1_BASELINE_AUDIT.md) for the backup, original features and baseline findings.
3. Read [`PHASE2_IMAGE_AUDIT.md`](PHASE2_IMAGE_AUDIT.md) for root-cause fixes.
4. Review [`PHASE1_2_QA_RESULTS.md`](PHASE1_2_QA_RESULTS.md). Static checks are not a substitute for live browser and Android checks.
5. Start a local HTTP preview with `python3 serve.py`, then open `http://127.0.0.1:8765/index.html`.
6. Open `http://127.0.0.1:8765/phase2-image-diagnostics.html` to check all local image files and, separately, the 151 remote archive URLs.

## Current result

- **Phase 1 baseline audit and backup:** complete. Baseline snapshot is from GitHub Pages run [#17](https://github.com/bhanu13yadav1-ai/Brand-website-v2/actions/runs/39769566213), source head `12ae0b208d056b39bba4c4b5b981d08f59ba30f0`.
- **Phase 2 root-path correction:** implemented in this local review copy. Two homepage paths, the Part C image resolver, 31 service-worker image cache paths, and the older image diagnostic paths now use files actually present at repository root.
- **Phase 2 photo collections:** the already-existing Phase 2 CSS/JS is linked. Its extra multi-adult gallery remains inside the existing self-attestation gate.
- **Preservation:** `app.js`, `styles.css`, `fallback.js`, the 151-record archive JSON and size-chart data are unchanged from the captured baseline.
- **Scope boundary:** Phase 3–15 UI modules and the final loader are deliberately *not* activated in this review ZIP.

## Test truth

Static QA report: see `PHASE1_2_QA_RESULTS.json` and `.md`. The external 151 filenames exist in their corresponding upstream GitHub `main` trees, but runtime HTTP availability is not yet verified. This execution environment blocked even local browser navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`), so browser interactions, live Pages after the fixes, and physical Android Chrome are marked **NOT TESTED**.

## Backup

The untouched baseline Pages snapshot is provided separately as `BLACKED_PHASE1_BASELINE_BACKUP_12ae0b2.zip`. Do not overwrite the original baseline when testing. Do not upload this review copy over `main` before you inspect and approve it.

## Historical files

Older phase-specific reports and upload guides remain in this ZIP to preserve project history. When an older report conflicts with the current Phase 1–2 reports above, follow the current review README, current QA results and current `PHASE1_2_HANDOFF.txt`.
