# Experiment 008: Captions Layer

## Question

Can HyperFrames use the generated transcript as a caption source, while also showing why the final tutorial may need curated captions?

## Surfaces To Test

- `audio/generated/transcript.json`
- generated caption grouping
- curated caption grouping from the approved voiceover script
- a renderable HTML captions layer

## Commands

```bash
npm run experiment:captions
npm run experiment:captions:check
npm run experiment:captions:render
```

## Evidence

```text
experiments/008-captions-layer/source/automatic-caption-groups.json
experiments/008-captions-layer/source/curated-caption-groups.json
experiments/008-captions-layer/source/caption-data.js
experiments/008-captions-layer/evidence/caption-comparison.json
experiments/008-captions-layer/evidence/captions-render.txt
experiments/008-captions-layer/evidence/ffprobe-captions-layer.json
experiments/008-captions-layer/evidence/frames/frame-2s.png
experiments/008-captions-layer/evidence/frames/frame-5s.png
experiments/008-captions-layer/evidence/frames/frame-9s.png
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

## Result

The experiment generated a 12-second caption comparison clip:

```text
experiments/008-captions-layer/output/captions-layer-proof.mp4
```

Validation:

```text
npm run experiment:captions:check -> 0 errors, 0 warnings, 0 layout issues
npm run experiment:captions:render -> completed
ffprobe -> h264, 1920x1080, 30fps, 12.000000 seconds
```

The proof intentionally has no audio. It is a visual article artifact for comparing caption sources, not a final synced tutorial render.

Three frames were extracted from the proof clip for article screenshots:

```text
2s
5s
9s
```

## Current Decision

Automatic Whisper captions are useful for timing and bootstrap evidence. Curated script captions are the better candidate for the final developer-facing video because the wording is intentional and easier to scan.
