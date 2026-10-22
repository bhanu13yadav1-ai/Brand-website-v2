/* BLACKED V3 Phase 14 — privacy export, path repair, image status and accessibility support. */
(() => {
  'use strict';
  if(window.BLACKED_V3_PHASE14)return;
  const $=(s,r=document)=>r.querySelector(s);
  const state={pathsFixed:0,imagesFailed:0,exportCount:0,errors:[],version:'14.15.0'};
  const localKeys=[
    'blackedV1Wishlist','blackedV1Bag','blackedV1FitNotes','blackedV1MeasurementsOptIn',
    'blackedV1PartBStoryVault','blackedDeltaSaved','blackedDeltaBag','blackedDeltaFitNotes','blacked31FitNote'
  ];
  function normalisePath(value){
    if(typeof value!=='string')return value;
    const m=value.match(/^\.\/assets\/(?:[^/]+\/)+([^?#]+)([?#].*)?$/);
    if(m)return './'+m[1]+(m[2]||'');
    return value;
  }
  function fixPathNode(node){
    if(!(node instanceof HTMLImageElement))return;
    const raw=node.getAttribute('src')||'';const next=normalisePath(raw);
    if(next&&next!==raw){node.dataset.v14OriginalBrokenPath=raw;node.src=next;state.pathsFixed++;}
    for(const attr of ['data-v3-photo-asset','data-original-src','data-full-src']){
      const old=node.getAttribute(attr);if(old){const n=normalisePath(old);if(n!==old)node.setAttribute(attr,n);}
    }
    const button=node.closest('[data-v3-open-photo]');
    if(button){const old=button.getAttribute('data-full-src');if(old){const n=normalisePath(old);if(n!==old)button.setAttribute('data-full-src',n);}}
  }
  function fixAssetPaths(root=document){root.querySelectorAll('img').forEach(fixPathNode);}
  function wireImageStatus(root=document){
    root.querySelectorAll('img[data-v13-photo],img[data-v6-asset],img[data-v23-asset],img[data-v24-asset],img[data-v3-photo-asset]').forEach(img=>{
      if(img.dataset.v14StatusBound)return;img.dataset.v14StatusBound='1';
      img.addEventListener('error',()=>{
        state.imagesFailed++;
        const card=img.closest('.v13-couple-card,.v6-match-card,.v23-poster-card,.v24-image-card,.v3-photo-card');
        if(!card)return;
        card.classList.add('v14-image-failed');
        let status=card.querySelector('.v14-image-status');
        if(!status){status=document.createElement('p');status.className='v14-image-status';status.setAttribute('role','status');card.append(status);}
        status.textContent='Image failed to load. Check the bundled filename/path; the original feature has not been removed.';
      });
      img.addEventListener('load',()=>{const card=img.closest('.v13-couple-card,.v6-match-card,.v23-poster-card,.v24-image-card,.v3-photo-card');if(card){card.classList.remove('v14-image-failed');card.querySelector('.v14-image-status')?.remove();}}, {once:false});
    });
  }
  function buildPrivacyExport(){
    const anchor=$('#privacyDescription');if(!anchor||$('#v14PrivacyExport'))return;
    const panel=document.createElement('section');panel.className='v14-privacy-export';panel.id='v14PrivacyExport';panel.setAttribute('aria-labelledby','v14PrivacyExportTitle');
    const h=document.createElement('h3');h.id='v14PrivacyExportTitle';h.textContent='Export your saved BLACKED data';
    const p=document.createElement('p');p.textContent='Creates a JSON copy in this browser only. It may contain private preferences, notes or measurements—store the downloaded file carefully. Nothing is uploaded.';
    const button=document.createElement('button');button.type='button';button.className='btn secondary';button.id='v14ExportLocalData';button.textContent='Download my local data ↧';
    const status=document.createElement('p');status.className='micro';status.id='v14ExportStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent='No export has been made.';
    panel.append(h,p,button,status);anchor.insertAdjacentElement('afterend',panel);
    button.addEventListener('click',exportLocalData);
  }
  function exportLocalData(){
    const payload={product:'BLACKED',formatVersion:1,exportedAt:new Date().toISOString(),storage:'local browser only',data:{}};
    for(const key of localKeys){try{const raw=localStorage.getItem(key);if(raw!==null){try{payload.data[key]=JSON.parse(raw);}catch{payload.data[key]=raw;}}}catch(error){state.errors.push('Storage read failed: '+key);}}
    try{
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='blacked-local-data-export.json';a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      state.exportCount++;const status=$('#v14ExportStatus');if(status)status.textContent=`Export created. ${Object.keys(payload.data).length} app-owned storage entries included; no data was sent to a server.`;
    }catch(error){const status=$('#v14ExportStatus');if(status)status.textContent='Export could not be created by this browser. Your saved data was not changed.';state.errors.push('Export failed: '+String(error));}
  }
  function polishImages(){
    document.querySelectorAll('img').forEach(img=>{
      if(!img.hasAttribute('decoding'))img.decoding='async';
      if(!img.hasAttribute('loading')&&!img.closest('.hero'))img.loading='lazy';
    });
  }
  function boot(){
    fixAssetPaths();wireImageStatus();buildPrivacyExport();polishImages();
    const observer=new MutationObserver(records=>{for(const record of records){for(const n of record.addedNodes){if(n.nodeType!==1)continue;if(n.matches?.('img'))fixPathNode(n);fixAssetPaths(n);wireImageStatus(n);polishImages();}}});
    observer.observe(document.body,{subtree:true,childList:true});
    // Repair images inserted by later sections and handlers without mutating the existing data model.
    document.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement)fixPathNode(event.target);},true);
    window.BLACKED_V3_PHASE14={getDiagnostics:()=>({loaded:true,pathsFixed:state.pathsFixed,imagesFailed:state.imagesFailed,exportCount:state.exportCount,privacyExport:!!$('#v14PrivacyExport'),focusVisibleCSS:!!document.querySelector('link[data-v15-release-asset="./phase14-hardening.css"],link[data-v15ReleaseAsset="./phase14-hardening.css"]')||[...document.styleSheets].some(sheet=>{try{return [...sheet.cssRules].some(rule=>rule.selectorText?.includes(':focus-visible'))}catch{return /phase14-hardening\.css/.test(sheet.href||'')}}),serviceWorkerSupported:'serviceWorker'in navigator,serviceWorkerController:!!navigator.serviceWorker?.controller,errors:[...state.errors]}),fixAssetPaths,exportLocalData};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
