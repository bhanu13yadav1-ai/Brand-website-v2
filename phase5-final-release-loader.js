/* BLACKED V4 Phase 5 — loads only the missing final-release modules.
 * Phase 3's selective loader owns Phase 9, 12 and 13. Never replay Phase 2–8 here.
 */
(() => {
  'use strict';
  if (window.BLACKED_V4_PHASE5) return;
  const VERSION = '5.0.0';
  const state = { version: VERSION, status: 'loading', phase3Ready: false, stylesLoaded: [], scriptsLoaded: [], errors: [], startedAt: new Date().toISOString() };
  const modules = [
    { css: './phase10-wellness-education.css', js: './phase10-wellness-education.js' },
    { css: './phase11-fit-studio.css', js: './phase11-fit-studio.js' },
    { css: './phase14-hardening.css', js: './phase14-hardening.js' },
    { css: './phase15-whats-new.css', js: './phase15-whats-new.js' }
  ];
  const versioned = path => path + '?v=' + VERSION;

  function addStyle(path) {
    return new Promise(resolve => {
      if (document.querySelector('link[data-blacked-v4-phase5-style="' + path + '"]')) return resolve(true);
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = versioned(path); link.dataset.blackedV4Phase5Style = path;
      let settled = false;
      const finish = ok => {
        if (settled) return; settled = true; clearTimeout(timer);
        if (ok) state.stylesLoaded.push(path); else state.errors.push('Stylesheet failed: ' + path);
        resolve(ok);
      };
      const timer = setTimeout(() => finish(false), 8000);
      link.addEventListener('load', () => finish(true), { once: true });
      link.addEventListener('error', () => finish(false), { once: true });
      document.head.append(link);
    });
  }

  function addScript(path) {
    return new Promise(resolve => {
      if (document.querySelector('script[data-blacked-v4-phase5-script="' + path + '"]')) return resolve(true);
      const script = document.createElement('script');
      script.src = versioned(path); script.async = false; script.dataset.blackedV4Phase5Script = path;
      let settled = false;
      const finish = ok => {
        if (settled) return; settled = true; clearTimeout(timer);
        if (ok) state.scriptsLoaded.push(path); else state.errors.push('Script failed: ' + path);
        resolve(ok);
      };
      const timer = setTimeout(() => finish(false), 9000);
      script.addEventListener('load', () => finish(true), { once: true });
      script.addEventListener('error', () => finish(false), { once: true });
      document.body.append(script);
    });
  }

  function waitForPhase3() {
    if (window.BLACKED_V4_PHASE3 && window.BLACKED_V4_PHASE3.status === 'loaded') {
      state.phase3Ready = true; return Promise.resolve(true);
    }
    return new Promise(resolve => {
      let settled = false;
      const finish = ok => {
        if (settled) return; settled = true;
        clearTimeout(timer); window.removeEventListener('blacked:v4-phase3-ready', onReady); resolve(ok);
      };
      const onReady = () => { state.phase3Ready = true; finish(true); };
      const timer = setTimeout(() => finish(!!(window.BLACKED_V4_PHASE3 && window.BLACKED_V4_PHASE3.status === 'loaded')), 18000);
      window.addEventListener('blacked:v4-phase3-ready', onReady, { once: true });
    });
  }

  function diagnostics() {
    const imgs = [...document.images];
    const seen = new Set(), duplicates = [];
    document.querySelectorAll('[id]').forEach(el => { if (seen.has(el.id)) duplicates.push(el.id); seen.add(el.id); });
    const views = [...document.querySelectorAll('.view[data-view]')].map(el => ({ view: el.dataset.view, active: el.classList.contains('active') && !el.hidden }));
    return {
      version: VERSION, status: state.status, phase3Ready: state.phase3Ready,
      stylesLoaded: [...state.stylesLoaded], scriptsLoaded: [...state.scriptsLoaded], errors: [...state.errors],
      modules: {
        phase1: !!window.BLACKED_V4_PHASE1, phase2: !!window.BLACKED_V4_PHASE2, phase3: !!window.BLACKED_V4_PHASE3,
        phase9: !!window.BLACKED_V3_PHASE9, phase10: !!window.BLACKED_V3_PHASE10, phase11: !!window.BLACKED_V3_PHASE11,
        phase12: !!window.BLACKED_V3_PHASE12_WHEELS, phase13: !!window.BLACKED_V3_PHASE13,
        phase14: !!window.BLACKED_V3_PHASE14, phase15: !!window.BLACKED_V3_PHASE15
      },
      views,
      wheels: { dildo: !!document.querySelector('[data-wheel-disc="dildo"]'), plug: !!document.querySelector('[data-wheel-disc="plug"]'), boy: !!document.querySelector('[data-wheel-disc="boy"]'), wild: !!document.querySelector('[data-wheel-disc="wild"]') },
      innerwear: { view: !!document.querySelector('#view-innerwear'), catalog: !!document.querySelector('#catalogGrid'), archive: !!document.querySelector('#imageLibraryGrid'), cards: document.querySelectorAll('#catalogGrid .product-card').length },
      duplicateIds: duplicates, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      images: { total: imgs.length, loaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length, failed: imgs.filter(i => i.complete && i.naturalWidth === 0 && !!(i.currentSrc || i.getAttribute('src'))).length },
      serviceWorkerSupported: 'serviceWorker' in navigator, serviceWorkerController: !!navigator.serviceWorker?.controller,
      timestamp: new Date().toISOString()
    };
  }

  function runSmokeTests() {
    const d = diagnostics();
    const tests = [
      ['Phase 1 foundation', d.modules.phase1], ['Phase 2 core', d.modules.phase2], ['Phase 3 selective loader', d.modules.phase3],
      ['Phase 9 After Dark', d.modules.phase9], ['Phase 10 Wellness', d.modules.phase10], ['Phase 11 Fit Studio', d.modules.phase11],
      ['Phase 12 Wheels Hub', d.modules.phase12], ['Phase 13 Couples Studio', d.modules.phase13], ['Phase 14 privacy hardening', d.modules.phase14], ['Phase 15 release highlights', d.modules.phase15],
      ['Seven main views', d.views.length === 7], ['All four wheels', Object.values(d.wheels).every(Boolean)],
      ['Innerwear view/catalog/archive', d.innerwear.view && d.innerwear.catalog && d.innerwear.archive],
      ['No duplicate IDs', d.duplicateIds.length === 0], ['No horizontal page overflow', !d.horizontalOverflow]
    ];
    return { passed: tests.filter(x => x[1]).length, total: tests.length, tests: tests.map(([name, ok]) => ({ name, status: ok ? 'PASS' : 'FAIL' })), diagnostics: d };
  }
  const api = { version: VERSION, getDiagnostics: diagnostics, runSmokeTests };
  window.BLACKED_V4_PHASE5 = api;
  // Backwards-compatible bridge for the existing Phase 15 diagnostics panel.
  window.BLACKED_V3_FINAL_RELEASE = { version: VERSION, getDiagnostics: diagnostics };

  async function boot() {
    state.phase3Ready = await waitForPhase3();
    if (!state.phase3Ready) state.errors.push('Phase 3 loader timed out; remaining modules were still attempted.');
    await Promise.all(modules.map(item => addStyle(item.css)));
    for (const item of modules) await addScript(item.js);
    const required = ['phase10-wellness-education.js','phase11-fit-studio.js','phase14-hardening.js','phase15-whats-new.js'];
    state.status = required.every(path => state.scriptsLoaded.includes('./' + path)) ? (state.errors.length ? 'degraded' : 'loaded') : 'degraded';
    document.documentElement.dataset.blackedV4Phase5 = state.status;
    state.completedAt = new Date().toISOString();
    window.dispatchEvent(new CustomEvent('blacked:v4-phase5-ready', { detail: diagnostics() }));
  }
  const start = () => boot().catch(error => { state.errors.push(String(error)); state.status = 'error'; document.documentElement.dataset.blackedV4Phase5 = 'error'; });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
