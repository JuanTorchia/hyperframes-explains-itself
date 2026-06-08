import { mkdir, readFile, writeFile } from "node:fs/promises";

const experimentDir = "experiments/008-captions-layer";
const sourceDir = `${experimentDir}/source`;
const evidenceDir = `${experimentDir}/evidence`;
const transcriptPath = "audio/generated/transcript.json";

function cleanWord(text) {
  return text.trim();
}

function groupWords(words, maxWords = 7, maxDuration = 3.2) {
  const groups = [];
  let current = [];

  for (const word of words) {
    const next = {
      text: cleanWord(word.text),
      start: Number(word.start),
      end: Number(word.end),
    };

    if (!next.text) {
      continue;
    }

    const first = current[0];
    const wouldExceedWords = current.length >= maxWords;
    const wouldExceedDuration = first && next.end - first.start > maxDuration;
    const followsSentenceBreak = current.length > 0 && /[.?!]$/u.test(current[current.length - 1].text);

    if (current.length > 0 && (wouldExceedWords || wouldExceedDuration || followsSentenceBreak)) {
      groups.push(toGroup(current));
      current = [];
    }

    current.push(next);
  }

  if (current.length > 0) {
    groups.push(toGroup(current));
  }

  return groups;
}

function toGroup(words) {
  return {
    start: round(words[0].start),
    end: round(words[words.length - 1].end),
    text: words.map((word) => word.text).join(" "),
    words: words.map((word) => ({
      text: word.text,
      start: round(word.start),
      end: round(word.end),
    })),
  };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

const curatedCaptions = [
  {
    start: 0,
    end: 3.5,
    text: "Can HyperFrames explain HyperFrames? This repository is the test.",
  },
  {
    start: 3.5,
    end: 7.1,
    text: "The video you are watching is not edited in a traditional timeline.",
  },
  {
    start: 7.1,
    end: 12,
    text: "Its source is HTML, CSS, JavaScript, Markdown planning files, a generated voiceover asset, and a Docker render command.",
  },
];

await mkdir(sourceDir, { recursive: true });
await mkdir(evidenceDir, { recursive: true });

const transcript = JSON.parse(await readFile(transcriptPath, "utf8"));
const sampleWords = transcript.filter((word) => word.start < 12);
const automaticCaptions = groupWords(sampleWords);

const captionData = {
  generatedAt: "2026-06-08",
  durationSeconds: 12,
  sourceTranscript: transcriptPath,
  automaticCaptions,
  curatedCaptions,
};

const comparison = {
  generatedAt: "2026-06-08",
  durationSeconds: 12,
  automatic: {
    source: transcriptPath,
    groupCount: automaticCaptions.length,
    wordCount: sampleWords.length,
    firstText: automaticCaptions[0]?.text ?? "",
    lastText: automaticCaptions[automaticCaptions.length - 1]?.text ?? "",
  },
  curated: {
    source: "audio/source/voiceover.txt",
    groupCount: curatedCaptions.length,
    wordCount: curatedCaptions.flatMap((caption) => caption.text.split(/\s+/u)).length,
    firstText: curatedCaptions[0].text,
    lastText: curatedCaptions[curatedCaptions.length - 1].text,
  },
  finding: "Automatic Whisper captions are usable for timing evidence, but curated script captions are better for final developer-facing copy.",
};

await writeFile(`${sourceDir}/automatic-caption-groups.json`, JSON.stringify(automaticCaptions, null, 2), "utf8");
await writeFile(`${sourceDir}/curated-caption-groups.json`, JSON.stringify(curatedCaptions, null, 2), "utf8");
await writeFile(`${sourceDir}/caption-data.js`, `window.__captionData = ${JSON.stringify(captionData, null, 2)};\n`, "utf8");
await writeFile(`${evidenceDir}/caption-comparison.json`, JSON.stringify(comparison, null, 2), "utf8");

console.log(`Wrote caption layer evidence to ${experimentDir}`);
