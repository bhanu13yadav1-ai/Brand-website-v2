# Safe cleanup policy
No existing repository files are removed in Phase 4. The package intentionally consolidates the Phase 3 runtime dependency while leaving source files present for safe rollback.

Candidate unused after deployment: `phase3-horny-mode.js` and `phase3-horny-mode.css`. Do not delete them now. Delete only after:
1. the deployed `phase4-diagnostics.html` reports the Phase 3 + 4 bundle loads,
2. all 7 views navigate and all 4 original wheels remain working on Android Chrome,
3. a repo-wide search confirms no HTML, JS, service-worker, manifest or future-phase code still references these filenames,
4. a full current-main ZIP backup exists.
Never bulk-delete files just because filenames look old; user-uploaded project notes and the original image archive must be retained.
