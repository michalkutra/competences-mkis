const CACHE = 'ksap-v9';
const ASSETS = [
  './',
  './index.html',
  './questions-unified.js',
  './questions-wiedza.js',
  './session-wiedza.js',
  './bg.png',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: zawsze próbujemy świeżej wersji (żeby deploye były widoczne od razu,
// bez bumpowania wersji cache), a cache służy jako fallback offline. Udane odpowiedzi
// same-origin odświeżają cache, żeby offline miało aktualną kopię.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
