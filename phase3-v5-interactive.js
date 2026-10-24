/* BLACKED V5 Phase 3 — non-destructive health checks and recovery for the existing interactive engine.
 * Does not replace wheels, generated content, story/product data, saved keys, or local images.
 */
(() => {
  'use strict';
  if (window.BLACKED_V5_PHASE3) return;

  const VERSION = '5.3.0';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const VIEW_NAMES = ['home', 'stories', 'innerwear', 'sanskari', 'wellness', 'boyfriend', 'fit'];
  const WHEEL_NAMES = ['dildo', 'plug', 'boy', 'wild'];
  const IMAGE_PATHS = [
    './own-your-balance.webp', './same-room-different-feelings.webp',
    './same-girl-different-stories.webp', './garden-lace-trio.webp',
    './poolside-trio-editorial.webp', './phase16-host-avatar.svg'
  ];
  const state = { version: VERSION, checks: 0, lastReport: null, status: 'starting', recoveryShown: false };

  function check(name, pass, detail = '') {
    return { name, status: pass ? 'PASS' : 'FAIL', pass: !!pass, detail };
  }

  function collectDiagnostics() {
    const views = VIEW_NAMES.map(name => check(`View: ${name}`, !!$(`#view-${name}`), `#view-${name}`));
    const wheels = WHEEL_NAMES.map(name => check(`Wheel node: ${name}`, !!$(`[data-wheel-disc="${name}"]`), `[data-wheel-disc="${name}"]`));
    const ids = new Set();
    const duplicates = [];
    $$('[id]').forEach(node => {
      if (ids.has(node.id)) duplicates.push(node.id);
      ids.add(node.id);
    });
    const script = $('script[data-phase34-bundle]');
    const phase3Api = window.BLACKED_V3_PHASE3 || null;
    const phase4Api = window.BLACKED_PHASE4_FANTASY || null;
    const phase3v4Api = window.BLACKED_V4_PHASE3 || null;
    const phase1Api = window.BLACKED_V4_PHASE1 || null;
    const phase2CoreApi = window.BLACKED_V4_PHASE2 || null;
    const phase2UxApi = window.BLACKED_V5_PHASE2_UX || null;
    const phase9Api = window.BLACKED_V3_PHASE9 || null;
    const phase12Api = window.BLACKED_V3_PHASE12_WHEELS || null;
    const phase13Api = window.BLACKED_V3_PHASE13 || null;
    const checks = [
      ...views,
      check('Original age gate retained', !!$('#ageModal') && !!$('#ageConfirm'), 'Existing self-attestation modal; not formal identity verification'),
      check('Phase 1 foundation API', !!phase1Api, 'Expected window.BLACKED_V4_PHASE1'),
      check('Phase 2 core API', !!phase2CoreApi, 'Expected window.BLACKED_V4_PHASE2'),
      check('Phase 2 premium UX module', !!phase2UxApi, 'Expected window.BLACKED_V5_PHASE2_UX'),
      check('Phase 3 mood studio', !!phase3Api && !!$('#v3-randi-mode'), 'Existing combined Phase 3/4 bundle; no duplicate studio loaded'),
      check('Phase 4 fantasy builder', !!phase4Api && !!$('#p4FantasyBuilder'), 'Existing combined bundle; optional adult fictional prompts'),
      check('Phase 9 After Dark', !!phase9Api && !!$('#v9AfterDarkStudio'), 'Expected loaded prompt studio'),
      check('Phase 12 Wheels Hub', !!phase12Api, 'Expected original-wheel directory'),
      check('Phase 13 Couples Studio', !!phase13Api && !!$('#v13CouplesStudio'), 'Existing local-image gallery and couples tools'),
      ...wheels,
      check('Innerwear catalogue host', !!$('#catalogGrid') && !!$('#view-innerwear'), 'Catalogue remains in the existing Innerwear view'),
      check('Innerwear image archive host', !!$('#imageLibraryGrid'), 'Existing 151-record archive host preserved'),
      check('Phase 2 CSS reference', !!$('link[href*="phase2-premium-ux.css"]'), 'Stylesheet link in the document'),
      check('Phase 3 CSS reference', !!$('link[href*="phase3-v5-interactive.css"]'), 'Additive recovery stylesheet'),
      check('Phase 3 JS reference', !!$('script[src*="phase3-v5-interactive.js"]'), 'Additive diagnostics/recovery module'),
      check('No duplicate static/dynamic IDs', duplicates.length === 0, duplicates.length ? duplicates.join(', ') : 'No duplicate IDs detected'),
      check('Combined bundle load status', !script || script.dataset.loadError !== 'true', script?.dataset.loadError === 'true' ? 'phase3-4-experience.js has a recorded load error' : 'No recorded bundle-load error'),
    ];
    const moduleErrors = phase3v4Api?.getDiagnostics?.().errors || [];
    const failures = checks.filter(item => !item.pass);
    return {
      version: VERSION,
      checkedAt: new Date().toISOString(),
      readiness: failures.length === 0 ? 'READY_STATIC_AND_RUNTIME_MARKERS' : 'NEEDS_REVIEW',
      summary: { total: checks.length, passed: checks.length - failures.length, failed: failures.length },
      checks,
      moduleErrors: Array.isArray(moduleErrors) ? moduleErrors : [],
      views: VIEW_NAMES,
      wheels: WHEEL_NAMES,
      existingImageReferences: IMAGE_PATHS,
      privacy: { readsSavedValues: false, modifiesStorage: false, clearsStorage: false, uploadsData: false },
      limits: ['This report checks DOM markers and exposed APIs only.', 'It does not spin wheels or modify saved user data.', 'Real Android touch, image network, keyboard and visual regression still require manual checks.']
    };
  }

  function buildRecoveryNotice() {
    if ($('#p3v5Recovery')) return $('#p3v5Recovery');
    const notice = document.createElement('section');
    notice.id = 'p3v5Recovery';
    notice.className = 'p3v5-recovery';
    notice.hidden = true;
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    const copy = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Some interactive tools did not finish loading';
    const message = document.createElement('p');
    message.id = 'p3v5RecoveryMessage';
    message.textContent = 'Other website sections and saved data are kept. Reload to retry missing scripts; this will not clear browser storage.';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Retry loading tools';
    button.addEventListener('click', () => {
      button.disabled = true;
      button.textContent = 'Reloading…';
      // A normal page reload retries failed same-origin assets without clearing local storage or caches.
      window.location.reload();
    });
    copy.append(title, message);
    notice.append(copy, button);
    const header = $('.site-header');
    if (header) header.insertAdjacentElement('afterend', notice);
    else (document.querySelector('main') || document.body).prepend(notice);
    return notice;
  }

  function refreshStatus() {
    const report = collectDiagnostics();
    state.checks++;
    state.lastReport = report;
    const ready = report.summary.failed === 0;
    state.status = ready ? 'ready' : 'needs-review';
    const notice = buildRecoveryNotice();
    // Wait for dynamic scripts to finish their bounded loading window before surfacing a warning.
    const age = Date.now() - startedAt;
    if (!ready && age >= 13000) {
      notice.hidden = false;
      state.recoveryShown = true;
      const message = $('#p3v5RecoveryMessage');
      if (message) {
        const failed = report.checks.filter(item => !item.pass).map(item => item.name);
        message.textContent = `Missing or unverified: ${failed.slice(0, 5).join(', ')}${failed.length > 5 ? '…' : ''}. Reload retries assets; it does not clear saved data.`;
      }
    } else if (ready) {
      notice.hidden = true;
      state.recoveryShown = false;
    }
    return report;
  }

  const startedAt = Date.now();
  function boot() {
    buildRecoveryNotice();
    window.BLACKED_V5_PHASE3 = {
      version: VERSION,
      getDiagnostics: collectDiagnostics,
      refresh: refreshStatus,
      getState: () => ({ version: VERSION, checks: state.checks, status: state.status, recoveryShown: state.recoveryShown })
    };
    // Dynamic Phase 9/12/13 modules are loaded by the existing selective V4 loader.
    // Recheck at bounded intervals and on existing loader events—never poll forever.
    [1200, 4000, 9000, 14000].forEach(delay => window.setTimeout(refreshStatus, delay));
    window.addEventListener('blacked:v4-phase3-ready', refreshStatus);
    window.addEventListener('blacked:v5-phase2-ready', refreshStatus);
    const main = $('main');
    if (main && 'MutationObserver' in window) {
      const observer = new MutationObserver(() => {
        const d = collectDiagnostics();
        if (d.summary.failed === 0) { refreshStatus(); observer.disconnect(); }
      });
      observer.observe(main, { childList: true, subtree: true });
      window.setTimeout(() => observer.disconnect(), 15000);
    }
    document.documentElement.dataset.blackedV5Phase3 = 'ready';
    window.dispatchEvent(new CustomEvent('blacked:v5-phase3-ready', { detail: { version: VERSION } }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
