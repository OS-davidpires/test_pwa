// Service worker for app1 that responds to messages in { type: 'GET_DATA' }
self.addEventListener('message', (event) => {
    if (event.data.type === 'GET_DATA') {
        const response = { data: 'Hello from ServiceWorker app1!' };
        event.ports[0].postMessage(response);
    }
});
