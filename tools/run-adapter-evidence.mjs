import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import * as esbuild from "esbuild";
import ffmpegPath from "ffmpeg-static";

const execFileAsync = promisify(execFile);
const projectDir = "experiments/013-adapter-sampler";
const evidenceDir = `${projectDir}/evidence`;
const outputDir = `${projectDir}/output`;

const adapters = [
  { name: "three", project: `${projectDir}/three`, output: `${outputDir}/three-adapter-proof.mp4`, frame: `${evidenceDir}/frame-three.png` },
  { name: "anime", project: `${projectDir}/anime`, output: `${outputDir}/anime-adapter-proof.mp4`, frame: `${evidenceDir}/frame-anime.png` },
  { name: "d3", project: `${projectDir}/d3`, output: `${outputDir}/d3-adapter-proof.mp4`, frame: `${evidenceDir}/frame-d3.png` },
  { name: "lottie", project: `${projectDir}/lottie`, output: `${outputDir}/lottie-adapter-proof.mp4`, frame: `${evidenceDir}/frame-lottie.png` },
  { name: "pixi", project: `${projectDir}/pixi`, output: `${outputDir}/pixi-adapter-proof.mp4`, frame: `${evidenceDir}/frame-pixi.png` },
];

function hyperframesArgs(args) {
  const binary = process.platform === "win32"
    ? resolve("node_modules/.bin/hyperframes.cmd")
    : resolve("node_modules/.bin/hyperframes");
  return process.platform === "win32" ? ["/d", "/c", binary, ...args] : [binary, ...args];
}

const command = process.platform === "win32" ? "cmd.exe" : process.execPath;

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

async function prepareBundles() {
  for (const adapter of adapters) {
    await mkdir(`${adapter.project}/vendor`, { recursive: true });
    await esbuild.build({
      entryPoints: [`${adapter.project}/source/entry.js`],
      bundle: true,
      outfile: `${adapter.project}/vendor/bundle.js`,
      format: "esm",
      platform: "browser",
      target: "es2020",
      loader: { ".json": "json" },
      logLevel: "silent",
    });
  }
}

async function runHyperframes(adapter, args) {
  await execFileAsync(command, hyperframesArgs(args), {
    cwd: process.cwd(),
    maxBuffer: 100 * 1024 * 1024,
  });
}

async function extractFrame(adapter) {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static did not provide an FFmpeg binary path.");
  }

  await mkdir(dirname(adapter.frame), { recursive: true });
  await execFileAsync(ffmpegPath, [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    "00:00:01.5",
    "-i",
    adapter.output,
    "-frames:v",
    "1",
    adapter.frame,
  ]);
}

async function runChecks() {
  await prepareBundles();

  for (const adapter of adapters) {
    await runHyperframes(adapter, ["lint", adapter.project]);
    await runHyperframes(adapter, ["inspect", adapter.project]);
  }
}

async function runRenders() {
  await prepareBundles();
  await mkdir(evidenceDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  const summary = [];

  for (const adapter of adapters) {
    await runHyperframes(adapter, [
      "render",
      adapter.project,
      "--docker",
      "--strict-all",
      "--workers",
      "1",
      "--output",
      adapter.output,
    ]);
    await extractFrame(adapter);

    const artifact = await stat(adapter.output);
    const frame = await stat(adapter.frame);
    summary.push({
      name: adapter.name,
      project: adapter.project,
      output: adapter.output,
      frame: adapter.frame,
      composition: await readCompositionMeta(adapter.project),
      sizeBytes: artifact.size,
      frameSizeBytes: frame.size,
      bridge: "project-local hf-seek bridge",
    });
  }

  await writeFile(`${evidenceDir}/adapter-summary.json`, JSON.stringify(summary, null, 2), "utf8");
  console.log(`Wrote adapter evidence to ${evidenceDir}`);
}

const mode = process.argv[2] || "render";

if (mode === "prepare") {
  await prepareBundles();
} else if (mode === "check") {
  await runChecks();
} else if (mode === "frames") {
  for (const adapter of adapters) {
    await extractFrame(adapter);
  }
} else if (mode === "render") {
  await runRenders();
} else {
  throw new Error(`Unknown adapter evidence mode: ${mode}`);
}
