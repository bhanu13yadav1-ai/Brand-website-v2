/* BLACKED V3 Phase 6: app-shell only at startup; Phase 6 studio is fetched when opened. */
'use strict';
const CACHE_NAME = 'blacked-v7-final-release-phase6-ux-1';
const CORE = [
  './index.html',
  './styles.css', './part-c-enhancements.css', './phase2-photo-collections.css',
  './phase3-design-system.css', './phase3.css', './phase4-story-universe.css',
  './phase5-image-reliability.css', './phase5-product-discovery.css',
  './fallback.js', './app.js', './part-c-enhancements.js', './phase2-photo-collections.js',
  './phase3.js', './phase3-4-experience.js', './phase4-home-and-fantasy.js', './phase4-story-universe.js',
  './phase5-image-reliability.js', './phase5-product-discovery.js', './phase6-lazy-loader.js', './phase7-8-lazy-loader.js',
  './manifest.webmanifest', './app-icon.svg',
  './phase4-story-universe.json'
];

// Keep startup fan-out bounded; a failed optional file doesn't block the service worker install.
async function precacheWithLimit(cache, paths, limit = 6) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, paths.length) }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      try {
        const response = await fetch(path, { cache: 'reload' });
        if (response.ok && response.type === 'basic') await cache.put(path, response);
      } catch (_) { /* Offline or unavailable optional path: keep installing. */ }
    }
  });
  await Promise.all(workers);
}

self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE_NAME);
  await precacheWithLimit(cache, CORE, 6);
  await self.skipWaiting();
})()));

self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  const stale = keys.filter(key => key.startsWith('blacked-v') && key !== CACHE_NAME);
  await Promise.all(stale.map(key => caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const cachePromise = caches.open(CACHE_NAME);
    const networkPromise = cachePromise.then(cache => fetch(request).then(async network => {
      if (network.ok) await cache.put(request, network.clone());
      return network;
    }));
    event.waitUntil(networkPromise.then(() => undefined).catch(() => undefined));
    event.respondWith((async () => {
      let timer;
      const timeoutPromise = new Promise(resolve => { timer = setTimeout(() => resolve(null), 1800); });
      const network = await Promise.race([networkPromise, timeoutPromise]);
      clearTimeout(timer);
      if (network) return network;
      const cache = await cachePromise;
      const cached = (await cache.match(request)) || (await cache.match('./index.html'));
      if (cached) return cached;
      try { return await networkPromise; } catch (_) { return Response.error(); }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const network = await fetch(request);
      // Cache app-owned local assets only after the visitor actually requests them.
      if (network.ok && network.type === 'basic') await cache.put(request, network.clone());
      return network;
    } catch (_) {
      return (await cache.match(request)) || Response.error();
    }
  })());
});
