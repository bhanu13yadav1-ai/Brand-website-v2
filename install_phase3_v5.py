#!/usr/bin/env python3
"""Safely integrate the additive BLACKED V5 Phase 3 layer into an existing repo checkout.
Creates a backup outside the repository and refuses unexpected source layouts.
"""
from __future__ import annotations
import argparse
import datetime as dt
import json
import re
import shutil
import sys
import tempfile
from pathlib import Path

OVERLAYS = ("phase3-v5-interactive.css", "phase3-v5-interactive.js", "phase3-v5-diagnostics.html")
REQUIRED_ROOT_FILES = ("index.html", "app.js", "sw.js", "manifest.webmanifest", "phase2-premium-ux.css", "phase2-premium-ux.js")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise RuntimeError(message)


def insert_after_once(text: str, anchor: str, addition: str, ref: str) -> str:
    if ref in text:
        return text
    count = text.count(anchor)
    require(count == 1, f"Expected exactly one anchor for {ref}; found {count}. No files were written.")
    return text.replace(anchor, anchor + addition, 1)


def patch_index(text: str) -> str:
    require('./phase17-ultra-urge-wellness.css' in text, "index.html is not the expected BLACKED V4/V5 layout (Phase 17 stylesheet missing).")
    css_anchor = '  <link rel="stylesheet" href="./phase17-ultra-urge-wellness.css">'
    if 'href="./phase2-premium-ux.css"' not in text:
        text = insert_after_once(text, css_anchor, '\n  <link rel="stylesheet" href="./phase2-premium-ux.css">', 'href="./phase2-premium-ux.css"')
    if 'href="./phase3-v5-interactive.css"' not in text:
        anchor = '  <link rel="stylesheet" href="./phase2-premium-ux.css">' if 'href="./phase2-premium-ux.css"' in text else css_anchor
        text = insert_after_once(text, anchor, '\n  <link rel="stylesheet" href="./phase3-v5-interactive.css">', 'href="./phase3-v5-interactive.css"')
    js_anchor = '  <script src="./phase17-ultra-urge-wellness.js" defer></script>'
    if 'src="./phase2-premium-ux.js"' not in text:
        text = insert_after_once(text, js_anchor, '\n  <script src="./phase2-premium-ux.js" defer></script>', 'src="./phase2-premium-ux.js"')
    if 'src="./phase3-v5-interactive.js"' not in text:
        anchor = '  <script src="./phase2-premium-ux.js" defer></script>' if 'src="./phase2-premium-ux.js"' in text else js_anchor
        text = insert_after_once(text, anchor, '\n  <script src="./phase3-v5-interactive.js" defer></script>', 'src="./phase3-v5-interactive.js"')
    text = text.replace('<title>BLACKED V4 · Complete Experience</title>', '<title>BLACKED V5 · Complete Experience</title>', 1)
    text = text.replace('BLACKED V4 — mobile-first innerwear discovery', 'BLACKED V5 — mobile-first innerwear discovery', 1)
    return text


def patch_app(text: str) -> str:
    if 'function scheduleInnerwearRender(token)' in text:
        return text
    start = text.find('  function setView(name) {')
    require(start >= 0, "Could not find function setView(name) in app.js; source may have changed. No files were written.")
    click_anchor = "  $$('[data-view-link]').forEach(b => b.addEventListener('click', () => setView(b.dataset.viewLink)));"
    end = text.find(click_anchor, start)
    require(end >= 0, "Could not find the navigation listener after setView() in app.js; source may have changed. No files were written.")
    new_function = r'''  // Keep Innerwear navigation responsive: defer the optional large archive until after paint.
  let innerwearEntryToken = 0;
  function scheduleInnerwearRender(token) {
    const startRender = () => {
      if (token !== innerwearEntryToken || state.view !== 'innerwear') return;
      try {
        renderCatalog();
        renderImageLibrary(false);
        showSpinFrame(0);
        scheduleImageLibraryInit();
      } catch (error) {
        if (state.diagnostic && Array.isArray(state.diagnostic.errors)) state.diagnostic.errors.push('Innerwear render failed: ' + String(error));
        console.error('[BLACKED V5] Innerwear render failed', error);
        const status = $('#imageLibraryStatus');
        if (status) status.textContent = 'Optional image archive render failed; other sections remain available.';
      }
    };
    if ('requestAnimationFrame' in window) requestAnimationFrame(() => window.setTimeout(startRender, 0));
    else window.setTimeout(startRender, 32);
  }

  function setView(name) {
    if (!['home','stories','innerwear','sanskari','wellness','boyfriend','fit'].includes(name)) return;
    if (['wellness','boyfriend','stories'].includes(name) && !state.adultAllowed) {
      state.pendingView = name; $('#ageConfirm').checked = false; $('#ageError').classList.add('hidden'); $('#ageModal').classList.remove('hidden'); return;
    }
    const previousView = $('.view.active');
    state.view = name;
    $$('.view').forEach(v => { const active = v.dataset.view === name; v.hidden = !active; v.classList.toggle('active', active); });
    const activeView = $('#view-' + name);
    const activateDestinationImages = () => { if (state.view === name) restoreDeferredViewImages(activeView); };
    if ('requestAnimationFrame' in window) requestAnimationFrame(activateDestinationImages);
    else window.setTimeout(activateDestinationImages, 0);
    if (previousView && previousView !== activeView) {
      const deferPreviousView = () => deferInactiveViewImages(previousView);
      if ('requestIdleCallback' in window) window.requestIdleCallback(deferPreviousView, { timeout: 900 });
      else window.setTimeout(deferPreviousView, 80);
    }
    $$('[data-view-link]').forEach(b => b.classList.toggle('active', b.dataset.viewLink === name));
    $$('.main-nav [data-view-link]').forEach(b => { if (b.dataset.viewLink === name) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    $('#mobileMenu').classList.add('hidden'); $('#menuToggle').setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if (name === 'innerwear') {
      const token = ++innerwearEntryToken;
      const catalog = $('#catalogGrid'), archive = $('#imageLibraryGrid');
      if (catalog && !catalog.childElementCount) catalog.textContent = 'Preparing the style catalogue…';
      if (archive && !archive.childElementCount) archive.textContent = 'The optional image archive loads separately below…';
      scheduleInnerwearRender(token);
    }
    if (name === 'sanskari') renderCampaigns();
    if (name === 'home') renderHomeCampaigns();
    if (name === 'stories') renderStories();
  }

'''
    return text[:start] + new_function + text[end:]


def patch_sw(text: str) -> str:
    cache_re = re.compile(r"const CACHE_NAME = ['\"][^'\"]+['\"];")
    matches = list(cache_re.finditer(text))
    require(len(matches) == 1, f"Expected one CACHE_NAME in sw.js; found {len(matches)}. No files were written.")
    text = cache_re.sub("const CACHE_NAME = 'blacked-v5-phase3-interactive-20261024-1';", text, count=1)
    css_anchor = "  './phase16-preference-first.css', './phase17-ultra-urge-wellness.css',"
    if "'./phase2-premium-ux.css'" not in text:
        text = insert_after_once(text, css_anchor, "\n  './phase2-premium-ux.css',", "'./phase2-premium-ux.css'")
    if "'./phase3-v5-interactive.css'" not in text:
        anchor = "  './phase2-premium-ux.css'," if "'./phase2-premium-ux.css'" in text else css_anchor
        text = insert_after_once(text, anchor, "\n  './phase3-v5-interactive.css',", "'./phase3-v5-interactive.css'")
    js_anchor = "  './phase17-ultra-urge-wellness.js', './phase17-wellness-catalog.json',"
    if "'./phase2-premium-ux.js'" not in text:
        text = insert_after_once(text, js_anchor, "\n  './phase2-premium-ux.js',", "'./phase2-premium-ux.js'")
    if "'./phase3-v5-interactive.js'" not in text:
        anchor = "  './phase2-premium-ux.js'," if "'./phase2-premium-ux.js'" in text else js_anchor
        text = insert_after_once(text, anchor, "\n  './phase3-v5-interactive.js', './phase3-v5-diagnostics.html',", "'./phase3-v5-interactive.js'")
    elif "'./phase3-v5-diagnostics.html'" not in text:
        text = insert_after_once(text, "'./phase3-v5-interactive.js',", " './phase3-v5-diagnostics.html',", "'./phase3-v5-diagnostics.html'")
    return text


def patch_manifest(text: str) -> str:
    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"manifest.webmanifest is invalid JSON: {exc}") from exc
    data['name'] = 'BLACKED V5 — Complete Experience'
    data['short_name'] = 'BLACKED V5'
    data['description'] = 'BLACKED V5 mobile-first experience with discovery, adult fiction, couples tools, wellness, fit guidance and privacy-conscious local interactions.'
    return json.dumps(data, ensure_ascii=False, indent=2) + '\n'


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path.cwd(), help='Path to the repository checkout (default: current folder)')
    parser.add_argument('--dry-run', action='store_true', help='Check anchors and print planned changes without writing files')
    args = parser.parse_args()
    root = args.root.resolve()
    require(root.is_dir(), f"Repository root does not exist: {root}")
    missing = [name for name in REQUIRED_ROOT_FILES if not (root / name).is_file()]
    require(not missing, 'Required current repo files are missing: ' + ', '.join(missing))
    pack = Path(__file__).resolve().parent
    missing_overlays = [name for name in OVERLAYS if not (pack / name).is_file()]
    require(not missing_overlays, 'Package overlay files missing: ' + ', '.join(missing_overlays))

    old = {name: (root / name).read_text(encoding='utf-8') for name in ('index.html','app.js','sw.js','manifest.webmanifest')}
    new = {
        'index.html': patch_index(old['index.html']),
        'app.js': patch_app(old['app.js']),
        'sw.js': patch_sw(old['sw.js']),
        'manifest.webmanifest': patch_manifest(old['manifest.webmanifest']),
    }
    require('phase2-premium-ux.css' in new['index.html'] and 'phase2-premium-ux.js' in new['index.html'], 'Phase 2 integration preflight failed.')
    require('phase3-v5-interactive.css' in new['sw.js'] and 'phase3-v5-interactive.js' in new['sw.js'], 'Service worker integration preflight failed.')
    if args.dry_run:
        print(json.dumps({'status':'DRY_RUN_OK','root':str(root),'changes':{k:{'changed':old[k]!=new[k],'before_bytes':len(old[k].encode()),'after_bytes':len(new[k].encode())} for k in new},'new_files':list(OVERLAYS)},indent=2))
        return 0

    timestamp = dt.datetime.now().strftime('%Y%m%d-%H%M%S')
    backup = root.parent / f'{root.name}-phase3-v5-backup-{timestamp}'
    backup.mkdir(parents=True, exist_ok=False)
    for name in old:
        shutil.copy2(root / name, backup / name)
    # Write to temporary siblings first; replace only after every new file is ready.
    staged = {}
    try:
        for name, content in new.items():
            fd, temp_name = tempfile.mkstemp(prefix=f'.{name}.phase3v5-', dir=root)
            import os
            with os.fdopen(fd, 'w', encoding='utf-8', newline='') as handle:
                handle.write(content)
            staged[name] = Path(temp_name)
        for name in OVERLAYS:
            target = root / name
            incoming = pack / name
            if target.exists() and target.read_bytes() != incoming.read_bytes():
                raise RuntimeError(f'{target.name} already exists with different content. Review it manually; installer will not overwrite it.')
        for name in OVERLAYS:
            target = root / name
            if not target.exists():
                shutil.copy2(pack / name, target)
        for name, temp_path in staged.items():
            temp_path.replace(root / name)
    except Exception:
        for path in staged.values():
            try: path.unlink(missing_ok=True)
            except Exception: pass
        raise
    report = {
        'status':'INTEGRATION_FILES_UPDATED_LOCAL_ONLY',
        'root':str(root),
        'backup_directory':str(backup),
        'modified_files':list(new.keys()),
        'added_files':list(OVERLAYS),
        'note':'No Git commit or deployment is performed. Review git diff and run validate_phase3_v5.py before pushing.'
    }
    (root / 'PHASE3_V5_INSTALL_REPORT.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,indent=2))
    return 0

if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f'ERROR: {error}', file=sys.stderr)
        raise SystemExit(2)
