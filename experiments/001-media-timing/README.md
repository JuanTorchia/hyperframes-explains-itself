# Experiment 001: Media Timing

## Question

Can HyperFrames place real media on a deterministic timeline and combine it with HTML overlays?

## What This Tests

- `<video>` as a source element.
- `data-media-start` as a source trim point.
- `data-duration` as timeline duration.
- `data-volume` for media audio level.
- Static image layers.
- HTML overlays above media.

## Source Asset

This experiment uses a copied tutorial MP4 as real input media:

```text
assets/source-tutorial-keyframed.mp4
assets/source-contact-sheet.jpg
```

That keeps the probe self-contained and reproducible. It also makes the test honest: the media element is not a decorative placeholder.

## Mistake Found

The first render used a direct copy of the main tutorial MP4. HyperFrames warned that the source video had sparse keyframes, which can cause seek failures and frozen frames when using `data-media-start`.

We re-encoded the source with Docker and FFmpeg:

```bash
docker run --rm -v "${PWD}:/work" -w /work --entrypoint ffmpeg hyperframes-renderer:0.6.80 -y -i renders/hyperframes-in-60-seconds.mp4 -c:v libx264 -r 30 -g 30 -keyint_min 30 -movflags +faststart -c:a copy experiments/001-media-timing/assets/source-tutorial-keyframed.mp4
```

## Commands

```bash
npm run experiment:media:check
npm run experiment:media:render
```

## Expected Output

```text
experiments/001-media-timing/output/media-timing-proof.mp4
```

## Status

Ready to run.
