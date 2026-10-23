/* V1 Phase 5 image status/fallback handler. Original source URLs remain recorded for diagnostics and retry. */
(() => {
  'use strict';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720"><rect width="600" height="720" fill="#211722"/><circle cx="300" cy="260" r="105" fill="#382539"/><path d="M105 555 Q300 350 495 555 V720 H105Z" fill="#4a2c43"/><text x="300" y="625" font-family="Georgia" font-size="28" text-anchor="middle" fill="#f5bfd6">BLACKED</text><text x="300" y="662" font-family="Arial" font-size="15" text-anchor="middle" fill="#d7bdcf">REFERENCE PREVIEW UNAVAILABLE</text></svg>';
  const store = window.BLACKED_ASSET_FALLBACK = { count: 0, failures: [], src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}` };
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.fallbackDone === '1') return;
    const original = img.dataset.originalSrc || img.currentSrc || img.src;
    img.dataset.originalSrc = original;
    img.dataset.sourceStatus = 'failed';
    img.dataset.fallbackDone = '1';
    store.count += 1;
    store.failures.push({url: original, alt: img.alt || ''});
    const card = img.closest('.image-library-card');
    if (card) {
      card.classList.add('image-source-failed');
      const status = card.querySelector('.image-source-status');
      if (status) { status.hidden = false; status.textContent = 'Original image did not load. The image record is still in the collection; use Open source or Retry image.'; }
    }
    img.src = store.src;
    img.alt = (img.alt || 'Campaign image') + ' — original source unavailable';
  }, true);
  // Emergency navigation recovery: dormant during normal operation; helps if the main app initializer throws.
  // It deliberately uses the existing seven views and existing age-confirmation UI.
  if (!window.__BLACKED_NAV_RECOVERY_BOUND__) {
    window.__BLACKED_NAV_RECOVERY_BOUND__ = true;
    let fallbackPendingView = null;
    let fallbackAgeConfirmed = false;
    try { fallbackAgeConfirmed = sessionStorage.getItem('blackedV1AdultConfirmed') === 'yes'; } catch (_) {}
    function recoverySetView(name) {
      const allowed = ['home','stories','innerwear','sanskari','wellness','boyfriend','fit'];
      if (!allowed.includes(name)) return false;
      let agePreviouslyConfirmed = fallbackAgeConfirmed;
      try { agePreviouslyConfirmed = agePreviouslyConfirmed || sessionStorage.getItem('blackedV1AdultConfirmed') === 'yes'; } catch (_) {}
      if (['stories','wellness','boyfriend'].includes(name) && !agePreviouslyConfirmed) {
        fallbackPendingView = name;
        const modal = document.getElementById('ageModal');
        if (modal) { modal.classList.remove('hidden'); modal.hidden = false; }
        const confirm = document.getElementById('ageConfirm');
        if (confirm) confirm.checked = false;
        const err = document.getElementById('ageError'); if(err) err.classList.add('hidden');
        return true;
      }
      document.querySelectorAll('.view[data-view]').forEach(view => {
        const active = view.dataset.view === name;
        view.hidden = !active; view.classList.toggle('active', active);
        if(active) view.querySelectorAll('img[data-deferred-src]').forEach(img => { img.src=img.dataset.deferredSrc; delete img.dataset.deferredSrc; img.loading='lazy'; img.decoding='async'; });
      });
      document.querySelectorAll('[data-view-link]').forEach(button => {
        const active = button.dataset.viewLink === name;
        button.classList.toggle('active',active);
        if(button.closest('.main-nav')) { if(active) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current'); }
      });
      document.getElementById('mobileMenu')?.classList.add('hidden');
      document.getElementById('menuToggle')?.setAttribute('aria-expanded','false');
      window.scrollTo({top:0,behavior:'auto'});
      const main=document.querySelector('.main-content');
      if(main && !document.getElementById('blacked-nav-recovery-note')) {
        const note=document.createElement('p');note.id='blacked-nav-recovery-note';note.setAttribute('role','status');
        note.style.cssText='margin:12px auto;padding:10px 12px;max-width:1120px;border:1px solid #8b536e;border-radius:10px;background:#241723;color:#ffe4ef;font-size:12px';
        note.textContent='Navigation recovery mode is active because the main app did not finish starting. Reload the page or run Phase 4 diagnostics to identify the failing file.';
        main.prepend(note);
      }
      return true;
    }
    document.addEventListener('click', event => {
      const target=event.target instanceof Element?event.target:null;
      const link=target?.closest('[data-view-link]');
      if (!link) return;
      if (window.BLACKED_V1?.setView) return;
      event.preventDefault();
      recoverySetView(link.dataset.viewLink);
    }, true);
    document.addEventListener('click', event => {
      const target=event.target instanceof Element?event.target:null;
      if (!target) return;
      if(target.closest('#cancelAge')) { fallbackPendingView=null; document.getElementById('ageModal')?.classList.add('hidden'); return; }
      if(target.closest('#confirmAge') && !window.BLACKED_V1?.setView) {
        const check=document.getElementById('ageConfirm');
        if(!check?.checked) {document.getElementById('ageError')?.classList.remove('hidden');return;}
        fallbackAgeConfirmed = true;
        try{sessionStorage.setItem('blackedV1AdultConfirmed','yes');}catch(_){}
        document.getElementById('ageModal')?.classList.add('hidden');
        const name=fallbackPendingView||'wellness';fallbackPendingView=null;recoverySetView(name);
      }
    }, true);
    window.BLACKED_NAV_RECOVERY = { setView: recoverySetView, diagnostics: () => ({bound:true,mainAppReady:!!window.BLACKED_V1,activeView:document.querySelector('.view.active')?.dataset.view||null}) };
  }

})();
