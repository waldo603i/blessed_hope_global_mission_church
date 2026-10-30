const CACHE = 'knowing-god-preview-v5-foundations';
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        '/',
        '/foundations',
        '/icon-church.png',
        '/images/church-emblem.webp',
        '/images/moriah.webp'
      ]).catch(() => {})
    )
  );
  self.skipWaiting();
});
self.addEventListener('activate', event =>
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(k => k.startsWith('knowing-god-preview-') && k !== CACHE)
            .map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
);
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/editorial') ||
    url.pathname.startsWith('/api/editorial')
  )
    return;
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || (await caches.match('/')))
    );
    return;
  }
  if (
    url.pathname.startsWith('/translations/') ||
    url.pathname.startsWith('/api/lessons/') ||
    url.pathname === '/api/references' ||
    url.pathname === '/api/scripture' ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/illustrations/') ||
    url.pathname.startsWith('/icon')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || Response.error())
    );
  }
});
