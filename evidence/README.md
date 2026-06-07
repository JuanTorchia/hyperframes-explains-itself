# Evidence

This directory stores reproducible proof for the current build.

The goal is to keep the article grounded in artifacts instead of claims.

## Current Evidence Set

```text
evidence/2026-06-07/
```

Files:

- `npm-run-check.txt`: captured output from `npm run check`.
- `ffprobe-render.json`: stream and container metadata from the rendered MP4.
- `artifact-manifest.txt`: MP4 and WAV sizes, hashes, and timestamps.

## Commands Used

Capture HyperFrames validation:

```bash
npm run check
```

Inspect the rendered MP4 inside the Docker renderer image:

```bash
docker run --rm --entrypoint ffprobe -v "${PWD}:/work" -w /work hyperframes-renderer:0.6.80 -v error -show_entries stream=index,codec_type,codec_name,duration,width,height,r_frame_rate -show_entries format=duration,size -of json renders/hyperframes-in-60-seconds.mp4
```

## Current Proof Summary

The current MP4 has:

```text
Video stream: h264, 1920x1080, 30fps, 60.000000 seconds
Audio stream: aac, 60.053333 seconds
Container duration: 60.054000 seconds
Size: 2488679 bytes
```

HyperFrames validation currently reports:

```text
0 errors
1 warning: timeline_track_too_dense
0 layout issues
```

## Article Rule

Only use evidence that exists in this directory or in the build journal. Do not invent results.

