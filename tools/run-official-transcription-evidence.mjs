import ffmpegPath from "ffmpeg-static";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { delimiter, join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const evidenceDir = "experiments/005-transcribe-captions/evidence";
const sourceDir = "experiments/005-transcribe-captions/source";
const localBinDir = "tools/.cache/bin";
const officialReleaseDir = "tools/.cache/whisper-official/x64/Release";
const whisperCliPath = resolve(officialReleaseDir, "whisper-cli.exe");
const ffmpegName = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
const ffmpegLocalPath = resolve(localBinDir, ffmpegName);
const hyperframesCommand = process.platform === "win32"
  ? resolve("node_modules/.bin/hyperframes.cmd")
  : resolve("node_modules/.bin/hyperframes");
const command = process.platform === "win32" ? "cmd.exe" : hyperframesCommand;

function hyperframesArgs(args) {
  return process.platform === "win32"
    ? ["/d", "/c", hyperframesCommand, ...args]
    : args;
}

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

async function capture(commandName, args, stdoutPath, stderrPath, options = {}) {
  try {
    const result = await execFileAsync(commandName, args, {
      cwd: process.cwd(),
      env: options.env ?? process.env,
      maxBuffer: 80 * 1024 * 1024,
    });
    await writeFile(stdoutPath, normalizeOutput(result.stdout), "utf8");
    await writeFile(stderrPath, normalizeOutput(result.stderr), "utf8");
    return 0;
  } catch (error) {
    await writeFile(stdoutPath, normalizeOutput(error.stdout), "utf8");
    await writeFile(stderrPath, normalizeOutput(error.stderr ?? error.message), "utf8");
    throw error;
  }
}

if (!ffmpegPath) {
  console.error("ffmpeg-static did not resolve a binary path.");
  process.exit(1);
}

if (!existsSync(whisperCliPath)) {
  console.error("Missing official whisper-cli.exe. Run: npm run transcribe:setup:official");
  process.exit(1);
}

await mkdir(evidenceDir, { recursive: true });
await mkdir(sourceDir, { recursive: true });
await mkdir(localBinDir, { recursive: true });
await copyFile(ffmpegPath, ffmpegLocalPath);

const env = {
  ...process.env,
  HYPERFRAMES_WHISPER_PATH: whisperCliPath,
  PATH: `${resolve(officialReleaseDir)}${delimiter}${resolve(localBinDir)}${delimiter}${process.env.PATH ?? ""}`,
};

await capture(
  whisperCliPath,
  ["--help"],
  `${evidenceDir}/official-whisper-cli-help.txt`,
  `${evidenceDir}/official-whisper-cli-help.stderr.txt`,
  { env },
);

await capture(
  command,
  hyperframesArgs([
    "transcribe",
    "audio/generated/hyperframes-in-60-seconds-af-nova.wav",
    "--model",
    "tiny.en",
    "--language",
    "en",
    "--json",
  ]),
  `${evidenceDir}/generated-transcript-official-whisper.json`,
  `${evidenceDir}/generated-transcript-official-whisper.stderr.txt`,
  { env },
);

if (existsSync("audio/generated/transcript.json")) {
  await copyFile("audio/generated/transcript.json", `${sourceDir}/official-hyperframes-transcript.json`);
}

const releaseMetadataPath = "tools/.cache/whisper-official/release.json";
if (existsSync(releaseMetadataPath)) {
  const releaseMetadata = JSON.parse(await readFile(releaseMetadataPath, "utf8"));
  await writeFile(`${evidenceDir}/official-whisper-release.json`, JSON.stringify(releaseMetadata, null, 2), "utf8");
}

console.log(`Wrote official Whisper transcription evidence to ${evidenceDir}`);
