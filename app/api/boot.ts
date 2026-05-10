import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { initDatabase } from "./lib/init";
import { serveStaticFiles } from "./lib/vite";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Error logging middleware
app.onError((err, c) => {
  console.error("[api error]", err);
  return c.json({ error: err.message }, 500);
});

app.use("/api/trpc/*", async (c) => {
  try {
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: c.req.raw,
      router: appRouter,
      createContext,
    });
  } catch (err) {
    console.error("[trpc error]", err);
    throw err;
  }
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

// Serve static frontend files in production
if (env.isProduction) {
  serveStaticFiles(app);
}

// Initialize database + seed on first run (async now)
initDatabase().catch((err) => {
  console.error("[init] Database initialization failed:", err);
});

export default app;

// Always start the server (both dev and production)
const { serve } = await import("@hono/node-server");

const port = parseInt(process.env.PORT || "3000");
serve({ fetch: app.fetch, port }, () => {
  console.log(`[api] Server running on http://localhost:${port}/`);
});
