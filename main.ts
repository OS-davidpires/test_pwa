import { serveFile } from "jsr:@std/http/file-server";

Deno.serve((req) => {
    const url = new URL(req.url);
    if (url.pathname === '/') {
        return serveFile(req, './web/app1.index.html');
    }

    if (url.pathname === '/app1.sw.js') {
        return serveFile(req, './web/app1.sw.js');
    }

    if (url.pathname === "/app2/") {
      if (req.method === "GET") {
        return serveFile(req, "./web/app2.index.html");
      } else {
        return new Response("{ data: 'OK' }", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    if (url.pathname === '/app2/app2.sw.js') {
        return serveFile(req, './web/app2.sw.js');
    }

    if (url.pathname === "/app2") {
      return new Response(null, {
        headers: { Location: "/app2/" },
        status: 301,
      });
    }

    return new Response("Unknown route", { status: 404 });
});