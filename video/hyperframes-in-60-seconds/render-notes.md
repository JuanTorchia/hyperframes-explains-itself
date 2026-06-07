# Render Notes

This file will record preview and render attempts for `HyperFrames in 60 Seconds`.

No preview or render has been run yet.

## Environment

- Node.js: `v24.11.1` observed locally.
- FFmpeg: not available on PATH.
- FFprobe: not available on PATH.
- HyperFrames: `0.6.80` installed as a local dev dependency.
- GSAP: `3.14.2` installed as a local dev dependency.
- Chrome: available from HyperFrames cache after `npx hyperframes browser ensure`.

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

No render attempts yet.

## Output

Final MP4 output path: pending.

## Issues

- FFmpeg is missing from PATH, so local render is blocked.
- FFprobe is missing from PATH, so local render is blocked.
- The globally installed `hyperframes` command is not available; this project uses local npm scripts instead.
