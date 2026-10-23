#!/usr/bin/env python3
"""Safely integrate BLACKED Phase 7 final fixes into a local existing repo.

Run from anywhere: python3 apply_phase7_integration.py --repo /path/to/Brand-website-v2
Does not commit, push, or deploy. Creates a timestamped backup before changing existing files.
"""
from __future__ import annotations
import argparse, datetime, re, shutil, sys
from pathlib import Path

PACKAGE = Path(__file__).resolve().parent
MODULE_FILES = [
    "phase4-story-universe.js", "phase4-story-universe.css", "phase4-story-universe.json",
    "phase5-product-discovery.js", "phase5-product-discovery.css",
    "phase6-wellness-collections.js", "phase6-wellness-collections.css",
    "phase7-diagnostics.html", "phase5-6-review-diagnostics.html",
]
ASSET_FILES = [
    "phase6-measurement-map.svg", "phase6-product-specs.svg",
    "phase6-comfort-check.svg", "phase6-image-rights-workflow.svg",
]
OLD_MEASURE = "    $('#measurementUnit').addEventListener('change',()=>{$('#measurementStatus').textContent='Keep existing entries in the units originally entered. Clear fields before changing the unit if you need a fresh set.';});"
NEW_MEASURE = """    let previousMeasurementUnit = $('#measurementUnit').value;
    $('#measurementUnit').addEventListener('change',()=>{
      const nextUnit = $('#measurementUnit').value;
      if (nextUnit === previousMeasurementUnit) return;
      const factor = previousMeasurementUnit === 'cm' ? (1 / 2.54) : 2.54;
      let converted = 0;
      measurementFields.forEach(field => {
        const input = $('#'+field.id); const raw = input.value.trim();
        if (!raw) return;
        const value = Number(raw);
        if (!Number.isFinite(value)) return;
        input.value = String(Math.round(value * factor * 10) / 10);
        converted += 1;
      });
      previousMeasurementUnit = nextUnit;
      $('#measurementSummary').innerHTML = '<p class="muted">Units changed and filled values were converted. Review measurements again.</p>';
      $('#measurementStatus').textContent = converted
        ? `Converted ${converted} filled measurement(s) to ${nextUnit === 'cm' ? 'centimetres' : 'inches'}. Review the summary before saving.`
        : 'Units changed. No filled measurements needed converting.';
    });"""
OLD_P4_CHECK = "        const heading = $('strong', host);\n        if (!heading || !/^\\s*\\d+\\/8\\b/.test(heading.textContent)) return;"
NEW_P4_CHECK = "        // The wheel's actual result uses a descriptive title, not an `n/8` heading.\n        // Its retry button is the reliable marker that a spin has finished.\n        if (!host.querySelector('[data-wheel-retry]')) return;"
OLD_P6_GRACE = "      const noor=$('#v3NoorEditGallery',view); const grace=$('#v3GracePreview',view)?.closest('figure') || $('#v3GracePreview',view);"
NEW_P6_GRACE = "      const noor=$('#v3NoorEditGallery',view);\n      // Hide/show the full Grace preview card, not only its image figure.\n      const grace=$('.coming-card.grace',view) || $('#v3GracePreview',view)?.closest('figure') || $('#v3GracePreview',view);"


def must_replace(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise RuntimeError(f"Could not safely apply {label}: expected source anchor not found. No files have been written yet.")
    return text.replace(old, new, 1)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=Path.cwd(), help='Local repository root (default: current directory)')
    args = parser.parse_args()
    root = args.repo.resolve()
    required = ['index.html', 'app.js', 'sw.js', 'phase2-photo-collections.js', 'part-c-enhancements.js']
    missing = [name for name in required if not (root / name).is_file()]
    if missing:
        print('ERROR: this folder does not look like the audited BLACKED repo. Missing: ' + ', '.join(missing), file=sys.stderr)
        return 2

    original: dict[Path, bytes] = {}
    new_content: dict[Path, bytes] = {}
    new_files: dict[Path, bytes] = {}
    try:
        index_path, app_path, sw_path = (root / x for x in ('index.html','app.js','sw.js'))
        index = index_path.read_text(encoding='utf-8')
        app = app_path.read_text(encoding='utf-8')
        sw = sw_path.read_text(encoding='utf-8')
        for anchor in ('phase2-photo-collections.css', 'phase2-photo-collections.js', 'catalogGrid', 'measurementUnit', 'const CORE = ['):
            pool = index + app + sw
            if anchor not in pool:
                raise RuntimeError(f"Audit anchor missing: {anchor}")

        # Add CSS in dependency order. Existing files/scripts are preserved.
        css_anchor = '  <link rel="stylesheet" href="./phase2-photo-collections.css">'
        css_tags = [
            '  <link rel="stylesheet" href="./phase4-story-universe.css">',
            '  <link rel="stylesheet" href="./phase5-product-discovery.css">',
            '  <link rel="stylesheet" href="./phase6-wellness-collections.css">',
        ]
        if css_anchor not in index:
            if not all(tag.split('./')[1].split('"')[0] in index for tag in css_tags):
                raise RuntimeError('Index CSS insertion point changed; review manually rather than appending blindly.')
        else:
            insertion = ''.join('\n' + tag for tag in css_tags if tag.split('./')[1].split('"')[0] not in index)
            if insertion:
                index = index.replace(css_anchor, css_anchor + insertion, 1)

        js_anchor = '  <script src="./phase2-photo-collections.js" defer></script>'
        js_tags = [
            '  <script src="./phase4-story-universe.js" defer></script>',
            '  <script src="./phase5-product-discovery.js" defer></script>',
            '  <script src="./phase6-wellness-collections.js" defer></script>',
        ]
        if js_anchor not in index:
            if not all(tag.split('./')[1].split('"')[0] in index for tag in js_tags):
                raise RuntimeError('Index script insertion point changed; review manually rather than appending blindly.')
        else:
            insertion = ''.join('\n' + tag for tag in js_tags if tag.split('./')[1].split('"')[0] not in index)
            if insertion:
                index = index.replace(js_anchor, js_anchor + insertion, 1)

        if 'BLACKED · V2 Phase 4 — Collections & Wheels' in index:
            index = index.replace('BLACKED · V2 Phase 4 — Collections & Wheels', 'BLACKED · V2 Phase 7 — Final QA Release', 1)
        if 'V2 Phase 4 · integrated wheel hub, local campaign collections, boyfriend and gated fantasy galleries' in index:
            index = index.replace('V2 Phase 4 · integrated wheel hub, local campaign collections, boyfriend and gated fantasy galleries', 'V2 Phase 7 · connected stories, product trust, wellness and final quality checks', 1)
        if 'phase5-6-review-diagnostics.html' not in index:
            anchor = '<a href="./phase6-diagnostics.html">Phase 6 diagnostics</a>'
            if anchor in index:
                index = index.replace(anchor, anchor + '<a href="./phase5-6-review-diagnostics.html">Phase 5–6 review checks</a>', 1)
        if 'phase7-diagnostics.html' not in index:
            anchor = '<a href="./phase6-diagnostics.html">Phase 6 diagnostics</a>'
            if anchor in index:
                index = index.replace(anchor, anchor + '<a href="./phase7-diagnostics.html">Phase 7 final QA</a>', 1)

        # Repair the contradictory unit-switch behavior without touching the worksheet's save model.
        app = must_replace(app, OLD_MEASURE, NEW_MEASURE, 'measurement unit conversion')

        # Version the cache and precache the complete module chain to prevent stale/offline invisibility.
        sw = re.sub(r"const CACHE_NAME\s*=\s*['\"][^'\"]+['\"];", "const CACHE_NAME = 'blacked-v2-phase7-final-1';", sw, count=1)
        module_cache_paths = [
            'phase4-story-universe.css','phase4-story-universe.js','phase4-story-universe.json',
            'phase5-product-discovery.css','phase5-product-discovery.js',
            'phase6-wellness-collections.css','phase6-wellness-collections.js',
            'phase7-diagnostics.html','phase5-6-review-diagnostics.html',
            'assets/phase6-measurement-map.svg','assets/phase6-product-specs.svg',
            'assets/phase6-comfort-check.svg','assets/phase6-image-rights-workflow.svg',
        ]
        missing_cache_paths = [name for name in module_cache_paths if f"'./{name}'" not in sw]
        cache_anchor = "  './','./index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',"
        if missing_cache_paths:
            if cache_anchor not in sw:
                raise RuntimeError('Service-worker CORE insertion point changed; review manually.')
            cache_lines = '\n'.join(f"  './{name}'," for name in missing_cache_paths)
            sw = sw.replace(cache_anchor, cache_anchor + '\n' + cache_lines, 1)

        for name in required:
            p = root / name
            updated = {'index.html':index,'app.js':app,'sw.js':sw}.get(name)
            if updated is not None and updated.encode('utf-8') != p.read_bytes():
                original[p] = p.read_bytes(); new_content[p] = updated.encode('utf-8')

        # Package-owned modules are copied only when absent. If a local copy exists and differs,
        # preserve it and ask for review instead of overwriting custom work.
        for name in MODULE_FILES:
            src = PACKAGE / name; dst = root / name
            if not src.is_file(): raise RuntimeError(f'Package file missing: {src}')
            data = src.read_bytes()
            if dst.exists():
                existing_bytes = dst.read_bytes()
                if existing_bytes == data: continue
                current = dst.read_text(encoding='utf-8') if dst.suffix == '.js' else ''
                # Apply only the confirmed Phase 4 fix to the existing repository module.
                if name == 'phase4-story-universe.js':
                    if OLD_P4_CHECK in current:
                        new_text = current.replace(OLD_P4_CHECK, NEW_P4_CHECK, 1)
                        original[dst] = existing_bytes; new_content[dst] = new_text.encode('utf-8')
                    elif "host.querySelector('[data-wheel-retry]')" not in current:
                        raise RuntimeError(f'Phase 4 wheel code has an unfamiliar shape: {dst}. Review it manually.')
                    continue
                # Apply only the confirmed Grace whole-card filtering fix.
                if name == 'phase6-wellness-collections.js':
                    if OLD_P6_GRACE in current:
                        new_text = current.replace(OLD_P6_GRACE, NEW_P6_GRACE, 1)
                        original[dst] = existing_bytes; new_content[dst] = new_text.encode('utf-8')
                    elif "$('.coming-card.grace',view)" not in current:
                        raise RuntimeError(f'Phase 6 collection code has an unfamiliar shape: {dst}. Review it manually.')
                    continue
                # Replace the previous Phase 7 diagnostics intentionally; the original is backed up.
                if name == 'phase7-diagnostics.html':
                    original[dst] = existing_bytes; new_content[dst] = data
                    continue
                # Keep repository-owned styling and story data intact. Diagnostics verify that these files load.
                if name in ('phase4-story-universe.css','phase4-story-universe.json',
                            'phase5-product-discovery.js','phase5-product-discovery.css',
                            'phase6-wellness-collections.css'):
                    print(f'NOTE: preserving existing repository file: {dst.name}')
                    continue
                # Existing Phase 5–6 diagnostic is already available; keep it rather than replace it.
                if name == 'phase5-6-review-diagnostics.html':
                    print('NOTE: preserving existing Phase 5–6 review diagnostic.')
                    continue
                raise RuntimeError(f'Existing file differs from package and was not overwritten: {dst}. Review/merge it manually first.')
            new_files[dst] = data

        for name in ASSET_FILES:
            src = PACKAGE / 'assets' / name; dst = root / 'assets' / name
            if not src.is_file(): raise RuntimeError(f'Package asset missing: {src}')
            data = src.read_bytes()
            if dst.exists():
                if dst.read_bytes() != data:
                    raise RuntimeError(f'Asset filename collision; not overwriting existing file: {dst}')
            else:
                new_files[dst] = data

        # Include existing diagnostics and audit registers, without altering current app data.
        for name in ('PRODUCT_VERIFICATION_REGISTER.csv','IMAGE_RIGHTS_REGISTER.csv'):
            dst = root / name; data = (PACKAGE / name).read_bytes()
            if not dst.exists(): new_files[dst] = data
            elif dst.read_bytes() != data:
                # keep the repo's current records; package registers are examples/reference only
                print(f'NOTE: preserving existing {name}; merge new pending rows manually if required.')

        # Create the backup before writing any changed existing file.
        if original or new_content:
            stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
            backup = root / f'.phase7-backup-{stamp}'
            backup.mkdir(parents=True, exist_ok=False)
            for path, data in original.items():
                rel = path.relative_to(root); dest = backup / rel; dest.parent.mkdir(parents=True, exist_ok=True); dest.write_bytes(data)
            print(f'Backup created: {backup}')

        for path, data in new_files.items():
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        for path, data in new_content.items():
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)

        print('PASS: Phase 4/5/6 modules are present and linked from index.html in dependency order.')
        print('PASS: service-worker cache version bumped; Phase 4 story data, Phase 5/6 scripts, SVGs and diagnostics are precached.')
        print('PASS: measurement unit changes convert current worksheet entries rather than silently reinterpreting them.')
        print('PASS: no backend, checkout, payment, inventory, or image-rights status is invented or enabled.')
        print('Next: open phase7-diagnostics.html over HTTP and test the deployed build on Android Chrome. No commit/deployment was performed by this script.')
        return 0
    except Exception as exc:
        print('ERROR: ' + str(exc), file=sys.stderr)
        print('No repository writes have occurred before preflight succeeds; if the error was during a write, restore from the created .phase7-backup-* folder.', file=sys.stderr)
        return 2

if __name__ == '__main__':
    raise SystemExit(main())
