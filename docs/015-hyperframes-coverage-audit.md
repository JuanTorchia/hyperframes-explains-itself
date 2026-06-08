# HyperFrames Coverage Audit

## Purpose

This audit compares the current repository against HyperFrames documentation and the local `hyperframes@0.6.81` CLI surface. It answers one question:

```text
Have we covered everything HyperFrames gives us?
```

Short answer: no. We covered a strong developer tutorial core and many advanced surfaces, but several important areas remain untested or intentionally out of scope.

## Sources Checked

- Official docs index at `https://hyperframes.video/docs`.
- Official docs at `https://hyperframes.heygen.com`.
- Official CLI reference at `https://hyperframes.video/docs/workflow/cli-reference`.
- Official concepts pages for data attributes and frame adapters.
- Local CLI help from `npx hyperframes --help`.
- Local command help for `render`, `init`, `snapshot`, `capture`, `transcribe`, `tts`, `publish`, `cloud`, `lambda`, `auth`, `skills`, and `remove-background`.
- Existing repository docs and experiment evidence.
- NPM package metadata for `hyperframes`, `@hyperframes/core`, and `@hyperframes/adapters`.
- GitHub repository contents for `packages/core/src/adapters`.

## Important Documentation Mismatch

The official web CLI reference currently describes a smaller “nine command” map:

```text
init
preview
lint
inspect
render
add
doctor
upgrade
browser
```

The installed local CLI exposes a broader surface in `hyperframes@0.6.81`:

```text
init
add
capture
catalog
preview
publish
render
lint
inspect
snapshot
info
compositions
docs
benchmark
browser
doctor
upgrade
cloud
lambda
skills
transcribe
tts
remove-background
auth
feedback
telemetry
```

For this project, local CLI behavior is the operational source of truth. The article should mention that docs and installed CLI can differ, and cite the pinned local version.

## Coverage Matrix

| Area | Surface | Current Coverage | Status |
| --- | --- | --- | --- |
| Project scaffold | `init` | Repo was initialized manually; no isolated `init` experiment yet | Partial |
| Preview | `preview`, `npm run dev` | Used during build, documented, not preserved as a standalone evidence run | Partial |
| Render | `render --docker`, `--strict-all`, `--workers` | Main render and captioned render completed | Covered |
| Output formats | `--format mp4`, `webm`, `png-sequence`, `mov` | MP4, WebM, PNG sequence, and MOV tested | Covered locally |
| MOV output | `--format mov` | Transparent ProRes 4444 MOV rendered in `014-mov-output` | Covered |
| Resolution presets | `--resolution landscape`, `portrait`, `square`, `4k` | Landscape, portrait, and square compositions rendered; 4k not tested | Partial |
| Quality presets | `--quality draft/standard/high` | Draft, standard, and high variants rendered in `011-render-controls` | Covered |
| Bitrate/CRF | `--video-bitrate`, `--crf` | `--video-bitrate 2M` and `--crf 28` rendered in `011-render-controls` | Covered |
| GPU/browser GPU | `--gpu`, `--browser-gpu` | Not tested | Missing |
| Low-memory mode | `--low-memory-mode` | Not tested | Missing |
| Page-side compositing | `--page-side-compositing` | Not tested explicitly | Missing |
| HDR/SDR | `--hdr`, `--sdr` | SDR render path observed; HDR not tested | Partial |
| Lint | `lint` | Main and experiments validated | Covered |
| Inspect | `inspect` | Main and experiments inspected | Covered |
| Snapshot | `snapshot` | Main snapshots and contact sheet captured | Covered |
| Vision descriptions | `snapshot --describe` | Explicitly disabled; no Gemini vision evidence | Missing |
| Doctor | `doctor` | Captured in CLI introspection; host FFmpeg gap documented | Covered |
| Browser management | `browser path` | Managed Chrome path captured and used for benchmark | Covered |
| Info/compositions | `info`, `compositions` | Captured; duration mismatch documented | Covered |
| Inline docs | `docs` | Help inspected during audit; no evidence file yet | Partial |
| Registry catalog | `catalog` | Full and captions catalog captured | Covered |
| Registry add | `add` | `caption-weight-shift` installed in sandbox | Covered |
| Publish | `publish` | Not tested; requires public publishing decision | Missing |
| Cloud render | `cloud` | Not tested; requires HeyGen auth/account | Missing |
| AWS Lambda | `lambda` | Not tested; requires AWS credentials/infrastructure | Missing |
| Auth | `auth` | Not tested; credential-sensitive | Missing |
| Skills | `skills` | Not tested; optional agent tooling setup | Missing |
| TTS | `tts` | Voiceover generated and committed | Covered |
| Transcription | `transcribe` | SRT import, Whisper JSON import, official direct audio transcription tested | Covered |
| Captions | transcript/caption components | Automatic vs curated captions and captioned render tested | Covered |
| Capture website | `capture` | Local website capture completed | Covered |
| Benchmark | `benchmark` | Repaired and captured; one 4-worker preset unstable | Partial |
| Remove background | `remove-background` | Public domain portrait processed on CPU; alpha samples verified | Covered locally |
| Feedback/telemetry | `feedback`, `telemetry` | Not tested; not useful for tutorial proof | Intentionally skipped |

## HTML And Timeline Coverage

| Feature | Docs Surface | Current Coverage | Status |
| --- | --- | --- | --- |
| Composition root | `data-composition-id`, `data-width`, `data-height`, `data-duration`, `data-fps` | Main and experiments use these | Covered |
| Background color | `data-bg` | Tested in `009-track-attributes` | Covered |
| Track timing | `data-start`, `data-duration`, `data-end` | `data-start` and `data-duration` covered; `data-end` tested as deprecated by lint | Partial |
| Track fade | `data-fade` | Tested in `009-track-attributes` | Covered |
| Track loop | `data-loop` | Tested in `009-track-attributes` | Covered |
| Track label | `data-track` | Tested in `009-track-attributes` | Covered |
| Audio/video volume | `data-volume` | Main audio and media timing experiment | Covered |
| Audio/video mute | `data-mute` | Tested in `009-track-attributes` | Covered |
| Media trimming | Docs use `data-trim-start`; local project used `data-media-start` successfully | Partial |
| Media speed | `data-speed` | Tested in `009-track-attributes` | Covered |
| Nested compositions | `data-composition-src` | Main scene architecture | Covered |
| Variables | `data-composition-variables`, `data-variable-values`, render `--variables` | Concept shown in main scene; render-time variables not tested | Partial |

## Adapter Coverage

The docs list built-in frame adapter support for:

```text
GSAP
Lottie
Three.js
Rive
WAAPI
D3
PixiJS
custom adapters
```

Current coverage:

```text
GSAP -> covered
Lottie -> covered by local hf-seek bridge
Three.js -> covered by local hf-seek bridge
Rive -> missing
Anime.js -> covered by local hf-seek bridge
WAAPI -> covered by local seek-clock bridge
D3 -> covered by local hf-seek bridge
PixiJS -> missing
custom adapter -> missing
```

Important caveat: the docs describe `@hyperframes/adapters/*`, but `@hyperframes/adapters` returned a public npm registry 404 during the adapter sampler run. The published `@hyperframes/core@0.6.81` tarball and GitHub `main` branch expose adapter internals only for GSAP. The repository now proves local `hf-seek` bridges for several popular libraries, not official adapter package installation. See `docs/016-adapter-package-investigation.md`.

## Recipe Coverage

| Recipe / Use Case | Current Coverage | Status |
| --- | --- | --- |
| First deterministic render | Main render and FFprobe | Covered |
| Agent-authored video | The repository was built through agent iterations; article can describe this carefully | Partial |
| CI and batch rendering | Not tested | Missing |
| Programmatic video from data | Not tested with CSV/JSON batch variants | Missing |
| Personalized video at scale | Not tested | Missing |
| Shorts/Reels/TikTok from one source | Landscape, portrait, and square variants rendered as separate roots; one-source responsive flow not tested | Partial |
| Video editing without an NLE | Media trimming, captions, overlays, fades, loops, speed, and mute tested; cross-fades still minimal | Partial |
| Animated captions | Captions rendered; registry caption component installed but not integrated into final | Partial |
| Open Graph images/thumbnails | PNG frames and contact sheets exist; no explicit OG image workflow | Partial |
| Branding with design tokens | Capture produced design token evidence; no full branded-token workflow | Partial |
| Audio and voiceover | TTS and audio render covered | Covered |

## Recommended Next Experiments

### Completed In This Batch

The following recommended probes were implemented and validated after the initial audit:

```text
009-track-attributes
010-social-aspects
011-render-controls
012-waapi-adapter
```

They added evidence for track/media attributes, social aspect outputs, render quality/encoder controls, and a practical WAAPI bridge.

### Completed In Adapter Sampler

Experiment `013-adapter-sampler` rendered proof clips for:

```text
Three.js
Anime.js
D3
Lottie Web
```

All four use project-local `hf-seek` bridges because the documented `@hyperframes/adapters/*` package was not installable from npm during this run. `@hyperframes/core@0.6.81` contains GSAP adapter internals, but no first-party Lottie, Three.js, Anime.js, D3, PixiJS, Rive, or dotLottie adapter implementations were found in the published tarball.

### 013: Remaining Adapter Sampler

Goal:

```text
Test Rive or PixiJS if we can keep fixtures local, small, and legally clean.
```

Why:

```text
Docs emphasize adapters. Our current project now exercises GSAP, WAAPI, Three.js, Anime.js, D3, and Lottie bridge paths, but not Rive, PixiJS, dotLottie, or official adapter packages.
```

### Completed MOV And Remove Background Probes

Experiment `014-mov-output` rendered:

```text
experiments/014-mov-output/output/mov-alpha-proof.mov
```

FFprobe evidence:

```text
codec: prores
profile: 4444
pixel format: yuva444p12le
duration: 2.000000 seconds
frames: 60
```

Experiment `015-remove-background` processed a NASA public domain portrait on CPU:

```text
experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png
```

Alpha evidence:

```text
background samples -> alpha 0
subject samples -> alpha 255
```

Important finding: `remove-background` did not use the Docker render path in this local run. It required host-visible `ffmpeg` and `ffprobe`, so the repo now wires `ffmpeg-static` and `ffprobe-static` into the evidence runner.

The first attempted fixture was a flat synthetic icon. HyperFrames returned success, but the output was fully transparent. That result is documented as a bad fixture, not a valid proof.

### Optional: Remove Background Video Probe

Goal:

```text
Run remove-background on a short video and save transparent output evidence.
```

Why:

```text
Image background removal is covered. A short-video probe would test runtime, frame handling, and artifact size.
```

Risk:

```text
May require much more CPU/GPU time than the one-image proof, which took 9.81 seconds on CPU after the model was cached.
```

### 016: Init And Template Probe

Goal:

```text
Run hyperframes init in an isolated scratch experiment with --non-interactive and a known example.
```

Why:

```text
The public docs start with init. Our repo has not preserved init evidence.
```

### 016: Optional Cloud/Publish/Lambda Audit

Goal:

```text
Document help output only, unless we explicitly decide to authenticate and publish.
```

Why:

```text
These surfaces involve accounts, public URLs, AWS, or credentials. They should not be casually executed.
```

## Current Judgment

We have enough coverage for a strong article about a reproducible developer video build.

We do not yet have enough coverage to claim "this project demonstrates everything HyperFrames can do."

The honest phrasing should be:

```text
This repository exercises the core local workflow plus several advanced surfaces: Docker rendering, audio/TTS, transcription, captions, website capture, registry components, output formats, social aspect variants, render controls, WAAPI, snapshots, lint/inspect, and benchmark evidence.
```

Avoid:

```text
We covered all HyperFrames features.
```

Use instead:

```text
We covered the core workflow and mapped the remaining surfaces.
```
