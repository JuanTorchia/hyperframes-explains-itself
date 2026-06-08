# Experiment 012: WAAPI Adapter

## Question

Can a browser-native Web Animations API animation be pinned to the HyperFrames seek clock?

## Commands

```bash
npm run experiment:waapi:check
npm run experiment:waapi:render
```

## Evidence

```text
experiments/012-waapi-adapter/output/waapi-adapter-proof.mp4
experiments/012-waapi-adapter/evidence/ffprobe-waapi-adapter.json
experiments/012-waapi-adapter/evidence/frame-2s.png
```

## Result

Validated.

The proof rendered as a 3-second 1920x1080 MP4 with H.264 video. The animation is a browser-native WAAPI animation controlled through a small seek-clock bridge exposed on `window.__timelines`.

This proves a practical WAAPI integration path for this project. It does not cover the other documented adapter families yet: Lottie, Three.js, Rive, D3, PixiJS, or custom adapters.
