import ffmpegPath from "ffmpeg-static";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { delimiter, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const hyperframesCommand = process.platform === "win32"
  ? resolve("node_modules/.bin/hyperframes.cmd")
  : resolve("node_modules/.bin/hyperframes");
const command = process.platform === "win32" ? "cmd.exe" : hyperframesCommand;
const args = process.platform === "win32"
  ? ["/d", "/c", hyperframesCommand, "benchmark", "experiments/004-benchmark/minimal", "--runs", "1", "--json"]
  : ["benchmark", "experiments/004-benchmark/minimal", "--runs", "1", "--json"];
const evidenceDir = "experiments/004-benchmark/evidence";
const localBinDir = "tools/.cache/bin";
const ffmpegName = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
const localFfmpegPath = resolve(localBinDir, ffmpegName);

if (!ffmpegPath) {
  console.error("ffmpeg-static did not resolve a binary path.");
  process.exit(1);
}

await mkdir(evidenceDir, { recursive: true });
await mkdir(localBinDir, { recursive: true });
await copyFile(ffmpegPath, localFfmpegPath);

const browserPath = (await readFile("experiments/003-cli-introspection/evidence/browser-path.txt", "utf8")).trim();
const env = {
  ...process.env,
  HYPERFRAMES_BROWSER_PATH: browserPath,
  PRODUCER_HEADLESS_SHELL_PATH: browserPath,
  PUPPETEER_EXECUTABLE_PATH: browserPath,
  PATH: `${resolve(localBinDir)}${delimiter}${process.env.PATH ?? ""}`,
};

const result = await execFileAsync(
  command,
  args,
  {
    cwd: process.cwd(),
    env,
    maxBuffer: 40 * 1024 * 1024,
  },
);

await writeFile(`${evidenceDir}/benchmark-runs-1-fixed.txt`, result.stdout ?? "", "utf8");
await writeFile(`${evidenceDir}/benchmark-runs-1-fixed.stderr.txt`, result.stderr ?? "", "utf8");
console.log(`Wrote fixed benchmark evidence to ${evidenceDir}`);
