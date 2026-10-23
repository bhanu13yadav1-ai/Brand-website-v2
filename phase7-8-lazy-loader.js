/* Phase 7/8 lazy bootstrap: collection discovery and story reading tools load only on their relevant views. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE78_LAZY_LOADER) return;
  const targetViews = new Set(['stories','sanskari']);
  let promise = null;
  let state = 'idle';
  const errors = [];
  function loadModule(){
    if(window.BLACKED_V3_PHASE78?.getDiagnostics?.()){state='ready';return Promise.resolve(true);}
    if(promise)return promise;
    state='loading';document.documentElement.dataset.blackedPhase78Lazy='loading';
    promise=new Promise(resolve=>{
      const script=document.createElement('script');script.src='./phase7-8-combined.js';script.async=true;script.dataset.phase78Bundle='true';
      script.addEventListener('load',()=>{state='ready';document.documentElement.dataset.blackedPhase78Lazy='ready';window.dispatchEvent(new CustomEvent('blacked:phase78-ready',{detail:window.BLACKED_V3_PHASE78?.getDiagnostics?.()||{loaded:false}}));resolve(true);},{once:true});
      script.addEventListener('error',()=>{state='error';errors.push('Could not load ./phase7-8-combined.js');document.documentElement.dataset.blackedPhase78Lazy='error';const view=document.querySelector('.view.active');if(view&&!document.getElementById('phase78-lazy-error')){const note=document.createElement('p');note.id='phase78-lazy-error';note.className='notice';note.setAttribute('role','alert');note.textContent='Collection/story tools failed to load. Existing main page content should remain available; open Phase 7 diagnostics for the failed file.';view.prepend(note);}resolve(false);},{once:true});
      document.head.append(script);
    });
    return promise;
  }
  function maybeLoad(){const name=document.querySelector('.view.active[data-view]')?.dataset.view;if(name&&targetViews.has(name))loadModule();}
  document.addEventListener('click',e=>{const t=e.target instanceof Element?e.target:null;const a=t?.closest('[data-view-link]');if(a&&targetViews.has(a.dataset.viewLink))setTimeout(maybeLoad,0);},true);
  if('MutationObserver'in window){const ob=new MutationObserver(maybeLoad);document.querySelectorAll('.view[data-view]').forEach(v=>ob.observe(v,{attributes:true,attributeFilter:['class','hidden']}));}
  window.addEventListener('pageshow',maybeLoad);
  window.BLACKED_PHASE78_LAZY_LOADER={getDiagnostics:()=>({state,loaded:state==='ready',bundle:'phase7-8-combined.js',targetViews:[...targetViews],errors:[...errors]})};
  document.documentElement.dataset.blackedPhase78Lazy='armed';
})();
