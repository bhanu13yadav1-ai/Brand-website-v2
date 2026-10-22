#!/usr/bin/env python3
from pathlib import Path
import json, csv, hashlib, sys
root=Path(__file__).resolve().parents[1]; checks=[]
def check(label,ok,detail=''): checks.append((label,bool(ok),detail))
manifest=json.loads((root/'super-phase3-content.json').read_text(encoding='utf-8'))
check('manifest schemaVersion',manifest.get('schemaVersion')=='1.0.0',manifest.get('schemaVersion'))
check('4 media entries',len(manifest.get('media',[]))==4,str(len(manifest.get('media',[]))))
ids=[x['id'] for x in manifest['media']];check('unique media IDs',len(ids)==len(set(ids)),str(len(set(ids))))
for item in manifest['media']:
 p=root/item['relativePath'];check('asset exists: '+item['file'],p.is_file(),str(p))
 if p.is_file():check('asset SHA: '+item['file'],hashlib.sha256(p.read_bytes()).hexdigest()==item['webpSha256'],item['webpSha256'])
js=(root/'super-phase3-experience.js').read_text(encoding='utf-8');css=(root/'super-phase3-experience.css').read_text(encoding='utf-8')
for label,needle in [('entry picker selector','#view-boyfriend'),('skip action','superP3Skip'),('clear action','superP3ClearVibe'),('skip/reopen action mode','setPreferenceActionMode(\'skip\')'),('hide initial actions on build','setPreferenceActionMode(\'none\')'),('restore action row on reset','setPreferenceActionMode(\'all\')'),('image error status','Image failed to load'),('memory-only wording','nothing was saved or sent')]:check(label,needle in js,needle)
check('no browser persistence for pref values','localStorage.setItem' not in js and 'sessionStorage.setItem' not in js,'no storage writes in module')
check('reduced-motion styles','prefers-reduced-motion:reduce' in css)
check('mobile media query','@media(max-width:460px)' in css)
check('hidden actions override', '.sp3-preference-panel__actions[hidden]{display:none!important;}' in css)
rows=list(csv.DictReader((root/'PHASE3_NEW_ASSET_MANIFEST.csv').open(encoding='utf-8-sig')));check('CSV manifest matches JSON',len(rows)==len(manifest['media']),str(len(rows)))
for f in ['super-phase3-diagnostics.html','previews/PHASE3_RUNTIME_SMOKE_PREVIEW.html','patches/INDEX_INSERT_PHASE3.patch','patches/SERVICE_WORKER_INSERT_PHASE3.patch']:check('package file: '+f,(root/f).is_file())
for label,ok,detail in checks:print(('PASS' if ok else 'FAIL')+' | '+label+((' | '+detail) if detail else ''))
print(f'\nRESULT: {sum(ok for _,ok,_ in checks)}/{len(checks)} PASS; {sum(not ok for _,ok,_ in checks)} FAIL');sys.exit(1 if any(not ok for _,ok,_ in checks) else 0)
