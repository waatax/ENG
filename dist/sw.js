// Network-first Service Worker for English Quest (caches core HTML/CSS/MJS/JSON shell; never bulk-caches MP3s).
const CACHE_NAME = 'english-quest-shell-v20261103-launch2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('.mp3')) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200 && /\.(html|css|mjs|js|json|webmanifest)$/.test(url.pathname)) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
