# Experiment 009: Track Attributes

## Question

Can the tutorial demonstrate the track and media attributes that were still missing from coverage?

## Attributes Covered

```text
data-bg
data-fade
data-loop
data-track
data-volume
data-speed
data-mute
```

`data-end` was attempted first, but `hyperframes lint` reports it as deprecated and recommends `data-duration`. The renderable proof uses the current recommended attribute.

## Commands

```bash
npm run experiment:track:check
npm run experiment:track:render
```

## Evidence

```text
experiments/009-track-attributes/output/track-attributes-proof.mp4
experiments/009-track-attributes/evidence/ffprobe-track-attributes.json
experiments/009-track-attributes/evidence/frame-3s.png
```

## Result

Validated.

The proof rendered as a 6-second 1920x1080 MP4 with H.264 video and AAC audio. The composition keeps the test deliberately small: one background track, one generated audio tone, visible labels for the attributes under test, and deterministic animation.

Finding: `data-end` should not be used in new examples. The first draft included it, but `hyperframes lint` reported it as deprecated and recommended `data-duration`.
