const CACHE='ba-tl-v4-4-4';
const SHELL=["./", "./index.html", "./students_local.json", "./raids_local.json", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./boss-icons/Binah.svg", "./boss-icons/Chesed.svg", "./boss-icons/Geburah.svg", "./boss-icons/Goz.svg", "./boss-icons/Gregorius.svg", "./boss-icons/Hieronymus.svg", "./boss-icons/Hod.svg", "./boss-icons/HoverCraft.svg", "./boss-icons/Kaiten.svg", "./boss-icons/Kurokage.svg", "./boss-icons/Perorodzilla.svg", "./boss-icons/ShiroKuro.svg", "./boss-icons/Yesod.svg"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{
      const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(fetch(e.request).then(r=>{
    const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
    return r;
  }).catch(()=>caches.match(e.request)));
});
