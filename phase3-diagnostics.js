(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const resultRows = [];
  let currentRun = 0;
  function row(name, pass, details) {
    const item = { name, status: pass ? 'PASS' : 'FAIL', details: String(details || '') };
    resultRows.push(item);
    const card = document.createElement('div'); card.className = 'check';
    const title = document.createElement('b'); title.textContent = `${item.status} · ${name}`;
    const note = document.createElement('small'); note.textContent = item.details;
    card.append(title, note); $('results').append(card);
    return item;
  }
  function setOverall() {
    const latest = resultRows.slice(currentRun);
    const pass = latest.filter(x => x.status === 'PASS').length;
    const fail = latest.filter(x => x.status === 'FAIL').length;
    const node = $('overall'); node.className = 'status ' + (fail ? 'fail' : 'pass');
    node.textContent = fail ? `${fail} failed · ${pass} passed` : `${pass} passed · no failed checks`;
    $('checkCount').textContent = `${latest.length} checks`;
  }
  async function fileChecks() {
    const paths = [
      ['app.js', './app.js'], ['sw.js', './sw.js'],
      ['Phase 3 CSS', './phase3-horny-mode.css'], ['Phase 3 JS', './phase3-horny-mode.js'],
      ['Wellness measurement SVG', './phase6-measurement-map.svg'],
      ['Wellness product specs SVG', './phase6-product-specs.svg'],
      ['Wellness comfort SVG', './phase6-comfort-check.svg'],
      ['Image rights workflow SVG', './phase6-image-rights-workflow.svg']
    ];
    for (const [name, path] of paths) {
      try {
        const response = await fetch(path, { cache: 'no-store', credentials: 'same-origin' });
        row(`${name} available`, response.ok, `HTTP ${response.status} · ${path}`);
      } catch (error) { row(`${name} available`, false, `${path} · ${error}`); }
    }
  }
  function inspectFrame(frame) {
    const doc = frame.contentDocument;
    if (!doc) throw new Error('Homepage frame is not readable from this origin.');
    const views = [...doc.querySelectorAll('.view[data-view]')].map(x => x.dataset.view);
    const wheels = ['boy','dildo','plug','wild'].filter(k => doc.querySelector(`[data-wheel-disc="${k}"]`));
    const mode = doc.getElementById('v3-randi-mode');
    row('Seven original views remain', ['home','stories','innerwear','sanskari','wellness','boyfriend','fit'].every(k => views.includes(k)), `${views.length} found: ${views.join(', ')}`);
    row('Four original wheel discs remain', wheels.length === 4, `${wheels.length}/4: ${wheels.join(', ')}`);
    const wellnessSvgPaths = ['phase6-measurement-map.svg','phase6-product-specs.svg','phase6-comfort-check.svg','phase6-image-rights-workflow.svg'];
    const wrongSvgPaths = [...doc.querySelectorAll('img[src]')].filter(img => /\.\/assets\/phase6-(?:measurement-map|product-specs|comfort-check|image-rights-workflow)\.svg$/.test(img.getAttribute('src') || ''));
    const validSvgImgs = [...doc.querySelectorAll('img[src]')].filter(img => wellnessSvgPaths.some(file => (img.getAttribute('src') || '').endsWith('/' + file) || (img.getAttribute('src') || '') === './' + file));
    row('Phase 6 education diagrams use valid paths', wrongSvgPaths.length === 0 && validSvgImgs.length >= 5, `${validSvgImgs.length} root-path diagram images found; ${wrongSvgPaths.length} wrong ./assets/ paths remain.`);
    row('Super Horny / Randi Mode inserted', !!mode, mode ? 'Found on Home below the existing hero.' : 'Module did not insert into Home. Check app.js load and browser console.');
    row('Four mood levels', (mode?.querySelectorAll('[data-v3-mode-mood]').length || 0) === 4, `${mode?.querySelectorAll('[data-v3-mode-mood]').length || 0}/4 mood buttons`);
    row('Three language options', (mode?.querySelectorAll('#v3ModeLanguage option').length || 0) === 3, `${mode?.querySelectorAll('#v3ModeLanguage option').length || 0}/3 language options`);
    row('Profanity toggle and 18+ checkbox', !!mode?.querySelector('#v3ModeProfanity') && !!mode?.querySelector('#v3ModeAdult'), 'Checks presence only; manual interaction should follow.');
    const deferred = doc.querySelectorAll('img[data-deferred-src]').length;
    row('Inactive-view image deferral applied', deferred > 0 || !doc.querySelector('.view:not(.active) img[src]'), `${deferred} images still deferred at check time.`);
    const w = frame.contentWindow;
    const resources = w.performance.getEntriesByType('resource');
    const scripts = resources.filter(r => r.initiatorType === 'script').length;
    const styles = resources.filter(r => r.initiatorType === 'css' || /\.css(?:\?|$)/.test(r.name)).length;
    const images = resources.filter(r => r.initiatorType === 'img' || /\.(?:webp|png|jpe?g|avif|svg)(?:\?|$)/i.test(r.name)).length;
    const transfer = resources.reduce((sum, r) => sum + (Number(r.transferSize) || 0), 0);
    row('Homepage resource snapshot', true, `${resources.length} resources · ${scripts} script-like · ${styles} stylesheet-like · ${images} image-like · ${transfer ? (transfer/1024).toFixed(1)+' KiB transfer size reported' : 'transfer size unavailable/cached/cross-origin'}`);
  }
  function waitForMode(frame, timeout = 6500) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      const poll = () => {
        try {
          if (frame.contentDocument?.getElementById('v3-randi-mode')) return resolve();
        } catch (_) { return reject(new Error('Homepage origin check failed.')); }
        if (Date.now() - start > timeout) return reject(new Error('Phase 3 mode did not appear before timeout.'));
        setTimeout(poll, 80);
      };
      poll();
    });
  }
  async function measureHome() {
    const frame = $('homeFrame'); $('frameWrap').hidden = false;
    $('speedResult').replaceChildren();
    const title = document.createElement('b'); title.textContent = 'Measuring homepage…';
    const note = document.createElement('small'); note.textContent = 'The next result is browser- and network-specific.';
    $('speedResult').append(title,note);
    const started = performance.now();
    await new Promise((resolve,reject) => {
      const timeout = setTimeout(() => reject(new Error('Homepage frame load timeout (15 seconds).')),15000);
      frame.onload = () => { clearTimeout(timeout); resolve(); };
      frame.onerror = () => { clearTimeout(timeout); reject(new Error('Homepage iframe failed to load.')); };
      frame.src = `./index.html?phase3diagnostic=${Date.now()}`;
    });
    await waitForMode(frame);
    const elapsed = performance.now() - started;
    const resources = frame.contentWindow.performance.getEntriesByType('resource');
    const images = resources.filter(r => r.initiatorType === 'img' || /\.(?:webp|png|jpe?g|avif|svg)(?:\?|$)/i.test(r.name));
    const loadedImages = [...frame.contentDocument.images].filter(img => img.complete && img.naturalWidth > 0).length;
    const failedImages = [...frame.contentDocument.images].filter(img => img.hasAttribute('src') && !img.dataset.deferredSrc && img.complete && img.naturalWidth === 0 && (img.currentSrc || img.getAttribute('src'))).length;
    const body = document.createElement('div'); body.className = 'check';
    const heading = document.createElement('b'); heading.textContent = `Home + mode ready in ${Math.round(elapsed)} ms`;
    const detail = document.createElement('small'); detail.textContent = `${resources.length} resources observed; ${images.length} image-like requests; ${loadedImages} loaded images currently in DOM; ${failedImages} failed/empty images currently in DOM. Repeat after a cache-cleared reload for a comparable cold-load check.`;
    body.append(heading,detail); $('speedResult').replaceChildren(body);
    row('Homepage frame reached mode-ready state', true, `${Math.round(elapsed)} ms in this run. Not a standardized Lighthouse score.`);
    row('Visible/document image state snapshot', failedImages === 0, `${loadedImages} loaded · ${failedImages} failed/empty; hidden lazy images may not have been requested yet.`);
  }
  async function runAll() {
    currentRun = resultRows.length; $('results').replaceChildren();
    await fileChecks();
    try {
      await measureHome();
      inspectFrame($('homeFrame'));
    } catch (error) { row('Homepage smoke test completed', false, String(error)); }
    setOverall();
  }
  $('runAll').addEventListener('click', () => { runAll().catch(error => { row('Diagnostic runner', false, error); setOverall(); }); });
  $('runHome').addEventListener('click', async () => {
    currentRun = resultRows.length; $('results').replaceChildren();
    try { await measureHome(); inspectFrame($('homeFrame')); }
    catch (error) { row('Homepage smoke test completed', false, String(error)); }
    setOverall();
  });
  $('exportCsv').addEventListener('click', () => {
    const rows = [['check','status','details'], ...resultRows.map(r => [r.name,r.status,r.details])];
    const csv = rows.map(r => r.map(value => `"${String(value).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'PHASE3_V3_DIAGNOSTICS.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
