#!/usr/bin/env python3
"""Idempotently integrate BLACKED V3 final overlay into an existing repository checkout.
Run from the extracted package folder: python apply_final_release_patches.py /path/to/Brand-website-v2
It preserves app data and core JS/CSS; it only patches index.html and sw.js in-place.
"""
from __future__ import annotations
import re, sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
INDEX = ROOT / "index.html"
SW = ROOT / "sw.js"
LOADER = '<script src="./phase12-15-final-loader.js?v=12.15.0" defer></script>'
CORE_FILES = [
    "phase2-photo-collections.css","phase2-photo-collections.js","phase3-design-system.css","phase4-home-and-fantasy.js",
    "phase5-image-reliability.css","phase5-image-reliability.js","phase6-boyfriend-studio.css","phase6-boyfriend-studio.js",
    "phase7-8-enhancements.css","phase7-8-enhancements.js","phase9-after-dark.css","phase9-after-dark.js",
    "phase10-wellness-education.css","phase10-wellness-education.js","phase11-fit-studio.css","phase11-fit-studio.js",
    "phase12-wheels-hub.css","phase12-wheels-hub.js","phase13-couples-studio.css","phase13-couples-studio.js",
    "phase14-hardening.css","phase14-hardening.js","phase15-whats-new.css","phase15-whats-new.js",
    "phase12-15-final-loader.js","phase12-15-diagnostics.html"
]

def patch_index() -> None:
    if not INDEX.exists(): raise SystemExit(f"Missing {INDEX}; run this against the existing repository root.")
    text = INDEX.read_text(encoding="utf-8")
    # Remove any older experimental bootstrap lines to avoid loading the same add-on twice.
    text = re.sub(r'^\s*<script\s+src=["\']\./(?:phase5-6-loader|phase9-11-loader)\.js[^>]*></script>\s*\n', '', text, flags=re.M)
    if LOADER not in text:
        anchor = '<script src="./part-c-enhancements.js" defer></script>'
        if anchor not in text:
            raise SystemExit("Could not find part-c-enhancements.js script tag; index.html was not modified.")
        text = text.replace(anchor, anchor + "\n  " + LOADER, 1)
    text = re.sub(r'<title>.*?</title>', '<title>BLACKED · V3 Final Release — Collections, Wheels & Wellness</title>', text, count=1, flags=re.S)
    text = re.sub(r'(<meta name="description" content=")[^"]*(">)', r'\1BLACKED — V3 innerwear collections, adult fictional story tools, women’s wellness education, fit guidance and privacy controls.\2', text, count=1)
    INDEX.write_text(text, encoding="utf-8")

def patch_service_worker() -> dict:
    if not SW.exists(): raise SystemExit(f"Missing {SW}; index.html has been patched but sw.js was not changed.")
    text = SW.read_text(encoding="utf-8")
    text, changed_cache = re.subn(r"const\s+CACHE_NAME\s*=\s*['\"][^'\"]+['\"]\s*;", "const CACHE_NAME = 'blacked-v3-final-15-1';", text, count=1)
    if not changed_cache: raise SystemExit("Could not find CACHE_NAME in sw.js.")
    replacements = 0
    # The actual repository stores these referenced images at the root. Normalize only where
    # the basename exists in the root; never rewrite a path to a file that is not present.
    def fix_asset(match: re.Match[str]) -> str:
        nonlocal replacements
        quote, path = match.group(1), match.group(2)
        basename = path.rsplit('/', 1)[-1]
        if (ROOT / basename).is_file():
            replacements += 1
            return quote + './' + basename + quote
        return match.group(0)
    text = re.sub(r"(['\"])(\./assets/(?:[^/'\"]+/)+[^/'\"]+)\1", fix_asset, text)
    marker = "const CORE = ["
    pos = text.find(marker)
    if pos < 0: raise SystemExit("Could not find CORE array in sw.js.")
    end = text.find('];', pos)
    if end < 0: raise SystemExit("Could not locate end of CORE array in sw.js.")
    core_block = text[pos:end]
    missing = [p for p in CORE_FILES if f"'./{p}'" not in core_block and f'"./{p}"' not in core_block]
    if missing:
        insertion = ''.join(f"  './{p}',\n" for p in missing)
        text = text[:end] + insertion + text[end:]
    SW.write_text(text, encoding="utf-8")
    return {"nestedPathsRepaired": replacements, "coreEntriesAdded": len(missing), "cacheName": "blacked-v3-final-15-1"}

def main() -> None:
    patch_index()
    status = patch_service_worker()
    print("BLACKED V3 final release integration applied.")
    print(f"Repository root: {ROOT}")
    print(f"index.html: {INDEX}")
    print(f"sw.js cache: {status['cacheName']}")
    print(f"Nested image paths repaired: {status['nestedPathsRepaired']}")
    print(f"New/offline CORE entries added: {status['coreEntriesAdded']}")
    print("No app.js, styles.css, existing feature data, localStorage or user data was cleared.")

if __name__ == "__main__": main()
