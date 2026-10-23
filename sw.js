/* BLACKED V3 Phase 2: lean app-shell precache; media is cached only after it is requested. */
'use strict';
const CACHE_NAME = 'blacked-v3-phase2-performance-1';
const CORE = [
  './index.html',
  './styles.css', './part-c-enhancements.css', './phase2-photo-collections.css',
  './phase3-design-system.css', './phase3.css', './phase4-story-universe.css',
  './phase5-image-reliability.css', './phase5-product-discovery.css',
  './phase6-boyfriend-studio.css', './phase6-wellness-collections.css', './phase7-8-enhancements.css',
  './fallback.js', './app.js', './part-c-enhancements.js', './phase2-photo-collections.js',
  './phase3.js', './phase4-home-and-fantasy.js', './phase4-story-universe.js',
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
  const stale = keys.filter(key => key.startsWith('blacked-') && key !== CACHE_NAME);
  await Promise.all(stale.map(key => caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (request.mode === 'navigate') {
      try {
        const network = await fetch(request);
        if (network.ok) await cache.put(request, network.clone());
        return network;
      } catch (_) {
        return (await cache.match(request)) || (await cache.match('./index.html')) || Response.error();
      }
    }

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
