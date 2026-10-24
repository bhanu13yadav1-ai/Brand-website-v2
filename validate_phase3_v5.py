#!/usr/bin/env python3
"""Static release-gate validator for a BLACKED V5 Phase 3 checkout."""
from __future__ import annotations
import argparse, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

VIEWS = ['home','stories','innerwear','sanskari','wellness','boyfriend','fit']
WHEELS = ['dildo','plug','boy','wild']
ASSETS = ['own-your-balance.webp','same-room-different-feelings.webp','same-girl-different-stories.webp','garden-lace-trio.webp','poolside-trio-editorial.webp','phase16-host-avatar.svg']
class Parser(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.refs=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        for k in ('src','href'):
            if a.get(k): self.refs.append((tag,k,a[k]))

def main():
    p=argparse.ArgumentParser();p.add_argument('--root',type=Path,default=Path.cwd());p.add_argument('--report',type=Path);args=p.parse_args();root=args.root.resolve()
    checks=[]
    def add(name,ok,detail=''): checks.append({'name':name,'status':'PASS' if ok else 'FAIL','detail':detail})
    required=['index.html','app.js','sw.js','manifest.webmanifest','phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js','phase3-v5-diagnostics.html']
    for file in required:add('File exists: '+file,(root/file).is_file())
    def read(name):
        try:return (root/name).read_text(encoding='utf-8')
        except Exception:return ''
    index=read('index.html');app=read('app.js');sw=read('sw.js');manifest=read('manifest.webmanifest');phase3=read('phase3-v5-interactive.js');phase2=read('phase2-premium-ux.js')
    for view in VIEWS:add('Existing view preserved: '+view, f'id="view-{view}"' in index)
    for wheel in WHEELS:add('Original wheel selector preserved: '+wheel, f'data-wheel-disc="{wheel}"' in index or f'data-wheel-disc=\"{wheel}\"' in index or f'"{wheel}"' in read('phase12-wheels-hub.js'))
    for ref in ['phase2-premium-ux.css','phase3-v5-interactive.css','phase2-premium-ux.js','phase3-v5-interactive.js']:
        add('index integration: '+ref, ref in index)
        add('service worker core: '+ref, ref in sw)
    add('Service worker version refreshed', bool(re.search(r"const CACHE_NAME = ['\"]blacked-v5-phase3-interactive-[^'\"]+['\"]",sw)))
    add('Responsive Innerwear deferral patch present','function scheduleInnerwearRender(token)' in app and 'innerwearEntryToken' in app)
    add('Old seven-view route list preserved', all(f"'{v}'" in app for v in VIEWS))
    add('Original age gate path preserved', 'ageModal' in app and 'state.adultAllowed' in app)
    add('No blanket localStorage clear in app', not re.search(r'localStorage\s*\.\s*clear\s*\(',app))
    add('No blanket localStorage clear in Phase 3', not re.search(r'localStorage\s*\.\s*clear\s*\(',phase3))
    add('Phase 2 UX does not access browser storage', not re.search(r'localStorage|sessionStorage',phase2))
    add('Phase 3 diagnostics/recovery API present', all(k in phase3 for k in ['BLACKED_V5_PHASE3','getDiagnostics','location.reload','data-wheel-disc']))
    add('Existing root image assets exist', all((root/a).is_file() for a in ASSETS), ', '.join(a for a in ASSETS if (root/a).is_file()))
    add('Couples Studio uses pre-existing local image assets', all(name in read('phase13-couples-studio.js') for name in ['own-your-balance.webp','same-room-different-feelings.webp','same-girl-different-stories.webp']))
    try:
        pjson=json.loads(manifest); add('manifest JSON valid',True); add('manifest V5 labels',pjson.get('short_name')=='BLACKED V5' and pjson.get('name','').startswith('BLACKED V5'))
    except Exception as e:add('manifest JSON valid',False,str(e))
    for fname in ['index.html','phase3-v5-diagnostics.html']:
        parser=Parser()
        try:parser.feed(read(fname)); duplicates=sorted({x for x in parser.ids if parser.ids.count(x)>1}); add('HTML parse: '+fname,True); add('No duplicate static IDs: '+fname,not duplicates,', '.join(duplicates))
        except Exception as e:add('HTML parse: '+fname,False,str(e))
    try:
        from pathlib import PurePosixPath
        add('Phase 3 CSS balanced braces',read('phase3-v5-interactive.css').count('{')==read('phase3-v5-interactive.css').count('}'))
    except Exception as e:add('Phase 3 CSS balanced braces',False,str(e))
    passed=sum(x['status']=='PASS' for x in checks);failed=len(checks)-passed
    report={'project':'BLACKED V5 Phase 3','checked_at_utc':None,'status':'STATIC_PASS' if not failed else 'STATIC_REVIEW_NEEDED','summary':{'total':len(checks),'passed':passed,'failed':failed},'checks':checks,'runtime_boundary':'Does not replace GitHub Pages, Android Chrome, screen reader, image-network or actual wheel interaction tests.'}
    import datetime;report['checked_at_utc']=datetime.datetime.now(datetime.timezone.utc).isoformat()
    output=json.dumps(report,ensure_ascii=False,indent=2)
    print(output)
    if args.report: args.report.write_text(output+'\n',encoding='utf-8')
    return 0 if failed==0 else 1
if __name__=='__main__': raise SystemExit(main())
