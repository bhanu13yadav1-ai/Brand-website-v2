(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const state = { running: false, results: [] };
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function add(test, status, detail = '') {
    const item = { test, status, detail: String(detail) };
    state.results.push(item);
    const row = document.createElement('div'); row.className = 'row';
    const name = document.createElement('b'); name.textContent = test;
    const badge = document.createElement('span'); badge.className = `status ${status}`; badge.textContent = status;
    const description = document.createElement('small'); description.textContent = detail;
    row.append(name, badge, description); $('#results').append(row);
  }
  async function until(test, timeout = 8000, interval = 80) {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      try { const value = test(); if (value) return value; } catch (_) {}
      await wait(interval);
    }
    throw new Error('Timed out waiting for the deployed app to finish loading.');
  }
  async function clickAndMeasure(frameWindow, frameDocument, targetName) {
    const nav = frameDocument.querySelector(`#mainNav [data-view-link="${targetName}"]`);
    if (!nav) throw new Error(`Navigation button ${targetName} was not found.`);
    const start = frameWindow.performance.now();
    nav.click(); // HTMLElement.click() dispatch is synchronous; this captures the actual JS tap path.
    const syncMs = frameWindow.performance.now() - start;
    await until(() => frameDocument.querySelector('.view.active[data-view]')?.dataset.view === targetName, 5000, 30);
    const frameResult = await new Promise(resolve => {
      let finished = false;
      const timer = setTimeout(() => { if (!finished) { finished = true; resolve(null); } }, 1200);
      frameWindow.requestAnimationFrame(() => frameWindow.requestAnimationFrame(() => {
        if (!finished) { finished = true; clearTimeout(timer); resolve(frameWindow.performance.now() - start); }
      }));
    });
    return { syncMs, nextPaintMs: frameResult };
  }
  async function run() {
    if (state.running) return;
    state.running = true; state.results = []; $('#results').replaceChildren(); $('#runChecks').disabled = true; $('#runChecks').textContent = 'Testing…';
    try {
      const frame = $('#testFrame');
      // Reset the frame first, then attach listeners before setting the real URL to avoid a fast-cache load race on mobile.
      if (frame.src && frame.contentWindow.location.href !== 'about:blank') {
        await new Promise(resolve => {
          const timer = setTimeout(resolve, 500);
          frame.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
          frame.src = 'about:blank';
        });
      }
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Website frame did not finish opening within 20 seconds.')), 20000);
        frame.addEventListener('load', () => { clearTimeout(timeout); resolve(); }, { once: true });
        frame.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('Website frame failed to load.')); }, { once: true });
        frame.src = `./index.html?innerwear-fix-check=${Date.now()}`;
      });
      const win = frame.contentWindow, doc = frame.contentDocument;
      const app = await until(() => win.BLACKED_V1, 8000, 80);
      const before = app.getDiagnostics();
      add('Application JavaScript boot', 'PASS', before.version || 'BLACKED_V1 ready');
      add('Original seven views', doc.querySelectorAll('.view[data-view]').length === 7 ? 'PASS' : 'FAIL', `Found ${doc.querySelectorAll('.view[data-view]').length} view sections.`);
      add('Four original wheels', doc.querySelectorAll('[data-wheel-disc]').length === 4 ? 'PASS' : 'FAIL', `Found ${doc.querySelectorAll('[data-wheel-disc]').length} wheel discs.`);
      const inactiveSources = doc.querySelectorAll('.view:not(.active) img[src]').length;
      add('Hidden-screen images deferred', inactiveSources === 0 ? 'PASS' : 'WARN', `${inactiveSources} images in inactive views still have an active src.`);
      const activation = await clickAndMeasure(win, doc, 'innerwear');
      await wait(1100);
      const diag = win.BLACKED_V1.getDiagnostics();
      add('Innerwear tap activates screen', doc.querySelector('#view-innerwear')?.classList.contains('active') && !doc.querySelector('#view-innerwear')?.hidden ? 'PASS' : 'FAIL', `Active view is ${doc.querySelector('.view.active[data-view]')?.dataset.view || 'none'}.`);
      add('Catalogue has usable first items', doc.querySelectorAll('#catalogGrid .product-card').length === 8 ? 'PASS' : 'FAIL', `${doc.querySelectorAll('#catalogGrid .product-card').length} product cards rendered.`);
      add('Catalogue placed before large archive', diag.innerwearCatalogBeforeArchive ? 'PASS' : 'FAIL', `Diagnostic value: ${diag.innerwearCatalogBeforeArchive}`);
      add('Archive first batch is bounded', diag.imageLibraryBatchSize === 8 && doc.querySelectorAll('#imageLibraryGrid .image-library-card').length <= 8 ? 'PASS' : 'FAIL', `Batch setting: ${diag.imageLibraryBatchSize}; rendered: ${doc.querySelectorAll('#imageLibraryGrid .image-library-card').length}.`);
      add('All archive entries retained', diag.imageLibraryCount === 151 ? 'PASS' : 'WARN', `Manifest entries available: ${diag.imageLibraryCount}. A manifest network failure can cause a warning.`);
      add('Synchronous Innerwear tap handler', Number.isFinite(activation.syncMs) && activation.syncMs < 200 ? 'PASS' : 'WARN', `Handler: ${activation.syncMs.toFixed(1)} ms. This is one browser's dispatch measurement, not a guaranteed physical-device speed score.`);
      add('Innerwear next-paint response', Number.isFinite(activation.nextPaintMs) && activation.nextPaintMs < 1200 ? 'PASS' : 'WARN', Number.isFinite(activation.nextPaintMs) ? `Active view + next animation frame: ${activation.nextPaintMs.toFixed(1)} ms.` : 'Animation-frame timing unavailable in this browser.');
      // Test one additional archive batch, not the whole image archive (which would create unnecessary work on mobile data).
      const more = doc.querySelector('#loadMoreLibrary');
      if (more && !more.hidden) {
        const prior = doc.querySelectorAll('#imageLibraryGrid .image-library-card').length;
        more.click(); await wait(80);
        const current = doc.querySelectorAll('#imageLibraryGrid .image-library-card').length;
        add('Load-next batch works', current === Math.min(prior + 8, diag.imageLibraryMatching || 151) ? 'PASS' : 'WARN', `${prior} → ${current} cards.`);
      } else add('Load-next batch works', 'WARN', 'No Load more button available; archive might not have finished loading.');
      const homeTime = await clickAndMeasure(win, doc, 'home');
      const returned = await clickAndMeasure(win, doc, 'innerwear');
      add('Navigate away and return', doc.querySelector('#view-innerwear')?.classList.contains('active') ? 'PASS' : 'FAIL', `Home tap ${homeTime.syncMs.toFixed(1)} ms; return tap ${returned.syncMs.toFixed(1)} ms.`);
      add('App-reported JavaScript errors', (diag.errors || []).length === 0 ? 'PASS' : 'WARN', (diag.errors || []).slice(0, 5).join(' | ') || 'No errors reported by app diagnostics.');
      const pass = state.results.filter(item => item.status === 'PASS').length;
      const warn = state.results.filter(item => item.status === 'WARN').length;
      const fail = state.results.filter(item => item.status === 'FAIL').length;
      $('#summary').textContent = `Finished: ${pass} PASS · ${warn} WARN · ${fail} FAIL. Results describe this browser session, not a synthetic score.`;
    } catch (error) {
      add('Diagnostics runner', 'FAIL', `${error.name}: ${error.message}`);
      $('#summary').textContent = 'The deployed page could not be inspected. See the FAIL row for the blocker.';
    } finally {
      state.running = false; $('#runChecks').disabled = false; $('#runChecks').textContent = 'Run checks again';
    }
  }
  $('#runChecks').addEventListener('click', run);
  $('#exportCsv').addEventListener('click', () => {
    const rows = [['test','status','detail'], ...state.results.map(item => [item.test,item.status,item.detail])];
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'BLACKED_INNERWEAR_FIX_DIAGNOSTICS.csv'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
