#!/usr/bin/env python3
"""Static integration checks for the BLACKED V5 Phase 2 additive UX layer."""
from pathlib import Path
import json, re, sys
root=Path.cwd()
checks=[]
def check(name, ok, detail=""):
    checks.append((name, bool(ok), detail))

for name in ("index.html","app.js","styles.css","sw.js","phase2-premium-ux.css","phase2-premium-ux.js"):
    check(f"required file: {name}", (root/name).is_file())
if (root/"index.html").exists():
    s=(root/"index.html").read_text(encoding="utf-8")
    css_count=s.count('href="./phase2-premium-ux.css"')
    js_count=s.count('src="./phase2-premium-ux.js"')
    check("Phase 2 CSS linked exactly once", css_count==1, f"count={css_count}")
    check("Phase 2 JS linked exactly once", js_count==1, f"count={js_count}")
    views=re.findall(r'<section class="view[^"]*" id="([^"]+)"[^>]*data-view="([^"]+)"',s,re.I)
    check("seven original views retained", len(views)==7, f"views={[v[1] for v in views]}")
    wheels=re.findall(r'data-wheel-disc="([^"]+)"',s)
    check("four original wheel discs retained", set(wheels)=={"dildo","plug","boy","wild"}, f"wheels={wheels}")
    ids=re.findall(r'\bid=["\']([^"\']+)',s)
    dup=sorted({i for i in ids if ids.count(i)>1})
    check("no duplicate static HTML IDs", not dup, f"duplicates={dup}")
if (root/"sw.js").exists():
    s=(root/"sw.js").read_text(encoding="utf-8")
    check("service worker references Phase 2 CSS", "'./phase2-premium-ux.css'" in s)
    check("service worker references Phase 2 JS", "'./phase2-premium-ux.js'" in s)
    m=re.search(r"const CACHE_NAME = '([^']+)'",s)
    check("service worker has Phase 2 cache revision", bool(m and "phase2-premium-ux" in m.group(1)), m.group(1) if m else "cache name missing")
print("BLACKED V5 Phase 2 static checks")
for name,ok,detail in checks:
    print(f"{'PASS' if ok else 'FAIL'} | {name}" + (f" | {detail}" if detail else ""))
print(f"RESULT: {sum(ok for _,ok,_ in checks)}/{len(checks)} checks passed")
if not all(ok for _,ok,_ in checks): sys.exit(1)
