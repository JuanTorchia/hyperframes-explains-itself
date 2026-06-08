import { mkdir, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";

const execFileAsync = promisify(execFile);
const projectDir = "experiments/015-remove-background";
const sourcePath = `${projectDir}/source/scott-carpenter-portrait.jpg`;
const outputPath = `${projectDir}/output/scott-carpenter-portrait-transparent.png`;
const evidenceDir = `${projectDir}/evidence`;
const ffprobePath = typeof ffprobeStatic === "string" ? ffprobeStatic : ffprobeStatic.path;
const sourceUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Scott_Carpenter_1964_Portrait_%284x5_cropped%29.jpg";
const sourcePage = "https://commons.wikimedia.org/wiki/File:Scott_Carpenter_1964_Portrait_(4x5_cropped).jpg";

function hyperframesArgs(args) {
  const binary = process.platform === "win32"
    ? resolve("node_modules/.bin/hyperframes.cmd")
    : resolve("node_modules/.bin/hyperframes");
  return process.platform === "win32" ? ["/d", "/c", binary, ...args] : [binary, ...args];
}

const command = process.platform === "win32" ? "cmd.exe" : process.execPath;

function pathWithLocalMediaTools() {
  const delimiter = process.platform === "win32" ? ";" : ":";
  return [
    ffmpegPath ? dirname(ffmpegPath) : null,
    ffprobePath ? dirname(ffprobePath) : null,
    process.env.PATH,
  ].filter(Boolean).join(delimiter);
}

async function runHyperframes(args) {
  return execFileAsync(command, hyperframesArgs(args), {
    cwd: process.cwd(),
    env: {
      ...process.env,
      FFMPEG_PATH: ffmpegPath,
      FFPROBE_PATH: ffprobePath,
      PATH: pathWithLocalMediaTools(),
    },
    maxBuffer: 100 * 1024 * 1024,
  });
}

async function createSourceImage() {
  await mkdir(`${projectDir}/source`, { recursive: true });

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download source image: ${response.status} ${response.statusText}`);
  }

  await writeFile(sourcePath, Buffer.from(await response.arrayBuffer()));
  await mkdir(evidenceDir, { recursive: true });
  const source = await stat(sourcePath);
  await writeFile(`${evidenceDir}/source-image.json`, JSON.stringify({
    source: sourcePath,
    sourcePage,
    sourceUrl,
    licenseNote: "NASA public domain image as documented on Wikimedia Commons.",
    sizeBytes: source.size,
  }, null, 2), "utf8");
}

async function runInfo() {
  await mkdir(evidenceDir, { recursive: true });
  const result = await runHyperframes(["remove-background", "--info", "--json"]);
  await writeFile(`${evidenceDir}/remove-background-info.json`, result.stdout, "utf8");
  if (result.stderr) {
    await writeFile(`${evidenceDir}/remove-background-info.stderr.txt`, result.stderr, "utf8");
  }
}

async function runRender() {
  await mkdir(`${projectDir}/output`, { recursive: true });
  await mkdir(evidenceDir, { recursive: true });
  const result = await runHyperframes([
    "remove-background",
    sourcePath,
    "--device",
    "cpu",
    "--output",
    outputPath,
    "--json",
  ]);
  await writeFile(`${evidenceDir}/remove-background-result.json`, result.stdout, "utf8");
  if (result.stderr) {
    await writeFile(`${evidenceDir}/remove-background-result.stderr.txt`, result.stderr, "utf8");
  }

  const source = await stat(sourcePath);
  const output = await stat(outputPath);
  await writeFile(`${evidenceDir}/remove-background-summary.json`, JSON.stringify({
    source: sourcePath,
    output: outputPath,
    sourceSizeBytes: source.size,
    outputSizeBytes: output.size,
    device: "cpu",
  }, null, 2), "utf8");
}

const mode = process.argv[2] || "render";

if (mode === "source") {
  await createSourceImage();
} else if (mode === "info") {
  await runInfo();
} else if (mode === "render") {
  await runRender();
} else {
  throw new Error(`Unknown remove-background evidence mode: ${mode}`);
}
