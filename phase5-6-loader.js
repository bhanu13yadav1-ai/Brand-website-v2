/* BLACKED V3 Phase 5–6 bootstrap.
   Add one script tag to index.html to load the already-uploaded Phase 1–4 overlays
   in the required order, then the new reliability and Boyfriend Studio modules. */
(() => {
  'use strict';
  if (window.BLACKED_V3_PHASE56_BOOT) return;
  const VERSION = '7.8.0';
  const state = { version: VERSION, stylesLoaded: [], scriptsLoaded: [], errors: [], startedAt: new Date().toISOString() };
  const withVersion = path => `${path}?v=${VERSION}`;
  function showNotice(message) {
    let note = document.getElementById('v56LoaderNotice');
    if (!note) {
      note = document.createElement('aside');
      note.id = 'v56LoaderNotice';
      note.setAttribute('role', 'status');
      note.style.cssText = 'position:fixed;z-index:99999;left:12px;right:12px;bottom:12px;padding:12px 14px;border:1px solid #eacb8c;border-radius:12px;background:#181219;color:#fff5fa;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 32px #0008;';
      document.body.append(note);
    }
    note.textContent = message;
  }
  function addStyle(path) {
    return new Promise(resolve => {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = withVersion(path);
      link.dataset.v56Asset = path;
      let done = false;
      const finish = ok => { if (done) return; done = true; clearTimeout(timer); if (ok) state.stylesLoaded.push(path); else state.errors.push(`Stylesheet failed: ${path}`); resolve(ok); };
      const timer = setTimeout(() => finish(false), 12000);
      link.addEventListener('load', () => finish(true), { once:true });
      link.addEventListener('error', () => finish(false), { once:true });
      document.head.append(link);
    });
  }
  function addScript(path) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = withVersion(path); script.async = false; script.dataset.v56Asset = path;
      let done = false;
      const finish = ok => { if (done) return; done = true; clearTimeout(timer); if (ok) state.scriptsLoaded.push(path); else state.errors.push(`Script failed: ${path}`); resolve(ok); };
      const timer = setTimeout(() => finish(false), 15000);
      script.addEventListener('load', () => finish(true), { once:true });
      script.addEventListener('error', () => finish(false), { once:true });
      document.body.append(script);
    });
  }
  async function start() {
    if (window.BLACKED_V3_PHASE56_BOOT) return;
    window.BLACKED_V3_PHASE56_BOOT = state;
    // Load later CSS after existing styles so the new layouts visibly override the old crowded cards.
    for (const path of [
      './phase2-photo-collections.css',
      './phase3-design-system.css',
      './phase5-image-reliability.css',
      './phase6-boyfriend-studio.css',
      './phase7-8-enhancements.css'
    ]) await addStyle(path);
    // These Phase 1–4 JS/CSS files already exist in the connected repo; index.html simply did not load them.
    for (const path of [
      './phase2-photo-collections.js',
      './phase4-home-and-fantasy.js',
      './phase5-image-reliability.js',
      './phase6-boyfriend-studio.js',
      './phase7-8-enhancements.js'
    ]) await addScript(path);
    document.documentElement.dataset.blackedV3Phase56 = state.errors.length ? 'degraded' : 'loaded';
    document.documentElement.dataset.blackedV3Phase78Loader = state.errors.length ? 'degraded' : 'loaded';
    if (state.errors.length) showNotice(`BLACKED V3 loaded with ${state.errors.length} integration issue(s). Open phase5-6-diagnostics.html and check missing file paths.`);
    else document.documentElement.dataset.blackedV3Phase56 = 'loaded';
    window.dispatchEvent(new CustomEvent('blacked:v3-phase56-ready', { detail: { ...state } }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();
