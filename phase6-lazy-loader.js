/* Phase 6 lazy bootstrap. Keep heavy studio and wellness modules off the initial Home load. */
(() => {
  'use strict';
  if (window.BLACKED_PHASE6_LAZY_LOADER) return;
  const phase6Views = new Set(['boyfriend','wellness','sanskari','fit']);
  let loading = null;
  let state = 'idle';
  const errors = [];
  function loadPhase6() {
    if (window.BLACKED_PHASE6_UX?.getDiagnostics?.().loaded) { state='ready'; return Promise.resolve(true); }
    if (loading) return loading;
    state='loading'; document.documentElement.dataset.blackedPhase6Lazy='loading';
    loading = new Promise(resolve => {
      const script=document.createElement('script');
      script.src='./phase6-combined-ux.js'; script.async=true; script.dataset.phase6Bundle='true';
      script.addEventListener('load',()=>{
        state='ready';document.documentElement.dataset.blackedPhase6Lazy='ready';
        window.dispatchEvent(new CustomEvent('blacked:phase6-ready',{detail:window.BLACKED_PHASE6_UX?.getDiagnostics?.()||{loaded:false}}));
        resolve(true);
      },{once:true});
      script.addEventListener('error',()=>{
        state='error';errors.push('Could not load ./phase6-combined-ux.js');document.documentElement.dataset.blackedPhase6Lazy='error';
        const view=document.querySelector('.view.active');if(view&&!document.getElementById('phase6-lazy-error')){const note=document.createElement('p');note.id='phase6-lazy-error';note.className='notice';note.setAttribute('role','alert');note.textContent='Phase 6 module did not load. Please refresh once and run Phase 6 diagnostics.';view.prepend(note);}
        resolve(false);
      },{once:true});
      document.head.append(script);
    });
    return loading;
  }
  function maybeLoadActiveView(){const name=document.querySelector('.view.active[data-view]')?.dataset.view;if(name&&phase6Views.has(name))loadPhase6();}
  document.addEventListener('click',event=>{const target=event.target instanceof Element?event.target:null;const link=target?.closest('[data-view-link]');if(link&&phase6Views.has(link.dataset.viewLink))window.setTimeout(maybeLoadActiveView,0);},true);
  if('MutationObserver' in window){const observer=new MutationObserver(maybeLoadActiveView);document.querySelectorAll('.view[data-view]').forEach(view=>observer.observe(view,{attributes:true,attributeFilter:['class']}));}
  window.addEventListener('pageshow',maybeLoadActiveView);
  window.BLACKED_PHASE6_LAZY_LOADER={getDiagnostics:()=>({state,loaded:state==='ready',errors:[...errors],bundle:'phase6-combined-ux.js',loadedViewOnly:true})};
  document.documentElement.dataset.blackedPhase6Lazy='armed';
})();
