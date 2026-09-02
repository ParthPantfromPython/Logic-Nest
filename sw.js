const CACHE_NAME='logic-nest-shell-v1';
const CORE=['./','./index.html','./videos.html','./projects.js','./manifest.json','./Gemini_Generated_Image_f72yx0f72yx0f72y.png','./Gemini_Generated_Image_zbt2ejzbt2ejzbt2.png','./Gemini_Generated_Image_f72yx0f72yx0f72yh.ico'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy)).catch(()=>{});return res}).catch(()=>caches.match(req).then(res=>res||caches.match('./index.html'))))});
