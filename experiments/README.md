# HyperFrames Experiment Suite

This folder collects small, reproducible capability probes.

The main video should not become a command encyclopedia. These experiments let the project test HyperFrames features directly, save evidence, and later choose the strongest material for the final article or final demo.

## Current Coverage Plan

| Experiment | Capability Area | Status |
| --- | --- | --- |
| `001-media-timing` | Real media, video trim, image layer, audio volume, timed overlays | MP4 rendered and verified |
| `002-output-formats` | WebM and PNG sequence outputs | WebM rendered and verified; PNG sequence pending |
| `003-cli-introspection` | `info`, `compositions`, `doctor`, `browser` | Evidence captured |
| `004-benchmark` | Benchmark with a tiny composition | Ready to run |
| `005-transcribe-captions` | Transcript import and future audio transcription | SRT import tested; Whisper transcription pending |
| `006-registry-components` | `catalog` and `add` discovery | Catalog discovery captured; install pending |
| `007-capture-website` | Local website capture | Local capture completed |

## Commands

```bash
npm run experiment:media:check
npm run experiment:media:render
npm run experiment:formats:webm
npm run experiment:formats:png
npm run experiment:introspection
npm run experiment:benchmark
npm run experiment:capture
```

## Results So Far

- `001-media-timing` produced `experiments/001-media-timing/output/media-timing-proof.mp4`.
- The media experiment uses `data-media-start`, `data-volume`, a real MP4 source, a static image layer, and HTML overlays.
- The first media render exposed sparse source keyframes. The source asset was re-encoded with the Docker renderer image and FFmpeg before the final proof render.
- `002-output-formats` produced and verified `experiments/002-output-formats/output/media-timing-proof.webm`.
- `003-cli-introspection` produced JSON evidence for `info`, `compositions`, `doctor`, and browser path.
- `005-transcribe-captions` imported an SRT transcript and produced `source/transcript.json`.
- `006-registry-components` captured registry catalog JSON and caption-specific catalog JSON.
- `007-capture-website` captured a local static website into editable capture output.

## Open Findings

- `hyperframes info --json` reported `duration: 107`, while `hyperframes compositions --json` reported the main composition duration as `108`. This needs investigation before using `info` duration as article proof.
- The WebM command exceeded the shell timeout, but the produced artifact was verified with FFprobe as a 6.008 second WebM with VP9 video and Opus audio.

## Rules

- Do not claim an experiment succeeded until its output and evidence files exist.
- Prefer tiny compositions for capability probes.
- Keep the main tutorial render separate from experiment artifacts.
- Store command output under each experiment's `evidence/` directory.
