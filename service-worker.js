const CACHE_NAME = 'aetherplay-w3-v7.4';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest',
  './css/style.css', './js/app.js', './js/firebase.js', './js/v7-player.js', './js/admin.js',
  './assets/aetherplay-logo.png', './assets/aetherplay-token.png',
  './assets/aetherplay-icon-192.png', './assets/aetherplay-icon-512.png',
  './games/aether-snake.html', './games/aether-snake.css', './games/aether-snake.js'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async path => {
      try { await cache.add(new Request(path, {cache:'reload'})); } catch (error) { /* optional file */ }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('aetherplay-w3-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Never cache Firebase/API traffic.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (error) {
        return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const fresh = await fetch(request);
      if (fresh.ok) { const cache = await caches.open(CACHE_NAME); cache.put(request, fresh.clone()); }
      return fresh;
    } catch (error) { return cached || Response.error(); }
  })());
});
