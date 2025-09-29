// Service worker for app1 that responds to messages in { type: 'GET_DATA' }
self.addEventListener('message', (event) => {
    if (event.data.type === 'GET_DATA') {
        const response = { data: 'Hello from ServiceWorker app1!' };
        event.ports[0].postMessage(response);
    }
});

self.addEventListener(
  "fetch",
  /** @type {(event: FetchEvent) => {}}*/
  async (event) => {
    console.log("app1 sw fetch", event.request.url);
    const cache = await caches.open("app1");
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    const req = pathname === "/app2/" ? "/app1/" : pathname;
    const cachedResponse = await cache.match(req);
    if (cachedResponse) {
      return event.respondWith(cachedResponse);
    }

    const response = await fetch(event.request);
    if (response && response.status === 200) {
      cache.put(req, response.clone());
    }
    return event.respondWith(response);
  }
);
