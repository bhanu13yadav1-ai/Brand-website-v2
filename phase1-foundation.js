/* BLACKED V4 Phase 1 — additive foundation, mobile usability and runtime diagnostics.
 * No framework/CDN, no images, no server calls, and no existing storage keys are changed.
 * Integration: add one defer script tag to the existing index.html (see install guide).
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE1) return;

  const state = {
    version: '4.1.0',
    startedAt: new Date().toISOString(),
    imagePathRepairs: 0,
    failedImages: [],
    resourceErrors: [],
    runtimeErrors: [],
    warnings: []
  };
  const MAX_ERRORS = 40;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function addStyles() {
    if ($('#phase1FoundationStyles')) return;
    const style = document.createElement('style');
    style.id = 'phase1FoundationStyles';
    style.textContent = `
      /* V4 foundation: preserve the existing visual identity; improve only usability and recovery. */
      :where(button,a,input,select,textarea,[tabindex]):focus-visible{outline:3px solid #f4a0c1;outline-offset:3px}
      :where(.view,main,.section-block,.panel,.guide-card,.product-card,.campaign-card){min-width:0}
      :where(img,video,svg,canvas){max-width:100%}
      :where(.view p,.view h1,.view h2,.view h3,.view small,.view label){overflow-wrap:anywhere}
      img[data-phase1-load-failed="true"]{background:#211720;object-fit:contain;outline:1px dashed #95617d;outline-offset:-2px}
      .phase1-image-note{margin:6px 0 0;color:#d9bdca;font-size:12px;line-height:1.45}
      @media(max-width:600px){
        .main-nav .nav-link,.mobile-nav button,.icon-btn,.bag-btn{min-height:42px}
        .section-heading{align-items:flex-start}
        .section-heading>*{min-width:0}
      }
      @media(prefers-reduced-motion:reduce){
        html:focus-within{scroll-behavior:auto!important}
        *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
      }
    `;
    document.head.appendChild(style);
  }

  function record(target, message) {
    const item = { at: new Date().toISOString(), target: String(target || 'runtime').slice(0, 500), message: String(message || '').slice(0, 500) };
    state.resourceErrors.push(item);
    if (state.resourceErrors.length > MAX_ERRORS) state.resourceErrors.shift();
  }

  function normaliseBrokenRootAsset(img) {
    const raw = img.getAttribute('src') || '';
    if (!raw || img.dataset.phase1PathRepairAttempted === 'true') return false;
    if (/^(?:data:|blob:|https?:\/\/|\/\/)/i.test(raw)) return false;
    let url;
    try { url = new URL(raw, location.href); } catch (_) { return false; }
    if (url.origin !== location.origin || !url.pathname.includes('/assets/')) return false;
    const basename = url.pathname.split('/').filter(Boolean).pop();
    if (!basename || basename === '.' || basename === '..') return false;
    img.dataset.phase1PathRepairAttempted = 'true';
    img.dataset.phase1OriginalSrc = raw;
    state.imagePathRepairs += 1;
    // Only retry once and only after the original same-origin /assets/ request fails.
    img.setAttribute('src', './' + basename + (url.search || ''));
    return true;
  }

  function onResourceError(event) {
    const target = event.target;
    if (target && target !== window && target.tagName) {
      const tag = target.tagName.toLowerCase();
      const source = target.getAttribute?.('src') || target.getAttribute?.('href') || '';
      if (tag === 'img') {
        if (normaliseBrokenRootAsset(target)) return;
        target.dataset.phase1LoadFailed = 'true';
        target.setAttribute('aria-label', target.getAttribute('alt') || 'Image unavailable');
        const src = String(target.currentSrc || source || 'image').slice(0, 500);
        if (!state.failedImages.some(item => item.src === src)) {
          state.failedImages.push({ src, alt: String(target.getAttribute('alt') || '').slice(0, 160) });
          if (state.failedImages.length > MAX_ERRORS) state.failedImages.shift();
        }
        return;
      }
      if (tag === 'script' || tag === 'link') record(source || tag, `${tag} resource failed to load`);
      return;
    }
    record('window', event.message || 'Uncaught JavaScript error');
  }

  function syncMobileMenu() {
    const toggle = $('#menuToggle');
    const menu = $('#mobileMenu');
    if (!toggle || !menu) return;
    const open = !menu.classList.contains('hidden') && !menu.hidden;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
  }

  function installNavigationGuardrails() {
    const toggle = $('#menuToggle');
    const menu = $('#mobileMenu');
    if (!toggle || !menu) return;
    syncMobileMenu();
    // app.js owns navigation state; this module only keeps accessibility labels in sync.
    toggle.addEventListener('click', () => queueMicrotask(syncMobileMenu));
    menu.addEventListener('click', event => {
      if (event.target.closest('[data-view-link]')) queueMicrotask(syncMobileMenu);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
        toggle.click();
        toggle.focus({ preventScroll: true });
      }
    });
    document.addEventListener('click', event => {
      if (menu.classList.contains('hidden')) return;
      if (menu.contains(event.target) || toggle.contains(event.target)) return;
      if (event.target.closest('.site-header')) return;
      toggle.click();
      syncMobileMenu();
    });
    const observer = new MutationObserver(syncMobileMenu);
    observer.observe(menu, { attributes: true, attributeFilter: ['class', 'hidden'] });
  }

  function duplicateIds() {
    const seen = new Set();
    const duplicates = new Set();
    $$('[id]').forEach(element => {
      if (seen.has(element.id)) duplicates.add(element.id);
      seen.add(element.id);
    });
    return [...duplicates];
  }

  function getDiagnostics() {
    const images = $$('img');
    const failedNow = images.filter(img => img.dataset.phase1LoadFailed === 'true' || (img.complete && img.naturalWidth === 0 && !!img.getAttribute('src')));
    const views = $$('.view[data-view]').map(view => ({ name: view.dataset.view, active: view.classList.contains('active') && !view.hidden }));
    const wheelControls = ['dildoPreference', 'plugPreference', 'boyPreference', 'wildCategory'];
    const nav = $('#mainNav');
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 2;
    return {
      version: state.version,
      startedAt: state.startedAt,
      appApiPresent: !!window.BLACKED_V1,
      combinedPhase34Present: !!window.BLACKED_V3_PHASE3 && !!window.BLACKED_PHASE4_FANTASY,
      views,
      navLinkCount: nav ? nav.querySelectorAll('[data-view-link]').length : 0,
      mobileMenu: { present: !!$('#mobileMenu'), expanded: $('#menuToggle')?.getAttribute('aria-expanded') || null },
      ageGatePresent: !!$('#ageModal'),
      wheelControls: Object.fromEntries(wheelControls.map(id => [id, !!document.getElementById(id)])),
      imageCount: images.length,
      loadedImageCount: images.filter(img => img.complete && img.naturalWidth > 0).length,
      pendingImageCount: images.filter(img => !img.complete).length,
      failedImageCount: failedNow.length,
      failedImages: state.failedImages.slice(),
      imagePathRepairs: state.imagePathRepairs,
      duplicateIds: duplicateIds(),
      horizontalOverflow: overflow,
      serviceWorker: {
        supported: 'serviceWorker' in navigator,
        controlled: 'serviceWorker' in navigator && !!navigator.serviceWorker.controller
      },
      resourceErrors: state.resourceErrors.slice(),
      runtimeErrors: state.runtimeErrors.slice(),
      warnings: state.warnings.slice()
    };
  }

  function runSmokeTests() {
    const diag = getDiagnostics();
    const checks = [
      { id: 'main-app', label: 'Main app API', status: diag.appApiPresent ? 'PASS' : 'FAIL', detail: diag.appApiPresent ? 'BLACKED_V1 detected' : 'Main app API is missing' },
      { id: 'views', label: 'Seven main views', status: diag.views.length === 7 ? 'PASS' : 'FAIL', detail: `${diag.views.length} views detected` },
      { id: 'nav', label: 'Main navigation', status: diag.navLinkCount >= 7 ? 'PASS' : 'FAIL', detail: `${diag.navLinkCount} navigation links detected` },
      { id: 'age-gate', label: 'Age gate markup', status: diag.ageGatePresent ? 'PASS' : 'FAIL', detail: diag.ageGatePresent ? 'Age confirmation UI found' : 'Age confirmation UI missing' },
      { id: 'duplicate-ids', label: 'Duplicate element IDs', status: diag.duplicateIds.length ? 'FAIL' : 'PASS', detail: diag.duplicateIds.length ? diag.duplicateIds.join(', ') : 'No duplicate IDs detected' },
      { id: 'overflow', label: 'Horizontal overflow', status: diag.horizontalOverflow ? 'WARN' : 'PASS', detail: diag.horizontalOverflow ? 'Document is wider than viewport' : 'No document-level horizontal overflow detected' },
      { id: 'phase34', label: 'Combined Phase 3/4 runtime', status: diag.combinedPhase34Present ? 'PASS' : 'WARN', detail: diag.combinedPhase34Present ? 'Both module APIs detected' : 'Not detected yet; check bundle loading' },
      { id: 'wheels', label: 'Original wheel controls', status: Object.values(diag.wheelControls).every(Boolean) ? 'PASS' : 'WARN', detail: Object.entries(diag.wheelControls).filter(([, found]) => !found).map(([id]) => id).join(', ') || 'Four wheel control groups detected' },
      { id: 'images', label: 'Image loading', status: diag.failedImageCount ? 'WARN' : 'PASS', detail: `${diag.imageCount} images; ${diag.loadedImageCount} loaded; ${diag.failedImageCount} failed` }
    ];
    return { version: state.version, ranAt: new Date().toISOString(), checks, diagnostics: diag };
  }

  function boot() {
    addStyles();
    installNavigationGuardrails();
    window.addEventListener('error', onResourceError, true);
    window.addEventListener('unhandledrejection', event => {
      const reason = event.reason && (event.reason.message || String(event.reason));
      state.runtimeErrors.push(String(reason || 'Unhandled promise rejection').slice(0, 500));
      if (state.runtimeErrors.length > MAX_ERRORS) state.runtimeErrors.shift();
    });
    window.BLACKED_V4_PHASE1 = {
      version: state.version,
      getDiagnostics,
      runSmokeTests,
      scanImages: getDiagnostics
    };
    document.documentElement.dataset.blackedV4Phase1 = 'ready';
    window.dispatchEvent(new CustomEvent('blacked:v4-phase1-ready', { detail: { version: state.version } }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
