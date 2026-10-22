/* BLACKED V2 Phase 2+3 repair service worker. */
'use strict';
const CACHE_NAME = 'blacked-v2-phase2-image-repair-2';
const CORE = [
  './','./index.html','./styles.css','./app.js','./fallback.js','./part-c-enhancements.css','./part-c-enhancements.js',
  './manifest.webmanifest','./app-icon.svg','./innerwear-image-library.json','./size-chart-template.json',
  './phase23-diagnostics.html','./part-a-diagnostics.html','./part-b-diagnostics.html',
  './phase4-diagnostics.html','./phase5-diagnostics.html','./phase6-diagnostics.html','./phase7-diagnostics.html',
  './part-c-diagnostics.html',
  './male-reference-01.webp','./male-reference-02.webp',
  './male-reference-03.webp','./male-reference-04.webp',
  './threesome-fantasy-cover.webp',
  './tease-guess-wheel.webp','./after-dark-questions.webp',
  './blacked-red-lace-campaign.webp',
  './sanskari-outside-bold-within.webp','./shaam-se-raat-tak.webp',
  './shaam-ki-roshni.webp','./shaam-e-noor.webp','./noor-ka-nasha.webp',
  './sanskari-outside-bold-within-high-res.webp','./sanskari-outside-bold-within-web-optimized.webp',
  './innerwere-luxury-trio.webp',
  './soft-rose-rest-restore.webp',
  './black-gold-styling-01.webp',
  './comfort-styling.webp',
  './rose-lace-back-detail.webp',
  './rose-lace-lifestyle.webp',
  './black-veil-editorial.webp',
  './black-gold-confidence.webp',
  './sacred-elegance-editorial.webp',
  './black-lace-confidence.webp',
  './night-light-confidence.webp',
  './active-couple-concept.webp',
  './same-girl-different-stories.webp',
  './same-room-different-feelings.webp',
  './feel-confident-everyday.webp',
  './couple-confidence.webp'
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
