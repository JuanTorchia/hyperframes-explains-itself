# Article Outline

## Working Title

HyperFrames Explains Itself: A Reproducible Video Build From HTML

## Status

Draft outline for a technical article. This is not the final post copy.

## Core Thesis

Use HyperFrames to explain HyperFrames.

The point is not only that the project can render an MP4. The point is that the source, setup, voiceover, transcript, captions, mistakes, fixes, commands, and final artifacts all live in one inspectable repository.

## Audience

Developers evaluating whether HyperFrames can fit into a reproducible video workflow.

They likely care about:

- What the source looks like.
- What setup is actually required.
- Whether Docker avoids local FFmpeg problems.
- How audio, TTS, transcription, captions, and render verification fit together.
- What broke along the way.
- Which artifacts prove each claim.

## Article Shape

### 1. Open With The Question

Use the actual hook:

```text
Can HyperFrames explain HyperFrames?
```

Then state the experiment:

```text
This repository uses HyperFrames to generate a developer walkthrough about HyperFrames, then keeps the build log and evidence beside the source.
```

Evidence to link:

```text
README.md
JOURNAL.md
renders/hyperframes-in-60-seconds.mp4
renders/hyperframes-in-60-seconds-with-captions.mp4
```

### 2. Show The Repository As The Source

Explain that the video is not hidden in a traditional editor timeline. It is assembled from files:

```text
index.html
compositions/
styles/video.css
audio/source/voiceover.txt
audio/generated/hyperframes-in-60-seconds-af-nova.wav
video/hyperframes-in-60-seconds/v2-script.md
evidence/
experiments/
renders/
```

Claim:

```text
The MP4 is an artifact. The source of truth is the repo.
```

### 3. Setup: Docker First, Node Local

Explain the practical setup:

```text
Node.js >=22
hyperframes@0.6.80
gsap@3.14.2
Docker renderer image
Python .venv for TTS and Whisper experiments
```

Commands:

```bash
npm install
npm run doctor
npm run doctor:docker
npm run check
npm run render
```

Important finding:

```text
Host FFmpeg and FFprobe were not on PATH, so Docker stayed the default render path.
```

Evidence:

```text
experiments/003-cli-introspection/evidence/doctor.json
docs/004-docker-rendering.md
docs/012-local-tooling-fixes.md
```

### 4. Build The Main Walkthrough

Describe the main composition architecture:

```text
index.html
compositions/002-repository-proof.html
compositions/003-parent-composition.html
...
compositions/012-close.html
styles/video.css
```

Explain the timeline idea:

```text
The parent owns duration, audio, scene mounts, and visibility.
Scenes use data-start and data-duration.
```

Commands:

```bash
npm run check
npm run render
```

Evidence:

```text
renders/hyperframes-in-60-seconds.mp4
evidence/2026-06-07/
video/hyperframes-in-60-seconds/render-notes.md
```

### 5. Add Audio Without Hiding The Variable Step

Explain the TTS distinction:

```text
TTS generation is variable. The generated WAV is committed as a source asset.
```

Commands:

```bash
npm run tts:setup
npm run tts
```

Files:

```text
audio/source/voiceover.txt
audio/generated/hyperframes-in-60-seconds-af-nova.wav
docs/006-audio-and-tts-for-the-article.md
```

Claim:

```text
The render is reproducible from committed HTML plus committed WAV. The generation step is documented separately.
```

### 6. Prove The Artifact With FFprobe

Do not ask readers to trust the MP4 by sight. Show stream metadata.

Evidence:

```text
evidence/2026-06-07/ffprobe-render.json
evidence/captions/ffprobe-main-with-captions.json
experiments/artifact-manifest.txt
```

Facts to cite for the captioned variant:

```text
h264 video
aac audio
1920x1080
30fps
108.054000 seconds
```

### 7. Explore Capabilities With Small Experiments

Explain why the project uses small proofs instead of stuffing every feature into the main video.

Experiment map:

```text
001-media-timing -> real media, trim, image layer, audio volume, overlays
002-output-formats -> WebM and PNG sequence
003-cli-introspection -> info, compositions, doctor, browser path
004-benchmark -> benchmark repair with local Chrome path and ffmpeg-static
005-transcribe-captions -> SRT, Whisper JSON, official whisper-cli direct audio transcription
006-registry-components -> catalog and caption component install
007-capture-website -> local website capture
008-captions-layer -> automatic vs curated caption comparison
```

Evidence:

```text
experiments/README.md
docs/011-experiment-suite.md
experiments/artifact-manifest.txt
```

### 8. Captions: Automatic Timing, Curated Copy

Tell the honest story:

```text
The Python whisper.cpp-cli package was close, but failed because it did not support --suppress-nst.
The official ggml-org/whisper.cpp Windows x64 whisper-cli worked with HyperFrames direct audio transcription.
Whisper output is useful for timing and bootstrap captions.
Curated captions are better for the final developer-facing video.
```

Commands:

```bash
npm run transcribe:setup:official
npm run experiment:transcribe:official
npm run experiment:captions
npm run experiment:captions:render
npm run experiment:main-captions
npm run render:captions
```

Evidence:

```text
audio/generated/transcript.json
experiments/005-transcribe-captions/evidence/generated-transcript-official-whisper.json
experiments/008-captions-layer/output/captions-layer-proof.mp4
renders/hyperframes-in-60-seconds-with-captions.mp4
docs/013-captioned-main-render.md
```

Visual assets:

```text
experiments/008-captions-layer/evidence/frames/frame-5s.png
evidence/captions/frames/main-with-captions-40s.png
```

### 9. Mistakes Worth Keeping

This section is important. Do not clean up the story too much.

Mistakes and fixes:

```text
Missing host FFmpeg -> use Docker or ffmpeg-static depending on command surface.
Sparse keyframes in source media -> re-encode source video with regular keyframes.
PNG sequence against media-heavy composition timed out -> use a tiny 1-second proof composition.
Benchmark workers lacked a browser executable path -> export managed Chrome path.
Python whisper.cpp-cli lacked --suppress-nst -> use official whisper.cpp release asset.
Footer overlapped caption area -> move footer only in captioned variant.
```

Evidence:

```text
JOURNAL.md
docs/012-local-tooling-fixes.md
docs/013-captioned-main-render.md
experiments/001-media-timing/README.md
experiments/004-benchmark/evidence/benchmark-fixed-summary.txt
```

### 10. What This Proves

Strong claims:

```text
HyperFrames can render a real developer walkthrough from HTML source.
Docker can make the render path independent from host FFmpeg.
Audio can be generated, committed, mounted, rendered, and verified.
The CLI can lint, inspect, render, transcribe, capture, list catalog items, and benchmark.
Captions can be treated as source artifacts.
The repository can preserve both successes and failures.
```

Weak or avoided claims:

```text
Do not claim the workflow is perfect.
Do not claim benchmark numbers are universal.
Do not claim raw Whisper captions are final quality.
Do not claim every environment will match this Windows setup.
```

### 11. What Comes Next

Recommended next work:

```text
Polish the article draft into prose.
Review the captioned render end to end.
Decide whether the captioned render replaces the baseline render.
Investigate the remaining 4-worker benchmark instability.
Package a reproducible quickstart for a fresh clone.
```

## Pull Quotes

```text
HTML is the source. MP4 is the artifact.
```

```text
The proof is not only the video. The proof is the repository trail.
```

```text
TTS is the variable step. The committed WAV is the reproducible input.
```

```text
Captions are not decoration. They are another source artifact.
```

## Asset Checklist

Use these when drafting the post:

```text
renders/hyperframes-in-60-seconds.mp4
renders/hyperframes-in-60-seconds-with-captions.mp4
video/hyperframes-in-60-seconds/screenshots/render-contact-sheet.jpg
experiments/001-media-timing/output/media-timing-proof.mp4
experiments/002-output-formats/output/media-timing-proof.webm
experiments/002-output-formats/output/png-sequence-proof-frames/
experiments/008-captions-layer/output/captions-layer-proof.mp4
experiments/008-captions-layer/evidence/frames/frame-5s.png
evidence/captions/frames/main-with-captions-40s.png
```
