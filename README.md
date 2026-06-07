# hyperframes-explains-itself

Use HyperFrames to explain HyperFrames.

This repository is a public, reproducible tutorial project. The experiment is to create a short technical video about HyperFrames using HyperFrames itself, while documenting the real setup, prompts, commands, decisions, mistakes, fixes, and final output.

This is not a generic demo and it is not marketing copy. The goal is to leave behind something another developer can clone, inspect, run, and learn from.

## What This Experiment Tries To Prove

The core thesis is simple:

> HyperFrames should be understandable by building with it.

This project tries to prove that HyperFrames can be used as a practical developer tool for producing a clear video from web-native source files. The intended proof is not just the final MP4. The proof includes the project structure, setup notes, prompts, script, storyboard, commands, errors encountered, and repeatable render path.

## Expected Output

The target output is a roughly 60-second technical video titled "HyperFrames in 60 Seconds".

The video should explain:

- What HyperFrames is.
- Why using HTML as a video source is useful.
- The basic setup requirements.
- The high-level workflow: initialize, preview, render.
- The final idea: HTML is the source, MP4 is the artifact.

The first Docker-rendered MP4 has been produced at `renders/hyperframes-in-60-seconds.mp4`.

## Tools

Planned tools:

- HyperFrames CLI, pinned as a local npm dependency.
- Node.js 22 or newer for the JavaScript runtime.
- Docker for the default render path.
- FFmpeg 6 or newer for optional host-local rendering.
- GSAP, pinned as a local npm dependency, for timeline animation.
- HyperFrames TTS with Kokoro-82M for AI-generated voiceover.
- Python `.venv` for local TTS dependencies.
- Markdown for documentation, prompts, script, storyboard, and build notes.
- Git for versioned build history.

Validated so far:

- Local Node.js: `v24.11.1`, which satisfies the `>=22` runtime requirement.
- npm package: `hyperframes@0.6.80`.
- Docker CLI: available.
- Docker daemon: available through `docker info`.
- HyperFrames `doctor` detects Docker as running.
- Host FFmpeg: not currently available on PATH.
- TTS Python dependencies: installed in `.venv`.

## How To Run Once Ready

This project is partially implemented. The guide is Docker-first for rendering, and the first Docker render has completed.

Install dependencies:

```bash
npm install
```

Check the local environment:

```bash
npm run doctor
```

Check Docker:

```bash
npm run doctor:docker
```

Preview the composition:

```bash
npm run dev
```

Check the composition:

```bash
npm run check
```

Render the video:

```bash
npm run render
```

Output path:

```text
renders/hyperframes-in-60-seconds.mp4
```

Generate the AI voiceover:

```bash
npm run tts:setup
npm run tts
```

## Current Project Status

Status: first Docker render completed.

Completed:

- Repository structure created.
- Local npm project created.
- HyperFrames pinned as a local dev dependency.
- GSAP pinned as a local dev dependency.
- First `index.html` HyperFrames composition drafted.
- HyperFrames managed Chrome verified from cache.
- `npm run check` run successfully with 0 lint errors and 0 layout issues.
- `npm run snapshot` captured four verification frames and a contact sheet.
- Docker-first rendering plan documented.
- `npm run render` produced `renders/hyperframes-in-60-seconds.mp4`.
- Rendered MP4 verified with containerized `ffprobe`: 1920x1080, 30fps, 60 seconds, 1800 frames.
- Rendered MP4 contact sheet extracted to `video/hyperframes-in-60-seconds/screenshots/render-contact-sheet.jpg`.
- AI TTS voiceover generated with HyperFrames `tts`, Kokoro-82M, voice `af_nova`.
- Rendered MP4 now includes AAC audio.
- Audio/TTS article notes documented in `docs/006-audio-and-tts-for-the-article.md`.
- Article outline documented in `docs/007-article-outline.md`.
- Video expansion plan documented in `docs/008-video-expansion-plan.md`.
- Reproducible proof captured under `evidence/2026-06-07/`.
- Thesis document started.
- Research notes started.
- Setup plan started.
- Prompt briefs started.
- Initial 60-second script drafted.
- Initial storyboard drafted.
- Render notes file created.

Pending:

- Keep `npm run doctor:docker` as an explicit Docker preflight for this tutorial.
- Resolve `npm run doctor` host-local FFmpeg/FFprobe warnings only if local rendering is needed.
- Review the final MP4 end to end.
- Decide whether to split the single `index.html` into sub-compositions to remove the timeline density warning.
- Evaluate whether `af_nova` is the final voice or whether to audition alternate voices.
