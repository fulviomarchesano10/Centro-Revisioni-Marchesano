const CACHE='crm-marchesano-v10';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'||r.destination==='document'){
   e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r)));return;
 }
 e.respondWith(caches.match(r).then(c=>fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(x=>x.put(r,res.clone()));return res}).catch(()=>c)));
});