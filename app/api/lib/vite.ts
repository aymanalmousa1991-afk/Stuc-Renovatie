import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Try multiple possible paths for dist/public
  const possiblePaths = [
    path.resolve(__dirname, "../../dist/public"),
    path.resolve(__dirname, "../../../dist/public"),
    path.resolve(process.cwd(), "dist/public"),
  ];

  let distPublicPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPublicPath = p;
      break;
    }
  }

  console.log("[vite] __dirname:", __dirname);
  console.log("[vite] cwd:", process.cwd());
  console.log("[vite] distPublicPath found:", distPublicPath);

  if (!distPublicPath) {
    console.error("[vite] Could not find dist/public directory!");
    return;
  }

  // List files in distPublicPath for debugging
  try {
    const files = fs.readdirSync(distPublicPath);
    console.log("[vite] Files in dist/public:", files);
  } catch (e) {
    console.error("[vite] Could not read dist/public:", e);
  }

  // Serve all static files
  app.use("*", serveStatic({ root: distPublicPath }));

  // SPA fallback: serve index.html for all non-API routes
  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPublicPath, "index.html");

    if (!fs.existsSync(indexPath)) {
      console.error("[vite] index.html not found at:", indexPath);
      return c.text("Frontend build not found. Run 'npm run build' first.", 500);
    }

    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
