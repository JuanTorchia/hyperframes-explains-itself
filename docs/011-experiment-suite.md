# HyperFrames Experiment Suite Notes

## Purpose

The main walkthrough proves the core workflow, but it should not carry every HyperFrames capability at once. The experiment suite creates small proofs that can later become short clips, screenshots, or article sections.

## Current Experiments

| Experiment | Result |
| --- | --- |
| `001-media-timing` | Rendered a 6-second MP4 using real video media, `data-media-start`, low-volume source audio, image layer, and HTML overlays. |
| `002-output-formats` | Rendered and verified WebM plus a 30-frame PNG sequence. |
| `003-cli-introspection` | Captured `info`, `compositions`, `doctor`, and browser-path evidence. |
| `004-benchmark` | Fixed enough to produce timing evidence with managed Chrome and project-local FFmpeg; one 4-worker preset remains unstable. |
| `005-transcribe-captions` | Imported an SRT transcript into HyperFrames transcript JSON; audio transcription is blocked by missing `whisper-cpp`. |
| `006-registry-components` | Captured full catalog and captions catalog JSON; installed one caption component in an isolated sandbox. |
| `007-capture-website` | Captured a local static website into HyperFrames capture output. |

## Practical Findings

### Media Timing

The first media render used the main tutorial MP4 directly as a source. HyperFrames warned about sparse keyframes:

```text
Video "trimmed-source-video" has sparse keyframes.
```

That matters because `data-media-start` relies on reliable seeking. The source was re-encoded with FFmpeg inside the Docker renderer image:

```bash
docker run --rm -v "${PWD}:/work" -w /work --entrypoint ffmpeg hyperframes-renderer:0.6.80 -y -i renders/hyperframes-in-60-seconds.mp4 -c:v libx264 -r 30 -g 30 -keyint_min 30 -movflags +faststart -c:a copy experiments/001-media-timing/assets/source-tutorial-keyframed.mp4
```

After that, the MP4 proof rendered with `hasAudio=true`.

### WebM Output

The WebM artifact was produced and verified:

```text
video: vp9, 1920x1080, 30fps
audio: opus
duration: 6.008000 seconds
size: 564992 bytes
```

The command exceeded the shell timeout, so article wording should say the artifact was verified after a timed-out command wrapper, not that the command cleanly returned.

### PNG Sequence Output

The first PNG sequence attempt used the media timing composition. It exceeded a 10-minute timeout and left 174 partial frames. That is not a valid proof artifact.

The reproducible PNG proof now uses a 1-second composition:

```text
experiments/002-output-formats/png-sequence/index.html
```

It produced:

```text
30 PNG frames
frame_000001.png through frame_000030.png
```

This is the better article example for PNG sequence output because the expected frame count is obvious: 1 second at 30fps.

### Benchmark

The benchmark command was repaired and made reproducible:

```bash
npm run experiment:benchmark
```

The failure path is useful for the post:

```text
Attempt 1: workers did not receive a Puppeteer executable path.
Attempt 2: explicit browser path fixed capture, but encode failed with ffmpeg ENOENT.
Fix: use the managed Chrome path plus project-local ffmpeg-static copied into tools/.cache/bin.
```

Latest evidence:

```text
experiments/004-benchmark/evidence/benchmark-runs-1-fixed.txt
experiments/004-benchmark/evidence/benchmark-fixed-summary.txt
```

Current caveat: one 4-worker standard preset still failed in the latest run, so the article should present benchmark output as environment-sensitive evidence, not a universal performance claim.

### CLI Introspection

`doctor.json` confirms why this project remains Docker-first:

```text
Host FFmpeg: not found
Host FFprobe: not found
Docker: running
Chrome: cached
```

`info.json` reported `duration: 107`, while `compositions.json` reported `main.duration: 108`. Do not cite `info.duration` as proof until this mismatch is understood.

### Capture

The local capture output includes screenshots, design tokens, visible text, font metadata, and generated agent instructions. This is useful article material because it shows HyperFrames can inspect an existing page before building video source from it.

### Registry

The captions catalog has useful components. One isolated install was tested:

```bash
npx hyperframes add caption-weight-shift --dir experiments/006-registry-components/install-sandbox --no-clipboard --json
```

It wrote:

```text
experiments/006-registry-components/install-sandbox/compositions/components/caption-weight-shift.html
```

Open finding: the JSON response reported `clipboardCopied: true` even with `--no-clipboard`.

### Transcription

SRT import works and produced `source/transcript.json`.

Audio transcription failed because `whisper-cpp` is not installed:

```json
{"ok":false,"error":"whisper-cpp not found. Install: See https://github.com/ggml-org/whisper.cpp#building"}
```

## Next Recommended Proofs

1. Decide whether to install `whisper-cpp` for real audio transcription.
2. Investigate why the 30fps standard 4-worker benchmark preset remains unstable.
3. Decide whether the isolated caption component should be adapted into a real captions scene.
4. Extract 2-3 short clips from the experiment artifacts for the article draft.
