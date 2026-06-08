import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectDir = "experiments/010-social-aspects";
const evidenceDir = `${projectDir}/evidence`;
const outputDir = `${projectDir}/output`;

const renders = [
  { name: "landscape", project: `${projectDir}/landscape`, output: `${outputDir}/social-landscape.mp4` },
  { name: "portrait", project: `${projectDir}/portrait`, output: `${outputDir}/social-portrait.mp4` },
  { name: "square", project: `${projectDir}/square`, output: `${outputDir}/social-square.mp4` },
];

async function readCompositionMeta(project) {
  const html = await readFile(`${project}/index.html`, "utf8");
  const getNumber = (name) => {
    const match = html.match(new RegExp(`${name}="([0-9.]+)"`));
    return match ? Number(match[1]) : null;
  };

  return {
    width: getNumber("data-width"),
    height: getNumber("data-height"),
    durationSeconds: getNumber("data-duration"),
    fps: getNumber("data-fps"),
  };
}

function hyperframesArgs(args) {
  const binary = process.platform === "win32"
    ? resolve("node_modules/.bin/hyperframes.cmd")
    : resolve("node_modules/.bin/hyperframes");
  return process.platform === "win32" ? ["/d", "/c", binary, ...args] : [binary, ...args];
}

const command = process.platform === "win32" ? "cmd.exe" : process.execPath;

await mkdir(evidenceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });

const summary = [];

for (const item of renders) {
  await execFileAsync(command, hyperframesArgs([
    "render",
    item.project,
    "--docker",
    "--strict-all",
    "--workers",
    "1",
    "--output",
    item.output,
  ]), { cwd: process.cwd(), maxBuffer: 80 * 1024 * 1024 });

  const stats = await import("node:fs/promises").then((fs) => fs.stat(item.output));
  const composition = await readCompositionMeta(item.project);
  summary.push({
    name: item.name,
    project: item.project,
    output: item.output,
    exists: existsSync(item.output),
    composition,
    sizeBytes: stats.size,
  });
}

await writeFile(`${evidenceDir}/social-aspects-summary.json`, JSON.stringify(summary, null, 2), "utf8");
console.log(`Wrote social aspect evidence to ${evidenceDir}`);
