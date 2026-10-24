#!/usr/bin/env python3
"""Safe, additive Phase 2 + Phase 3 + Phase 4 integration for BLACKED V5.

Run from a clean local/Codespaces checkout after copying this installer, validator,
and phase4-wellness-fit-diagnostics.html to the repository root.

Examples:
  python3 install_phase2_phase3_phase4.py --root . --dry-run
  python3 install_phase2_phase3_phase4.py --root .

This does not commit or deploy. It creates a sibling backup before writing source files.
"""
from __future__ import annotations
import argparse, datetime as dt, json, os, re, shutil, sys, tempfile
from pathlib import Path

CACHE_NAME = "blacked-v5-phase234-integrated-20261024-2"
VIEWS = ("home", "stories", "innerwear", "sanskari", "wellness", "boyfriend", "fit")
WHEELS = ("dildo", "plug", "boy", "wild")
REQUIRED = (
    "index.html", "app.js", "sw.js", "manifest.webmanifest",
    "phase2-premium-ux.css", "phase2-premium-ux.js",
    "phase3-v5-interactive.css", "phase3-v5-interactive.js", "phase3-v5-diagnostics.html",
    "phase1-foundation.js", "phase2-core-experience.js", "phase3-v4-experience.js", "phase3-4-experience.js",
    "phase5-final-release-loader.js",
    "phase4-home-and-fantasy.js", "phase4-story-universe.css", "phase4-story-universe.js",
    "phase4-story-universe.json", "phase4-diagnostics.html", "phase4-diagnostics.js",
    "phase4-wellness-fit-diagnostics.html",
    "phase9-after-dark.css", "phase9-after-dark.js", "phase12-wheels-hub.css", "phase12-wheels-hub.js",
    "phase13-couples-studio.css", "phase13-couples-studio.js", "part-c-enhancements.js",
    "phase10-wellness-education.css", "phase10-wellness-education.js",
    "phase11-fit-studio.css", "phase11-fit-studio.js",
    "phase14-hardening.css", "phase14-hardening.js", "phase15-whats-new.css", "phase15-whats-new.js",
)
SW_ENTRIES = (
    "phase2-premium-ux.css", "phase2-premium-ux.js",
    "phase3-v5-interactive.css", "phase3-v5-interactive.js", "phase3-v5-diagnostics.html",
    "phase4-diagnostics.html", "phase4-diagnostics.js", "phase4-wellness-fit-diagnostics.html",
    "phase4-home-and-fantasy.js", "phase4-story-universe.css", "phase4-story-universe.js", "phase4-story-universe.json",
    "phase5-final-release-loader.js",
    "phase10-wellness-education.css", "phase10-wellness-education.js",
    "phase11-fit-studio.css", "phase11-fit-studio.js",
    "phase14-hardening.css", "phase14-hardening.js", "phase15-whats-new.css", "phase15-whats-new.js",
)
MODIFIED = ("index.html", "app.js", "sw.js", "manifest.webmanifest", "phase4-home-and-fantasy.js")

class InstallError(RuntimeError):
    pass

def require(ok: bool, message: str) -> None:
    if not ok:
        raise InstallError(message)

def occurrences(text: str, needle: str) -> int:
    return text.count(needle)

def insert_after_once(text: str, anchor: str, addition: str, marker: str) -> str:
    n = occurrences(text, marker)
    require(n <= 1, f"Duplicate marker {marker!r} ({n} occurrences); refusing to guess.")
    if n == 1:
        return text
    n_anchor = occurrences(text, anchor)
    require(n_anchor == 1, f"Expected exactly one insertion anchor for {marker!r}; found {n_anchor}.")
    return text.replace(anchor, anchor + addition, 1)

def ensure_index_ref(text: str, kind: str, filename: str, after: str) -> str:
    attr = "href" if kind == "css" else "src"
    marker = f'{attr}="./{filename}"'
    full = f'  <link rel="stylesheet" href="./{filename}">' if kind == "css" else f'  <script src="./{filename}" defer></script>'
    if occurrences(text, marker) > 1:
        raise InstallError(f"index.html has duplicate references to {filename}.")
    if occurrences(text, marker) == 1:
        return text
    return insert_after_once(text, after, "\n" + full, marker)

def patch_index(text: str) -> str:
    require('id="view-home"' in text and 'id="view-innerwear"' in text,
            "index.html does not match the expected existing BLACKED view layout.")
    css17 = '  <link rel="stylesheet" href="./phase17-ultra-urge-wellness.css">'
    css2 = '  <link rel="stylesheet" href="./phase2-premium-ux.css">'
    css3 = '  <link rel="stylesheet" href="./phase3-v5-interactive.css">'
    text = ensure_index_ref(text, "css", "phase2-premium-ux.css", css17)
    text = ensure_index_ref(text, "css", "phase3-v5-interactive.css", css2)

    js17 = '  <script src="./phase17-ultra-urge-wellness.js" defer></script>'
    js2 = '  <script src="./phase2-premium-ux.js" defer></script>'
    js3 = '  <script src="./phase3-v5-interactive.js" defer></script>'
    text = ensure_index_ref(text, "js", "phase2-premium-ux.js", js17)
    text = ensure_index_ref(text, "js", "phase3-v5-interactive.js", js2)

    # Phase 4/W4 source modules are retained; add only if missing from a user's checkout.
    if 'href="./phase4-story-universe.css"' not in text:
        text = ensure_index_ref(text, "css", "phase4-story-universe.css", css3)
    if 'src="./phase4-home-and-fantasy.js"' not in text:
        text = ensure_index_ref(text, "js", "phase4-home-and-fantasy.js", js3)
    if 'src="./phase4-story-universe.js"' not in text:
        text = ensure_index_ref(text, "js", "phase4-story-universe.js", '  <script src="./phase4-home-and-fantasy.js" defer></script>')
    # The existing Phase 4 Wellness/Fit modules depend on this final loader.
    if 'src="./phase5-final-release-loader.js"' not in text:
        text = ensure_index_ref(text, "js", "phase5-final-release-loader.js", '  <script src="./phase3-v4-experience.js" defer></script>')

    title = '<title>BLACKED V4 · Complete Experience</title>'
    if title in text:
        text = text.replace(title, '<title>BLACKED V5 · Complete Experience</title>', 1)
    text = text.replace('BLACKED V4 — mobile-first innerwear discovery', 'BLACKED V5 — mobile-first innerwear discovery', 1)

    for ref in (
        "phase2-premium-ux.css", "phase2-premium-ux.js", "phase3-v5-interactive.css", "phase3-v5-interactive.js",
        "phase4-home-and-fantasy.js", "phase4-story-universe.css", "phase4-story-universe.js", "phase5-final-release-loader.js",
    ):
        attr = "href" if ref.endswith(".css") else "src"
        require(occurrences(text, f'{attr}="./{ref}"') == 1, f"index.html must reference {ref} exactly once.")
    return text

def patch_app(text: str) -> str:
    if "function scheduleInnerwearRender(token)" in text:
        return text  # idempotent: don't patch an already-installed optimization.
    start = text.find("  function setView(name) {")
    click_anchor = "  $$('[data-view-link]').forEach(b => b.addEventListener('click', () => setView(b.dataset.viewLink)));"
    end = text.find(click_anchor, start)
    require(start >= 0 and end >= 0, "Could not locate the current setView() block in app.js; no source files have been written.")
    replacement = r'''  // Render the optional large Innerwear archive after the navigation frame paints.
  let innerwearEntryToken = 0;
  function scheduleInnerwearRender(token) {
    const startRender = () => {
      if (token !== innerwearEntryToken || state.view !== 'innerwear') return;
      try {
        renderCatalog(); renderImageLibrary(false); showSpinFrame(0); scheduleImageLibraryInit();
      } catch (error) {
        if (state.diagnostic && Array.isArray(state.diagnostic.errors)) state.diagnostic.errors.push('Innerwear render failed: ' + String(error));
        console.error('[BLACKED V5] Innerwear render failed', error);
        const status = $('#imageLibraryStatus');
        if (status) status.textContent = 'Optional image archive failed to render; other sections remain available.';
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
      const deferPreviousImages = () => deferInactiveViewImages(previousView);
      if ('requestIdleCallback' in window) window.requestIdleCallback(deferPreviousImages, { timeout: 900 });
      else window.setTimeout(deferPreviousImages, 80);
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
    return text[:start] + replacement + text[end:]

def patch_sw(text: str) -> str:
    matches = list(re.finditer(r"const CACHE_NAME = ['\"][^'\"]+['\"];", text))
    require(len(matches) == 1, f"Expected exactly one CACHE_NAME in sw.js; found {len(matches)}.")
    text = text[:matches[0].start()] + f"const CACHE_NAME = '{CACHE_NAME}';" + text[matches[0].end():]

    css_anchor = "  './phase16-preference-first.css', './phase17-ultra-urge-wellness.css',"
    text = insert_after_once(text, css_anchor,
        "\n  './phase2-premium-ux.css', './phase3-v5-interactive.css',", "'./phase2-premium-ux.css'")
    js_anchor = "  './phase17-ultra-urge-wellness.js', './phase17-wellness-catalog.json',"
    text = insert_after_once(text, js_anchor,
        "\n  './phase2-premium-ux.js', './phase3-v5-interactive.js', './phase3-v5-diagnostics.html',", "'./phase2-premium-ux.js'")

    # Add both Phase 4 diagnostic pages to the existing app-shell list.
    text = insert_after_once(text, "'./phase4-story-universe.js',", " './phase4-diagnostics.html',", "'./phase4-diagnostics.html'")
    text = insert_after_once(text, "'./phase4-diagnostics.html',", " './phase4-diagnostics.js',", "'./phase4-diagnostics.js'")
    text = insert_after_once(text, "'./phase4-diagnostics.js',", " './phase4-wellness-fit-diagnostics.html',", "'./phase4-wellness-fit-diagnostics.html'")

    for item in SW_ENTRIES:
        require(occurrences(text, f"'./{item}'") == 1, f"sw.js CORE must include {item} exactly once.")
    return text

def patch_phase4_home(text: str) -> str:
    old = "const base=window.BLACKED_V3_PHASE12?.getDiagnostics?.()||{};"
    new = "const base=(window.BLACKED_V3_PHASE12_WHEELS || window.BLACKED_V3_PHASE12)?.getDiagnostics?.()||{};"
    if old in text:
        require(occurrences(text, old) == 1, "Unexpected duplicate Phase 4 diagnostics anchor; refusing to guess.")
        text = text.replace(old, new, 1)
    require(new in text or "window.BLACKED_V3_PHASE12_WHEELS" in text,
            "Could not verify the Phase 12 diagnostics API reference in phase4-home-and-fantasy.js.")
    return text

def patch_manifest(text: str) -> str:
    data = json.loads(text)
    data['name'] = 'BLACKED V5 — Complete Experience'
    data['short_name'] = 'BLACKED V5'
    data['description'] = 'BLACKED V5 mobile-first experience with discovery, adult fiction, couples tools, wellness education, fit guidance and privacy-conscious local interactions.'
    return json.dumps(data, ensure_ascii=False, indent=2) + '\n'

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path.cwd(), help='Existing checked-out repository root')
    parser.add_argument('--dry-run', action='store_true', help='Preflight only; write no files')
    args = parser.parse_args()
    root = args.root.resolve()
    require(root.is_dir(), f"Repository root does not exist: {root}")
    missing = [name for name in REQUIRED if not (root/name).is_file()]
    require(not missing, 'Required root files missing: ' + ', '.join(missing) + '. Copy this package to the existing repo root first.')

    old = {name: (root/name).read_text(encoding='utf-8') for name in MODIFIED}
    new = {
        'index.html': patch_index(old['index.html']),
        'app.js': patch_app(old['app.js']),
        'sw.js': patch_sw(old['sw.js']),
        'manifest.webmanifest': patch_manifest(old['manifest.webmanifest']),
        'phase4-home-and-fantasy.js': patch_phase4_home(old['phase4-home-and-fantasy.js']),
    }

    # All checks run before a backup/write, so a mismatch leaves source files unchanged.
    require("if (['wellness','boyfriend','stories'].includes(name) && !state.adultAllowed)" in new['app.js'],
            'Original adult self-attestation route guard is not present after patch.')
    require('localStorage.clear(' not in new['app.js'], 'Blanket localStorage.clear() detected; refusing to continue.')
    require(all(v in new['index.html'] for v in (
        'phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js',
        'phase4-story-universe.css','phase4-story-universe.js','phase5-final-release-loader.js')),
        'Phase 2/3/4 index wiring failed preflight.')
    require(all(f"'./{v}'" in new['sw.js'] for v in SW_ENTRIES), 'Service-worker cache wiring failed preflight.')
    manifest_data = json.loads(new['manifest.webmanifest'])
    require(manifest_data.get('icons') == json.loads(old['manifest.webmanifest']).get('icons'), 'Manifest icon list changed unexpectedly.')

    changes = {k: {'changed': old[k] != new[k], 'before_bytes': len(old[k].encode()), 'after_bytes': len(new[k].encode())} for k in new}
    if args.dry_run:
        print(json.dumps({'status':'DRY_RUN_OK','root':str(root),'modified_files':list(new),'changes':changes,
                          'cache_name':CACHE_NAME,'phase4_wellness_fit_loader_preserved':True,
                          'new_diagnostics_file_required':True,'writes_performed':False}, ensure_ascii=False, indent=2))
        return 0

    stamp = dt.datetime.now().strftime('%Y%m%d-%H%M%S')
    backup = root.parent / f'{root.name}-phase234-backup-{stamp}'
    backup.mkdir(parents=True, exist_ok=False)
    for name in old:
        shutil.copy2(root/name, backup/(name+'.before-phase234'))
    staged: dict[str, Path] = {}
    replaced: list[str] = []
    try:
        for name, content in new.items():
            fd, tmp = tempfile.mkstemp(prefix=f'.{name}.phase234-', dir=root)
            with os.fdopen(fd, 'w', encoding='utf-8', newline='') as out:
                out.write(content)
            staged[name] = Path(tmp)
        # Stage all temporary writes first; replace only after every write succeeded.
        for name, path in staged.items():
            path.replace(root/name)
            replaced.append(name)
    except Exception:
        for path in staged.values():
            try: path.unlink(missing_ok=True)
            except Exception: pass
        for name in replaced:
            saved = backup/(name+'.before-phase234')
            if saved.exists(): shutil.copy2(saved, root/name)
        raise

    report = {
        'status':'INTEGRATED_LOCAL_ONLY', 'root':str(root), 'backup_directory':str(backup),
        'changed_files':list(new), 'cache_name':CACHE_NAME,
        'phase2':'Premium UX CSS/JS wired into index and service worker.',
        'phase3':'V5 diagnostics/recovery CSS/JS wired; existing adult mood/wheel engine retained.',
        'phase4':'Existing story universe and Wellness/Fit final loader retained; diagnostics cache added; Phase 12 diagnostics API fallback corrected.',
        'no_user_data_migration':True, 'no_storage_cleared':True,
        'deploy_status':'NOT_DEPLOYED', 'manual_runtime_tests':'PENDING'
    }
    (root/'PHASE2_PHASE3_PHASE4_INSTALL_REPORT.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    print('\nNext: run python3 validate_phase2_phase3_phase4.py --root . --report PHASE2_PHASE3_PHASE4_QA.json; inspect git diff --check and git diff; commit/push only after review.')
    return 0

if __name__ == '__main__':
    try: raise SystemExit(main())
    except (InstallError, OSError, ValueError, json.JSONDecodeError) as exc:
        print('ERROR: ' + str(exc), file=sys.stderr)
        raise SystemExit(2)
