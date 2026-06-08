# Technical Build Journal

This journal records the real build process for `hyperframes-explains-itself`.

It should include commands, decisions, mistakes, fixes, and observations. It should not claim results before they happen.

## 2026-06-07

### Initial Idea

Start a public project that uses HyperFrames to explain HyperFrames.

The project should be useful to developers, not just a polished demo. The repository should show how the tutorial was built, what assumptions were made, what failed, and what eventually worked.

### Hypothesis

If HyperFrames is a practical way to create video from web-native source files, then a short video about HyperFrames should be buildable using HyperFrames itself.

The process should be understandable from the repository without needing private context.

### Success Criteria

- The repository contains clear documentation in English.
- The video script and storyboard are understandable before any render work starts.
- Setup requirements are explicit.
- Commands are documented after they are validated.
- Mistakes and fixes are recorded honestly.
- A final MP4 is eventually produced from reproducible source files.

### Risks

- HyperFrames setup may require undocumented or changing commands.
- FFmpeg installation may vary by operating system.
- The first storyboard may not map cleanly to implementation.
- The project could drift into marketing language instead of a useful technical tutorial.
- Render results may differ across machines if dependencies are not pinned or documented.

### Work Completed

- Created the initial repository structure.
- Drafted the README, thesis, research notes, setup plan, prompt briefs, script, storyboard, and render notes.

### Pending Work

- Validate the actual HyperFrames install and CLI workflow.
- Replace setup placeholders with real commands.
- Create the video source files.
- Preview the video.
- Render the final artifact.

## 2026-06-07

### Local Git Initialization

The repository already contained a `.git` directory but had no commits.

Created the initial local commit:

```bash
git commit -m "chore: scaffold hyperframes explains itself"
```

Created a local implementation branch:

```bash
git switch -c jtorchia/implement-hyperframes-tutorial
```

### Environment Check

Observed local environment:

```text
node --version -> v24.11.1
ffmpeg -version -> command not found
hyperframes --version -> command not found
npm view hyperframes version -> 0.6.80
```

Node is newer than the planned Node 22 baseline. FFmpeg and a global HyperFrames command are not available on PATH.

Decision: use a local npm dependency for HyperFrames instead of a global install. This makes the repository more reproducible and avoids relying on machine-global CLI state.

### Implementation Started

Installed local development dependencies:

```bash
npm install --save-dev hyperframes@0.6.80
npm install --save-dev gsap@3.14.2
```

Created the first HyperFrames composition in `index.html`.

Ran HyperFrames browser setup:

```bash
npx hyperframes browser ensure
```

Result:

```text
Browser found in HyperFrames cache.
Ready to render.
```

Ran the project checks:

```bash
npm run check
```

Result:

```text
hyperframes lint -> 0 errors, 1 warning
hyperframes inspect -> 0 layout issues across 9 samples
```

The remaining lint warning is `timeline_track_too_dense`. For this first tutorial pass, all eight scenes stay in `index.html` because the single-file source is easier to read and review. If the composition grows, scenes should move into sub-compositions.

Ran snapshots:

```bash
npm run snapshot
```

First snapshot result exposed a real visual bug: all scenes were visible at once, and the frame at 0.0s was later blank after the first fix.

Fixes:

- Replaced the broad `tl.set(".clip", { autoAlpha: 1 })` with explicit per-scene visibility changes.
- Set the hook scene visible in CSS so the 0.0s frame is not blank.
- Added `tools/move-snapshots.mjs` so HyperFrames snapshot output is moved from the CLI default `snapshots/` directory into `video/hyperframes-in-60-seconds/screenshots`.

Current snapshot result:

```text
4 snapshots captured at 0.0s, 14.0s, 32.0s, and 56.0s.
5 files moved to video/hyperframes-in-60-seconds/screenshots.
```

Preview server was started with:

```bash
npm run dev
```

Preview URL:

```text
http://localhost:3002
```

No MP4 render has been run yet.

### Current Blocker

FFmpeg and FFprobe are not available on PATH. Rendering should not be attempted until this is fixed or a Docker/cloud render path is intentionally chosen and documented.

## 2026-06-07

### Docker-First Decision

The guide now treats Docker rendering as the default path.

Reasoning:

- HyperFrames documentation recommends Docker mode for deterministic output across platforms.
- Docker mode avoids requiring each developer to install and expose the same FFmpeg/FFprobe build on the host.
- CI and agent-driven rendering are better aligned with a containerized render environment.

The local `ffmpeg-static` idea was rejected because it adds wrapper complexity and still does not match HyperFrames' documented Docker-first reproducibility story.

### Docker Investigation

Commands run:

```bash
npm run doctor:docker
docker ps
docker context ls
npm run doctor
```

Observed first:

```text
docker version -> Docker CLI and Docker Desktop server available
docker info -> succeeds
docker ps -> succeeds
active context -> desktop-linux
hyperframes doctor -> still reports Docker running as failed
```

Follow-up check:

```text
hyperframes doctor -> Docker running
```

Conclusion:

The earlier Docker-running failure was transient, likely Docker Desktop still settling after startup. The guide should not present it as a stable HyperFrames bug. Keep `npm run doctor:docker` as a direct Docker preflight because it is explicit and easy to understand, but `npm run doctor` is now consistent with Docker being available.

No Docker render has been run yet.

## 2026-06-07

### First Docker Render

Preflight:

```bash
npm run check
npm run doctor:docker
```

Result:

```text
npm run check -> 0 lint errors, 1 warning, 0 layout issues
npm run doctor:docker -> Docker CLI and Docker Desktop server available
```

Render command:

```bash
npm run render
```

The first attempt timed out after 10 minutes while Docker was still building the `hyperframes-renderer:0.6.80` image.

Investigation:

```text
docker-buildx was still running.
No MP4 existed in renders/.
No HyperFrames render container was active yet.
```

After the Docker image finished building, the render was run again.

Final render result:

```text
Output: renders/hyperframes-in-60-seconds.mp4
Size: 1.0 MB
Render duration reported by HyperFrames: 4m 54.6s
Video duration: 60.000000 seconds
Resolution: 1920x1080
Frame rate: 30fps
Frames: 1800
```

Verification command:

```bash
docker run --rm -v "${PWD}:/work" --entrypoint ffprobe hyperframes-renderer:0.6.80 -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,nb_frames -show_entries format=duration,size -of json /work/renders/hyperframes-in-60-seconds.mp4
```

Notes:

- The `timeline_track_too_dense` warning did not block render. `--strict` blocks lint errors; warnings continue.
- HyperFrames auto-calibration reduced workers from 2 to 1 because frame capture was expensive.
- A rendered-video contact sheet was extracted to `video/hyperframes-in-60-seconds/screenshots/render-contact-sheet.jpg`.

## 2026-06-07

### AI TTS Voiceover

Decision:

Use AI TTS, but keep it reproducible and disclosed in the build log.

HyperFrames provides local TTS through Kokoro-82M:

```bash
npx hyperframes tts --list
```

Initial TTS attempt failed:

```text
Speech synthesis failed: The kokoro-onnx package is not installed. Run: pip install kokoro-onnx soundfile
```

Fix:

- Created a local `.venv`.
- Added `tools/setup-tts-python.mjs`.
- Added `tools/run-with-venv.mjs`.
- Added `npm run tts:setup`.
- Added `npm run tts`.

Setup command:

```bash
npm run tts:setup
```

Generation command:

```bash
npm run tts
```

Result:

```text
Generated 55.9s of speech -> audio/generated/hyperframes-in-60-seconds-af-nova.wav
ffprobe duration -> 55.850667 seconds
```

Voice settings:

```text
Model: Kokoro-82M through HyperFrames tts
Voice: af_nova
Language: en-us
Speed: 1.15
```

### Audio Documentation For Article

Created:

```text
docs/006-audio-and-tts-for-the-article.md
```

Key framing for the article:

```text
The TTS generation step is not deterministic. The generated WAV is committed and treated as a source asset. The Docker render from HTML plus WAV is reproducible.
```

### Article Outline And Evidence

Created:

```text
docs/007-article-outline.md
docs/008-video-expansion-plan.md
evidence/README.md
evidence/2026-06-07/npm-run-check.txt
evidence/2026-06-07/ffprobe-render.json
evidence/2026-06-07/artifact-manifest.txt
```

Purpose:

```text
Turn the working proof into article-ready structure and keep the article grounded in captured command output.
```

Current proof:

```text
npm run check -> 0 errors, 1 warning, 0 layout issues
ffprobe -> h264 video stream and aac audio stream in the rendered MP4
```

Pending:

```text
Refactor the video into smaller scene compositions and update evidence after the next render.
```

### Composition Architecture Refactor

Changed:

```text
index.html
styles/video.css
compositions/002-what-it-is.html
compositions/003-html-source.html
compositions/004-setup.html
compositions/005-init.html
compositions/006-preview.html
compositions/007-render.html
compositions/008-close.html
```

Decision:

```text
Keep the hook scene inline in index.html so the exact t=0 frame is visible before nested compositions finish loading. Mount the remaining scenes as sub-compositions.
```

Issues fixed:

```text
timeline_track_too_dense was removed by moving scenes into sub-compositions.
The first t=0 snapshot frame stayed blank when the hook was nested, so the hook remains inline.
Sub-composition timeline IDs initially used internal names; Docker render expected host IDs. The scene files now register timelines with the same IDs as their parent mounts.
```

Current validation:

```text
npm run check -> 0 errors, 0 warnings, 0 layout issues
npm run snapshot -> 4 frames captured and moved into video/hyperframes-in-60-seconds/screenshots
npm run render -> completed with Docker, --strict-all, and --workers 1
```

### Demo V2 Planning

Created:

```text
video/hyperframes-in-60-seconds/v2-script.md
video/hyperframes-in-60-seconds/v2-storyboard.md
docs/009-demo-v2-implementation-plan.md
docs/010-hyperframes-capability-map.md
```

Decision:

```text
V2 should become a developer walkthrough, not just a 60 second intro. It should show the repository, parent composition, sub-compositions, explicit timing, developer loop, Docker render, TTS audio, proof, and mistakes found.
```

Expanded decision:

```text
V2 should also show practical capability examples: composition variables, reusable scene cards, output format awareness, strict validation, snapshots, and FFprobe evidence. Advanced features like cloud, Lambda, publish, transcription, background removal, capture, registry blocks, and benchmarking should be documented but not shown unless this repo actually uses them.
```

Pending:

```text
V2 has been implemented, TTS has been regenerated, and the Docker render has completed.
```

### Demo V2 Implementation

Implemented:

```text
index.html
styles/video.css
compositions/002-repository-proof.html
compositions/003-parent-composition.html
compositions/004-sub-compositions.html
compositions/005-explicit-timing.html
compositions/006-variables-and-reuse.html
compositions/007-developer-loop.html
compositions/008-docker-render-and-formats.html
compositions/009-audio-tts.html
compositions/010-evidence.html
compositions/011-mistakes-found.html
compositions/012-close.html
```

Generated:

```text
audio/generated/hyperframes-in-60-seconds-af-nova.wav -> 97.472000 seconds
renders/hyperframes-in-60-seconds.mp4 -> 108.054000 seconds
```

Validation:

```text
npm run check -> 0 errors, 0 warnings, 0 layout issues
npm run snapshot -> frames at 0, 36, 69, and 105 seconds
npm run render -> Docker render completed in 7m 46.0s
ffprobe -> h264 video stream and aac audio stream
```

## 2026-06-07

### Capability Experiment Suite

Decision:

```text
Do not force every HyperFrames capability into the main walkthrough yet.
Create small reproducible experiments first, then choose the best proof clips and screenshots for the article or final demo.
```

Created:

```text
experiments/README.md
experiments/001-media-timing/
experiments/002-output-formats/
experiments/003-cli-introspection/
experiments/004-benchmark/
experiments/005-transcribe-captions/
experiments/006-registry-components/
experiments/007-capture-website/
docs/011-experiment-suite.md
tools/run-introspection-evidence.mjs
tools/run-local-capture.mjs
```

Implemented and validated:

```text
001-media-timing -> lint and inspect passed with 0 errors, 0 warnings, 0 layout issues
001-media-timing -> rendered 6-second MP4 proof with real video source, data-media-start, data-volume, image layer, HTML overlays, and audio
002-output-formats -> produced WebM artifact and verified VP9 video plus Opus audio with FFprobe
003-cli-introspection -> captured info, compositions, doctor, and browser-path evidence
005-transcribe-captions -> imported SRT transcript and generated transcript.json
006-registry-components -> captured full catalog JSON and captions catalog JSON
007-capture-website -> captured a local static website into screenshots, extracted tokens, visible text, font metadata, and agent instructions
```

Mistakes and findings:

```text
The first media render referenced assets outside the experiment root. HyperFrames rendered but warned that the video and image could not be resolved. The fix was to copy source assets into experiments/001-media-timing/assets.
The first valid media-source render warned about sparse keyframes in the input MP4. The fix was to re-encode the source with FFmpeg inside the Docker renderer image using -g 30.
The WebM render exceeded the shell timeout, but the artifact existed afterward and passed FFprobe verification. Treat this as an operational warning before recommending WebM for short proof clips.
hyperframes info --json reported duration 107, while hyperframes compositions --json reported main.duration 108. Do not use info.duration as proof until that mismatch is understood.
Host FFmpeg and FFprobe remain unavailable; Docker remains the reliable render and verification path.
```

Pending:

```text
Run PNG sequence output.
Run the tiny benchmark composition.
Install one caption registry component in an isolated experiment.
Decide whether to run Whisper transcription on the generated TTS audio.
Re-render the main walkthrough after the source-only evidence text fix in compositions/010-evidence.html.
```
