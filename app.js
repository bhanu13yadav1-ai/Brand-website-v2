/*
 * V1 Phase 2 compatibility loader for the existing Brand-website-4f repository.
 * Keep the original root app.js unchanged. This file is loaded by the current
 * index.html (which expects js/app.js), repairs legacy assets/<filename> paths,
 * registers the corrected service worker, then loads ../app.js.
 */
(() => {
  'use strict';
  const shim = document.currentScript;
  if (!shim) {
    console.error('[V1 Phase 2] Could not identify the compatibility-loader script.');
    return;
  }

  const siteRoot = new URL('../', shim.src);
  const state = window.BLACKED_PHASE2 = {
    version: '2.0.0-path-compat',
    siteRoot: siteRoot.href,
    imagePathRewrites: 0,
    cssPathRewrites: 0,
    imageRetryCount: 0,
    serviceWorker: 'pending',
    originalApp: 'pending'
  };

  function rootFallbackForURL(candidate, baseURL) {
    try {
      const u = candidate instanceof URL ? candidate : new URL(String(candidate), baseURL || document.baseURI);
      if (u.origin !== location.origin) return null;
      const legacyPrefix = siteRoot.pathname + 'assets/';
      if (!u.pathname.startsWith(legacyPrefix)) return null;
      const tail = u.pathname.slice(legacyPrefix.length);
      // Only map the known broken shape assets/<root-filename>. Do not flatten
      // legitimate future paths such as assets/new-gallery/photo.webp.
      if (!tail || tail.includes('/')) return null;
      return new URL(tail + u.search + u.hash, siteRoot);
    } catch (_) {
      return null;
    }
  }

  function normalizeAttribute(el, attr) {
    const original = el.getAttribute(attr);
    if (!original || /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(original.trim())) return;
    const mapped = rootFallbackForURL(original, document.baseURI);
    if (!mapped) return;
    const absolute = mapped.href;
    if (absolute !== el.href && absolute !== el.src && absolute !== original) {
      el.setAttribute(attr, absolute);
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
      bits[0] = mapped.href;
      changed = true;
      return bits.join(' ');
    }).join(', ');
    if (changed && next !== original) {
      el.setAttribute('srcset', next);
      state.imagePathRewrites++;
    }
  }

  function normalizeElement(el) {
    if (!el || el.nodeType !== 1) return;
    ['src', 'href', 'poster'].forEach(attr => normalizeAttribute(el, attr));
    normalizeSrcset(el);
  }

  function normalizeTree(node) {
    if (!node) return;
    if (node.nodeType === 1) normalizeElement(node);
    if (node.querySelectorAll) {
      node.querySelectorAll('[src], [href], [poster], [srcset]').forEach(normalizeElement);
    }
  }

  // Register capture-phase fallback before the original application adds its
  // own broken-image placeholder handler. The wrong path is repaired first.
  document.addEventListener('error', event => {
    const el = event.target;
    if (!(el instanceof HTMLImageElement)) return;
    if (el.dataset.phase2Retried === '1') return;
    const mapped = rootFallbackForURL(el.currentSrc || el.src, document.baseURI);
    if (!mapped) return;
    el.dataset.phase2Retried = '1';
    state.imageRetryCount++;
    el.src = mapped.href;
  }, true);

  normalizeTree(document);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') normalizeElement(record.target);
      for (const added of record.addedNodes || []) normalizeTree(added);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['src', 'href', 'poster', 'srcset']
  });

  // Patch CSS url(...) values in same-origin stylesheets too. This handles
  // root CSS files that still refer to assets/<filename>.
  function normalizeStylesheet(sheet, visited = new Set()) {
    if (!sheet || visited.has(sheet)) return;
    visited.add(sheet);
    let rules;
    try { rules = sheet.cssRules; } catch (_) { return; }
    if (!rules) return;
    for (const rule of Array.from(rules)) {
      if (rule.style) {
        for (const prop of Array.from(rule.style)) {
          const value = rule.style.getPropertyValue(prop);
          if (!value || !value.toLowerCase().includes('assets/')) continue;
          const next = value.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (full, quote, raw) => {
            const mapped = rootFallbackForURL(raw.trim(), sheet.href || siteRoot.href);
            if (!mapped) return full;
            state.cssPathRewrites++;
            return `url("${mapped.href}")`;
          });
          if (next !== value) rule.style.setProperty(prop, next);
        }
      }
      if (rule.styleSheet) normalizeStylesheet(rule.styleSheet, visited);
      if (rule.cssRules) {
        for (const child of Array.from(rule.cssRules)) {
          if (child.styleSheet) normalizeStylesheet(child.styleSheet, visited);
        }
      }
    }
  }
  function normalizeAllStylesheets() {
    for (const sheet of Array.from(document.styleSheets)) normalizeStylesheet(sheet);
  }
  normalizeAllStylesheets();
  window.addEventListener('load', normalizeAllStylesheets, { once: true });

  // Connect the existing app manifest to the root-level icon files, without
  // forcing a manual index.html edit.
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = new URL('../manifest.webmanifest', shim.src).href;
    document.head.appendChild(manifest);
  }

  // Register the corrected root service worker. App startup does not depend on
  // service-worker support; the runtime path normalizer above still works.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('../sw.js', shim.src).href, { scope: siteRoot.pathname })
      .then(() => { state.serviceWorker = 'registered'; })
      .catch(err => {
        state.serviceWorker = 'failed';
        console.warn('[V1 Phase 2] Service worker registration failed; path normalizer remains active.', err);
      });
  } else {
    state.serviceWorker = 'unsupported';
  }

  // index.html expects js/app.js, while the full original app is at ./app.js.
  // Load the original script once, after installing all compatibility handlers.
  if (!document.querySelector('script[data-phase2-original-app]')) {
    const original = document.createElement('script');
    original.src = new URL('../app.js', shim.src).href;
    original.async = false;
    original.dataset.phase2OriginalApp = 'true';
    original.onload = () => {
      state.originalApp = window.BLACKED_FUSION31 ? 'loaded' : 'loaded-without-diagnostics-hook';
    };
    original.onerror = () => {
      state.originalApp = 'failed';
      console.error('[V1 Phase 2] Original root app.js did not load. Confirm app.js exists at the repository root.');
    };
    document.body.appendChild(original);
  }
})();
