# Setup Plan

This setup plan is partially validated. Rendering is now Docker-first. Docker CLI access is available, but Docker rendering has not been attempted yet.

## Target Environment

- Node.js 22 or newer.
- Docker Desktop.
- FFmpeg 6 or newer for optional host-local rendering.
- FFprobe, installed with FFmpeg, for optional host-local rendering.
- HyperFrames CLI pinned through npm.
- Git.

## Planned Steps

1. Confirm Node.js version.
2. Confirm Docker availability.
3. Install local npm dependencies.
4. Initialize the video project.
5. Create the video source.
6. Preview the video.
7. Render the MP4 with Docker.
8. Document errors, fixes, and final commands.

## Commands To Validate

```bash
node --version
npm install
npm run doctor
npm run doctor:docker
npm run dev
npm run check
npm run render
```

The render command is documented but should not be run until Docker Desktop is running.

## Validation Checklist

- Node.js reports version 22.x or newer.
- Docker CLI runs from the terminal.
- Docker daemon is running.
- `npm run doctor:docker` passes.
- HyperFrames can run through npm scripts.
- Preview starts without rendering a final artifact.
- Render creates an MP4 in a documented output path.
- The journal records any failures or setup changes.

## Rollback Notes

If setup creates generated files that are not part of the tutorial source, identify them before committing. Generated artifacts should be committed only when they are useful for the public tutorial.
