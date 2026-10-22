#!/usr/bin/env python3
"""Validate the additive Phase 2 graph and local assets without touching the site."""
from __future__ import annotations
import argparse, hashlib, json, sys
from pathlib import Path

EXPECTED_ROUTES = {'route.home':'#view-home','route.stories':'#view-stories','route.innerwear':'#view-innerwear','route.sanskari':'#view-sanskari','route.wellness':'#view-wellness','route.boyfriend':'#view-boyfriend','route.fit':'#view-fit'}
EXPECTED_WHEELS = {'boy','dildo','plug','wild'}

def sha(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''): h.update(chunk)
    return h.hexdigest()

def main() -> int:
    ap=argparse.ArgumentParser()
    ap.add_argument('--root',default='.',help='Folder containing phase2-content-graph.json')
    args=ap.parse_args(); root=Path(args.root).resolve(); errors=[]; checks=[]
    def check(ok: bool, label: str):
        checks.append((label,ok))
        if not ok: errors.append(label)
    graph_path=root/'phase2-content-graph.json'
    try: graph=json.loads(graph_path.read_text(encoding='utf-8'))
    except Exception as e:
        print('FAIL: cannot parse phase2-content-graph.json:',e); return 2
    check(graph.get('phase')==2,'manifest phase equals 2')
    check(graph.get('schemaVersion')=='1.0.0','manifest version is 1.0.0')
    routes=graph.get('routes',[]); rids=[r.get('id') for r in routes]
    check(len(rids)==len(set(rids)),'route IDs unique')
    check(set(EXPECTED_ROUTES).issubset(set(rids)),'all seven inspected existing routes are represented')
    rmap={r.get('id'):r for r in routes}
    for rid,selector in EXPECTED_ROUTES.items():
        check(rmap.get(rid,{}).get('selector')==selector,f'{rid} selector matches inspected HTML')
    media=graph.get('media',[]); mids=[m.get('id') for m in media]
    check(len(mids)==len(set(mids)),'new media IDs unique')
    check(len(media)==8,'exactly eight new unique photos in Phase 2 package')
    files=[]
    for item in media:
        rel=item.get('path',''); path=(root/rel).resolve()
        check(path.is_relative_to(root),'asset path stays inside package: '+rel)
        check(path.is_file(),'asset file exists: '+rel)
        if path.is_file():
            check(sha(path)==item.get('webpSha256'),'asset hash matches manifest: '+rel)
            try:
                from PIL import Image
                with Image.open(path) as im:
                    im.verify()
                checks.append(('image decodes: '+rel,True))
            except ImportError: pass
            except Exception as e: check(False,'image decodes: '+rel+' ('+str(e)+')')
        check(item.get('route') in {'innerwear','boyfriend'},'new media has approved existing placement: '+item.get('id','?'))
        check(item.get('rightsStatus','').startswith('user-supplied'),'rights status is explicitly unverified: '+item.get('id','?'))
        check(item.get('publicationStatus','').startswith('review-only'),'concept publication guard present: '+item.get('id','?'))
    all_ids=set(rids)|set(mids)|{c.get('id') for c in graph.get('components',[])}|{w.get('id') for w in graph.get('wheels',[])}
    # Route links use stable IDs. If a future item references an absent node, flag it.
    for edge in graph.get('links',[]):
        check(edge.get('from') in all_ids,'edge source resolves: '+str(edge.get('from')))
        check(edge.get('to') in all_ids,'edge target resolves: '+str(edge.get('to')))
    wheel_keys={w.get('existingKey') for w in graph.get('wheels',[])}
    check(wheel_keys==EXPECTED_WHEELS,'the four existing wheel keys are preserved')
    principles=graph.get('principles',{})
    check(principles.get('preserveExistingIdsAndStorageKeys') is True,'preserve existing IDs and storage keys')
    check(principles.get('existingSiteFilesBundled') is False,'no whole existing site files are bundled')
    check(principles.get('conceptImagesAreProducts') is False,'concept images are not considered products')
    # Check patch and required runtime files are available.
    for rel in ['phase2-experience-architecture.js','phase2-experience-architecture.css','architecture/phase2-content-graph.schema.json','architecture/mobile-design-tokens.json','patches/INDEX_INSERT_PHASE2.patch','patches/SERVICE_WORKER_PHASE2.patch']:
        check((root/rel).is_file(),'required Phase 2 deliverable exists: '+rel)
    # Node/static checks: the JS is intentionally checked separately by packaging, but this flags basic manifest wiring.
    js=(root/'phase2-experience-architecture.js').read_text(encoding='utf-8')
    check("'./phase2-content-graph.json'" in js,'runtime loads the single-source content graph')
    check('loading = \'lazy\'' in js,'new images are lazy-loaded')
    check("event.key === 'Escape'" in js,'image preview supports Escape')
    print(f'Phase 2 static checks: {sum(ok for _,ok in checks)}/{len(checks)} PASS; {len(errors)} FAIL')
    for label,ok in checks: print(('PASS' if ok else 'FAIL')+' | '+label)
    return 1 if errors else 0
if __name__=='__main__': sys.exit(main())
