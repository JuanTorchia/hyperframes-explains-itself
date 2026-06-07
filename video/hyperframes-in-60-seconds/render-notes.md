# Render Notes

This file will record preview and render attempts for `HyperFrames in 60 Seconds`.

Preview, snapshots, checks, and the first Docker render have been run.

## Environment

- Node.js: `v24.11.1` observed locally.
- Docker CLI: available.
- Docker daemon: available through `docker info`.
- Host FFmpeg: not available on PATH.
- Host FFprobe: not available on PATH.
- HyperFrames: `0.6.80` installed as a local dev dependency.
- GSAP: `3.14.2` installed as a local dev dependency.
- Chrome: available from HyperFrames cache after `npx hyperframes browser ensure`.
- Voiceover: `audio/generated/hyperframes-in-60-seconds-af-nova.wav`, generated with HyperFrames `tts`, Kokoro-82M, voice `af_nova`, speed `1.15`.

## Preview Attempts

### 2026-06-07

Command:

```bash
npm run dev
```

Result:

```text
Studio running at http://localhost:3002
```

The preview server is active. No MP4 render was produced.

## Snapshot Attempts

### 2026-06-07

Command:

```bash
npm run snapshot
```

Initial result:

```text
4 snapshots saved to snapshots/
```

Issue found:

- Scenes were stacked together because the timeline set all clips visible.
- After the first fix, the 0.0s frame was blank because the hook scene was not visible before timeline evaluation.

Fix:

- Use explicit timeline visibility changes for each scene.
- Keep the hook scene visible in CSS for the initial frame.
- Move CLI snapshot output into `video/hyperframes-in-60-seconds/screenshots`.

Current result:

```text
4 snapshots captured.
5 files moved to video/hyperframes-in-60-seconds/screenshots.
```

## Check Attempts

### 2026-06-07

Command:

```bash
npm run check
```

Result:

```text
hyperframes lint -> 0 errors, 1 warning
hyperframes inspect -> 0 layout issues across 9 samples
```

Remaining warning:

```text
timeline_track_too_dense
```

Decision: keep the first version as a single `index.html` for readability. Split into sub-compositions only if the video source grows or becomes hard to inspect.

## Render Attempts

### 2026-06-07

Command:

```bash
npm run render
```

First attempt:

```text
Timed out after 10 minutes while Docker was still building hyperframes-renderer:0.6.80.
```

Investigation:

```text
docker-buildx was still running.
No MP4 existed in renders/.
No HyperFrames render container was active yet.
```

Second attempt after the Docker image build completed:

```text
Render completed.
Output: renders/hyperframes-in-60-seconds.mp4
Size: 1.0 MB
HyperFrames reported render time: 4m 54.6s
```

### 2026-06-07 Audio Render

Command:

```bash
npm run render
```

Result:

```text
Render completed.
Output: renders/hyperframes-in-60-seconds.mp4
Size: 2.4 MB
HyperFrames reported render time: 5m 48.5s
```

The render included one audio track from:

```text
audio/generated/hyperframes-in-60-seconds-af-nova.wav
```

Containerized `ffprobe` verification:

```text
Video stream: h264, 1920x1080, 30fps, 60.000000 seconds, 1800 frames
Audio stream: aac, 60.053333 seconds, 2815 frames
Container duration: 60.054000 seconds
Size: 2488679 bytes
```

Containerized `ffprobe` verification:

```text
Resolution: 1920x1080
Frame rate: 30fps
Duration: 60.000000 seconds
Frames: 1800
Size: 1090238 bytes
```

Render warnings:

- Earlier versions reported `timeline_track_too_dense`; the composition was split into sub-compositions to remove it.
- Earlier Docker renders reduced workers from 2 to 1 after calibration because frame capture was expensive. The render script now pins `--workers 1`.

Rendered artifact visual check:

- Extracted `video/hyperframes-in-60-seconds/screenshots/render-contact-sheet.jpg` from the final MP4.

### 2026-06-07 Composition Refactor Render

Command:

```bash
npm run render
```

Script mapping:

```bash
hyperframes render --docker --strict-all --workers 1 --output renders/hyperframes-in-60-seconds.mp4
```

Result:

```text
Render completed.
Output: renders/hyperframes-in-60-seconds.mp4
Size: 2.4 MB
HyperFrames reported render time: 3m 17.3s
```

Architecture changes:

- `index.html` now owns the parent composition, audio track, scene mounts, and parent timeline.
- `styles/video.css` owns shared visual styling.
- `compositions/` owns per-scene HTML files for scenes after the hook.
- The hook remains inline in `index.html` so the exact `t=0` frame is visible.

Validation after refactor:

```text
hyperframes lint -> 0 errors, 0 warnings
hyperframes inspect -> 0 layout issues across 9 samples
```

Docker render notes:

- The first refactor render exposed mismatched sub-composition timeline IDs.
- Scene files now register timelines using the same IDs as their parent mounts.
- The render script pins `--workers 1` to match observed capture behavior and skip auto-worker calibration noise.

## Output

Final MP4 output path:

```text
renders/hyperframes-in-60-seconds.mp4
```

## Issues

- FFmpeg is missing from PATH, so local render is blocked.
- FFprobe is missing from PATH, so local render is blocked.
- Docker render is the preferred path.
- `hyperframes doctor` detects Docker running after Docker Desktop is ready.
- The globally installed `hyperframes` command is not available; this project uses local npm scripts instead.
