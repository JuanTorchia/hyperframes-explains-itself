# HyperFrames Experiment Suite

This folder collects small, reproducible capability probes.

The main video should not become a command encyclopedia. These experiments let the project test HyperFrames features directly, save evidence, and later choose the strongest material for the final article or final demo.

## Current Coverage Plan

| Experiment | Capability Area | Status |
| --- | --- | --- |
| `001-media-timing` | Real media, video trim, image layer, audio volume, timed overlays | MP4 rendered and verified |
| `002-output-formats` | WebM and PNG sequence outputs | WebM and PNG sequence rendered and verified |
| `003-cli-introspection` | `info`, `compositions`, `doctor`, `browser` | Evidence captured |
| `004-benchmark` | Benchmark with a tiny composition | Fixed with project-local FFmpeg and explicit browser path; one 4-worker config remains unstable |
| `005-transcribe-captions` | Transcript import, local Whisper JSON, caption source data | SRT import works; Python package import workaround works; official whisper.cpp direct audio transcription works |
| `006-registry-components` | `catalog` and `add` discovery | Catalog discovery and isolated component install captured |
| `007-capture-website` | Local website capture | Local capture completed |
| `008-captions-layer` | Automatic vs curated captions | 12-second caption comparison MP4 rendered and verified |

## Commands

```bash
npm run experiment:media:check
npm run experiment:media:render
npm run experiment:formats:webm
npm run experiment:formats:png
npm run experiment:introspection
npm run experiment:benchmark
npm run experiment:transcribe
npm run transcribe:setup:official
npm run experiment:transcribe:official
npm run experiment:capture
npm run experiment:captions
npm run experiment:captions:check
npm run experiment:captions:render
```

## Results So Far

- `001-media-timing` produced `experiments/001-media-timing/output/media-timing-proof.mp4`.
- The media experiment uses `data-media-start`, `data-volume`, a real MP4 source, a static image layer, and HTML overlays.
- The first media render exposed sparse source keyframes. The source asset was re-encoded with the Docker renderer image and FFmpeg before the final proof render.
- `002-output-formats` produced and verified `experiments/002-output-formats/output/media-timing-proof.webm`.
- `002-output-formats` produced a 30-frame PNG sequence at `experiments/002-output-formats/output/png-sequence-proof-frames/`.
- `003-cli-introspection` produced JSON evidence for `info`, `compositions`, `doctor`, and browser path.
- `004-benchmark` was fixed by using the managed Chrome path and project-local `ffmpeg-static` binary.
- `005-transcribe-captions` imported an SRT transcript and produced `source/transcript.json`.
- `005-transcribe-captions` installed `whisper.cpp-cli` in `.venv`, captured the Python-package direct-audio failure, generated Whisper JSON directly, imported that JSON with HyperFrames, then validated direct HyperFrames audio transcription with the official `whisper-bin-x64.zip` release asset.
- `006-registry-components` captured registry catalog JSON, caption-specific catalog JSON, and an isolated `caption-weight-shift` install.
- `007-capture-website` captured a local static website into editable capture output.
- `008-captions-layer` generated automatic and curated caption groups, then rendered a 12-second comparison clip.

## Open Findings

- `hyperframes info --json` reported `duration: 107`, while `hyperframes compositions --json` reported the main composition duration as `108`. This needs investigation before using `info` duration as article proof.
- The WebM command exceeded the shell timeout, but the produced artifact was verified with FFprobe as a 6.008 second WebM with VP9 video and Opus audio.
- A PNG sequence render against the media-heavy composition exceeded a 10-minute timeout and left 174 partial frames. The reproducible PNG proof now uses a dedicated 1-second composition and produces 30 complete frames.
- `hyperframes benchmark` does not expose Docker mode in the current CLI help. The local benchmark initially failed because workers did not receive a browser executable path, then failed because host FFmpeg was missing. The current runner fixes both locally, but one 4-worker preset can still fail.
- `hyperframes transcribe` can import SRT and Whisper JSON. Direct audio transcription works locally with the official Windows x64 `whisper-cli.exe`; the tested Python package does not support HyperFrames' `--suppress-nst` argument.
- `hyperframes add caption-weight-shift --no-clipboard --json` wrote the expected component file in an isolated sandbox, but the JSON reported `clipboardCopied: true`.
- `008-captions-layer` is intentionally silent. It is evidence for caption rendering and copy comparison, not a final audio-synced tutorial export.

## Rules

- Do not claim an experiment succeeded until its output and evidence files exist.
- Prefer tiny compositions for capability probes.
- Keep the main tutorial render separate from experiment artifacts.
- Store command output under each experiment's `evidence/` directory.
