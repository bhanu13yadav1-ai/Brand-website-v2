# Patch integration notes

These are deliberately small source-edit patches. They do not contain copies of `index.html` or `sw.js`.

**Current base:** `main` at `530b6d2339e68f0ae3bd78a01ec36981d570576b`.

- `index.html` blob SHA at capture: `007b8e7d59486b5ba93c6534aa9dcc91066d040b`.
- `sw.js` blob SHA at capture: `675093dcd5bb4d9975c40dd07d65a5cac9018ee4`.

Before applying a patch, fetch the target file and compare its blob SHA to the recorded base. If changed, regenerate/reconcile the patch; do not force-apply it. The JS and CSS should be placed at repository root, `phase2-content-graph.json` at repository root, and the new images under `phase2-assets/`. If the gallery manifest path is changed, update both the script and service-worker list consistently.

Service-worker cache version must be bumped when these assets ship. Add the new runtime files and images to the `CORE` list so first offline load does not miss them. Remember: existing app views and the rest of the asset cache still need live testing after integration.
