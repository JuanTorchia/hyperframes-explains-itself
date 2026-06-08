import { createServer } from "node:http";
import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const sourceDir = resolve("experiments/007-capture-website/source-site");
const outputDir = resolve("experiments/007-capture-website/output");
const evidenceDir = resolve("experiments/007-capture-website/evidence");
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
]);

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
      const filePath = resolve(join(sourceDir, pathname));

      if (!filePath.startsWith(sourceDir) || !existsSync(filePath)) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes.get(extname(filePath)) ?? "application/octet-stream",
      });
      response.end(body);
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });
}

await mkdir(evidenceDir, { recursive: true });
await rm(outputDir, { recursive: true, force: true });

const server = createStaticServer();

await new Promise((resolveListen) => {
  server.listen(0, "127.0.0.1", resolveListen);
});

const address = server.address();
const url = `http://127.0.0.1:${address.port}/`;

try {
  const result = await execFileAsync(
    npxCommand,
    ["hyperframes", "capture", url, "--output", outputDir, "--max-screenshots", "4", "--json"],
    {
      cwd: process.cwd(),
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  await writeFile(join(evidenceDir, "capture.json"), result.stdout || "", "utf8");
  await writeFile(join(evidenceDir, "capture.stderr.txt"), result.stderr || "", "utf8");
  console.log(`Captured ${url} into ${outputDir}`);
} finally {
  server.close();
}
