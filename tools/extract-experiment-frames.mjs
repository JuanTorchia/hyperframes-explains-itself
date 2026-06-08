import { mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname } from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";

const execFileAsync = promisify(execFile);

const frames = [
  {
    input: "experiments/009-track-attributes/output/track-attributes-proof.mp4",
    at: "00:00:03",
    output: "experiments/009-track-attributes/evidence/frame-3s.png",
  },
  {
    input: "experiments/010-social-aspects/output/social-landscape.mp4",
    at: "00:00:01",
    output: "experiments/010-social-aspects/evidence/frame-landscape.png",
  },
  {
    input: "experiments/010-social-aspects/output/social-portrait.mp4",
    at: "00:00:01",
    output: "experiments/010-social-aspects/evidence/frame-portrait.png",
  },
  {
    input: "experiments/010-social-aspects/output/social-square.mp4",
    at: "00:00:01",
    output: "experiments/010-social-aspects/evidence/frame-square.png",
  },
  {
    input: "experiments/011-render-controls/output/render-controls-standard.mp4",
    at: "00:00:00.5",
    output: "experiments/011-render-controls/evidence/frame-standard.png",
  },
  {
    input: "experiments/012-waapi-adapter/output/waapi-adapter-proof.mp4",
    at: "00:00:02",
    output: "experiments/012-waapi-adapter/evidence/frame-2s.png",
  },
];

if (!ffmpegPath) {
  throw new Error("ffmpeg-static did not provide an FFmpeg binary path.");
}

for (const frame of frames) {
  await mkdir(dirname(frame.output), { recursive: true });
  await execFileAsync(ffmpegPath, [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    frame.at,
    "-i",
    frame.input,
    "-frames:v",
    "1",
    frame.output,
  ]);
  console.log(`Extracted ${frame.output}`);
}
