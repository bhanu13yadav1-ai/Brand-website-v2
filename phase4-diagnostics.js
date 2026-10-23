
(() => {
'use strict';
const $=s=>document.querySelector(s);
const state={running:false,results:[],started:null};
const names=['Homepage loads','Main app API starts','Seven original views present','Home navigation','Innerwear navigation','Sanskari navigation','Fit Studio navigation','Stories 18+ gate','Wellness 18+ gate','Boyfriend & Couples 18+ gate','Phase 3 mode loads','Phase 4 wizard loads','Four original wheels preserved','Local bundle requested','Core style files loaded','Service-worker controller','Active cache version','No failed local script/style','Critical image status'];
function row(name,status,detail=''){
 const host=$('#p4diagResults'),el=document.createElement('div');
 el.className='p4diag-row';el.innerHTML=`<b></b><span class="p4diag-status"></span><small></small>`;
 el.querySelector('b').textContent=name;el.querySelector('.p4diag-status').textContent=status;
 el.querySelector('small').textContent=detail;host.append(el);state.results.push({test:name,status,detail});
}
function clear(){state.results=[];$('#p4diagResults').replaceChildren();}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function run(){
 if(state.running)return;state.running=true;clear();$('#p4diagRun').disabled=true;$('#p4diagRun').textContent='Running…';
 const frame=$('#p4diagFrame');const nonce=Date.now();frame.src=`./index.html?phase4diag=${nonce}`;
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 try{
   await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('Website iframe load timed out after 20 seconds')),20000);frame.onload=()=>{clearTimeout(t);resolve();};frame.onerror=()=>{clearTimeout(t);reject(new Error('Could not load index.html'));};});
   let win=frame.contentWindow,doc=frame.contentDocument;
   for(let i=0;i<40&&!doc?.querySelector('#view-home');i++)await wait(250);
   if(!doc?.querySelector('#view-home'))throw new Error('Original homepage markup was not found.');
   const navigationTiming=win.performance?.getEntriesByType('navigation')?.[0];
   const firstPaint=win.performance?.getEntriesByName('first-contentful-paint')?.[0];
   const loadDetail=`Document: ${doc.readyState}; DOMContentLoaded: ${Math.round(navigationTiming?.domContentLoadedEventEnd||0)} ms; load event: ${Math.round(navigationTiming?.loadEventEnd||0)} ms; first contentful paint: ${firstPaint?Math.round(firstPaint.startTime)+' ms':'not exposed by this browser'}`;
   row(names[0],doc.readyState!=='loading'?'PASS':'WARN',loadDetail);
   row(names[1],win.BLACKED_V1?'PASS':'FAIL',win.BLACKED_V1?'Main app API exists':'BLACKED_V1 missing: inspect console / app.js load');
   row(names[2],doc.querySelectorAll('.view[data-view]').length===7?'PASS':'FAIL',`Detected ${doc.querySelectorAll('.view[data-view]').length} views.`);
   const clickView=async(name)=>{
     doc.querySelector(`#mainNav [data-view-link="${name}"]`)?.click();
     await wait(140);
   };
   for(const n of ['innerwear','sanskari','fit']){
     await clickView(n);
     const ok=!doc.querySelector(`#view-${n}`)?.hidden&&doc.querySelector(`#view-${n}`)?.classList.contains('active');
     row(({innerwear:'Innerwear navigation',sanskari:'Sanskari navigation',fit:'Fit Studio navigation'})[n],ok?'PASS':'FAIL',`View ${n}: ${ok?'active':'not active'}`);
   }
   for(const [i,n] of [[7,'stories'],[8,'wellness'],[9,'boyfriend']]){
     try{win.sessionStorage.removeItem('blackedV1AdultConfirmed');}catch(_){}
     await clickView(n);
     const modal=doc.querySelector('#ageModal'),ok=!!modal&&!modal.classList.contains('hidden');
     row(names[i],ok?'PASS':'FAIL',ok?'18+ confirmation blocks view':'18+ gate not displayed');
     doc.querySelector('#cancelAge')?.click();await wait(60);
   }
   await wait(350);
   row(names[10],!!win.BLACKED_V3_PHASE3?.getDiagnostics?.().inserted?'PASS':'FAIL',JSON.stringify(win.BLACKED_V3_PHASE3?.getDiagnostics?.()||{api:false}));
   row(names[11],!!win.BLACKED_PHASE4_FANTASY?.getDiagnostics?.().loaded?'PASS':'FAIL',JSON.stringify(win.BLACKED_PHASE4_FANTASY?.getDiagnostics?.()||{api:false}));
   row(names[12],doc.querySelectorAll('[data-wheel-disc]').length===4?'PASS':'FAIL',`Wheel discs: ${doc.querySelectorAll('[data-wheel-disc]').length}.`);
   row(names[13],!!doc.querySelector('script[data-phase34-bundle]')||!!doc.querySelector('script[src*="phase3-4-experience.js"]')?'PASS':'WARN','New bundle network tag (may have loaded and lost a dataset marker).');
   const styles=[...doc.querySelectorAll('link[rel="stylesheet"]')].filter(x=>x.sheet);
   row(names[14],styles.length>=4?'PASS':'WARN',`${styles.length} linked style sheets available.`);
   row(names[15],!!win.navigator.serviceWorker?.controller?'PASS':'WARN',win.navigator.serviceWorker?.controller?'Controlled by service worker':'No controller in this session yet; first visit may not be controlled.');
   let caches=[];
   for(let attempt=0;attempt<20;attempt++){caches=await win.caches?.keys?.().catch(()=>[])||[];if(caches.some(x=>x.includes('blacked-v4-phase4')))break;await wait(350);}
   const activeCache=caches.find(x=>x.includes('blacked-v4-phase4'));
   let cacheEntries=0; if(activeCache){try{cacheEntries=(await (await win.caches.open(activeCache)).keys()).length;}catch(_){}}
   row(names[16],activeCache?'PASS':'WARN',activeCache?`${activeCache}; ${cacheEntries} cached requests`:`No phase4 cache found after waiting. Existing caches: ${caches.join(', ')||'none'}`);
   const failedScripts=[...doc.querySelectorAll('script[src]')].filter(el=>el.dataset.loadError==='true');
   const missingStyle=[...doc.querySelectorAll('link[rel="stylesheet"][href]')].filter(el=>!el.sheet);
   row(names[17],(failedScripts.length||missingStyle.length)?'WARN':'PASS',`${failedScripts.length} observed dynamic script load errors; ${missingStyle.length} stylesheet links without an accessible CSSStyleSheet.`);
   const imgs=[...doc.querySelectorAll('#view-home img')];
   const bad=imgs.filter(im=>im.complete&&im.naturalWidth===0&&im.getAttribute('src')&&!im.getAttribute('src').startsWith('data:'));
   row(names[18],bad.length?'WARN':'PASS',`${imgs.length} homepage images checked; ${bad.length} known failed at test time. Some may still be loading or blocked by network.`);
   $('#p4diagSummary').textContent=`Completed ${state.results.filter(r=>r.status==='PASS').length} pass, ${state.results.filter(r=>r.status==='WARN').length} warnings, ${state.results.filter(r=>r.status==='FAIL').length} failures. This is an on-device browser test, not a synthetic speed score.`;
 }catch(err){
   row('Diagnostics runner', 'FAIL',`${err.name}: ${err.message}`);
   $('#p4diagSummary').textContent='The diagnostics runner could not inspect the live page. Use the failure row as the immediate blocker; do not assume the site is fixed.';
 }finally{
   state.running=false;$('#p4diagRun').disabled=false;$('#p4diagRun').textContent='Run all live checks again';
 }
}
$('#p4diagRun').addEventListener('click',run);
$('#p4diagCsv').addEventListener('click',()=>{
 const lines=[['test','status','detail'],...state.results.map(x=>[x.test,x.status,x.detail])];
 const csv=lines.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='BLACKED_PHASE4_LIVE_DIAGNOSTICS.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
})();
