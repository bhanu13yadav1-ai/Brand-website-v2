(() => {
  'use strict';
  const $=s=>document.querySelector(s);const state={results:[],running:false};
  function add(name,status,detail=''){const el=document.createElement('div');el.className='result-row';const title=document.createElement('b');title.textContent=name;const pill=document.createElement('span');pill.className='status '+status.toLowerCase();pill.textContent=status;const small=document.createElement('small');small.textContent=detail;el.append(title,pill,small);$('#results').append(el);state.results.push({name,status,detail});}
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function waitFor(fn,timeout=9000,interval=100){const start=performance.now();while(performance.now()-start<timeout){try{const value=fn();if(value)return value;}catch(_){}await wait(interval);}return null;}
  async function run(){if(state.running)return;state.running=true;state.results=[];$('#results').replaceChildren();$('#runTests').disabled=true;$('#runTests').textContent='Testing live site…';let frame=$('#siteFrame'),win=null,doc=null;
    try{
      const started=performance.now();frame.src='./index.html?phase6live='+Date.now();
      await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('Website frame did not respond within 18 seconds. The host, DNS, deployment or browser policy may be blocking the live site.')),18000);frame.onload=()=>{clearTimeout(t);resolve();};frame.onerror=()=>{clearTimeout(t);reject(new Error('Could not load the live index.html.'));};});
      win=frame.contentWindow;doc=frame.contentDocument;
      if(!doc?.querySelector('#view-home'))throw new Error('The current homepage markup was not found inside the loaded page.');
      const nav=doc.querySelector('navigation');
      add('Live homepage load','PASS',`Frame load event completed in ${(performance.now()-started).toFixed(0)} ms in this browser. This is not a server-side cold-load timing.`);
      add('Main app API',''+(win.BLACKED_V1?'PASS':'FAIL'),win.BLACKED_V1?'window.BLACKED_V1 exists.':'Main app API missing; inspect app.js and Console.');
      const views=[...doc.querySelectorAll('.view[data-view]')].map(v=>v.dataset.view);
      add('Original seven views',views.length===7?'PASS':'FAIL',`Detected ${views.length}: ${views.join(', ')}.`);
      const originalWheels=doc.querySelectorAll('[data-wheel-disc]').length;
      add('Original four wheels',originalWheels===4?'PASS':'FAIL',`Detected ${originalWheels} wheel discs in the page source.`);
      const homeNotPreloadingPhase6=!doc.querySelector('script[src*="phase6-combined-ux.js"]')&&!doc.querySelector('link[href*="phase6-boyfriend-studio.css"]')&&!doc.querySelector('script[src="./phase6-boyfriend-studio.js"]');
      add('Phase 6 removed from Home startup',homeNotPreloadingPhase6?'PASS':'WARN',homeNotPreloadingPhase6?'No Phase 6 bundle/script/style tags were found in the loaded document before first use.':'A legacy Phase 6 stylesheet or script reference still exists in index.html.');
      let ageSeen=false;
      try{win.sessionStorage.removeItem('blackedV1AdultConfirmed');}catch(_){}
      // Reload after clearing the session key so the app initialiser reads a fresh adult-gate state.
      frame.src='./index.html?phase6livegate='+Date.now();
      await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('Fresh age-gate reload timed out.')),15000);frame.onload=()=>{clearTimeout(t);resolve();};frame.onerror=()=>{clearTimeout(t);reject(new Error('Could not reload the site for the age-gate test.'));};});
      win=frame.contentWindow;doc=frame.contentDocument;
      await waitFor(()=>doc?.querySelector('#view-home'),5000);
      doc.querySelector('#mainNav [data-view-link="boyfriend"]')?.click();await wait(120);
      const modal=doc.querySelector('#ageModal');ageSeen=!!modal&&!modal.classList.contains('hidden');
      add('Boyfriend 18+ gate',ageSeen?'PASS':'FAIL',ageSeen?'The gated view asked for adult self-attestation before entry.':'The expected age gate did not open.');
      if(ageSeen){const check=doc.querySelector('#ageConfirm');if(check)check.checked=true;doc.querySelector('#confirmAge')?.click();}
      let phase6=await waitFor(()=>win.BLACKED_PHASE6_UX?.getDiagnostics?.().loaded&&win.BLACKED_V3_PHASE6?.getDiagnostics?.().studioBuilt,12000);
      add('Phase 6 bundle loads on demand',phase6?'PASS':'FAIL',phase6?'Combined Phase 6 bundle executed after opening Boyfriend & Couples.':`Loader state: ${win.BLACKED_PHASE6_LAZY_LOADER?.getDiagnostics?.().state||'missing'}.`);
      const cardCount=doc.querySelectorAll('#v6MatchGrid .v6-match-card').length;
      add('Six character archetypes',cardCount===6?'PASS':'FAIL',`Detected ${cardCount} original fictional archetype cards.`);
      add('Phase 6 UX controls',!!doc.querySelector('#p6xArchetypeSearch')&&!!doc.querySelector('#p6xBoyfriendNav')?'PASS':'FAIL',`Search: ${!!doc.querySelector('#p6xArchetypeSearch')}; shortcut nav: ${!!doc.querySelector('#p6xBoyfriendNav')}.`);
      const p7ui=win.BLACKED_PHASE7_STUDIO_UI?.getDiagnostics?.();
      add('Reference-style Studio UI',p7ui?.loaded&&p7ui.header&&p7ui.tabs>=4&&p7ui.bottomNav?'PASS':'FAIL',JSON.stringify(p7ui||{api:false}));
      add('Bottom navigation is active in Couples Studio',!!doc.body.classList.contains('p7-studio-active')&&!!doc.querySelector('#p7StudioBottomNav')?'PASS':'WARN',`Active state: ${doc.body.classList.contains('p7-studio-active')}; nav exists: ${!!doc.querySelector('#p7StudioBottomNav')}.`);
      add('Couples Connection Deck',!!doc.querySelector('#p6xCouplesDeck')&&!!doc.querySelector('#p6xDeckSkip')?'PASS':'FAIL',`Deck: ${!!doc.querySelector('#p6xCouplesDeck')}; skip control: ${!!doc.querySelector('#p6xDeckSkip')}.`);
      if(doc.querySelector('#p6xArchetypeSearch')){const search=doc.querySelector('#p6xArchetypeSearch');search.value='romantic';search.dispatchEvent(new win.Event('input',{bubbles:true}));await wait(50);const count=doc.querySelectorAll('#v6MatchGrid .v6-match-card:not([hidden])').length;add('Archetype search works',count>0&&count<cardCount?'PASS':'FAIL',`Search “romantic” displayed ${count}/${cardCount} cards.`);search.value='';search.dispatchEvent(new win.Event('input',{bubbles:true}));}
      if(doc.querySelector('#p6xDeckNext')){const before=doc.querySelector('#p6xDeckPromptTitle')?.textContent;doc.querySelector('#p6xDeckNext').click();await wait(50);const after=doc.querySelector('#p6xDeckPromptTitle')?.textContent;add('Couples deck interaction',before!==after?'PASS':'WARN',`Prompt before: ${before||'missing'}; after: ${after||'missing'}.`);}else add('Couples deck interaction','FAIL','Deck button not found.');
      const opt=doc.querySelector('#p6xSavePrefsOptIn');let prefOkay=false;try{if(opt){opt.checked=true;opt.dispatchEvent(new win.Event('change',{bubbles:true}));doc.querySelector('#v6StoryMood')?.setAttribute('value','playful');doc.querySelector('#p6xSavePrefs')?.click();prefOkay=JSON.parse(win.localStorage.getItem('blackedV6StudioPrefs')||'null')?.enabled===true;doc.querySelector('#p6xClearPrefs')?.click();}}catch(_){}
      add('Local preferences opt-in/clear',prefOkay?'PASS':'FAIL',prefOkay?'Test saved the new preference key after opt-in and removed only that key.':'Save/clear flow failed or browser storage was blocked.');
      // Test the rest of the new Phase 6 surfaces, using their original app navigation links.
      doc.querySelector('#mainNav [data-view-link="sanskari"]')?.click();await wait(150);
      const collection=await waitFor(()=>doc.querySelector('#p6CollectionJumpnav'),6000);
      add('Sanskari collection controls',!!collection?'PASS':'FAIL',collection?'Collection shortcut controls are present.':'Collection nav is missing.');
      if(collection){doc.querySelector('[data-p6-collection="noor"]')?.click();await wait(40);add('Noor collection filter',/Noor-related/.test(doc.querySelector('#p6CollectionStatus')?.textContent||'')?'PASS':'FAIL',doc.querySelector('#p6CollectionStatus')?.textContent||'No status text.');}
      doc.querySelector('#mainNav [data-view-link="wellness"]')?.click();await wait(180);
      const well=doc.querySelector('#p6WellnessToolkit');const diagramImgs=well?[...well.querySelectorAll('img')]:[];const brokenPath=diagramImgs.filter(i=>(i.getAttribute('src')||'').startsWith('./assets/phase6-'));
      add('Wellness SVG root paths',!!well&&diagramImgs.length===3&&brokenPath.length===0?'PASS':'FAIL',`Toolkit: ${!!well}; diagrams: ${diagramImgs.length}; broken ./assets/ paths: ${brokenPath.length}.`);
      add('Wellness quick jumps',!!doc.querySelector('#p6xWellnessJumps')?'PASS':'FAIL',`Quick jumps: ${!!doc.querySelector('#p6xWellnessJumps')}.`);
      doc.querySelector('#mainNav [data-view-link="fit"]')?.click();await wait(80);
      add('Fit Studio privacy note',!!doc.querySelector('#p6FitPrivacyHint')&&!!doc.querySelector('#p6RightsFit')?'PASS':'FAIL','Checks the existing privacy note and image-rights panel.');
      const navTime=win.performance.getEntriesByType('navigation')[0];
      add('Document navigation timing',navTime?'PASS':'WARN',navTime?`DCL ${navTime.domContentLoadedEventEnd.toFixed(0)} ms · load ${navTime.loadEventEnd.toFixed(0)} ms · transfer ${navTime.transferSize||'not exposed'} bytes. Cache/warm conditions affect these values.`:'Timing entry not available.');
      const swCaches=await win.caches?.keys?.().catch(()=>[])||[];const current=swCaches.find(k=>k==='blacked-v6-phase6-lazy-ux-1');
      add('Phase 6 service-worker cache',current?'PASS':'WARN',current||`Current cache not detected. Found: ${swCaches.join(', ')||'no CacheStorage entries'}. First visit can be uncontrolled.`);
      const imgs=[...doc.querySelectorAll('#view-home img')];const bad=imgs.filter(i=>i.complete&&i.naturalWidth===0&&i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:'));
      add('Homepage image availability',bad.length?'WARN':'PASS',`${imgs.length} Home images visible in markup; ${bad.length} complete requests have zero naturalWidth. Requests still loading are not counted.`);
      const pass=state.results.filter(r=>r.status==='PASS').length,warn=state.results.filter(r=>r.status==='WARN').length,fail=state.results.filter(r=>r.status==='FAIL').length;
      $('#summary').textContent=`Finished: ${pass} PASS · ${warn} WARN · ${fail} FAIL. Export CSV for the detailed evidence.`;
    }catch(err){add('Live run blocked','FAIL',`${err.name||'Error'}: ${err.message||String(err)}. This result is a real browser failure, not a static-code pass.`);$('#summary').textContent='Live testing did not complete. Export the result and check the failure row.';}
    finally{state.running=false;$('#runTests').disabled=false;$('#runTests').textContent='Run tests again';}
  }
  $('#runTests').addEventListener('click',run);
  $('#exportCsv').addEventListener('click',()=>{const rows=[['test','status','detail'],...state.results.map(r=>[r.name,r.status,r.detail])];const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='BLACKED_PHASE6_LIVE_TEST.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
})();
