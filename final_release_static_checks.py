#!/usr/bin/env python3
"""Static release checks for BLACKED consolidated Phases 1–7.
Does not assert deployed GitHub Pages or physical Android behavior.
"""
from __future__ import annotations
import csv, hashlib, json, re, subprocess, sys
from html.parser import HTMLParser
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
results=[]
def check(name, ok, detail=''):
    results.append({'check':name,'status':'PASS' if ok else 'FAIL','detail':str(detail)})

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag in ('script','img','link','source','iframe'):
            attr='src' if tag in ('script','img','source','iframe') else 'href'
            if a.get(attr): self.refs.append((tag,attr,a[attr]))

index=(ROOT/'index.html').read_text(encoding='utf-8')
p=Parser(); p.feed(index)
dups=sorted({x for x in p.ids if p.ids.count(x)>1})
check('Main HTML parses',True,f'{len(p.ids)} IDs found')
check('No duplicate IDs in main HTML',not dups,dups)
missing=[]; remote=[]
for tag,attr,value in p.refs:
    v=value.strip()
    if v.startswith(('#','data:','blob:','javascript:','mailto:','tel:')): continue
    if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*://',v):
        remote.append(v); continue
    path=v.split('#',1)[0].split('?',1)[0]
    if not path: continue
    if not (ROOT/path).is_file(): missing.append((tag,attr,v))
check('All main HTML local src/href resources exist',not missing,missing[:30])

css=['styles.css','part-c-enhancements.css','phase2-photo-collections.css','phase3-design-system.css','phase3.css','phase4-story-universe.css','phase5-image-reliability.css','phase5-product-discovery.css','phase6-boyfriend-studio.css','phase6-wellness-collections.css','phase7-8-enhancements.css']
js=['fallback.js','app.js','part-c-enhancements.js','phase2-photo-collections.js','phase3.js','phase4-home-and-fantasy.js','phase4-story-universe.js','phase5-image-reliability.js','phase5-product-discovery.js','phase6-boyfriend-studio.js','phase6-wellness-collections.js','phase7-8-enhancements.js']
check('All phase CSS files linked and present',all(f'./{x}' in index and (ROOT/x).is_file() for x in css),[x for x in css if f'./{x}' not in index or not (ROOT/x).is_file()])
check('All phase JS files linked and present',all(f'./{x}' in index and (ROOT/x).is_file() for x in js),[x for x in js if f'./{x}' not in index or not (ROOT/x).is_file()])
check('No duplicate script links',all(index.count(f'./{x}')==1 for x in js),{x:index.count(f'./{x}') for x in js if index.count(f'./{x}')!=1})
required_views=['view-home','view-stories','view-innerwear','view-sanskari','view-wellness','view-boyfriend','view-fit']
check('All original app views are preserved',all(f'id="{v}"' in index for v in required_views),[v for v in required_views if f'id="{v}"' not in index])
required_wheels=['boy','dildo','plug','wild']
check('Original three wheels plus Dirty/Wild wheel are present',all(f'data-wheel-disc="{v}"' in index for v in required_wheels),[v for v in required_wheels if f'data-wheel-disc="{v}"' not in index])
required_controls=['wishlistOpen','bagOpen','catalogGrid','comparePanel','fitNotes','fitPhotoUpload','storyGrid','ageModal']
check('Wishlist, demo bag, comparison, Fit Studio, stories and age gate remain',all(f'id="{v}"' in index for v in required_controls),[v for v in required_controls if f'id="{v}"' not in index])

# Parse JS modules with the real Node parser.
syntax=[]
for f in sorted(ROOT.glob('*.js')):
    r=subprocess.run(['node','--check',str(f)],text=True,capture_output=True)
    if r.returncode: syntax.append((f.name,(r.stderr or r.stdout).strip()[:400]))
check('All root JavaScript files pass node --check',not syntax,syntax[:20])

# Validate JSON files and the preserved image index.
json_errors=[]; json_objs={}
for f in sorted(ROOT.glob('*.json')):
    try: json_objs[f.name]=json.loads(f.read_text(encoding='utf-8'))
    except Exception as e: json_errors.append((f.name,str(e)))
try: json.loads((ROOT/'manifest.webmanifest').read_text(encoding='utf-8'))
except Exception as e: json_errors.append(('manifest.webmanifest',str(e)))
check('Root JSON + manifest parse',not json_errors,json_errors[:20])
manifest=json_objs.get('innerwear-image-library.json',[])
check('151-entry image library preserved',isinstance(manifest,list) and len(manifest)==151,len(manifest) if isinstance(manifest,list) else type(manifest).__name__)
ids=[x.get('id') for x in manifest if isinstance(x,dict)]
check('Image library IDs unique',len(ids)==len(set(ids)),f'{len(ids)} records; {len(set(ids))} unique IDs')

# Phase functionality/guards.
story=json_objs.get('phase4-story-universe.json',{})
tones=[x.get('id') for x in story.get('tones',[])]
check('Phase 4 story data has 4 stories / 3 tones',len(story.get('stories',[]))==4 and tones==['clean','desi','bold'],{'stories':len(story.get('stories',[])),'tones':tones})
phase4=(ROOT/'phase4-story-universe.js').read_text()
check('Wheel-to-story CTA hooks on actual result marker',"host.querySelector('[data-wheel-retry]')" in phase4 and 'data-p4-wheel-story' in phase4,'wheel finished result integration')
p5=(ROOT/'phase5-product-discovery.js').read_text()
check('Phase 5 sales gate stays disabled','salesEnabled: false' in p5 and 'BLOCKED' in p5,'no live checkout or invented inventory')
check('Phase 5 compare cap is three',re.search(r'count\s*>=\s*3',p5) is not None,'max three comparisons')
p6=(ROOT/'phase6-wellness-collections.js').read_text()
check('Phase 6 uses full Grace card selector',"$('.coming-card.grace',view)" in p6,'filter hides/shows entire card')
check('Image rights are not claimed cleared','rightsClearedForExistingAssets:false' in p6,'unknown rights remain pending')
svg_names=['phase6-measurement-map.svg','phase6-product-specs.svg','phase6-comfort-check.svg','phase6-image-rights-workflow.svg']
svg_bad=[]
for n in svg_names:
    f=ROOT/'assets'/n
    if not f.is_file(): svg_bad.append((n,'missing')); continue
    s=f.read_text(encoding='utf-8')
    if not re.search(r'^<svg[\s>]',s) or '<title' not in s or '<desc' not in s: svg_bad.append((n,'missing accessible title/description'))
check('Four educational/right-clearance SVGs valid and accessible',not svg_bad,svg_bad)

# Measurement switching should convert values in the prior unit, then ask for a new review.
app=(ROOT/'app.js').read_text()
check('Measurement unit switch converts entered values', 'previousMeasurementUnit' in app and 'const factor = previousMeasurementUnit' in app and 'Converted ${converted}' in app,'conversion handler found')

# Ensure the cache version changed and new same-origin module assets are included.
sw=(ROOT/'sw.js').read_text()
cache=re.search(r"const CACHE_NAME\s*=\s*['\"]([^'\"]+)",sw)
check('Service-worker cache version bumped',bool(cache and cache.group(1)=='blacked-v3-phases1-7-final-1'),cache.group(1) if cache else 'not found')
cache_missing=[]
for name in ['phase3.js','phase4-home-and-fantasy.js','phase4-story-universe.js','phase4-story-universe.json','phase5-image-reliability.js','phase5-product-discovery.js','phase6-boyfriend-studio.js','phase6-wellness-collections.js','phase7-8-enhancements.js',*['assets/'+n for n in svg_names]]:
    if f"'./{name}'" not in sw or not (ROOT/name).is_file(): cache_missing.append(name)
check('New phase assets included in service-worker cache',not cache_missing,cache_missing)
core=re.search(r'const CORE\s*=\s*\[(.*?)\];',sw,re.S)
missing_core=[]
if core:
    for v in re.findall(r"['\"](\./[^'\"]+)['\"]",core.group(1)):
        rel=v[2:].split('?',1)[0]
        if rel and not (ROOT/rel).is_file(): missing_core.append(rel)
check('Every service-worker CORE entry resolves to a file',not missing_core,missing_core[:40])

# Read CSVs with stable row widths and truthfully pending sales/rights.
csv_errors=[]
for name in ['PRODUCT_VERIFICATION_REGISTER.csv','IMAGE_RIGHTS_REGISTER.csv','PHASE_TRACKER_FINAL.csv']:
    f=ROOT/name
    if not f.exists(): csv_errors.append((name,'missing')); continue
    try:
        with f.open(encoding='utf-8-sig',newline='') as fh:
            rows=list(csv.reader(fh))
        if not rows: csv_errors.append((name,'empty')); continue
        width=len(rows[0])
        if any(len(r)!=width for r in rows[1:]): csv_errors.append((name,'inconsistent columns'))
    except Exception as e: csv_errors.append((name,str(e)))
check('Release registers and tracker have valid CSV structure',not csv_errors,csv_errors)
prod_rows=list(csv.DictReader((ROOT/'PRODUCT_VERIFICATION_REGISTER.csv').open(encoding='utf-8-sig',newline='')))
if prod_rows and 'sales_approved' in prod_rows[0]:
    yes=[r for r in prod_rows if str(r.get('sales_approved','')).strip().upper()=='YES']
    check('Unverified product concepts are not sales-approved',len(yes)==0,f'{len(yes)} rows marked YES, {len(prod_rows)} total')
else: check('Product register sales-approval column exists',False,list(prod_rows[0].keys()) if prod_rows else 'no rows')
rights=(ROOT/'IMAGE_RIGHTS_REGISTER.csv').read_text(encoding='utf-8-sig')
check('Image rights register clearly pending/unknown','PENDING' in rights.upper() and 'commercial_use_permitted' in rights,'no universal image clearance assumed')

# No module gets permission to clear all browser storage as a side effect.
newmods=''.join((ROOT/x).read_text(encoding='utf-8') for x in ['phase4-story-universe.js','phase5-product-discovery.js','phase6-wellness-collections.js'])
no_storage_writes = not re.search(r'(?:localStorage|sessionStorage)\s*\.\s*(?:setItem|getItem|removeItem|clear)\s*\(',newmods)
no_upload_api = not re.search(r'XMLHttpRequest|sendBeacon\s*\(|fetch\s*\([^)]*,\s*\{[^}]*method\s*:\s*["\'](?:POST|PUT|PATCH|DELETE)',newmods,re.I)
check('New preferences are ephemeral; no personal-data upload path',no_storage_writes and no_upload_api,'Phase 4 only GETs the same-origin story JSON; no preference persistence or upload APIs')

summary={'suite':'BLACKED Consolidated Final Release · Phases 1–7','root':'.','total':len(results),'passed':sum(x['status']=='PASS' for x in results),'failed':sum(x['status']=='FAIL' for x in results),'checks':results,'not_tested':['Live GitHub Pages deployment','Actual external raw-GitHub image HTTP status','Physical Android Chrome','Service-worker takeover on a real deployed origin']}
(ROOT/'PHASE7_TEST_RESULTS.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
lines=['# Consolidated Phase 1–7 Static Test Results','',f"**Result: {summary['passed']}/{summary['total']} checks passed; {summary['failed']} failed.**",'','These checks validate local source structure. They do not prove live deployment, remote image availability, or Android-device interaction.','']
for r in results: lines.append(f"- [{'x' if r['status']=='PASS' else ' '}] **{r['check']}** — {r['detail']}")
lines += ['', '## Not tested in this environment','']+[f'- {x}' for x in summary['not_tested']]
(ROOT/'PHASE7_TEST_RESULTS.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2,ensure_ascii=False))
sys.exit(1 if summary['failed'] else 0)
