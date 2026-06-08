import ffmpegPath from "ffmpeg-static";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { delimiter, join, resolve } from "node:path";
import { homedir } from "node:os";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const evidenceDir = "experiments/005-transcribe-captions/evidence";
const sourceDir = "experiments/005-transcribe-captions/source";
const scratchDir = "experiments/005-transcribe-captions/scratch";
const localBinDir = "tools/.cache/bin";
const ffmpegName = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
const ffmpegLocalPath = resolve(localBinDir, ffmpegName);
const whisperPath = process.platform === "win32"
  ? resolve(".venv/Scripts/whisper-cpp.exe")
  : resolve(".venv/bin/whisper-cpp");
const modelPath = join(homedir(), ".cache", "hyperframes", "whisper", "models", "ggml-tiny.en.bin");
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
    if (options.allowFailure) {
      return error.code ?? 1;
    }
    throw error;
  }
}

if (!ffmpegPath) {
  console.error("ffmpeg-static did not resolve a binary path.");
  process.exit(1);
}

if (!existsSync(whisperPath)) {
  console.error("Missing whisper.cpp-cli binary. Run: npm run transcribe:setup");
  process.exit(1);
}

await mkdir(evidenceDir, { recursive: true });
await mkdir(sourceDir, { recursive: true });
await mkdir(scratchDir, { recursive: true });
await mkdir(localBinDir, { recursive: true });
await copyFile(ffmpegPath, ffmpegLocalPath);

const env = {
  ...process.env,
  HYPERFRAMES_WHISPER_PATH: whisperPath,
  PATH: `${resolve(localBinDir)}${delimiter}${process.env.PATH ?? ""}`,
};

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
  `${evidenceDir}/generated-transcript-with-local-whisper.json`,
  `${evidenceDir}/generated-transcript-with-local-whisper.stderr.txt`,
  {
    env: {
      ...process.env,
      HYPERFRAMES_WHISPER_PATH: whisperPath,
    },
    allowFailure: true,
  },
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
  `${evidenceDir}/generated-transcript-fixed.json`,
  `${evidenceDir}/generated-transcript-fixed.stderr.txt`,
  { env, allowFailure: true },
);

if (!existsSync(modelPath)) {
  console.error(`Missing Whisper model after HyperFrames probe: ${modelPath}`);
  process.exit(1);
}

await capture(
  ffmpegLocalPath,
  [
    "-y",
    "-i",
    "audio/generated/hyperframes-in-60-seconds-af-nova.wav",
    "-ar",
    "16000",
    "-ac",
    "1",
    "-f",
    "wav",
    `${scratchDir}/voiceover-16k.wav`,
  ],
  `${evidenceDir}/ffmpeg-voiceover-16k.txt`,
  `${evidenceDir}/ffmpeg-voiceover-16k.stderr.txt`,
);

await capture(
  whisperPath,
  [
    "--model",
    modelPath,
    "--output-json-full",
    "--output-file",
    `${scratchDir}/direct-transcript`,
    "--dtw",
    "tiny.en",
    "--suppress-nst",
    "--language",
    "en",
    `${scratchDir}/voiceover-16k.wav`,
  ],
  `${evidenceDir}/direct-whisper.stdout.txt`,
  `${evidenceDir}/direct-whisper.stderr.txt`,
  { allowFailure: true },
);

await capture(
  whisperPath,
  [
    "--model",
    modelPath,
    "--output-json-full",
    "--output-file",
    `${sourceDir}/direct-whisper-transcript`,
    "--dtw",
    "tiny.en",
    "--language",
    "en",
    `${scratchDir}/voiceover-16k.wav`,
  ],
  `${evidenceDir}/direct-whisper-nosuppress.stdout.txt`,
  `${evidenceDir}/direct-whisper-nosuppress.stderr.txt`,
);

await capture(
  command,
  hyperframesArgs([
    "transcribe",
    `${sourceDir}/direct-whisper-transcript.json`,
    "--json",
  ]),
  `${evidenceDir}/imported-direct-whisper-json.json`,
  `${evidenceDir}/imported-direct-whisper-json.stderr.txt`,
);

await copyFile(`${sourceDir}/transcript.json`, `${sourceDir}/direct-whisper-imported-transcript.json`);

await capture(
  command,
  hyperframesArgs([
    "transcribe",
    `${sourceDir}/manual-transcript.srt`,
    "--json",
  ]),
  `${evidenceDir}/imported-transcript.json`,
  `${evidenceDir}/imported-transcript.stderr.txt`,
);

console.log(`Wrote transcription evidence to ${evidenceDir}`);
