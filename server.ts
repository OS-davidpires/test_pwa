import { serveFile } from "jsr:@std/http/file-server";

Deno.serve((req) => {
    const url = new URL(req.url);
    if (url.pathname === '/') {
        return serveFile(req, './web/app1.index.html');
    }

    if (url.pathname === '/app1.sw.js') {
        return serveFile(req, './web/app1.sw.js');
    }

    return new Response("Unknown route", { status: 404 });
});