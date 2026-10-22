#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, os, re, shutil, subprocess, sys, tempfile, zipfile
from pathlib import Path

HERE=Path(__file__).resolve().parents[1]
results=[]
def check(name, ok, detail=''):
    results.append({'check':name,'pass':bool(ok),'detail':detail})

# Syntax-check every JS module shipped in the final delta.
js_files=sorted(HERE.glob('*.js'))
for p in js_files:
    proc=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
    check('node --check '+p.name,proc.returncode==0,(proc.stderr or proc.stdout).strip()[:500])

# Ensure the final loader covers all phase modules and that the legacy phase-2 global is not overwritten.
loader=(HERE/'phase12-15-final-loader.js').read_text()
required=['phase2-photo-collections.js','phase4-home-and-fantasy.js','phase5-image-reliability.js','phase6-boyfriend-studio.js','phase7-8-enhancements.js','phase9-after-dark.js','phase10-wellness-education.js','phase11-fit-studio.js','phase12-wheels-hub.js','phase13-couples-studio.js','phase14-hardening.js','phase15-whats-new.js']
check('Ordered Phase 2–15 loader',all(x in loader for x in required),'Requires all 12 module scripts in the final ordered loader.')
check('Root-level bundled image repair',"/^\\.\\/assets\\/(?:[^/]+\\/)+([^?#]+)([?#].*)?$/" in loader and 'fixRootAssets()' in loader,'Normalizes old nested asset URLs only for root-level bundled references.')
check('Unique wheel diagnostics namespace','BLACKED_V3_PHASE12_WHEELS' in (HERE/'phase12-wheels-hub.js').read_text() and 'window.BLACKED_V3_PHASE12 =' not in (HERE/'phase12-wheels-hub.js').read_text(),'Does not clobber the pre-existing Phase 2 photo-collection diagnostics object.')
check('Home top highlight','home.insertBefore(section,hero)' in (HERE/'phase15-whats-new.js').read_text(),'New features are inserted before the existing Home hero.')
check('Privacy export is opt-in','v14ExportLocalData' in (HERE/'phase14-hardening.js').read_text() and 'localKeys' in (HERE/'phase14-hardening.js').read_text(),'Exports are only triggered by user click and use an allow-list of app-owned keys.')
check('No external data upload in new modules',not re.search(r'fetch\s*\(|XMLHttpRequest|sendBeacon\s*\(',''.join(p.read_text() for p in js_files)),'No network upload API is used by the Phase 12–15 modules.')
check('No destructive storage clearing in new modules',not re.search(r'localStorage\.clear\s*\(|sessionStorage\.clear\s*\(',''.join(p.read_text() for p in js_files)),'No global browser-storage clear operation appears in the new modules.')
check('Consent-first phrasing in Couples Studio','freely given agreement' in (HERE/'phase13-couples-studio.js').read_text(),'Gallery routes are fictional/reference-only and explicitly consent-first.')
check('Wellness source links present',all(x in (HERE/'phase10-wellness-education.js').read_text() for x in ['nhs.uk/symptoms/vaginal-discharge','health.clevelandclinic.org/watery-discharge','plannedparenthood.org/learn/relationships/sexual-consent']),'Wellness module retains trusted further-reading links.')
check('Mobile and reduced-motion CSS',all('@media' in (HERE/n).read_text() and 'prefers-reduced-motion' in (HERE/n).read_text() for n in ['phase12-wheels-hub.css','phase13-couples-studio.css','phase14-hardening.css','phase15-whats-new.css']),'Responsive breakpoints and reduced-motion rules are present in each new CSS file.')
check('Focus CSS diagnostics inspect loaded stylesheet', 'phase14-hardening.css' in (HERE/'phase14-hardening.js').read_text() and ':focus-visible' in (HERE/'phase14-hardening.css').read_text() and '#v14FocusStyles' not in (HERE/'phase14-hardening.js').read_text(), 'Reports focus styling only when the real release stylesheet/rules are present, not via a dummy selector.')

# Patch script syntax and idempotence against a throwaway repository fixture.
patch=HERE/'apply_final_release_patches.py'
proc=subprocess.run([sys.executable,'-m','py_compile',str(patch)],capture_output=True,text=True)
check('Patch script compiles',proc.returncode==0,(proc.stderr or '').strip()[:300])
with tempfile.TemporaryDirectory() as td:
    root=Path(td);(root/'index.html').write_text('''<!doctype html><html><head><title>Old</title><meta name="description" content="old"><script src="./fallback.js" defer></script><script src="./app.js" defer></script><script src="./part-c-enhancements.js" defer></script></head><body></body></html>''')
    (root/'sw.js').write_text("const CACHE_NAME = 'old-cache';\nconst CORE = ['./','./assets/gallery/photo.webp'];\n")
    (root/'photo.webp').write_bytes(b'test')
    args=[sys.executable,str(patch),str(root)]
    p1=subprocess.run(args,capture_output=True,text=True);p2=subprocess.run(args,capture_output=True,text=True)
    index=(root/'index.html').read_text();sw=(root/'sw.js').read_text()
    check('Patch script executes',p1.returncode==0 and p2.returncode==0,(p1.stderr+p2.stderr).strip()[:500])
    check('Patch script idempotent',index.count('phase12-15-final-loader.js')==1 and sw.count("'./phase12-wheels-hub.js'")==1,'Double run does not duplicate loader or new CORE entries.')
    check('Patch script normalizes nested cached image path',"'./photo.webp'" in sw and "'./assets/gallery/photo.webp'" not in sw,'Only normalized a referenced filename that exists in repo root.')
    check('Patch script bumps PWA cache',"blacked-v3-final-15-1" in sw,'Uses a new app-specific cache name; does not wipe localStorage.')

# Check diagnostic and docs exist; patch is reversible by normal Git history because only core-file edits are made.
check('Live diagnostics page present',(HERE/'phase12-15-diagnostics.html').exists(),'Same-origin iframe-based diagnostics are included.')
check('Install instructions present',(HERE/'README_START_HERE.md').exists() and (HERE/'PHASE12_15_UPLOAD_INSTRUCTIONS_HINGLISH.md').exists(),'Documents merge order and honest live-test status.')

out={'suite':'BLACKED V3 Final Phases 12–15 static / patch validation','total':len(results),'passed':sum(x['pass'] for x in results),'failed':sum(not x['pass'] for x in results),'checks':results}
(HERE/'tests'/'PHASE12_15_STATIC_CHECKS.json').write_text(json.dumps(out,indent=2)+'\n')
lines=[f"# Final Phase 12–15 static checks",'',f"**Result: {out['passed']}/{out['total']} passed; {out['failed']} failed.**",'','This is static/synthetic-fixture validation, not a deployed-site browser result.','']
for r in results: lines.append(f"- [{'x' if r['pass'] else ' '}] **{r['check']}**"+(f": {r['detail']}" if r['detail'] else ''))
(HERE/'PHASE12_15_STATIC_CHECKS.md').write_text('\n'.join(lines)+'\n')
print(json.dumps(out,indent=2))
if out['failed']:sys.exit(1)
