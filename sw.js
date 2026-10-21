/* BLACKED Fusion — Phase 2+3 service worker. */
'use strict';
const CACHE_NAME = 'blacked-fusion-v1-phase3';
const CORE_URLS = [
  './', './index.html', './app.js', './styles.css', './css/styles.css', './js/app.js',
  './phase3.js', './phase3.css', './manifest.webmanifest',
  './hero-model-crop.webp', './look-black-lace.webp', './look-sanskari-blue.webp',
  './sanskari-ankhein.webp', './sanskari-entry.webp', './sanskari-mirror.webp',
  './sanskari-pallu.webp', './sanskari-raat.webp', './campaign-sanskari-raat.webp',
  './campaign-aankhein.webp', './campaign-entry-shareef.webp', './campaign-mirror.webp',
  './campaign-pallu-shareef.webp', './wellness-app-reference.webp', './icon-192.png', './icon-512.png',
  './phase2-diagnostics.html', './phase3-diagnostics.html'
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
    await Promise.all(keys.filter(key => key.startsWith('blacked-fusion-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
function rootFallbackUrl(requestUrl) {
  const target = new URL(requestUrl); const scope = new URL(self.registration.scope);
  if (target.origin !== scope.origin || !target.pathname.startsWith(scope.pathname)) return null;
  const relative = target.pathname.slice(scope.pathname.length); const match = relative.match(/^assets\/([^/]+)$/);
  if (!match) return null;
  const fallback = new URL(match[1], scope); fallback.search = target.search; return fallback;
}
async function saveIfSuccessful(cache, requestKey, response) {
  if (response && response.ok && response.type !== 'opaque') {
    try { await cache.put(requestKey, response.clone()); } catch (_) { /* cache quota or unsupported response */ }
  }
}
async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  if (isNavigation) {
    try { const live = await fetch(request); if (live.ok) { await saveIfSuccessful(cache, request, live); return live; } }
    catch (_) { /* try the offline copy */ }
    const cached = await cache.match(request) || await cache.match('./index.html');
    return cached || new Response('Offline and no cached page is available.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
  const cachedFirst = await cache.match(request);
  if (cachedFirst) return cachedFirst;
  let primary = null;
  try { primary = await fetch(request); if (primary.ok) { await saveIfSuccessful(cache, request, primary); return primary; } }
  catch (_) { /* try legacy path fallback */ }
  const fallbackUrl = rootFallbackUrl(request.url);
  if (fallbackUrl) {
    const fallbackCached = await cache.match(fallbackUrl.href);
    if (fallbackCached) { await saveIfSuccessful(cache, request, fallbackCached); return fallbackCached; }
    try { const response = await fetch(fallbackUrl.href); if (response.ok) { await saveIfSuccessful(cache, fallbackUrl.href, response); await saveIfSuccessful(cache, request, response); return response; } }
    catch (_) { /* report the original failure below */ }
  }
  if (primary) return primary;
  const cachedAfterFailure = await cache.match(request) || (fallbackUrl ? await cache.match(fallbackUrl.href) : null);
  return cachedAfterFailure || new Response('Asset unavailable. Check the repository path and uploaded files.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
self.addEventListener('fetch', event => {
  const request = event.request; if (request.method !== 'GET') return;
  const url = new URL(request.url); if (url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope); if (!url.pathname.startsWith(scope.pathname)) return;
  event.respondWith(handleRequest(request));
});
