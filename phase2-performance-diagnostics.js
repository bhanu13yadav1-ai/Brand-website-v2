(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const state = { resourceRows: [], localRows: [], imageRows: [], running: false };
  const swFiles = [
    './index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',
    './phase2-photo-collections.css','./phase2-photo-collections.js','./phase3-design-system.css','./phase3.css','./phase3.js',
    './phase4-home-and-fantasy.js','./phase4-story-universe.css','./phase4-story-universe.js','./phase4-story-universe.json',
    './phase5-image-reliability.css','./phase5-image-reliability.js','./phase5-product-discovery.css','./phase5-product-discovery.js',
    './phase6-boyfriend-studio.css','./phase6-boyfriend-studio.js','./phase6-wellness-collections.css','./phase6-wellness-collections.js',
    './phase7-8-enhancements.css','./phase7-8-enhancements.js','./manifest.webmanifest','./app-icon.svg',
    './innerwear-image-library.json','./size-chart-template.json','./phase6-measurement-map.svg','./phase6-product-specs.svg',
    './phase6-comfort-check.svg','./phase6-image-rights-workflow.svg'
  ];
  function status(msg, hidden=false) { const el=$('#status'); el.textContent=msg; el.hidden=hidden; }
  function fmtMs(n) { return Number.isFinite(n) ? `${Math.round(n)} ms` : 'Unavailable'; }
  function fmtBytes(n) { return Number.isFinite(n) && n > 0 ? `${(n/1024).toFixed(1)} KB` : 'Unavailable'; }
  const raw4 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-4f/main/';
  const raw3 = 'https://raw.githubusercontent.com/bhanu13yadav1-ai/Brand-website-3/main/';
  const externalImages = [
    ...['look-black-lace.webp','product-lace-bra.webp','product-everyday-bra.webp','model-innerwear.webp','look-entry-shareef.webp','campaign-entry-shareef.webp','look-pallu-shareef.webp','campaign-pallu-shareef.webp','look-sanskari-blue.webp','campaign-sanskari-raat.webp','look-aankhein.webp','campaign-aankhein.webp','product-wellness.webp','wellness-app-reference.webp','product-curved.webp','product-massager.webp','hero-model-crop.webp','sanskari-ankhein.webp','sanskari-entry.webp','sanskari-mirror.webp','sanskari-pallu.webp','sanskari-raat.webp', ...Array.from({length:8},(_,i)=>`wand-360-frame-${String(i+1).padStart(2,'0')}.webp`)].map(name=>({name:`Brand-website-4f/${name}`,url:raw4+name})),
    ...['01-pallu-shareef.webp','02-sanskari-raat.webp','03-mirror-knows.webp','04-taiyaari-masoom.webp','05-entry-shareef.webp','06-sweet-face-dark-mood.webp','07-shareef-nazar.webp','08-raat-shareef.webp','09-sanskari-outside-banner.webp','10-sanskari-outside-dangerous.webp','companion-cafe.webp','companion-event.webp'].map(name=>({name:`Brand-website-3/${name}`,url:raw3+name}))
  ];
  function addMetric(label,value,meaning) {
    const tr=document.createElement('tr');
    for(const v of [label,value,meaning]) { const td=document.createElement('td'); td.textContent=String(v); tr.appendChild(td); }
    $('#metricRows').appendChild(tr);
  }
  function addLocal(path,result,bytes='—') {
    const tr=document.createElement('tr');
    for(const v of [path,result,bytes]) { const td=document.createElement('td'); td.textContent=String(v); tr.appendChild(td); }
    $('#localRows').appendChild(tr);
  }
  function addImageSource(row) {
    const tr=document.createElement('tr');
    for(const v of [row.name,row.status,row.detail||'—']) { const td=document.createElement('td'); td.textContent=String(v); tr.appendChild(td); }
    $('#imageSourceRows').appendChild(tr);
  }
  function probeImage(source, timeoutMs=9000) {
    return new Promise(resolve=>{
      const image=new Image(); const started=performance.now(); let done=false;
      const finish=(status,detail='')=>{ if(done)return;done=true;clearTimeout(timer);image.onload=null;image.onerror=null;resolve({name:source.name,status,detail,elapsedMs:Math.round(performance.now()-started)}); };
      const timer=setTimeout(()=>finish('TIMEOUT','No image response within 9 seconds'),timeoutMs);
      image.onload=()=>finish('PASS',`${image.naturalWidth} × ${image.naturalHeight} · ${Math.round(performance.now()-started)} ms`);
      image.onerror=()=>finish('FAIL','Image request failed in this browser/network');
      image.referrerPolicy='no-referrer'; image.src=source.url;
    });
  }
  async function runHome() {
    if(state.running) return;
    state.running=true; $('#runHomepage').disabled=true; $('#exportCsv').disabled=true;
    status('Loading the live homepage in a preview frame and gathering browser timing data…');
    const frame=$('#siteFrame'); frame.hidden=false;
    const started=performance.now();
    const cleanup=()=>{state.running=false;$('#runHomepage').disabled=false;};
    try {
      const loaded=new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>reject(new Error('Homepage did not finish loading within 25 seconds.')),25000);
        frame.onload=()=>{clearTimeout(timer);resolve();};
        frame.onerror=()=>{clearTimeout(timer);reject(new Error('Homepage iframe failed to load.'));};
      });
      frame.src='./index.html?phase2Perf='+Date.now();
      await loaded;
      await new Promise(resolve=>setTimeout(resolve,1800));
      const w=frame.contentWindow, d=frame.contentDocument;
      if(!w || !d) throw new Error('Same-origin homepage metrics are unavailable.');
      const nav=w.performance.getEntriesByType('navigation')[0];
      const entries=w.performance.getEntriesByType('resource');
      const known=entries.filter(e=>e.transferSize>0);
      const bytes=known.reduce((s,e)=>s+e.transferSize,0);
      const unknown=entries.filter(e=>e.transferSize===0 && /^https?:/.test(e.name));
      const imgs=[...d.images];
      const finished=imgs.filter(x=>x.complete);
      const ok=imgs.filter(x=>x.complete&&x.naturalWidth>0);
      const failed=imgs.filter(x=>x.complete&&x.naturalWidth===0);
      const cacheName=w.navigator.serviceWorker?.controller?'Controlled by service worker':'No active page controller (first visit/install may still be pending)';
      const cacheKeys=await caches.keys().catch(()=>[]);
      state.resourceRows=entries.map(e=>({name:e.name,type:e.initiatorType||'',durationMs:Math.round(e.duration),transferSize:e.transferSize||0,encodedBodySize:e.encodedBodySize||0,sizeVisible:e.transferSize>0?'yes':'unknown/cached/cross-origin'}));
      $('#metricRows').textContent='';
      addMetric('Homepage load event',fmtMs(nav?.loadEventEnd||performance.now()-started),'Navigation timing from the embedded homepage.');
      addMetric('DOM content ready',fmtMs(nav?.domContentLoadedEventEnd),'Time until DOMContentLoaded.');
      addMetric('Known transferred bytes',fmtBytes(bytes),'Only resources where the browser exposes transferSize.');
      addMetric('Resource entries',entries.length,'CSS, scripts, fonts and image requests seen by this frame.');
      addMetric('Resource sizes unavailable',unknown.length,'Often cross-origin items without Timing-Allow-Origin or cache hits; not treated as zero.');
      addMetric('Images loaded successfully',`${ok.length}/${imgs.length}`,'Natural image dimensions are available.');
      addMetric('Image failures observed',failed.length,'Only completed images with naturalWidth = 0.');
      addMetric('Service worker',cacheName,'Page controller status at test time.');
      addMetric('BLACKED caches',cacheKeys.filter(k=>k.startsWith('blacked-')).join(', ')||'No named cache found','Names visible to this same-origin diagnostics page.');
      $('#homepageSummary').textContent='Measurement complete. Compare runs on the same phone/network; a first load and a cached repeat load can differ significantly.';
      $('#imageSummary').hidden=false;
      $('#imageSummary').textContent=`Images present: ${imgs.length}; loaded: ${ok.length}; still loading: ${imgs.length-finished.length}; failed: ${failed.length}. External image timing sizes may not be exposed.`;
      $('#exportCsv').disabled=false;
      status('Homepage test finished. Live values captured locally; nothing was uploaded.');
    } catch(err) {
      status(`Test could not finish: ${err?.message||err}. The diagnostic page is still available; confirm the deployed URL and local browser network.`,false);
    } finally { cleanup(); }
  }
  async function checkLocal() {
    $('#checkLocal').disabled=true; $('#exportCsv').disabled=true; state.localRows=[];
    $('#localRows').textContent=''; $('#localSummary').textContent='Checking 33 expected app-shell paths with bounded concurrency…';
    const jobs=swFiles.slice(); let cursor=0, ok=0, failed=0;
    const workers=Array.from({length:Math.min(6,jobs.length)},async()=>{
      while(cursor<jobs.length){
        const path=jobs[cursor++];
        try{
          const response=await fetch(path,{method:'HEAD',cache:'no-store',credentials:'same-origin'});
          const row={name:path,status:response.ok?'PASS':`HTTP ${response.status}`,bytes:Number(response.headers.get('content-length'))||0};
          state.localRows.push(row);response.ok?ok++:failed++;
        }catch(err){state.localRows.push({name:path,status:'FETCH ERROR',bytes:0,detail:String(err)});failed++;}
      }
    });
    await Promise.all(workers);
    state.localRows.sort((a,b)=>a.name.localeCompare(b.name));
    for(const row of state.localRows)addLocal(row.name,row.status,fmtBytes(row.bytes));
    $('#localSummary').textContent=`Local reference check complete: ${ok} passed, ${failed} failed, ${jobs.length} requested. This checks the deployed repository, not the contents of this ZIP before upload.`;
    status(failed?'Some local paths did not respond successfully. Open the exact failed rows before release.':'All checked core paths returned successful HEAD responses.');
    $('#checkLocal').disabled=false;
    if(state.resourceRows.length||state.localRows.length)$('#exportCsv').disabled=false;
  }
  async function checkImages() {
    $('#checkImages').disabled=true; $('#exportCsv').disabled=true; state.imageRows=[];
    $('#imageSourceRows').textContent=''; $('#imageSourceSummary').textContent=`Checking ${externalImages.length} image URLs from the two existing public source repositories…`;
    let cursor=0, passed=0, failed=0, timedOut=0;
    const workers=Array.from({length:6},async()=>{
      while(cursor<externalImages.length){
        const source=externalImages[cursor++];
        const row=await probeImage(source);
        state.imageRows.push(row);
        if(row.status==='PASS')passed++;else if(row.status==='TIMEOUT')timedOut++;else failed++;
      }
    });
    await Promise.all(workers);
    state.imageRows.sort((a,b)=>a.name.localeCompare(b.name));
    for(const row of state.imageRows)addImageSource(row);
    $('#imageSourceSummary').textContent=`Image source check complete: ${passed} loaded, ${failed} failed, ${timedOut} timed out of ${externalImages.length}. Recheck failures on the deployed site; a timeout is not proof of a 404.`;
    status(failed||timedOut?'Some image sources did not complete. Inspect filename + status and recheck network before changing a URL.':'All direct app image references loaded successfully in this browser/network.');
    $('#checkImages').disabled=false; $('#exportCsv').disabled=false;
  }
  function downloadCsv() {
    const rows=[['kind','name','status_or_type','duration_ms','transfer_bytes','encoded_bytes','notes']];
    for(const r of state.resourceRows)rows.push(['resource',r.name,r.type,r.durationMs,r.transferSize,r.encodedBodySize,r.sizeVisible]);
    for(const r of state.localRows)rows.push(['local_file',r.name,r.status,'',r.bytes,'',r.detail||'']);
    for(const r of state.imageRows)rows.push(['external_image',r.name,r.status,r.elapsedMs,'','',r.detail||'']);
    const csv=rows.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}), url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='BLACKED_PHASE2_PERFORMANCE_RESULTS.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  }
  $('#runHomepage').addEventListener('click',runHome);
  $('#checkLocal').addEventListener('click',checkLocal);
  $('#checkImages').addEventListener('click',checkImages);
  $('#exportCsv').addEventListener('click',downloadCsv);
})();