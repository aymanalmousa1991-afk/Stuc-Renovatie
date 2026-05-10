// Dev script: start zowel de frontend (Vite) als backend (Hono)
import { spawn } from "child_process";
import { createServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startDev() {
  // Start Vite
  const server = await createServer({
    root: __dirname,
    server: {
      port: 3000,
      allowedHosts: true,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  });
  await server.listen();
  console.log(`\n[dev] Frontend: http://localhost:3000`);

  // Start Hono backend separately
  const backend = spawn("node", [
    "--import",
    "@esbuild-kit/esm-loader",
    path.resolve(__dirname, "api/boot.ts"),
  ], {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: "3001",
      NODE_ENV: "development",
    },
  });

  backend.on("error", (err) => {
    console.error("[dev] Backend failed to start:", err.message);
    console.log("[dev] Running frontend-only mode...");
  });

  backend.on("exit", (code) => {
    if (code !== 0) {
      console.log(`[dev] Backend exited with code ${code}`);
      console.log("[dev] Running frontend-only mode...");
    }
  });
}

startDev().catch(console.error);
