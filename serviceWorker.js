importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const staticOnuSite = "onu-site-v1";
const assets =  [
  //"/",
  //"/index.html",
  //"/src/app/css/App.css",
  //"/src/app/css/refresh.css",
  //"/src/app/javascript/App.js",
  //"/src/app/javascript/refresh.js",
  //"/accets/default_profile_photo/fp_13.jpg"
];
/*
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticOnuSite).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  const { request } = fetchEvent;

  // Cache first strategy for static assets
  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept').includes('text/html'))) {
    fetchEvent.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          return caches.open(staticOnuSite).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }).catch(error => {
        window.location.href = '/src/app/html/offline.html';
        return caches.match('/src/app/html/offline.html');
      })
    );
  } else {
    // Network first strategy for other requests
    fetchEvent.respondWith(
      fetch(request).catch(() => {
        return caches.match(request).then(response => {
          return response || new Response(null, { status: 404 });
        });
      })
    );
  }
});
*/