/*
 * V1 Phase 2+3 compatibility loader for Brand-website-4f.
 * Does not overwrite the original root app.js or styles.css.
 * Repairs legacy assets/<root-file> paths, registers the current service worker,
 * then loads the original app and Phase 3 enhancement script in order.
 */
(() => {
  'use strict';
  const shim = document.currentScript;
  if (!shim) {
    console.error('[V1 Phase 2+3] Could not identify the compatibility-loader script.');
    return;
  }

  const siteRoot = new URL('../', shim.src);
  const state = window.BLACKED_PHASE2 = {
    version: '2.1.0-phase3-ready',
    siteRoot: siteRoot.href,
    imagePathRewrites: 0,
    cssPathRewrites: 0,
    imageRetryCount: 0,
    serviceWorker: 'pending',
    originalApp: 'pending',
    phase3: 'pending'
  };

  function rootFallbackForURL(candidate, baseURL) {
    try {
      const u = candidate instanceof URL ? candidate : new URL(String(candidate), baseURL || document.baseURI);
      if (u.origin !== location.origin) return null;
      const legacyPrefix = siteRoot.pathname + 'assets/';
      if (!u.pathname.startsWith(legacyPrefix)) return null;
      const tail = u.pathname.slice(legacyPrefix.length);
      // Map only assets/<root-filename>. Do not flatten legitimate nested paths.
      if (!tail || tail.includes('/')) return null;
      return new URL(tail + u.search + u.hash, siteRoot);
    } catch (_) { return null; }
  }

  function normalizeAttribute(el, attr) {
    const original = el.getAttribute(attr);
    if (!original || /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(original.trim())) return;
    const mapped = rootFallbackForURL(original, document.baseURI);
    if (!mapped) return;
    const current = attr === 'href' ? el.href : attr === 'poster' ? el.poster : el.src;
    if (mapped.href !== current && mapped.href !== original) {
      el.setAttribute(attr, mapped.href);
      state.imagePathRewrites++;
    }
  }

  function normalizeSrcset(el) {
    const original = el.getAttribute('srcset');
    if (!original || /data:/i.test(original)) return;
    let changed = false;
    const next = original.split(',').map(part => {
      const entry = part.trim();
      if (!entry) return entry;
      const bits = entry.split(/\s+/);
      const mapped = rootFallbackForURL(bits[0], document.baseURI);
      if (!mapped) return entry;
      bits[0] = mapped.href; changed = true;
      return bits.join(' ');
    }).join(', ');
    if (changed && next !== original) { el.setAttribute('srcset', next); state.imagePathRewrites++; }
  }

  function normalizeElement(el) {
    if (!el || el.nodeType !== 1) return;
    ['src', 'href', 'poster'].forEach(attr => normalizeAttribute(el, attr));
    normalizeSrcset(el);
  }
  function normalizeTree(node) {
    if (!node) return;
    if (node.nodeType === 1) normalizeElement(node);
    if (node.querySelectorAll) node.querySelectorAll('[src], [href], [poster], [srcset]').forEach(normalizeElement);
  }

  // Capture-phase retry is deliberately limited to the known legacy one-level path.
  document.addEventListener('error', event => {
    const el = event.target;
    if (!(el instanceof HTMLImageElement) || el.dataset.phase2Retried === '1') return;
    const mapped = rootFallbackForURL(el.currentSrc || el.src, document.baseURI);
    if (!mapped) return;
    el.dataset.phase2Retried = '1'; state.imageRetryCount++; el.src = mapped.href;
  }, true);

  normalizeTree(document);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') normalizeElement(record.target);
      for (const added of record.addedNodes || []) normalizeTree(added);
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['src','href','poster','srcset']});

  function normalizeStylesheet(sheet, visited = new Set()) {
    if (!sheet || visited.has(sheet)) return;
    visited.add(sheet);
    let rules; try { rules = sheet.cssRules; } catch (_) { return; }
    if (!rules) return;
    for (const rule of Array.from(rules)) {
      if (rule.style) {
        for (const prop of Array.from(rule.style)) {
          const value = rule.style.getPropertyValue(prop);
          if (!value || !value.toLowerCase().includes('assets/')) continue;
          const next = value.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (full, quote, raw) => {
            const mapped = rootFallbackForURL(raw.trim(), sheet.href || siteRoot.href);
            if (!mapped) return full;
            state.cssPathRewrites++; return `url("${mapped.href}")`;
          });
          if (next !== value) rule.style.setProperty(prop, next);
        }
      }
      if (rule.styleSheet) normalizeStylesheet(rule.styleSheet, visited);
      if (rule.cssRules) for (const child of Array.from(rule.cssRules)) if (child.styleSheet) normalizeStylesheet(child.styleSheet, visited);
    }
  }
  function normalizeAllStylesheets() { Array.from(document.styleSheets).forEach(sheet => normalizeStylesheet(sheet)); }
  normalizeAllStylesheets();
  window.addEventListener('load', normalizeAllStylesheets, {once:true});

  if (!document.querySelector('link[rel="manifest"]')) {
    const link = document.createElement('link'); link.rel = 'manifest';
    link.href = new URL('../manifest.webmanifest', shim.src).href; document.head.appendChild(link);
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('../sw.js', shim.src).href, {scope:siteRoot.pathname})
      .then(() => { state.serviceWorker = 'registered'; })
      .catch(err => { state.serviceWorker = 'failed'; console.warn('[V1 Phase 2+3] Service worker registration failed; path normalization remains active.', err); });
  } else state.serviceWorker = 'unsupported';

  function loadPhase3() {
    if (document.querySelector('script[data-phase3-enhancement]')) { state.phase3 = 'already-present'; return; }
    const feature = document.createElement('script');
    feature.src = new URL('../phase3.js', shim.src).href;
    feature.dataset.phase3Enhancement = 'true';
    feature.onload = () => { state.phase3 = window.BLACKED_PHASE3 ? 'loaded' : 'loaded-without-status'; };
    feature.onerror = () => { state.phase3 = 'failed'; console.error('[V1 Phase 3] phase3.js failed to load. Check that it is at the repository root.'); };
    document.body.appendChild(feature);
  }

  if (!document.querySelector('script[data-phase2-original-app]')) {
    const original = document.createElement('script');
    original.src = new URL('../app.js', shim.src).href;
    original.async = false;
    original.dataset.phase2OriginalApp = 'true';
    original.onload = () => {
      state.originalApp = window.BLACKED_FUSION31 ? 'loaded' : 'loaded-without-diagnostics-hook';
      loadPhase3();
    };
    original.onerror = () => {
      state.originalApp = 'failed'; state.phase3 = 'blocked-original-app-failed';
      console.error('[V1 Phase 2+3] Original root app.js did not load. Confirm app.js exists at repository root.');
    };
    document.body.appendChild(original);
  } else loadPhase3();
})();
