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
