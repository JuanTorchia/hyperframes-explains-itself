import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectDir = "experiments/011-render-controls";
const evidenceDir = `${projectDir}/evidence`;
const outputDir = `${projectDir}/output`;

const renders = [
  { name: "draft", args: ["--quality", "draft"], output: `${outputDir}/render-controls-draft.mp4` },
  { name: "standard", args: ["--quality", "standard"], output: `${outputDir}/render-controls-standard.mp4` },
  { name: "high", args: ["--quality", "high"], output: `${outputDir}/render-controls-high.mp4` },
  { name: "crf-28", args: ["--crf", "28"], output: `${outputDir}/render-controls-crf-28.mp4` },
  { name: "bitrate-2m", args: ["--video-bitrate", "2M"], output: `${outputDir}/render-controls-bitrate-2m.mp4` },
];

async function readCompositionMeta() {
  const html = await readFile(`${projectDir}/index.html`, "utf8");
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
const composition = await readCompositionMeta();

for (const item of renders) {
  await execFileAsync(command, hyperframesArgs([
    "render",
    projectDir,
    "--docker",
    "--strict-all",
    "--workers",
    "1",
    "--output",
    item.output,
    ...item.args,
  ]), { cwd: process.cwd(), maxBuffer: 80 * 1024 * 1024 });

  const stats = await stat(item.output);
  summary.push({
    name: item.name,
    args: item.args,
    output: item.output,
    composition,
    sizeBytes: stats.size,
  });
}

await writeFile(`${evidenceDir}/render-controls-summary.json`, JSON.stringify(summary, null, 2), "utf8");
console.log(`Wrote render control evidence to ${evidenceDir}`);
