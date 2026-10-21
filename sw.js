/* BLACKED V1 Phase 6 service worker. Same-origin caching only; external source images remain network resources. */
'use strict';
const CACHE_NAME = 'blacked-v1-release-candidate-1';
const CORE = ['./','./index.html','./styles.css','./fallback.js','./app.js','./manifest.webmanifest','./app-icon.svg','./innerwear-image-library.json','./INNERWEAR_IMAGE_LIBRARY_MANIFEST.csv','./size-chart-template.json','./phase4-diagnostics.html','./phase5-diagnostics.html','./phase6-diagnostics.html','./phase7-diagnostics.html','./README.md'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await Promise.allSettled(CORE.map(async path=>{try{const r=await fetch(path,{cache:'reload',credentials:'same-origin'});if(r.ok)await cache.put(path,r)}catch{}}));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  const old=keys.filter(k=>k.startsWith('blacked-v1-phase4-recovery-')||k.startsWith('blacked-v1-phase5-image-library-')||k==='blacked-fusion-v1-phase3'||(k.startsWith('blacked-v1-phase6-hardening-')&&k!==CACHE_NAME));
  await Promise.all(old.map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith((async()=>{try{const r=await fetch(req);if(r.ok){const c=await caches.open(CACHE_NAME);await c.put('./index.html',r.clone())}return r}catch{return(await caches.match(req))||(await caches.match('./index.html'))||Response.error()}})());
    return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try{
      const network=await fetch(req);
      if(network.ok && network.type==='basic') await cache.put(req,network.clone());
      return network;
    }catch{
      return (await cache.match(req))||Response.error();
    }
  })());
});
