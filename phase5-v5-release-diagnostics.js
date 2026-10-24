(() => {
 'use strict';
 const $=s=>document.querySelector(s), delay=ms=>new Promise(r=>setTimeout(r,ms)); let latest=null;
 function addResult(x){const row=document.createElement('div');row.className='result';const left=document.createElement('div'),title=document.createElement('strong'),detail=document.createElement('span'),badge=document.createElement('span');title.textContent=x.name;detail.className='detail';detail.textContent=x.detail||'';badge.className='status '+x.status;badge.textContent=x.status;left.append(title,detail);row.append(left,badge);$('#results').append(row)}
 async function waitFor(fn,ms=12000){const end=Date.now()+ms;while(Date.now()<end){try{const r=fn();if(r)return r}catch(_){}await delay(120)}return null}
 async function run(){const button=$('#run');button.disabled=true;button.textContent='Checking…';$('#results').replaceChildren();$('#status').textContent='Loading app and waiting for modules…';const checks=[];const check=(name,pass,detail='')=>checks.push({name,status:pass?'PASS':'FAIL',pass:!!pass,detail});const warn=(name,detail='')=>checks.push({name,status:'WARN',pass:null,detail});
  try{
   const frame=$('#appFrame');frame.src='./index.html?phase5livecheck='+Date.now();
   await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('App iframe did not load within 20 seconds')),20000);frame.onload=()=>{clearTimeout(t);resolve()};frame.onerror=()=>{clearTimeout(t);reject(new Error('The browser could not load index.html'))}});
   const win=frame.contentWindow,doc=frame.contentDocument;if(!doc)throw new Error('Same-origin frame is not readable; open this diagnostic on the GitHub Pages site.');
   await waitFor(()=>win.BLACKED_V1?.getDiagnostics?.(),10000);
   // Give the existing selective Phase 3 loader and Phase 5 final loader a bounded window to finish.
   await waitFor(()=>win.BLACKED_V4_PHASE3 && ['loaded','error'].includes(win.BLACKED_V4_PHASE3.status),15000);
   await waitFor(()=>{const d=win.BLACKED_V3_FINAL_RELEASE?.getDiagnostics?.();return d&&['loaded','degraded','error'].includes(d.status)},15000);
   const views=['home','stories','innerwear','sanskari','wellness','boyfriend','fit'];
   for(const v of views)check('Existing view: '+v,!!doc.querySelector('#view-'+v),'#view-'+v);
   for(const w of ['dildo','plug','boy','wild'])check('Original wheel node: '+w,!!doc.querySelector('[data-wheel-disc="'+w+'"]'),'Presence only; spin/reset needs a manual tap test.');
   for(const [name,pass,detail] of [
    ['Phase 1 foundation API',!!win.BLACKED_V4_PHASE1,'window.BLACKED_V4_PHASE1'],
    ['Phase 2 core API',!!win.BLACKED_V4_PHASE2,'window.BLACKED_V4_PHASE2'],
    ['Phase 2 premium UX active',!!win.BLACKED_V5_PHASE2_UX,'Filter resets and nav accessibility overlay'],
    ['Phase 3 runtime diagnostics active',!!win.BLACKED_V5_PHASE3,'Recovery and module status API'],
    ['Phase 3/4 combined engine',!!win.BLACKED_V4_PHASE3,'Selective loader for After Dark / Wheels Hub / Couples'],
    ['Phase 4 story universe',!!win.BLACKED_PHASE4,'Four branching stories and tone controls'],
    ['Phase 9 After Dark',!!win.BLACKED_V3_PHASE9,'Adult fictional prompt studio'],
    ['Phase 10 Wellness',!!win.BLACKED_V3_PHASE10,'Research-linked education module'],
    ['Phase 11 Fit Studio',!!win.BLACKED_V3_PHASE11,'Measurement and fit guide module'],
    ['Phase 12 Wheels Hub',!!win.BLACKED_V3_PHASE12_WHEELS,'Four original wheel directory'],
    ['Phase 13 Couples Studio',!!win.BLACKED_V3_PHASE13,'Existing gallery and date/message tools'],
    ['Phase 14 privacy / reliability',!!win.BLACKED_V3_PHASE14,'Local export, image status and access support'],
    ['Phase 15 release highlights',!!win.BLACKED_V3_PHASE15,'What’s New and release diagnostics'],
    ['Phase 5 final loader API',!!win.BLACKED_V3_FINAL_RELEASE,'Module loader diagnostics']
   ])check(name,pass,detail);
   for(const name of ['phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js'])check('Live page references '+name,!!doc.querySelector('[href="./'+name+'"], [src="./'+name+'"]'),'Exact root path is present.');
   check('Age confirmation modal retained',!!doc.querySelector('#ageModal')&&!!doc.querySelector('#ageConfirm'),'Checker does not auto-confirm it.');
   const ids=[...doc.querySelectorAll('[id]')].map(x=>x.id),dups=ids.filter((x,i)=>ids.indexOf(x)!==i);check('No duplicate runtime IDs',dups.length===0,dups.join(', ')||ids.length+' IDs seen');
   // Test Innerwear using the live app's existing button, without touching saved data.
   let heartbeat=false,heartbeatDelay=null;const t0=performance.now();setTimeout(()=>{heartbeat=true;heartbeatDelay=Math.round(performance.now()-t0)},75);
   doc.querySelector('#mainNav [data-view-link="innerwear"]')?.click();await delay(300);
   const inner=doc.querySelector('#view-innerwear');check('Innerwear view switches promptly',!!inner&&inner.classList.contains('active')&&!inner.hidden,'Observed after 300 ms; no storage was modified.');
   await waitFor(()=>doc.querySelectorAll('#catalogGrid .product-card').length>0,4500);
   const cards=doc.querySelectorAll('#catalogGrid .product-card').length;check('Innerwear catalogue renders',cards>0,`${cards} concept cards currently in DOM.`);
   const heartbeatPass=heartbeat&&heartbeatDelay!==null&&heartbeatDelay<650;check('75 ms timer heartbeat during Innerwear navigation',heartbeatPass,heartbeat?`Timer ran after ${heartbeatDelay} ms.`:'Timer did not run inside the measurement window.');
   const manifestSettled=await waitFor(()=>{const current=win.BLACKED_V1?.getDiagnostics?.();return current&&(current.imageLibraryReady||current.imageLibraryError)},11500);
   const api=win.BLACKED_V1?.getDiagnostics?.()||{};
   if(api.imageLibraryReady)check('Image manifest request settles',true,`${api.imageLibraryCount} records indexed; ${api.imageLibraryRendered} rendered in first batch.`);
   else if(api.imageLibraryError)warn('Image manifest request settles',`${api.imageLibraryTimedOut?'Timed out with retry shown':'Manifest error'}: ${api.imageLibraryError}`);
   else warn('Image manifest request settles','Still loading beyond the bounded wait. Check sw.js cache and Network tab; page navigation/catalog remain separately assessed.');
   const frameEl=$('#appFrame');
   for(const width of [320,360,390,430]){frameEl.style.width=width+'px';await delay(120);const actual=doc.documentElement.clientWidth||width,scroll=doc.documentElement.scrollWidth;check('Responsive overflow at '+width+'px',scroll<=actual+1,`document width ${scroll}px / viewport ${actual}px`)}
   frameEl.style.width='390px';
   const localFiles=['index.html','app.js','sw.js','manifest.webmanifest','innerwear-image-library.json','phase2-premium-ux.css','phase2-premium-ux.js','phase3-v5-interactive.css','phase3-v5-interactive.js','phase5-v5-release-diagnostics.html','phase5-v5-release-diagnostics.css','phase5-v5-release-diagnostics.js'];
   await Promise.all(localFiles.map(async path=>{try{const r=await fetch('./'+path,{method:'HEAD',cache:'no-store'});check('Root asset HTTP '+path,r.ok,`HTTP ${r.status}`)}catch(e){check('Root asset HTTP '+path,false,String(e))}}));
   try{const mr=await fetch('./manifest.webmanifest',{cache:'no-store'});const m=await mr.json();check('PWA manifest is V5',mr.ok&&m.short_name==='BLACKED V5',`${m.short_name||'(no short_name)'}`)}catch(e){check('PWA manifest is V5',false,String(e))}
   try{const keys=await win.caches.keys();const active=keys.find(k=>k.startsWith('blacked-v5-phase5-release-'));check('New service-worker cache exists',!!active,active||keys.join(', ')||'No Cache Storage entries visible');}catch(e){warn('Service-worker Cache Storage',String(e))}
   const loader=win.BLACKED_V3_FINAL_RELEASE?.getDiagnostics?.();if(loader){check('Final module loader reached a terminal state',['loaded','degraded','error'].includes(loader.status),`status=${loader.status}; errors=${(loader.errors||[]).join('; ')||'none'}`)}else warn('Final module loader terminal state','No diagnostic payload exposed yet.');
   const failures=checks.filter(x=>x.status==='FAIL').length,warnings=checks.filter(x=>x.status==='WARN').length;
   latest={product:'BLACKED V5',suite:'Phase 5 live release check',checkedAt:new Date().toISOString(),base:'GitHub Pages same-origin iframe',summary:{total:checks.length,passed:checks.filter(x=>x.status==='PASS').length,failed:failures,warnings},checks,privacy:{storageCleared:false,ageGateAutoConfirmed:false,remoteImagesBulkLoaded:false},limitations:['DOM/module/latency smoke checks only.','This page does not spin the wheels; manually test spin/reset/reroll at all four original locations.','A successful deployment still requires visual Android Chrome regression and a check for errors in the browser console.']};
   checks.forEach(addResult);$('#raw').textContent=JSON.stringify(latest,null,2);$('#status').textContent=`Completed: ${latest.summary.passed} PASS · ${failures} FAIL · ${warnings} WARN. Review every warning before release.`;$('#download').disabled=false;
  }catch(e){latest={product:'BLACKED V5',suite:'Phase 5 live release check',checkedAt:new Date().toISOString(),error:String(e),checks};addResult({name:'Diagnostic runner',status:'FAIL',detail:String(e)});$('#status').textContent='Diagnostic could not inspect the actual page. This is not a passing result.';$('#raw').textContent=JSON.stringify(latest,null,2);$('#download').disabled=false}
  finally{button.disabled=false;button.textContent='Run checks again'}
 }
 $('#run').addEventListener('click',run);
 $('#download').addEventListener('click',()=>{if(!latest)return;const blob=new Blob([JSON.stringify(latest,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='BLACKED_V5_PHASE5_LIVE_REPORT.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
})();
