/* BLACKED V3 Phase 3: lean app-shell cache, bounded navigation wait, media-on-request. */
'use strict';
const CACHE_NAME = 'blacked-v3-phase3-randi-performance-1';
const CORE = [
  './index.html',
  './styles.css', './part-c-enhancements.css', './phase2-photo-collections.css',
  './phase3-design-system.css', './phase3.css', './phase3-horny-mode.css', './phase4-story-universe.css',
  './phase5-image-reliability.css', './phase5-product-discovery.css',
  './phase6-boyfriend-studio.css', './phase6-wellness-collections.css', './phase7-8-enhancements.css',
  './fallback.js', './app.js', './part-c-enhancements.js', './phase2-photo-collections.js',
  './phase3.js', './phase3-horny-mode.js', './phase4-home-and-fantasy.js', './phase4-story-universe.js',
  './phase5-image-reliability.js', './phase5-product-discovery.js',
  './phase6-boyfriend-studio.js', './phase6-wellness-collections.js', './phase7-8-enhancements.js',
  './manifest.webmanifest', './app-icon.svg', './innerwear-image-library.json', './size-chart-template.json',
  './phase4-story-universe.json',
  './phase6-measurement-map.svg', './phase6-product-specs.svg',
  './phase6-comfort-check.svg', './phase6-image-rights-workflow.svg'
];

// Bound install-time network fan-out: at most six small app-shell requests at once.
async function precacheWithLimit(cache, paths, limit = 6) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, paths.length) }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      try {
        const response = await fetch(path, { cache: 'reload' });
        if (response.ok && response.type === 'basic') await cache.put(path, response);
      } catch (_) {
        // Offline or unavailable optional path: continue installing the remaining app shell.
      }
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
  const stale = keys.filter(key => key.startsWith('blacked-v3-') && key !== CACHE_NAME);
  await Promise.all(stale.map(key => caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Network first, but cap the wait on a slow mobile connection. Keep the fetch alive to refresh cache.
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
      // Runtime-cache local assets only when the visitor actually requests them.
      if (network.ok && network.type === 'basic') await cache.put(request, network.clone());
      return network;
    } catch (_) {
      return (await cache.match(request)) || Response.error();
    }
  })());
});
