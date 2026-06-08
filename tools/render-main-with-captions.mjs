import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const evidenceDir = "evidence/captions";
const rootIndexPath = "index.html";
const variantIndexPath = "variants/main-with-captions/index.html";
const outputPath = "renders/hyperframes-in-60-seconds-with-captions.mp4";

function normalizeOutput(value) {
  if (!value) {
    return "";
  }

  const normalized = value
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n+$/u, "");

  return normalized ? `${normalized}\n` : "";
}

async function run(command, args, stdoutPath, stderrPath) {
  try {
    const result = await execFileAsync(command, args, {
      cwd: process.cwd(),
      maxBuffer: 100 * 1024 * 1024,
    });
    await writeFile(stdoutPath, normalizeOutput(result.stdout), "utf8");
    await writeFile(stderrPath, normalizeOutput(result.stderr), "utf8");
  } catch (error) {
    await writeFile(stdoutPath, normalizeOutput(error.stdout), "utf8");
    await writeFile(stderrPath, normalizeOutput(error.stderr ?? error.message), "utf8");
    throw error;
  }
}

function hyperframesArgs(args) {
  const binary = process.platform === "win32"
    ? resolve("node_modules/.bin/hyperframes.cmd")
    : resolve("node_modules/.bin/hyperframes");
  return process.platform === "win32" ? ["/d", "/c", binary, ...args] : [binary, ...args];
}

const command = process.platform === "win32" ? "cmd.exe" : process.execPath;

await mkdir(evidenceDir, { recursive: true });

const originalIndex = await readFile(rootIndexPath, "utf8");
const variantIndex = await readFile(variantIndexPath, "utf8");

try {
  await writeFile(rootIndexPath, variantIndex, "utf8");
  await run(command, hyperframesArgs(["lint"]), `${evidenceDir}/main-captions-lint.txt`, `${evidenceDir}/main-captions-lint.stderr.txt`);
  await run(command, hyperframesArgs(["inspect"]), `${evidenceDir}/main-captions-inspect.txt`, `${evidenceDir}/main-captions-inspect.stderr.txt`);
  await run(
    command,
    hyperframesArgs(["render", "--docker", "--strict-all", "--workers", "1", "--output", outputPath]),
    `${evidenceDir}/main-captions-render.txt`,
    `${evidenceDir}/main-captions-render.stderr.txt`,
  );
} finally {
  await writeFile(rootIndexPath, originalIndex, "utf8");
}

console.log(`Rendered captioned main walkthrough to ${outputPath}`);
