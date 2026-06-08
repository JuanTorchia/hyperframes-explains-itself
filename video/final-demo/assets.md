# Final Demo Assets

Status: draft asset map.

This file lists the source artifacts the final demo uses or cites.

Implementation note: the final composition copies selected stills into `video/final-demo/assets/stills/` so it can render as a self-contained HyperFrames project. The original experiment artifacts remain the canonical evidence.

## Primary Video Inputs

| Purpose | Source | Notes |
| --- | --- | --- |
| Caption comparison | `experiments/008-captions-layer/output/captions-layer-proof.mp4` | 12-second proof clip, intentionally silent. |
| Track attributes | `experiments/009-track-attributes/output/track-attributes-proof.mp4` | Shows timeline primitives. |
| Social portrait | `experiments/010-social-aspects/output/social-portrait.mp4` | Shows vertical output. |
| PixiJS adapter | `experiments/013-adapter-sampler/output/pixi-adapter-proof.mp4` | Shows canvas animation driven by local `hf-seek` bridge. |
| MOV alpha proof | `experiments/014-mov-output/output/mov-alpha-proof.mov` | Use metadata visually; do not assume easy web playback. |

## Primary Still Inputs

| Purpose | Source | Notes |
| --- | --- | --- |
| Capture evidence | `experiments/007-capture-website/output/screenshots/scroll-000.png` | Website capture screenshot. |
| Caption still | `experiments/008-captions-layer/evidence/frames/frame-5s.png` | Better than video if the scene needs static comparison. |
| Track still | `experiments/009-track-attributes/evidence/frame-3s.png` | Shows attribute proof state. |
| Social square | `experiments/010-social-aspects/evidence/frame-square.png` | Square format visual. |
| Render controls | `experiments/011-render-controls/evidence/frame-standard.png` | Use with file size comparison. |
| WAAPI | `experiments/012-waapi-adapter/evidence/frame-2s.png` | Browser-native animation proof. |
| PixiJS | `experiments/013-adapter-sampler/evidence/frame-pixi.png` | Canvas animation proof. |
| Remove background | `experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png` | Visual alone is not enough; cite alpha evidence. |

## Evidence Inputs

| Claim | Evidence |
| --- | --- |
| Init scaffold | `experiments/016-init-template/evidence/init-result.json` |
| Generated project tree | `experiments/016-init-template/evidence/generated-tree.txt` |
| Generated check | `experiments/016-init-template/evidence/generated-npm-check.txt` |
| Docker-first reasoning | `experiments/003-cli-introspection/evidence/doctor.json` |
| WebM metadata | `experiments/002-output-formats/evidence/ffprobe-webm.json` |
| PNG sequence | `experiments/002-output-formats/evidence/png-sequence-summary.txt` |
| MOV metadata | `experiments/014-mov-output/evidence/ffprobe-mov-alpha.json` |
| Adapter summary | `experiments/013-adapter-sampler/evidence/adapter-summary.json` |
| Background alpha | `experiments/015-remove-background/evidence/alpha-samples.json` |
| Coverage caveats | `docs/015-hyperframes-coverage-audit.md` |

## Asset Decisions

Use existing files in place.

Do not duplicate heavy MP4/MOV files into `video/final-demo/`.

If a source clip needs trimming, create a derived clip later and record:

```text
source
start
duration
command
output
reason
```

## Missing Assets

The final demo still does not include:

```text
burned-in word-level captions
derived short clips
```

The current version uses HTML/CSS for the terminal-style visuals and source-to-artifact end card.
