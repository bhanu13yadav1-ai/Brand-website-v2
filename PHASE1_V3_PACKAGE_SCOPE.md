# ZIP and Package Scope — Phase 1

The current GitHub `main` branch remains unchanged by Phase 1. No website code or image is included in the audit delta as a replacement for the live source.

## Current full website ZIP

Use GitHub's generated source archive of the **current main branch** for a complete baseline with all repository assets:

https://github.com/bhanu13yadav1-ai/Brand-website-v2/archive/refs/heads/main.zip

This archive will follow the current `main` branch. Save it before Phase 2 changes. Do not replace the repository with an older rollback package.

## Audit delta ZIP

`BLACKED_V3_PHASE1_AUDIT_DELTA.zip` contains only new Phase 1 audit/handoff files. It is not a deployable website by itself.

## Why no exact full-main ZIP is attached from this environment

The connected GitHub tool was able to inspect current main and return text/tree metadata, but binary image blobs cannot be retrieved through its UTF-8-only file endpoint. Direct container access to GitHub also failed due to network/DNS restrictions. Therefore, I will not label an older local working-review ZIP as an exact copy of today's main. The official current-main archive link above avoids silently giving you a stale site package.

A previous full working review archive available in the project library is based on commit `530b6d2339e68f0ae3bd78a01ec36981d570576b`, while current main is `966707852219bda9dcbf312cdbd3065439981f09` (8 commits ahead). That old archive is a rollback/reference only, not a replacement for current main.
