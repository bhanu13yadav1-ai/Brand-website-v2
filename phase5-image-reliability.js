/* BLACKED V3 Phase 5 — visible image failure recovery and source diagnostics.
   Works alongside the existing fallback.js; never silently removes a failed image record. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE5) return;
  const state = { version:'5.6.0', observed:0, failures:[], recoveryControls:0, retries:0 };
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const seen = new WeakSet();
  const failureCards = new WeakSet();
  const cardSelector = '.image-library-card,.v3-photo-card,.v23-local-image-card,.v23-reference-card,.v24-image-card,.campaign-card,.product-card,.v6-match-card,.v6-campaign-card,.v6-active-feature';
  function imageSource(img) {
    return img.dataset.v5OriginalSrc || img.dataset.originalSrc || img.dataset.v3Source || img.getAttribute('src') || img.currentSrc || '';
  }
  function makeControl(img, card) {
    if (!card || failureCards.has(card) || card.querySelector('.v5-image-recovery-controls') || card.querySelector('[data-image-retry]')) return;
    const original = imageSource(img);
    if (!original || /^data:/i.test(original) || /^blob:/i.test(original)) return;
    img.dataset.v5OriginalSrc = original;
    const controls = document.createElement('div'); controls.className='v5-image-recovery-controls';
    const status = document.createElement('p'); status.className='v5-image-recovery-status'; status.textContent='Original image did not load. The image record is preserved.';
    const actions = document.createElement('div'); actions.className='v5-image-recovery-actions';
    const retry = document.createElement('button'); retry.type='button'; retry.className='v5-image-retry'; retry.textContent='Retry image';
    retry.addEventListener('click', () => {
      state.retries++;
      status.textContent='Retrying the original source…'; retry.disabled=true;
      img.dataset.v5Retrying='1';
      delete img.dataset.sourceStatus;
      delete img.dataset.fallbackDone;
      const retryUrl = new URL(original, document.baseURI);
      retryUrl.searchParams.set('v5retry', String(Date.now()));
      img.src = retryUrl.href;
      const settle = ok => {
        retry.disabled=false;
        if (ok) { status.textContent=`Original image loaded · ${img.naturalWidth} × ${img.naturalHeight}`; card.classList.remove('v5-image-failed'); }
        else { status.textContent='Still unavailable. Use “Open source” to check the original file.'; card.classList.add('v5-image-failed'); }
        delete img.dataset.v5Retrying;
      };
      const onLoad=()=>{cleanup();settle(img.naturalWidth>0);};
      const onError=()=>{cleanup();window.setTimeout(()=>settle(img.naturalWidth>0 && img.dataset.sourceStatus!=='failed'),120);};
      const cleanup=()=>{img.removeEventListener('load',onLoad);img.removeEventListener('error',onError);clearTimeout(timer);};
      img.addEventListener('load',onLoad,{once:true}); img.addEventListener('error',onError,{once:true});
      const timer=setTimeout(()=>{cleanup();settle(img.naturalWidth>0 && img.dataset.sourceStatus!=='failed');},10000);
    });
    const open = document.createElement('a'); open.className='v5-image-source-link'; open.href=original; open.target='_blank'; open.rel='noopener noreferrer'; open.textContent='Open original source ↗';
    actions.append(retry,open); controls.append(status,actions); card.append(controls); card.classList.add('v5-image-failed');
    failureCards.add(card); state.recoveryControls++;
  }
  function inspect(img) {
    if (!(img instanceof HTMLImageElement)) return;
    if (!seen.has(img)) {
      seen.add(img); state.observed++;
      img.addEventListener('load', () => {
        if (img.dataset.v5Retrying === '1' && img.naturalWidth > 0 && img.dataset.sourceStatus !== 'failed') {
          img.closest(cardSelector)?.classList.remove('v5-image-failed');
        }
      });
    }
    // fallback.js captures the failed request and records its original URL before drawing a placeholder.
    if (img.dataset.sourceStatus === 'failed' || img.dataset.fallbackDone === '1') {
      const src=imageSource(img);
      if (src && !/^data:/i.test(src)) state.failures.push({ src, alt:img.alt||'', path:img.dataset.v3PhotoAsset||img.dataset.v23Asset||img.dataset.v24Asset||'' });
      makeControl(img,img.closest(cardSelector));
    }
  }
  function scan(root=document) {
    if (root instanceof HTMLImageElement) inspect(root);
    root.querySelectorAll?.('img').forEach(inspect);
  }
  // The original V1 fallback listener runs first; scanning on the next task sees its saved failure metadata.
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement) setTimeout(()=>inspect(event.target),0);
  }, true);
  const observer=new MutationObserver(records=>{
    for (const item of records) {
      if (item.type==='childList') item.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node);});
      else if (item.target instanceof HTMLImageElement) inspect(item.target);
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','data-source-status','data-fallback-done','data-original-src']});
  scan();
  window.BLACKED_V3_PHASE5={
    version:state.version,
    getDiagnostics:()=>({version:state.version,observedImages:state.observed,failedOriginalRequests:[...new Map(state.failures.map(x=>[x.src,x])).values()],recoveryControls:state.recoveryControls,retries:state.retries,phase12:window.BLACKED_V3_PHASE12?.getDiagnostics?.()||null,phase34:window.BLACKED_V3_PHASE34?.getDiagnostics?.()||null}),
    scan:()=>{scan();return window.BLACKED_V3_PHASE5.getDiagnostics();}
  };
  document.documentElement.dataset.blackedV3Phase5='loaded';
})();
