// Service worker for app1 that responds to messages in { type: 'GET_DATA' }
self.addEventListener('message', (event) => {
    if (event.data.type === 'GET_DATA') {
        const response = { data: 'Hello from ServiceWorker app2!' };
        event.ports[0].postMessage(response);
    }
});

self.addEventListener(
  "fetch",
  /** @type {(event: FetchEvent) => {}}*/ async (event) => {
    if (event.request.method !== "GET") {
      return;
    }
    
    console.log("app2 sw fetch", event.request.url);
    const cache = await caches.open("app2");

    const match = await cache.match(event.request);
    if (match) {
      return event.respondWith(match);
    }

    const response = await fetch(event.request);
    if (response && response.status === 200) {
      cache.put(event.request, response.clone());
    }
    return event.respondWith(response);
  }
);