# Phase 2 Backup and Rollback

## Before committing
1. Download the source archive for baseline commit `16b76469fb274f5a65d3cfa2bd3d34765639bef3` and store it separately from your working copy.
2. If using `install_phase2.py`, it copies `index.html` and `sw.js` to a timestamped sibling directory outside the website root before editing.
3. Review the diff: only `index.html`, `sw.js` and the two new Phase 2 assets should be changed by the installer. `app.js`, content JSON, product records, story data and storage keys should not be changed.
4. Run `node --check phase2-premium-ux.js` and `python validate_phase2.py`, then do the manual QA checklist.

## Rollback
1. Stop the deployment/release and keep the current commit SHA noted.
2. Restore `index.html` and `sw.js` from the sibling backup directory or revert the Phase 2 commit in Git.
3. Remove `phase2-premium-ux.css` and `phase2-premium-ux.js` only after the old index and service-worker files are restored; leaving unused files alone is also safe.
4. Deploy the restored commit, then check the site again on Android Chrome.
5. Do not clear localStorage or delete other old caches/data as part of rollback. Existing app data is not part of Phase 2's install changes.

## Limitation
No live repository write/deployment was made in this task because branch creation was rejected with HTTP 403. This document describes safe rollback for the package when installed by the owner.
