# Article Assets

This folder is an editorial index for post material. It does not duplicate every experiment artifact.

Use the referenced files in place. Large videos stay in `experiments/**/output/` and evidence stays beside each experiment.

## Selected Clips

| Label | Source | Why It Matters |
| --- | --- | --- |
| `final-demo` | `renders/final-demo.mp4` | Main article demo, rendered from `video/final-demo/`. |
| `captions-comparison` | `experiments/008-captions-layer/output/captions-layer-proof.mp4` | Shows automatic vs curated captions. |
| `track-attributes` | `experiments/009-track-attributes/output/track-attributes-proof.mp4` | Shows timeline primitives: fade, loop, speed, mute, tracks. |
| `social-portrait` | `experiments/010-social-aspects/output/social-portrait.mp4` | Shows vertical output for social formats. |
| `adapter-pixi` | `experiments/013-adapter-sampler/output/pixi-adapter-proof.mp4` | Shows canvas animation driven by `hf-seek`. |
| `mov-alpha` | `experiments/014-mov-output/output/mov-alpha-proof.mov` | Shows ProRes 4444 MOV output with alpha-capable pixel format. |

## Selected Frames And Screenshots

| Label | Source | Why It Matters |
| --- | --- | --- |
| `capture-scroll` | `experiments/007-capture-website/output/screenshots/scroll-000.png` | Shows website capture evidence. |
| `captions-frame-5s` | `experiments/008-captions-layer/evidence/frames/frame-5s.png` | Shows caption comparison in a still image. |
| `track-frame-3s` | `experiments/009-track-attributes/evidence/frame-3s.png` | Shows track/media attribute proof. |
| `social-square-frame` | `experiments/010-social-aspects/evidence/frame-square.png` | Shows square output variant. |
| `render-controls-frame` | `experiments/011-render-controls/evidence/frame-standard.png` | Shows render controls source composition. |
| `waapi-frame` | `experiments/012-waapi-adapter/evidence/frame-2s.png` | Shows browser-native WAAPI proof. |
| `adapter-pixi-frame` | `experiments/013-adapter-sampler/evidence/frame-pixi.png` | Shows PixiJS proof. |
| `remove-background-output` | `experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png` | Shows background removal output; cite alpha evidence, not only visual inspection. |

## Evidence Files To Cite

| Topic | Evidence |
| --- | --- |
| Final demo metadata | `video/final-demo/evidence/ffprobe-final-demo.json` |
| CLI surface and Docker status | `experiments/003-cli-introspection/evidence/doctor.json` |
| WebM output | `experiments/002-output-formats/evidence/ffprobe-webm.json` |
| PNG sequence | `experiments/002-output-formats/evidence/png-sequence-summary.txt` |
| Captions | `experiments/008-captions-layer/evidence/caption-comparison.json` |
| Social aspects | `experiments/010-social-aspects/evidence/social-aspects-summary.json` |
| Render controls | `experiments/011-render-controls/evidence/render-controls-summary.json` |
| Adapter sampler | `experiments/013-adapter-sampler/evidence/adapter-summary.json` |
| MOV alpha | `experiments/014-mov-output/evidence/ffprobe-mov-alpha.json` |
| Remove background | `experiments/015-remove-background/evidence/alpha-samples.json` |
| Init scaffold | `experiments/016-init-template/evidence/init-result.json` |

## Clip Extraction Plan

The existing experiment videos are already short enough for article embeds. If shorter excerpts are needed later, extract clips into this folder with FFmpeg and record the command here.

Suggested future outputs:

```text
article-assets/clips/captions-comparison-6s.mp4
article-assets/clips/adapter-pixi-3s.mp4
article-assets/clips/social-portrait-2s.mp4
article-assets/clips/track-attributes-4s.mp4
```

Do not create derived clips without recording:

```text
source file
start time
duration
ffmpeg command
output path
reason for inclusion
```
