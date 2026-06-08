# Article Evidence Map

## Purpose

This document maps article claims to reproducible commands and local artifacts. It is the editorial layer between the experiment suite and the final public post.

The rule is simple:

```text
No claim without a command, artifact, or documented caveat.
```

## Recommended Thesis

Use this wording:

```text
HyperFrames can use HTML as the video source, then render reproducible video artifacts through a developer workflow.
```

Use this as the stronger project framing:

```text
This repository uses HyperFrames to explain HyperFrames, then keeps the intermediate experiments as evidence.
```

Avoid:

```text
This covers everything HyperFrames can do.
```

The honest version is:

```text
This covers the core local workflow and a broad set of advanced surfaces. Account-bound, cloud, AWS, and asset-dependent features are mapped but not executed.
```

## Coverage Summary

| Claim Area | Status | Best Evidence | Article Use |
| --- | --- | --- | --- |
| Scaffold from CLI | Covered | `experiments/016-init-template/evidence/init-result.json` | Show the reproducible starting point. |
| HTML composition model | Covered | `index.html`, `compositions/`, `docs/011-experiment-suite.md` | Explain HTML as source. |
| Docker render | Covered | `npm run render`, `renders/`, `experiments/014-mov-output/output/mov-alpha-proof.mov` | Show reproducible rendering without host FFmpeg. |
| Lint and inspect | Covered | `npm run check`, experiment check logs | Show validation before rendering. |
| Output formats | Covered locally | MP4, WebM, PNG sequence, MOV evidence | Show HyperFrames can produce delivery and editing artifacts. |
| Captions | Covered | `experiments/008-captions-layer/output/captions-layer-proof.mp4` | Show automatic vs curated captions. |
| TTS and transcription | Covered | `audio/generated/`, `experiments/005-transcribe-captions/` | Show voice and transcript pipeline with caveats. |
| Website capture | Covered | `experiments/007-capture-website/output/` | Show capture as input material. |
| Track/media attributes | Covered | `experiments/009-track-attributes/output/track-attributes-proof.mp4` | Show timeline primitives. |
| Social aspect ratios | Covered as separate roots | `experiments/010-social-aspects/output/` | Show landscape/portrait/square exports. |
| Render controls | Covered | `experiments/011-render-controls/evidence/render-controls-summary.json` | Show quality/CRF/bitrate tradeoffs. |
| Animation libraries | Covered through local bridges | `experiments/013-adapter-sampler/evidence/adapter-summary.json` | Show practical integrations without claiming official adapter packages. |
| Remove background | Covered for image | `experiments/015-remove-background/evidence/alpha-samples.json` | Show local media AI command with caveats. |
| Benchmark | Partial | `experiments/004-benchmark/evidence/benchmark-fixed-summary.txt` | Use as build log, not universal performance claim. |
| Cloud/publish/lambda/auth | Not executed | `docs/015-hyperframes-coverage-audit.md` | Mention as intentionally skipped because credentials/accounts are involved. |
| Rive/dotLottie | Not covered | `docs/015-hyperframes-coverage-audit.md` | Mention as remaining asset-dependent adapter coverage. |

## Primary Claims

### Claim: HTML Is The Source

Use:

```text
HTML composition files define dimensions, duration, timing, layers, and media.
```

Evidence:

```text
index.html
compositions/
experiments/009-track-attributes/index.html
experiments/013-adapter-sampler/pixi/index.html
```

Command:

```bash
npm run check
```

Caveat:

```text
The article should describe the local project structure, not imply a browser page automatically becomes a final video without validation and rendering.
```

### Claim: MP4 Is An Artifact

Use:

```text
The rendered MP4 is an output artifact, not the source of truth.
```

Evidence:

```text
renders/hyperframes-in-60-seconds.mp4
experiments/001-media-timing/output/media-timing-proof.mp4
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

Command:

```bash
npm run render
```

Caveat:

```text
Do not claim every render is deterministic byte-for-byte. Some generated scaffolds include timestamps, and media encoders can produce environment-sensitive metadata.
```

### Claim: Docker Is The Default Reproducible Render Path

Use:

```text
Docker keeps rendering reproducible when host FFmpeg is missing.
```

Evidence:

```text
experiments/003-cli-introspection/evidence/doctor.json
docs/007-docker-workflow.md
```

Command:

```bash
npm run doctor:docker
npm run render
```

Caveat:

```text
Not every HyperFrames command uses Docker. `remove-background` required host-visible ffmpeg and ffprobe, so the evidence runner injects project-local static binaries.
```

### Claim: Captions Need Editing

Use:

```text
Machine captions are useful, but final tutorial captions should be curated.
```

Evidence:

```text
experiments/008-captions-layer/evidence/caption-comparison.json
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

Command:

```bash
npm run experiment:captions:render
```

Caveat:

```text
The caption proof is intentionally silent and compares caption text/timing. It is not the final article hero video.
```

### Claim: Animation Libraries Can Be Driven By The Seek Clock

Use:

```text
Common browser animation libraries can be made frame-seekable through local bridges.
```

Evidence:

```text
experiments/013-adapter-sampler/evidence/adapter-summary.json
experiments/013-adapter-sampler/output/pixi-adapter-proof.mp4
```

Command:

```bash
npm run experiment:adapters:check
npm run experiment:adapters:render
```

Caveat:

```text
These are project-local `hf-seek` bridges. They are not proof that `@hyperframes/adapters/*` packages are installable from npm.
```

### Claim: The Build Log Matters

Use:

```text
The useful part of the project is not just the final video; it is the preserved mistakes and fixes.
```

Evidence:

```text
JOURNAL.md
docs/011-experiment-suite.md
docs/015-hyperframes-coverage-audit.md
```

Examples:

```text
Sparse keyframes required re-encoding the source media.
WebM command wrapper timed out but the artifact was verified afterward.
The first remove-background fixture was invalid because a flat icon produced a fully transparent result.
The generated init scaffold includes `hyperframes validate`, which was not in the earlier top-level command map.
```

## Claims To Avoid

Do not write:

```text
HyperFrames covers every video workflow.
```

Use:

```text
This project tests a broad local workflow and documents the untested surfaces.
```

Do not write:

```text
All adapters are officially available.
```

Use:

```text
The project proves local bridges for several libraries. Official adapter package availability did not match the docs during this run.
```

Do not write:

```text
Background removal is perfect.
```

Use:

```text
Background removal worked on a public domain portrait, and alpha samples verify transparent background pixels.
```

Do not write:

```text
Docker runs everything.
```

Use:

```text
Docker is the render path. Some utility commands still need host-visible tools.
```

## Suggested Article Sections

1. Thesis: HTML is the source, MP4 is the artifact.
2. Setup: Node 22, Docker, FFmpeg strategy, pinned HyperFrames version.
3. Scaffold: `hyperframes init` and generated project shape.
4. First render: lint, inspect, render.
5. Voice and captions: TTS, transcription, curated captions.
6. Experiments: formats, media timing, tracks, adapters, social aspect ratios.
7. Mistakes found: keyframes, docs/package mismatch, host tool gaps, weak remove-background fixture.
8. Final demo plan: one cohesive video, not a command encyclopedia.
9. What remains: Rive, cloud, publish, lambda, credentials, scale workflows.
