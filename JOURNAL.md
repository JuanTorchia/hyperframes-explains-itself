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
002-output-formats -> produced 30 PNG frames from a dedicated 1-second composition
003-cli-introspection -> captured info, compositions, doctor, and browser-path evidence
004-benchmark -> attempted benchmark and captured local render worker failure
005-transcribe-captions -> imported SRT transcript and generated transcript.json
005-transcribe-captions -> attempted audio transcription and captured missing whisper-cpp requirement
006-registry-components -> captured full catalog JSON, captions catalog JSON, and isolated caption-weight-shift install
007-capture-website -> captured a local static website into screenshots, extracted tokens, visible text, font metadata, and agent instructions
```

Mistakes and findings:

```text
The first media render referenced assets outside the experiment root. HyperFrames rendered but warned that the video and image could not be resolved. The fix was to copy source assets into experiments/001-media-timing/assets.
The first valid media-source render warned about sparse keyframes in the input MP4. The fix was to re-encode the source with FFmpeg inside the Docker renderer image using -g 30.
The WebM render exceeded the shell timeout, but the artifact existed afterward and passed FFprobe verification. Treat this as an operational warning before recommending WebM for short proof clips.
A PNG sequence render against the media-heavy composition exceeded a 10-minute timeout and left partial frames. The reproducible PNG proof now uses a dedicated 1-second composition and produces 30 complete frames.
hyperframes benchmark failed in local render workers because Puppeteer did not receive an executablePath or channel. The benchmark CLI help does not expose --docker.
hyperframes transcribe imported SRT successfully, but audio transcription failed because whisper-cpp is not installed.
hyperframes add wrote the caption-weight-shift component into an isolated sandbox. The JSON response reported clipboardCopied: true even with --no-clipboard.
hyperframes info --json reported duration 107, while hyperframes compositions --json reported main.duration 108. Do not use info.duration as proof until that mismatch is understood.
Host FFmpeg and FFprobe remain unavailable; Docker remains the reliable render and verification path.
```

Pending:

```text
Decide whether to install whisper-cpp for real audio transcription.
Investigate benchmark local browser executable path.
Decide whether caption-weight-shift should become a real captions scene.
Re-render the main walkthrough after the source-only evidence text fix in compositions/010-evidence.html.
```

## 2026-06-08

### Capability Experiment Continuation

Completed:

```text
002-output-formats -> PNG sequence proof completed with 30 frames from a dedicated 1-second composition.
004-benchmark -> benchmark command attempted; output captured as evidence, but local render workers failed before timing comparisons were produced.
005-transcribe-captions -> audio transcription attempted; blocked by missing whisper-cpp.
006-registry-components -> caption-weight-shift installed into an isolated sandbox and the written component file was preserved.
```

Validation:

```text
npm run check -> 0 errors, 0 warnings, 0 layout issues
npm run experiment:media:check -> 0 errors, 0 warnings, 0 layout issues
npx hyperframes lint experiments/002-output-formats/png-sequence -> 0 errors, 0 warnings
npx hyperframes inspect experiments/002-output-formats/png-sequence -> 0 layout issues
```

### Benchmark Fix And Transcription Documentation

Fixed:

```text
The benchmark composition now has a registered GSAP timeline and stable editable id.
npm run experiment:benchmark now uses tools/run-benchmark-evidence.mjs.
The benchmark runner reads the managed Chrome path from introspection evidence.
The benchmark runner sets HYPERFRAMES_BROWSER_PATH, PRODUCER_HEADLESS_SHELL_PATH, and PUPPETEER_EXECUTABLE_PATH.
The benchmark runner uses ffmpeg-static through a project-local tools/.cache/bin/ffmpeg.exe path.
```

Latest benchmark evidence:

```text
experiments/004-benchmark/evidence/benchmark-runs-1-fixed.txt
experiments/004-benchmark/evidence/benchmark-fixed-summary.txt
```

Result:

```text
The benchmark now produces timing and size evidence for most presets.
One 30fps standard 4-worker preset still failed in the latest run, so benchmark evidence remains environment-sensitive.
```

Documented:

```text
Audio transcription still requires whisper-cpp. The project does not install it silently.
docs/012-local-tooling-fixes.md records the benchmark fixes and transcription prerequisite.
```

### Transcription Tooling Probe

Installed and tested:

```text
npm run transcribe:setup -> installed whisper.cpp-cli into .venv
npm run experiment:transcribe -> completed
```

Findings:

```text
HyperFrames found the local whisper-cpp.exe when HYPERFRAMES_WHISPER_PATH was set.
The first local HyperFrames attempt advanced from missing Whisper to missing FFmpeg.
Adding project-local ffmpeg-static advanced the command again.
Direct HyperFrames audio transcription still failed because the tested Python package does not accept --suppress-nst.
The same package generated whisper.cpp JSON directly when --suppress-nst was omitted.
HyperFrames successfully imported that generated whisper.cpp JSON.
```

Evidence:

```text
experiments/005-transcribe-captions/evidence/generated-transcript-fixed.json
experiments/005-transcribe-captions/evidence/direct-whisper.stderr.txt
experiments/005-transcribe-captions/evidence/direct-whisper-nosuppress.stderr.txt
experiments/005-transcribe-captions/evidence/imported-direct-whisper-json.json
experiments/005-transcribe-captions/source/direct-whisper-transcript.json
experiments/005-transcribe-captions/source/direct-whisper-imported-transcript.json
```

Pending:

```text
Test a full whisper.cpp build or official whisper-cli binary that supports --suppress-nst.
Decide whether final captions should come from Whisper output, curated script text, or both.
```

### Official Whisper.cpp Transcription

Tested:

```text
npm run transcribe:setup:official -> installed official ggml-org/whisper.cpp v1.8.6 Windows x64 asset into tools/.cache
npm run experiment:transcribe:official -> completed direct HyperFrames audio transcription
```

Result:

```json
{"ok":true,"model":"tiny.en","wordCount":315,"durationSeconds":97.22,"speechOnsetSeconds":null,"transcriptPath":"C:\\Users\\jstor\\OneDrive\\Documentos\\HyperFrame\\audio\\generated\\transcript.json"}
```

Finding:

```text
The official whisper-cli.exe supports --suppress-nst.
The Python whisper.cpp-cli package remains a near miss, but it should not be recommended as the primary path for HyperFrames direct audio transcription.
The official Windows x64 release asset is the recommended local path for this project.
```

Evidence:

```text
experiments/005-transcribe-captions/evidence/official-whisper-release.json
experiments/005-transcribe-captions/evidence/official-whisper-cli-help.stderr.txt
experiments/005-transcribe-captions/evidence/generated-transcript-official-whisper.json
experiments/005-transcribe-captions/source/official-hyperframes-transcript.json
audio/generated/transcript.json
```

### Caption Layer Proof

Implemented:

```text
008-captions-layer -> automatic Whisper captions vs curated script captions
tools/run-caption-layer-evidence.mjs -> generates caption groups and comparison evidence
```

Rendered:

```text
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

Validation:

```text
npm run experiment:captions:check -> 0 errors, 0 warnings, 0 layout issues
npm run experiment:captions:render -> completed
ffprobe -> h264, 1920x1080, 30fps, 12.000000 seconds
frames extracted at 2s, 5s, and 9s for article screenshots
```

Decision:

```text
Use Whisper output for timing evidence and bootstrap captions.
Use curated script text for final developer-facing captions unless the article explicitly wants to show raw machine transcript quality.
```

### Captioned Main Render Variant

Implemented:

```text
compositions/captions-data.js -> curated scene-level caption data
variants/main-with-captions/index.html -> alternate main render template
tools/render-main-with-captions.mjs -> temporary index swap, lint, inspect, render, restore
```

Rendered:

```text
renders/hyperframes-in-60-seconds-with-captions.mp4
```

Validation:

```text
npm run render:captions -> completed
lint -> 0 errors, 0 warnings
inspect -> 0 layout issues
ffprobe -> h264 video, aac audio, 1920x1080, 30fps, 108.054000 seconds
frames extracted at 8s, 40s, and 88s
```

Finding:

```text
The caption overlay is legible on sampled frames.
The brand footer initially competed with the caption area in some scenes.
Polish fix: move the footer to the top-right corner only in the captioned variant.
The captioned render was regenerated after the footer fix.
```

### Article Structure Pass

Updated:

```text
docs/007-article-outline.md -> post-ready technical outline based on current evidence
docs/014-publication-checklist.md -> checklist for claims, media, commands, and follow-ups
```

Decision:

```text
The article should be drafted from evidence, not from product claims.
Use the captioned render and experiment clips as article assets.
Keep failure sections explicit: FFmpeg, keyframes, PNG timeout, benchmark worker setup, Whisper package mismatch, caption footer polish.
```

### HyperFrames Coverage Audit

Investigated:

```text
Official docs index
Official CLI reference
Official data attribute and frame adapter pages
Local hyperframes@0.6.80 command help
Existing experiment evidence
```

Finding:

```text
The repo covers the core local workflow and several advanced surfaces, but it does not cover every HyperFrames feature.
The installed CLI exposes more commands than the public nine-command CLI reference page.
Major remaining gaps include remove-background, social aspect ratio renders, MOV output, render quality/bitrate controls, non-GSAP adapters, data-fade/data-loop/data-speed, init evidence, CI/batch rendering, cloud, publish, Lambda, and auth.
```

Documented:

```text
docs/015-hyperframes-coverage-audit.md
```

## 2026-06-08 - Coverage Experiments Batch

Implemented:

```text
experiments/009-track-attributes
experiments/010-social-aspects
experiments/011-render-controls
experiments/012-waapi-adapter
tools/run-social-aspects-evidence.mjs
tools/run-render-controls-evidence.mjs
tools/extract-experiment-frames.mjs
```

Validated:

```text
npm run experiment:track:check
npm run experiment:track:render
npm run experiment:social:check
npm run experiment:social:render
npm run experiment:render-controls:check
npm run experiment:render-controls:render
npm run experiment:waapi:check
npm run experiment:waapi:render
npm run experiment:frames
```

Findings:

```text
Track/media attributes can be demonstrated in a tiny deterministic composition.
`data-end` should not be used in new examples because local lint marks it deprecated and recommends `data-duration`.
Landscape, portrait, and square exports work cleanly when each aspect ratio lives in its own project directory.
Putting multiple root HTML files in one directory triggered `multiple_root_compositions`, which is a useful article mistake to show.
Each social aspect project needs local assets. A first styled render referenced `../social.css`, but the stylesheet did not load from the isolated project root.
Render quality, CRF, and bitrate controls all produced artifacts, but tiny file-size differences should not be treated as general encoder benchmarks.
A browser-native WAAPI animation can be bridged to the HyperFrames seek clock for local deterministic rendering.
The WAAPI proof does not cover Lottie, Three.js, Rive, D3, PixiJS, or custom adapters.
```

Evidence:

```text
experiments/009-track-attributes/output/track-attributes-proof.mp4
experiments/010-social-aspects/output/social-landscape.mp4
experiments/010-social-aspects/output/social-portrait.mp4
experiments/010-social-aspects/output/social-square.mp4
experiments/011-render-controls/output/render-controls-draft.mp4
experiments/011-render-controls/output/render-controls-standard.mp4
experiments/011-render-controls/output/render-controls-high.mp4
experiments/011-render-controls/output/render-controls-crf-28.mp4
experiments/011-render-controls/output/render-controls-bitrate-2m.mp4
experiments/012-waapi-adapter/output/waapi-adapter-proof.mp4
experiments/009-track-attributes/evidence/frame-3s.png
experiments/010-social-aspects/evidence/frame-landscape.png
experiments/010-social-aspects/evidence/frame-portrait.png
experiments/010-social-aspects/evidence/frame-square.png
experiments/011-render-controls/evidence/frame-standard.png
experiments/012-waapi-adapter/evidence/frame-2s.png
```

Next:

```text
Test remove-background on a tiny input.
Decide whether MOV output is worth proving separately.
Add one more adapter family beyond WAAPI, likely Three.js or Lottie.
Keep cloud, publish, Lambda, and auth as documented surfaces until there is an explicit credentials decision.
```

## 2026-06-08 - Adapter Sampler Batch

Investigated:

```text
HyperFrames frame adapter docs
HyperFrames timing and `hf-seek` docs
Local npm package availability for `@hyperframes/adapters`
```

Finding:

```text
The docs list adapters for GSAP, Lottie, Three.js, Rive, WAAPI, D3, and PixiJS, and describe the shared pattern as listening to `hf-seek`.
`npm view @hyperframes/adapters version` returned a public registry 404 in this environment.
The experiment therefore uses local `hf-seek` bridges instead of claiming official adapter package coverage.
```

Implemented:

```text
experiments/013-adapter-sampler/three
experiments/013-adapter-sampler/anime
experiments/013-adapter-sampler/d3
experiments/013-adapter-sampler/lottie
tools/run-adapter-evidence.mjs
```

Validated:

```text
npm run experiment:adapters:check
npm run experiment:adapters:render
```

Evidence:

```text
experiments/013-adapter-sampler/evidence/adapter-summary.json
experiments/013-adapter-sampler/evidence/frame-three.png
experiments/013-adapter-sampler/evidence/frame-anime.png
experiments/013-adapter-sampler/evidence/frame-d3.png
experiments/013-adapter-sampler/evidence/frame-lottie.png
experiments/013-adapter-sampler/output/three-adapter-proof.mp4
experiments/013-adapter-sampler/output/anime-adapter-proof.mp4
experiments/013-adapter-sampler/output/d3-adapter-proof.mp4
experiments/013-adapter-sampler/output/lottie-adapter-proof.mp4
```

Operational note:

```text
npm install added `three`, `animejs`, `d3`, `lottie-web`, and explicit `esbuild` dev dependencies.
npm printed an EPERM cleanup warning for a temporary `node_modules/@esbuild/.win32-x64-*` directory. It is inside node_modules and not a repository artifact.
```

## 2026-06-08 - HyperFrames 0.6.81 And Adapter Package Follow-up

Investigated:

```text
npm metadata for hyperframes, @hyperframes/core, and @hyperframes/adapters
published @hyperframes/core@0.6.81 tarball
GitHub main branch packages/core/src/adapters
public docs on hyperframes.video and hyperframes.heygen.com
```

Findings:

```text
hyperframes latest -> 0.6.81
@hyperframes/core latest -> 0.6.81
@hyperframes/adapters -> public npm registry 404
@hyperframes/core@0.6.81 contains GSAP adapter internals only
GitHub main packages/core/src/adapters also contains GSAP adapter files only
```

Updated:

```text
package.json -> hyperframes@0.6.81
package-lock.json -> hyperframes@0.6.81
docs/016-adapter-package-investigation.md
docs/015-hyperframes-coverage-audit.md
docs/011-experiment-suite.md
experiments/013-adapter-sampler/README.md
```

Decision:

```text
Keep the adapter sampler wording as project-local `hf-seek` bridges.
Do not claim official adapter package coverage for Lottie, Three.js, Anime.js, D3, PixiJS, Rive, or dotLottie.
```

Validation:

```text
npx hyperframes --version -> 0.6.81
npm run experiment:adapters:check -> passed
npm run experiment:adapters:render -> passed
npm run check -> passed
Adapter sampler artifact hashes stayed unchanged after the 0.6.81 render.
```
