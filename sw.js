/* BLACKED V1 Phase 4 service worker. Scoped to this GitHub Pages project only. */
'use strict';
const CACHE_NAME = 'blacked-v1-phase4-recovery-1';
const CORE = ['./index.html','./styles.css','./fallback.js','./app.js','./manifest.webmanifest','./app-icon.svg','./phase4-diagnostics.html'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(CORE.map(async path => {
      try {
        const response = await fetch(path, {cache:'reload'});
        if (response.ok) await cache.put(path, response);
      } catch { /* Continue even if one optional core file is briefly unavailable. */ }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const obsoleteForThisProject = new Set(['blacked-fusion-v1-phase3']);
    await Promise.all(keys.filter(key => (key.startsWith('blacked-v1-phase4-recovery-') && key !== CACHE_NAME) || obsoleteForThisProject.has(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Original images are loaded from verified public GitHub raw URLs.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) { const cache = await caches.open(CACHE_NAME); await cache.put(request, fresh.clone()); }
        return fresh;
      } catch {
        return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) { const cache = await caches.open(CACHE_NAME); await cache.put(request, response.clone()); }
      return response;
    } catch { return Response.error(); }
  })());
});
