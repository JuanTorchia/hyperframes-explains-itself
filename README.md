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

No video has been rendered yet. Render output is pending.

## Tools

Planned tools:

- HyperFrames CLI, pinned as a local npm dependency.
- Node.js 22 or newer for the JavaScript runtime.
- FFmpeg 6 or newer for video rendering support.
- GSAP, pinned as a local npm dependency, for timeline animation.
- Markdown for documentation, prompts, script, storyboard, and build notes.
- Git for versioned build history.

Validated so far:

- Local Node.js: `v24.11.1`, which satisfies the `>=22` runtime requirement.
- npm package: `hyperframes@0.6.80`.
- FFmpeg: not currently available on PATH.

## How To Run Once Ready

This project is partially implemented but not ready to render yet because FFmpeg is not installed or not available on PATH.

Install dependencies:

```bash
npm install
```

Check the local environment:

```bash
npm run doctor
```

Preview the composition:

```bash
npm run dev
```

Check the composition:

```bash
npm run check
```

Render command, pending FFmpeg validation:

```bash
npm run render
```

Expected output path once rendering works:

```text
renders/hyperframes-in-60-seconds.mp4
```

## Current Project Status

Status: initial implementation in progress.

Completed:

- Repository structure created.
- Local npm project created.
- HyperFrames pinned as a local dev dependency.
- GSAP pinned as a local dev dependency.
- First `index.html` HyperFrames composition drafted.
- HyperFrames managed Chrome verified from cache.
- `npm run check` run successfully with 0 lint errors and 0 layout issues.
- `npm run snapshot` captured four verification frames and a contact sheet.
- Thesis document started.
- Research notes started.
- Setup plan started.
- Prompt briefs started.
- Initial 60-second script drafted.
- Initial storyboard drafted.
- Render notes file created.

Pending:

- Install or expose FFmpeg on PATH.
- Resolve `npm run doctor` failures for FFmpeg, FFprobe, and Docker state.
- Preview the composition.
- Render the final MP4.
- Document mistakes, fixes, and final results.
