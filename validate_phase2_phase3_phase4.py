#!/usr/bin/env python3
"""Static release-gate validation for BLACKED V5 Phase 2 + 3 + 4 integration.

This checks local source structure, module wiring, asset paths and JS syntax. It does not
claim live GitHub Pages, real Android behavior, screen reader behavior or wheel-spin tests.
"""
from __future__ import annotations
import argparse, datetime as dt, json, re, shutil, subprocess, sys
from html.parser import HTMLParser
from pathlib import Path

VIEWS = ('home','stories','innerwear','sanskari','wellness','boyfriend','fit')
WHEELS = ('dildo','plug','boy','wild')
REQUIRED = (
 'index.html','app.js','sw.js','manifest.webmanifest',
 'phase2-premium-ux.css','phase2-premium-ux.js',
 'phase3-v5-interactive.css','phase3-v5-interactive.js','phase3-v5-diagnostics.html',
 'phase1-foundation.js','phase2-core-experience.js','phase3-v4-experience.js','phase3-4-experience.js',
 'phase5-final-release-loader.js','phase4-home-and-fantasy.js','phase4-story-universe.css','phase4-story-universe.js',
 'phase4-story-universe.json','phase4-diagnostics.html','phase4-diagnostics.js','phase4-wellness-fit-diagnostics.html',
 'phase9-after-dark.css','phase9-after-dark.js','phase12-wheels-hub.css','phase12-wheels-hub.js',
 'phase13-couples-studio.css','phase13-couples-studio.js','part-c-enhancements.js',
 'phase10-wellness-education.css','phase10-wellness-education.js','phase11-fit-studio.css','phase11-fit-studio.js',
 'phase14-hardening.css','phase14-hardening.js','phase15-whats-new.css','phase15-whats-new.js',
)
SW_ENTRIES = (
 'phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js','phase3-v5-diagnostics.html',
 'phase4-diagnostics.html','phase4-diagnostics.js','phase4-wellness-fit-diagnostics.html',
 'phase4-home-and-fantasy.js','phase4-story-universe.css','phase4-story-universe.js','phase4-story-universe.json',
 'phase5-final-release-loader.js','phase10-wellness-education.css','phase10-wellness-education.js',
 'phase11-fit-studio.css','phase11-fit-studio.js','phase14-hardening.css','phase14-hardening.js','phase15-whats-new.css','phase15-whats-new.js',
)
ASSETS = ('own-your-balance.webp','same-room-different-feelings.webp','same-girl-different-stories.webp','garden-lace-trio.webp','poolside-trio-editorial.webp','phase16-host-avatar.svg')

class HTMLScan(HTMLParser):
 def __init__(self):
  super().__init__(); self.ids=[]; self.refs=[]
 def handle_starttag(self, tag, attrs):
  a=dict(attrs)
  if a.get('id'): self.ids.append(a['id'])
  for key in ('src','href'):
   if a.get(key): self.refs.append((tag,key,a[key]))

def main() -> int:
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('--root',type=Path,default=Path.cwd())
 p.add_argument('--report',type=Path)
 args=p.parse_args(); root=args.root.resolve()
 checks=[]
 def add(name, ok, detail=''):
  checks.append({'name':name,'status':'PASS' if ok else 'FAIL','detail':str(detail)})
 def read(name):
  try: return (root/name).read_text(encoding='utf-8')
  except Exception: return ''
 for name in REQUIRED: add('Required file: '+name,(root/name).is_file())
 idx,app,sw,manifest=read('index.html'),read('app.js'),read('sw.js'),read('manifest.webmanifest')
 for view in VIEWS: add('Existing view preserved: '+view,f'id="view-{view}"' in idx)
 for name in ('phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js',
              'phase4-home-and-fantasy.js','phase4-story-universe.css','phase4-story-universe.js','phase5-final-release-loader.js'):
  attr='href' if name.endswith('.css') else 'src'
  add('index reference exactly once: '+name,idx.count(f'{attr}="./{name}"')==1,'refs='+str(idx.count(f'{attr}="./{name}"')))
 for name in SW_ENTRIES:
  key=f"'./{name}'"; found=sw.count(key)
  add('Service worker CORE ref exactly once: '+name,found==1,'refs='+str(found))
 add('Service worker cache revision bumped',"const CACHE_NAME = 'blacked-v5-phase234-integrated-20261024-2';" in sw)
 add('Innerwear render deferral is installed','function scheduleInnerwearRender(token)' in app and 'innerwearEntryToken' in app)
 add('Existing age self-attestation gate retained',"if (['wellness','boyfriend','stories'].includes(name) && !state.adultAllowed)" in app)
 add('No blanket localStorage.clear() introduced',re.search(r'\blocalStorage\s*\.\s*clear\s*\(',app) is None)
 p2=read('phase2-premium-ux.js')
 add('Phase 2 UX add-on is storage-neutral',re.search(r'\b(?:localStorage|sessionStorage)\b',p2) is None)
 p3=read('phase3-v5-interactive.js')
 add('Phase 3 diagnostics/recovery API present',all(token in p3 for token in ('BLACKED_V5_PHASE3','getDiagnostics','location.reload')))
 p4=read('phase4-story-universe.js')
 add('Phase 4 wheel-story CTA checks real result marker',"if (!host.querySelector('[data-wheel-retry]')) return;" in p4)
 p4home=read('phase4-home-and-fantasy.js')
 add('Phase 4 Home diagnostics recognizes Wheels Hub global','window.BLACKED_V3_PHASE12_WHEELS' in p4home)
 loader=read('phase5-final-release-loader.js')
 for phase, files in [('Phase 10 Wellness',['phase10-wellness-education.css','phase10-wellness-education.js']),
                      ('Phase 11 Fit',['phase11-fit-studio.css','phase11-fit-studio.js']),
                      ('Phase 14 trust/privacy',['phase14-hardening.css','phase14-hardening.js']),
                      ('Phase 15 release highlights',['phase15-whats-new.css','phase15-whats-new.js'])]:
  add(phase+' loaded by Phase 5 final loader',all(f"'./{f}'" in loader for f in files) or all(f"'./{f}'".replace('./','') in loader for f in files),', '.join(files))
 add('Phase 4 Wellness/Fit diagnostic checks the actual modules',all(k in read('phase4-wellness-fit-diagnostics.html') for k in ('BLACKED_V3_PHASE10','BLACKED_V3_PHASE11','BLACKED_V3_PHASE14','BLACKED_V3_PHASE15','#v10FluidEducation','#v11FitGuide')))
 # Validate branching story graph, all tone content and destinations.
 try:
  data=json.loads(read('phase4-story-universe.json')); stories=data.get('stories',[]); story_ids={s.get('id') for s in stories}
  add('Phase 4 story data has four unique stories',len(stories)==4 and len(story_ids)==4)
  tone_ids={t.get('id') for t in data.get('tones',[])}
  add('Phase 4 Clean / Desi / Bold tones exist',tone_ids=={'clean','desi','bold'},str(sorted(tone_ids)))
  scene_count=0; route_errors=[]
  for story in stories:
   scenes=story.get('scenes',{}); scene_count += len(scenes)
   if story.get('openingScene') not in scenes: route_errors.append(f"{story.get('id')}: invalid opening scene")
   for scene_id,scene in scenes.items():
    for tone in ('clean','desi','bold'):
     if not scene.get('prose',{}).get(tone): route_errors.append(f'{story.get("id")}/{scene_id}: missing {tone} prose')
    for choice in scene.get('choices',[]):
     if choice.get('nextScene') and choice['nextScene'] not in scenes: route_errors.append(f'{story.get("id")}/{scene_id}: missing scene target')
     if choice.get('nextStory') and choice['nextStory'] not in story_ids: route_errors.append(f'{story.get("id")}/{scene_id}: missing story target')
     if not choice.get('nextScene') and not choice.get('nextStory'): route_errors.append(f'{story.get("id")}/{scene_id}: choice has no target')
  add('Phase 4 story choice graph resolves',scene_count>=12 and not route_errors,'scenes='+str(scene_count)+'; '+('; '.join(route_errors[:6]) if route_errors else 'all routes resolve'))
 except Exception as e:
  add('Phase 4 story JSON/graph valid',False,repr(e))
 phase12=read('phase12-wheels-hub.js'); partc=read('part-c-enhancements.js')
 for wheel in WHEELS: add('Original wheel reference preserved: '+wheel, f"id: '{wheel}'" in phase12 or f"'{wheel}'" in phase12,'source presence only; spin/reset needs manual test')
 add('Wheel alignment diagnostic source remains','alignmentErrorDegrees' in partc or 'expected 8 labels' in partc)
 for asset in ASSETS: add('Existing image asset: '+asset,(root/asset).is_file())
 try:
  m=json.loads(manifest); add('Manifest JSON parses',True); add('Manifest labels updated to V5',m.get('short_name')=='BLACKED V5' and m.get('name','').startswith('BLACKED V5')); add('Existing icon preserved',any(i.get('src')=='./app-icon.svg' for i in m.get('icons',[])))
 except Exception as e: add('Manifest JSON parses',False,repr(e))
 # HTML structure / duplicate IDs on the main page and the new diagnostics pages.
 html_names=('index.html','phase3-v5-diagnostics.html','phase4-diagnostics.html','phase4-wellness-fit-diagnostics.html')
 for name in html_names:
  parser=HTMLScan()
  try:
   parser.feed(read(name)); duplicates=sorted({x for x in parser.ids if parser.ids.count(x)>1})
   add('HTML parses: '+name,(root/name).is_file())
   add('No duplicate IDs: '+name,not duplicates,', '.join(duplicates) if duplicates else str(len(parser.ids))+' IDs')
  except Exception as e: add('HTML parse: '+name,False,repr(e))
 css=''.join(read(f) for f in ('phase2-premium-ux.css','phase3-v5-interactive.css','phase4-story-universe.css'))
 add('Main CSS braces balanced',css.count('{')==css.count('}'),f'open={css.count("{")}, close={css.count("}")}')
 node=shutil.which('node')
 js_files=('app.js','sw.js','phase2-premium-ux.js','phase3-v5-interactive.js','phase4-home-and-fantasy.js','phase4-story-universe.js',
           'phase9-after-dark.js','phase12-wheels-hub.js','phase13-couples-studio.js','phase5-final-release-loader.js',
           'phase10-wellness-education.js','phase11-fit-studio.js','phase14-hardening.js','phase15-whats-new.js','phase4-diagnostics.js')
 if node:
  for name in js_files:
   if (root/name).is_file():
    cp=subprocess.run([node,'--check',str(root/name)],capture_output=True,text=True)
    add('Node syntax: '+name,cp.returncode==0,(cp.stderr.strip() or cp.stdout.strip())[:500])
  # Extract and syntax-check inline scripts in our new diagnostic HTML.
  inline= re.findall(r'<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script\s*>',read('phase4-wellness-fit-diagnostics.html'),re.I)
  if inline:
   tmp=root/'.phase4-wellness-fit-diagnostics-inline-check.js'
   try:
    tmp.write_text('\n\n'.join(inline),encoding='utf-8')
    cp=subprocess.run([node,'--check',str(tmp)],capture_output=True,text=True)
    add('Wellness/Fit diagnostic inline JS syntax',cp.returncode==0,(cp.stderr.strip() or cp.stdout.strip())[:500])
   finally: tmp.unlink(missing_ok=True)
 else: add('Node syntax checks',True,'Skipped: Node.js is not installed.')
 failures=[x for x in checks if x['status']=='FAIL']
 report={'project':'BLACKED V5 Phase 2 + Phase 3 + Phase 4','checked_at':dt.datetime.now(dt.timezone.utc).isoformat(),
         'status':'STATIC_PASS' if not failures else 'NEEDS_REVIEW','summary':{'total':len(checks),'passed':len(checks)-len(failures),'failed':len(failures)},
         'checks':checks,'runtime_boundary':['Static source validation does not prove GitHub Pages has deployed this state.','Wheel spins/resets, story choice interactions, image visual correctness, real Android touch/keyboard/screen-reader use and measurement conversions still need live manual verification.','Diagnostic pages do not clear storage, auto-confirm the 18+ gate or submit reports.']}
 output=json.dumps(report,ensure_ascii=False,indent=2)+'\n'; print(output)
 if args.report: args.report.write_text(output,encoding='utf-8')
 return 0 if not failures else 1
if __name__=='__main__': raise SystemExit(main())
