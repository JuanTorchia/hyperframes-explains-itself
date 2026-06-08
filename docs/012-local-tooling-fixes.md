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

### Local Whisper Package Probe

The project now has a setup command for the lightweight Python package:

```bash
npm run transcribe:setup
```

That installs `whisper.cpp-cli` into `.venv`. It provides `.venv/Scripts/whisper-cpp.exe` on Windows.

With `HYPERFRAMES_WHISPER_PATH` pointing at that binary, HyperFrames advanced past the missing binary error and failed on host FFmpeg:

```json
{"ok":false,"error":"spawnSync ffmpeg ENOENT"}
```

After adding project-local `ffmpeg-static` to `PATH`, HyperFrames advanced past missing FFmpeg. It then failed with:

```json
{"ok":false,"error":"Whisper did not produce output. Check the input file."}
```

The direct probe showed the practical reason:

```text
error: unknown argument: --suppress-nst
```

The tested Python package is close but not a drop-in replacement for the `whisper-cli` expected by HyperFrames.

### Working Local Workaround

The same package can generate Whisper JSON when the unsupported flag is omitted. HyperFrames can import that JSON:

```bash
npm run experiment:transcribe
```

Evidence:

```text
experiments/005-transcribe-captions/evidence/generated-transcript-fixed.json
experiments/005-transcribe-captions/evidence/generated-transcript-with-local-whisper.json
experiments/005-transcribe-captions/evidence/direct-whisper.stderr.txt
experiments/005-transcribe-captions/evidence/direct-whisper-nosuppress.stderr.txt
experiments/005-transcribe-captions/evidence/direct-whisper-nosuppress.stdout.txt
experiments/005-transcribe-captions/evidence/ffmpeg-voiceover-16k.stderr.txt
experiments/005-transcribe-captions/evidence/imported-direct-whisper-json.json
experiments/005-transcribe-captions/source/direct-whisper-transcript.json
experiments/005-transcribe-captions/source/direct-whisper-imported-transcript.json
```

Decision: the final guide should document three caption paths separately: SRT import, Whisper JSON import, and direct audio transcription with a compatible `whisper-cli`. Only the first two have passed locally.
