# Experiment 011: Render Controls

## Question

How do render quality and encoder controls change output size on a tiny deterministic composition?

## Commands

```bash
npm run experiment:render-controls:check
npm run experiment:render-controls:render
```

## Evidence

```text
experiments/011-render-controls/evidence/render-controls-summary.json
experiments/011-render-controls/evidence/frame-standard.png
experiments/011-render-controls/output/
```

## Result

Validated.

All variants rendered from the same 1-second 1920x1080, 30fps composition:

| Variant | Arguments | Size |
| --- | --- | --- |
| Draft | `--quality draft` | 44,692 bytes |
| Standard | `--quality standard` | 47,686 bytes |
| High | `--quality high` | 60,688 bytes |
| CRF 28 | `--crf 28` | 25,051 bytes |
| Bitrate 2M | `--video-bitrate 2M` | 70,737 bytes |

This is a tiny proof, so file sizes should be treated as local evidence, not general encoder benchmarks.
