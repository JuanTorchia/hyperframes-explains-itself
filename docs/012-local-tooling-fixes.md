# Local Tooling Fixes

## Purpose

This document records local environment fixes discovered while building the experiment suite. These are useful for the article because they show what was actually needed to move from failed commands to reproducible evidence.

## Benchmark

### Problem 1: Browser Path

`hyperframes benchmark` initially failed with:

```text
An `executablePath` or `channel` must be specified for `puppeteer-core`
```

The project already had a managed Chrome path from:

```bash
npx hyperframes browser path
```

The benchmark runner now reads that path and exports:

```text
HYPERFRAMES_BROWSER_PATH
PRODUCER_HEADLESS_SHELL_PATH
PUPPETEER_EXECUTABLE_PATH
```

### Problem 2: Host FFmpeg

After fixing browser discovery, benchmark capture proceeded but encode failed:

```text
Encoding failed: [FFmpeg] spawn ffmpeg ENOENT
```

The project remains Docker-first for main renders, but `hyperframes benchmark` does not expose `--docker` in the current CLI help. To keep benchmark evidence local and reproducible, the project now uses `ffmpeg-static` as a dev dependency.

The runner copies that binary into:

```text
tools/.cache/bin/ffmpeg.exe
```

Then it prepends that directory to `PATH` before invoking the benchmark.

### Current Benchmark Caveat

The fixed benchmark produces timing and size evidence, but one 4-worker preset failed in the latest run. Do not present benchmark numbers as broad performance claims.

## Transcription

SRT import works without Whisper:

```bash
npx hyperframes transcribe experiments/005-transcribe-captions/source/manual-transcript.srt --json
```

Audio transcription currently fails with:

```json
{"ok":false,"error":"whisper-cpp not found. Install: See https://github.com/ggml-org/whisper.cpp#building"}
```

Decision: do not install `whisper-cpp` silently. Treat it as a documented prerequisite if the article includes real audio transcription.
