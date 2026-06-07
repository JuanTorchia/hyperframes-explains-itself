# Setup Plan

This setup plan is partially validated. Rendering is still blocked because FFmpeg and FFprobe are not available on PATH.

## Target Environment

- Node.js 22 or newer.
- FFmpeg 6 or newer.
- FFprobe, installed with FFmpeg.
- HyperFrames CLI pinned through npm.
- Git.

## Planned Steps

1. Confirm Node.js version.
2. Confirm FFmpeg availability.
3. Install local npm dependencies.
4. Initialize the video project.
5. Create the video source.
6. Preview the video.
7. Render the MP4.
8. Document errors, fixes, and final commands.

## Commands To Validate

```bash
node --version
ffmpeg -version
npm install
npm run doctor
npm run dev
npm run check
npm run render
```

The render command is documented but should not be run until FFmpeg is installed or a Docker/cloud render path is selected.

## Validation Checklist

- Node.js reports version 22.x or newer.
- FFmpeg runs from the terminal and reports version 6 or newer.
- FFprobe runs from the terminal.
- HyperFrames can run through npm scripts.
- Preview starts without rendering a final artifact.
- Render creates an MP4 in a documented output path.
- The journal records any failures or setup changes.

## Rollback Notes

If setup creates generated files that are not part of the tutorial source, identify them before committing. Generated artifacts should be committed only when they are useful for the public tutorial.
