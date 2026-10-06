/* Copia local para que la guía abra rápido y funcione sin conexión.
   Siempre intenta primero la red, así las novedades aparecen enseguida. */
var CACHE = 'hangout-v2';

self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ev) {
  var pedido = ev.request;
  if (pedido.method !== 'GET' || new URL(pedido.url).origin !== location.origin) return;
  if (new URL(pedido.url).pathname.indexOf('admin') !== -1) return;
  ev.respondWith(
    fetch(pedido, { cache: 'no-cache' }).then(function (respuesta) {
      var copia = respuesta.clone();
      caches.open(CACHE).then(function (c) { c.put(pedido, copia); });
      return respuesta;
    }).catch(function () { return caches.match(pedido); })
  );
});
