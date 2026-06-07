# Setup Plan

This setup plan is intentionally marked as pending until commands are validated.

## Target Environment

- Node.js 22.
- FFmpeg.
- HyperFrames.
- Git.

## Planned Steps

1. Confirm Node.js version.
2. Confirm FFmpeg availability.
3. Install or invoke HyperFrames.
4. Initialize the video project.
5. Create the video source.
6. Preview the video.
7. Render the MP4.
8. Document errors, fixes, and final commands.

## Commands To Validate

```bash
node --version
ffmpeg -version
```

HyperFrames-specific commands are pending validation.

## Validation Checklist

- Node.js reports version 22.x.
- FFmpeg runs from the terminal.
- HyperFrames can initialize a project.
- Preview starts without rendering a final artifact.
- Render creates an MP4 in a documented output path.
- The journal records any failures or setup changes.

## Rollback Notes

If setup creates generated files that are not part of the tutorial source, identify them before committing. Generated artifacts should be committed only when they are useful for the public tutorial.

