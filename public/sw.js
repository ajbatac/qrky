// QRky PWA Service Worker
// Network-first for HTML (prevents stale app shell on deploy)
// Cache-first for static assets (fast loads for images/fonts etc.)

// IMPORTANT: This version string is replaced at build time by vite.config.ts
// to ensure the SW updates on every new deploy. Do not change manually.
const CACHE_VERSION = '__SW_CACHE_VERSION__';
const CACHE_NAME = `qrky-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/manifest.webmanifest',
  '/icons-192.png',
  '/icons-512.png',
  '/qrky-logo-small.png',
  '/og.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Take control immediately — old SW is replaced right away
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // --- NETWORK-FIRST for HTML (index.html / navigation requests) ---
  // This ensures returning visitors always get the latest app shell.
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Cache the fresh response for offline fallback
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback — serve cached index.html if network fails
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // --- CACHE-FIRST for hashed JS/CSS assets (immutable, safe to cache forever) ---
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
    return;
  }

  // --- STALE-WHILE-REVALIDATE for everything else (images, manifest, etc.) ---
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
        return networkResponse;
      });
      return cached || networkFetch;
    })
  );
});
