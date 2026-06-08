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
| `005-transcribe-captions` | Imported SRT, tested a local Python Whisper package, captured its compatibility failure, imported generated Whisper JSON, and validated direct audio transcription with the official whisper.cpp Windows x64 release. |
| `006-registry-components` | Captured full catalog and captions catalog JSON; installed one caption component in an isolated sandbox. |
| `007-capture-website` | Captured a local static website into HyperFrames capture output. |
| `008-captions-layer` | Rendered a 12-second MP4 comparing automatic Whisper captions with curated script captions. |
| `009-track-attributes` | Rendered a 6-second MP4 covering track/media attributes and captured that `data-end` is deprecated. |
| `010-social-aspects` | Rendered landscape, portrait, and square MP4 variants from separate composition roots. |
| `011-render-controls` | Rendered quality, CRF, and bitrate variants from one deterministic composition. |
| `012-waapi-adapter` | Rendered a browser-native WAAPI animation controlled by a seek-clock bridge. |
| `013-adapter-sampler` | Rendered Three.js, Anime.js, D3, and Lottie proof clips through project-local `hf-seek` bridges. |

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

### Captions Layer

The caption layer proof compares two sources for the first 12 seconds of the voiceover:

```text
Automatic: audio/generated/transcript.json grouped into 7 caption groups
Curated: audio/source/voiceover.txt reduced to 3 intentional caption groups
```

The rendered proof:

```text
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

FFprobe verified:

```text
h264
1920x1080
30fps
12.000000 seconds
```

This is useful article material because it shows the practical difference between machine timing and final tutorial copy. It should not be presented as the final captions implementation yet.

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

Audio transcription first failed because `whisper-cpp` was not installed:

```json
{"ok":false,"error":"whisper-cpp not found. Install: See https://github.com/ggml-org/whisper.cpp#building"}
```

After installing `whisper.cpp-cli` into `.venv`, HyperFrames found the local binary and the tiny English model was downloaded to the HyperFrames cache. The next direct-audio attempt failed with:

```json
{"ok":false,"error":"Whisper did not produce output. Check the input file."}
```

A direct probe showed the reason:

```text
error: unknown argument: --suppress-nst
```

The useful workaround is to run `whisper.cpp-cli` directly without `--suppress-nst`, save `direct-whisper-transcript.json`, and import that JSON through HyperFrames:

```bash
npm run experiment:transcribe
```

This produced:

```text
experiments/005-transcribe-captions/source/direct-whisper-transcript.json
experiments/005-transcribe-captions/source/direct-whisper-imported-transcript.json
experiments/005-transcribe-captions/evidence/imported-direct-whisper-json.json
```

The transcript should be treated as local evidence, not as final copy. It uses `tiny.en` and contains recognition errors.

The official Windows x64 release asset was then tested:

```bash
npm run transcribe:setup:official
npm run experiment:transcribe:official
```

Evidence shows the official `whisper-cli.exe` exposes `--suppress-nst`, and HyperFrames direct audio transcription completed:

```json
{"ok":true,"model":"tiny.en","wordCount":315,"durationSeconds":97.22,"speechOnsetSeconds":null,"transcriptPath":"C:\\Users\\jstor\\OneDrive\\Documentos\\HyperFrame\\audio\\generated\\transcript.json"}
```

This changes the recommendation: use the official `ggml-org/whisper.cpp` Windows x64 release for local direct audio transcription, not the Python `whisper.cpp-cli` package.

### Track Attributes

The track attribute proof intentionally stays small:

```text
experiments/009-track-attributes/output/track-attributes-proof.mp4
```

It covers:

```text
data-bg
data-fade
data-loop
data-track
data-volume
data-speed
data-mute
```

FFprobe evidence shows a 6-second 1920x1080 MP4 with H.264 video and AAC audio. A static frame was extracted for article use:

```text
experiments/009-track-attributes/evidence/frame-3s.png
```

Important finding: `data-end` was attempted first, but local lint reports it as deprecated and recommends `data-duration`. Do not use `data-end` in final tutorial examples.

### Social Aspect Ratios

The social proof uses separate project directories because a first attempt with multiple root HTML files in one directory triggered `multiple_root_compositions`.

Rendered outputs:

```text
experiments/010-social-aspects/output/social-landscape.mp4
experiments/010-social-aspects/output/social-portrait.mp4
experiments/010-social-aspects/output/social-square.mp4
```

The summary captures:

```text
landscape -> 1920x1080, 2 seconds, 30fps
portrait -> 1080x1920, 2 seconds, 30fps
square -> 1080x1080, 2 seconds, 30fps
```

This proves multi-aspect export as three explicit compositions. It does not yet prove a single responsive source that changes layout across aspect ratios.

The first styled render attempt used `../social.css`, but each aspect project is served as its own root, so the stylesheet did not load. The fixed version keeps a local `social.css` beside each `index.html`.

### Render Controls

The render controls proof renders the same 1-second 1920x1080 composition five ways:

```text
draft -> 44,692 bytes
standard -> 47,686 bytes
high -> 60,688 bytes
crf-28 -> 25,051 bytes
bitrate-2m -> 70,737 bytes
```

This is useful as command evidence, not as a general compression benchmark. The composition is intentionally tiny, so file size differences are illustrative only.

### WAAPI Adapter

The WAAPI proof renders a browser-native Web Animations API animation through a project-local seek-clock bridge:

```text
experiments/012-waapi-adapter/output/waapi-adapter-proof.mp4
```

FFprobe evidence shows a 3-second 1920x1080 MP4 with H.264 video. This covers a practical WAAPI integration path but not the full adapter list from the docs.

### Adapter Sampler

The adapter sampler tests four popular libraries:

```text
Three.js
Anime.js
D3
Lottie Web
```

The official docs describe built-in adapters under `@hyperframes/adapters/*`, but `npm view @hyperframes/adapters version` returned a public registry 404 during this run. The published `@hyperframes/core@0.6.81` tarball exposes adapter internals only for GSAP. The experiment therefore uses the documented `hf-seek` event pattern directly and should be described as project-local bridge evidence.

Rendered outputs:

```text
experiments/013-adapter-sampler/output/three-adapter-proof.mp4
experiments/013-adapter-sampler/output/anime-adapter-proof.mp4
experiments/013-adapter-sampler/output/d3-adapter-proof.mp4
experiments/013-adapter-sampler/output/lottie-adapter-proof.mp4
```

Summary:

```text
three -> 3 seconds, 1920x1080, 30fps, 418,195 bytes
anime -> 3 seconds, 1920x1080, 30fps, 221,247 bytes
d3 -> 3 seconds, 1920x1080, 30fps, 80,397 bytes
lottie -> 3 seconds, 1920x1080, 30fps, 122,212 bytes
```

This covers practical rendering with WebGL, DOM animation, data-driven SVG, and Lottie JSON. It does not cover Rive, PixiJS, dotLottie, or official adapter-package installation.

## Next Recommended Proofs

1. Test `remove-background` on a tiny image or video and document model/download/runtime behavior.
2. Test MOV output or document why MP4/WebM/PNG are enough for the article.
3. Add Rive or PixiJS only if we can use a real, small fixture without pulling in fragile external assets.
4. Decide whether final captions should be generated from official Whisper output, curated from the script, or shown as both machine output and edited captions.
5. Investigate why the 30fps standard 4-worker benchmark preset remains unstable.
6. Extract 2-3 short clips from the experiment artifacts for the article draft.
