# Docker Rendering Plan

## Recommendation

Use Docker as the default render path for this tutorial.

Local mode is useful for quick iteration, but Docker mode is the better default for a public reproducible project because it reduces machine-specific differences. HyperFrames documentation describes Docker mode as the path for deterministic output with a fixed Chrome version, font set, and FFmpeg stack.

## Why Docker First

Docker gives this project a cleaner claim:

> Clone the repo, install dependencies, start Docker, render with the same containerized toolchain.

That is stronger than asking every developer to install the same FFmpeg build, expose it on PATH, and hope local font/browser differences do not matter.

## Current Local State

Observed on 2026-06-07:

```text
Docker CLI: available
Docker daemon: available through docker info
HyperFrames managed Chrome: available from cache
Host FFmpeg: not available on PATH
Host FFprobe: not available on PATH
HyperFrames doctor Docker-running check: passes after Docker Desktop is ready
```

This means local non-Docker rendering is blocked, but Docker rendering is the preferred next render test. Use `npm run doctor:docker` as an explicit Docker preflight because it validates the Docker daemon directly.

## Planned Commands

Install dependencies:

```bash
npm install
```

Check HyperFrames local environment:

```bash
npm run doctor
```

Check Docker:

```bash
npm run doctor:docker
```

Preview locally:

```bash
npm run dev
```

Validate the composition:

```bash
npm run check
```

Capture verification frames:

```bash
npm run snapshot
```

Render with Docker:

```bash
npm run render
```

The render script maps to:

```bash
hyperframes render --docker --strict --output renders/hyperframes-in-60-seconds.mp4
```

## Local Render Fallback

Local render is intentionally not the default:

```bash
npm run render:local
```

Use it only when FFmpeg and FFprobe are installed on the host and `npm run doctor` passes those checks.

## Operational Notes

- Docker Desktop must be running before `npm run render`.
- `npm run doctor` checks the whole HyperFrames environment; `npm run doctor:docker` checks Docker directly.
- The first Docker render may be slower while the image is prepared.
- Do not mount or commit `node_modules` into Docker render artifacts.
- Keep `renders/` ignored until the final MP4 is intentionally produced.
- For CI, prefer Docker mode or the official HyperFrames render action rather than installing global tools ad hoc.

## References

- HyperFrames install docs: `https://hyperframes.video/docs/getting-started/install`
- HyperFrames rendering docs: `https://hyperframes.app/docs/3-guides/4-rendering`
- HyperFrames CI and batch rendering docs: `https://hyperframes.video/docs/recipes/ci-batch`
