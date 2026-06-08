import { mkdir, readFile, writeFile } from "node:fs/promises";

const sourcePath = "compositions/captions-data.js";
const evidenceDir = "evidence/captions";

const captions = [
  {
    start: 0,
    end: 6,
    text: "Can HyperFrames explain HyperFrames? This repository is the test.",
  },
  {
    start: 6,
    end: 14,
    text: "This video is source code: HTML, CSS, JavaScript, Markdown, audio, and Docker.",
  },
  {
    start: 14,
    end: 22,
    text: "The parent composition owns duration, audio, and scene mounts.",
  },
  {
    start: 22,
    end: 32,
    text: "Each scene lives in compositions, keeping the timeline inspectable.",
  },
  {
    start: 32,
    end: 42,
    text: "Timing is explicit: data-start, data-duration, and parent-controlled visibility.",
  },
  {
    start: 42,
    end: 52,
    text: "Reusable components can render different states from variable values.",
  },
  {
    start: 52,
    end: 64,
    text: "The developer loop is preview, snapshot, lint, inspect, then render.",
  },
  {
    start: 64,
    end: 74,
    text: "Docker gives the render step a fixed browser and FFmpeg stack.",
  },
  {
    start: 74,
    end: 84,
    text: "TTS generated the voiceover; the committed WAV is the reproducible input.",
  },
  {
    start: 84,
    end: 94,
    text: "The final proof is ffprobe: codec, audio stream, resolution, fps, and duration.",
  },
  {
    start: 94,
    end: 102,
    text: "Mistakes are documented instead of hidden.",
  },
  {
    start: 102,
    end: 108,
    text: "HTML is the source. MP4 is the artifact.",
  },
];

await mkdir("compositions", { recursive: true });
await mkdir(evidenceDir, { recursive: true });

const transcript = JSON.parse(await readFile("audio/generated/transcript.json", "utf8"));
const coverage = captions.map((caption) => {
  const words = transcript.filter((word) => word.start >= caption.start && word.start < caption.end);
  return {
    start: caption.start,
    end: caption.end,
    captionText: caption.text,
    transcriptWordCount: words.length,
    transcriptFirstWord: words[0]?.text ?? null,
    transcriptLastWord: words[words.length - 1]?.text ?? null,
  };
});

const payload = {
  generatedAt: "2026-06-08",
  mode: "curated-scene-beats",
  sourceTranscript: "audio/generated/transcript.json",
  sourceScript: "audio/source/voiceover.txt",
  captions,
};

const summary = {
  generatedAt: "2026-06-08",
  captionCount: captions.length,
  durationSeconds: 108,
  captionMode: "curated scene-level captions",
  finding: "Scene-level curated captions are more readable for the main walkthrough than raw Whisper word groups.",
  coverage,
};

await writeFile(sourcePath, `window.__mainCaptionData = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
await writeFile(`${evidenceDir}/main-caption-summary.json`, JSON.stringify(summary, null, 2), "utf8");

console.log(`Wrote main caption data to ${sourcePath}`);
