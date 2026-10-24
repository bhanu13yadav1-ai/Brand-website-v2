#!/usr/bin/env python3
"""Safely integrate BLACKED V5 Phase 2 UX assets into an existing repo checkout.

Usage: put phase2-premium-ux.css and phase2-premium-ux.js in the repo root,
copy this file there, then run: python install_phase2.py
Backups are written beside (not inside) the website root.
"""
from __future__ import annotations
import datetime as dt
import re
import shutil
import sys
from pathlib import Path

ROOT = Path.cwd()
INDEX = ROOT / "index.html"
SW = ROOT / "sw.js"
CSS = ROOT / "phase2-premium-ux.css"
JS = ROOT / "phase2-premium-ux.js"

CSS_MARKER = '  <link rel="stylesheet" href="./phase17-ultra-urge-wellness.css">'
JS_MARKER = '  <script src="./phase17-ultra-urge-wellness.js" defer></script>'
SW_CSS_MARKER = "  './phase16-preference-first.css', './phase17-ultra-urge-wellness.css',"
SW_JS_MARKER = "  './phase16-preference-first.js', './phase17-ultra-urge-wellness.js', './phase17-wellness-catalog.json',"


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(2)


def main() -> None:
    for path in (INDEX, SW, CSS, JS):
        if not path.is_file():
            fail(f"Required file not found: {path.name}. Run this from the repo root after uploading both Phase 2 assets.")

    index_text = INDEX.read_text(encoding="utf-8")
    sw_text = SW.read_text(encoding="utf-8")
    # Validate all required insertion anchors before modifying any file.
    if "phase2-premium-ux.css" not in index_text and index_text.count(CSS_MARKER) != 1:
        fail("Expected exactly one Phase 17 stylesheet anchor in index.html; no changes made.")
    if "phase2-premium-ux.js" not in index_text and index_text.count(JS_MARKER) != 1:
        fail("Expected exactly one Phase 17 script anchor in index.html; no changes made.")
    if "phase2-premium-ux.css" not in sw_text and sw_text.count(SW_CSS_MARKER) != 1:
        fail("Expected the known Phase 17 CSS cache anchor in sw.js; no changes made.")
    if "phase2-premium-ux.js" not in sw_text and sw_text.count(SW_JS_MARKER) != 1:
        fail("Expected the known Phase 17 JS cache anchor in sw.js; no changes made.")

    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = ROOT.parent / f"{ROOT.name}-phase2-backup-{stamp}"
    backup.mkdir(parents=True, exist_ok=False)
    shutil.copy2(INDEX, backup / "index.html.before-phase2")
    shutil.copy2(SW, backup / "sw.js.before-phase2")

    if "phase2-premium-ux.css" not in index_text:
        index_text = index_text.replace(CSS_MARKER, CSS_MARKER + '\n  <link rel="stylesheet" href="./phase2-premium-ux.css">')
    if "phase2-premium-ux.js" not in index_text:
        index_text = index_text.replace(JS_MARKER, JS_MARKER + '\n  <script src="./phase2-premium-ux.js" defer></script>')

    if "phase2-premium-ux.css" not in sw_text:
        sw_text = sw_text.replace(SW_CSS_MARKER, SW_CSS_MARKER + "\n  './phase2-premium-ux.css',")
    if "phase2-premium-ux.js" not in sw_text:
        sw_text = sw_text.replace(SW_JS_MARKER, SW_JS_MARKER + "\n  './phase2-premium-ux.js',")
    sw_text, count = re.subn(
        r"const CACHE_NAME = '[^']+';",
        "const CACHE_NAME = 'blacked-v4-phase2-premium-ux-20261024-1';",
        sw_text,
        count=1,
    )
    if count != 1:
        fail("Could not update the single service-worker cache version. Original files are backed up, but edits were not written.")

    INDEX.write_text(index_text, encoding="utf-8")
    SW.write_text(sw_text, encoding="utf-8")
    print("Phase 2 integration complete.")
    print(f"Backup directory: {backup}")
    print("Changes: index.html includes the additive CSS/JS modules; sw.js includes both assets and uses a new cache version.")
    print("Next: run python validate_phase2.py, inspect the diff, then commit/deploy only after review.")

if __name__ == "__main__":
    main()
