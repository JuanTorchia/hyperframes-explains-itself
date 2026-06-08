# Experiment 010: Social Aspect Ratios

## Question

Can the same idea be rendered as landscape, portrait, and square HyperFrames outputs?

## Commands

```bash
npm run experiment:social:check
npm run experiment:social:render
```

## Evidence

```text
experiments/010-social-aspects/output/social-landscape.mp4
experiments/010-social-aspects/output/social-portrait.mp4
experiments/010-social-aspects/output/social-square.mp4
experiments/010-social-aspects/evidence/social-aspects-summary.json
experiments/010-social-aspects/evidence/frame-landscape.png
experiments/010-social-aspects/evidence/frame-portrait.png
experiments/010-social-aspects/evidence/frame-square.png
```

Each aspect ratio lives in its own project directory. A first attempt put multiple root HTML files in one directory, but `hyperframes lint` correctly reported `multiple_root_compositions`.

## Result

Validated.

The experiment rendered three 2-second MP4 files:

| Variant | Composition | Size |
| --- | --- | --- |
| Landscape | 1920x1080, 30fps | 80,916 bytes |
| Portrait | 1080x1920, 30fps | 69,190 bytes |
| Square | 1080x1080, 30fps | 54,601 bytes |

This proves the repository can keep separate HyperFrames composition roots for article-friendly landscape, portrait, and square clips. It does not yet prove a single-source responsive composition strategy.
