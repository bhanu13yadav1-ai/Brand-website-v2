/* BLACKED V2 Phase 2+3 repair service worker. */
'use strict';
const CACHE_NAME = 'blacked-v2-phase23-repair-1';
const CORE = [
  './','./index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',
  './manifest.webmanifest','./app-icon.svg','./innerwear-image-library.json','./size-chart-template.json',
  './phase23-diagnostics.html','./part-a-diagnostics.html','./part-b-diagnostics.html',
  './phase4-diagnostics.html','./phase5-diagnostics.html','./phase6-diagnostics.html','./phase7-diagnostics.html',
  './part-c-diagnostics.html',
  './assets/fantasy-gallery/male-reference-01.webp','./assets/fantasy-gallery/male-reference-02.webp',
  './assets/fantasy-gallery/male-reference-03.webp','./assets/fantasy-gallery/male-reference-04.webp',
  './assets/fantasy-gallery/threesome-fantasy-cover.webp',
  './assets/wheel-posters/tease-guess-wheel.webp','./assets/wheel-posters/after-dark-questions.webp',
  './assets/campaigns/blacked-red-lace-campaign.webp',
  './assets/sanskari/sanskari-outside-bold-within.webp','./assets/sanskari/shaam-se-raat-tak.webp',
  './assets/sanskari/shaam-ki-roshni.webp','./assets/sanskari/shaam-e-noor.webp','./assets/sanskari/noor-ka-nasha.webp',
  './assets/sanskari/sanskari-outside-bold-within-high-res.webp','./assets/sanskari/sanskari-outside-bold-within-web-optimized.webp'
];
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(CORE.map(async path => {
    try { const response = await fetch(path, {cache:'reload'}); if (response.ok) await cache.put(path, response); } catch {}
  }));
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
      } catch {
        return (await cache.match(request)) || (await cache.match('./index.html')) || Response.error();
      }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const network = await fetch(request);
      if (network.ok && url.origin === self.location.origin) await cache.put(request, network.clone());
      return network;
    } catch {
      return (await cache.match(request)) || Response.error();
    }
  })());
});
