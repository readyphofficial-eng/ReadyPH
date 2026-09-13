/* Minimal service worker: cache portal shell so app is installable + works offline for basic UI. */
const CACHE = 'readyph-v1';
const ASSETS = [
  '/portal.html',
  '/manifest.webmanifest'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      // Cache same-origin GET responses only
      const url = new URL(req.url);
      if (url.origin === self.location.origin && res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
      }
      return res;
    }).catch(() => caches.match('/portal.html')))
  );
});
