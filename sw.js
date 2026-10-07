const CACHE='crm-marchesano-v12';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(r.mode==='navigate'||r.destination==='document'){e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));return x}).catch(()=>caches.match(r)));return}e.respondWith(caches.match(r).then(c=>fetch(r).then(x=>{if(x.ok)caches.open(CACHE).then(k=>k.put(r,x.clone()));return x}).catch(()=>c)))});
