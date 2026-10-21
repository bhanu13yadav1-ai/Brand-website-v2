/* BLACKED Fusion — Phase 2 corrected service worker.
   Uses the repository's real root-level files and repairs legacy
   assets/<filename> requests without flattening nested future asset folders. */
'use strict';
const CACHE_NAME = 'blacked-fusion-phase2-v2';
const CORE_URLS = [
  './index.html',
  './app.js',
  './styles.css',
  './manifest.webmanifest',
  './hero-model-crop.webp',
  './look-black-lace.webp',
  './look-sanskari-blue.webp',
  './sanskari-ankhein.webp',
  './sanskari-entry.webp',
  './sanskari-mirror.webp',
  './sanskari-pallu.webp',
  './sanskari-raat.webp',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('blacked-fusion-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

function rootFallbackUrl(requestUrl) {
  const target = new URL(requestUrl);
  const scope = new URL(self.registration.scope);
  if (target.origin !== scope.origin || !target.pathname.startsWith(scope.pathname)) return null;
  const relative = target.pathname.slice(scope.pathname.length);
  const match = relative.match(/^assets\/([^/]+)$/);
  if (!match) return null;
  const fallback = new URL(match[1], scope);
  fallback.search = target.search;
  return fallback;
}

async function saveIfSuccessful(cache, requestKey, response) {
  if (response && response.ok && response.type !== 'opaque') {
    try { await cache.put(requestKey, response.clone()); } catch (_) { /* cache quota/unsupported response */ }
  }
}

async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const isNavigation = request.mode === 'navigate' || new URL(request.url).pathname.endsWith('.html');
  if (isNavigation) {
    try {
      const live = await fetch(request);
      await saveIfSuccessful(cache, request, live);
      if (live.ok) return live;
    } catch (_) { /* try the offline copy below */ }
    const cached = await cache.match(request) || await cache.match('./index.html');
    return cached || new Response('Offline and no cached page is available.', {
      status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const cachedFirst = await cache.match(request);
  if (cachedFirst) return cachedFirst;

  let primary = null;
  try {
    primary = await fetch(request);
    if (primary.ok) {
      await saveIfSuccessful(cache, request, primary);
      return primary;
    }
  } catch (_) { /* try a corrected root path or cache */ }

  const fallbackUrl = rootFallbackUrl(request.url);
  if (fallbackUrl) {
    const fallbackCached = await cache.match(fallbackUrl.href);
    if (fallbackCached) {
      await saveIfSuccessful(cache, request, fallbackCached);
      return fallbackCached;
    }
    try {
      const fallbackResponse = await fetch(fallbackUrl.href);
      if (fallbackResponse.ok) {
        await saveIfSuccessful(cache, fallbackUrl.href, fallbackResponse);
        await saveIfSuccessful(cache, request, fallbackResponse);
        return fallbackResponse;
      }
    } catch (_) { /* report the primary response or cached root file */ }
  }

  if (primary) return primary;
  const cachedAfterFailure = await cache.match(request) || (fallbackUrl ? await cache.match(fallbackUrl.href) : null);
  return cachedAfterFailure || new Response('Asset unavailable. Check the repository path and uploaded files.', {
    status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(scope.pathname)) return;
  event.respondWith(handleRequest(request));
});
