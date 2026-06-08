# Experiment 002: Output Formats

## Question

Can the same composition produce alternative artifacts beyond MP4?

## What This Tests

- `--format webm`
- `--format png-sequence`

MOV is documented by the CLI, but this project starts with WebM and PNG sequence because they are useful for web overlays and frame-level inspection.

## Commands

```bash
npm run experiment:formats:webm
npm run experiment:formats:png
```

## Expected Outputs

```text
experiments/002-output-formats/output/media-timing-proof.webm
experiments/002-output-formats/output/png-sequence-proof-frames/
```

## Result

WebM output was produced:

```text
experiments/002-output-formats/output/media-timing-proof.webm
```

FFprobe verification:

```text
video: vp9, 1920x1080, 30fps
audio: opus
container duration: 6.008000 seconds
size: 564992 bytes
```

## Notes

The WebM command exceeded the shell timeout, but the artifact existed afterward and passed FFprobe verification. Keep this as an operational note before recommending WebM renders in the article.

PNG sequence output was produced with a dedicated 1-second composition:

```text
experiments/002-output-formats/png-sequence/index.html
experiments/002-output-formats/output/png-sequence-proof-frames/
```

Verification:

```text
frame count: 30
first frame: frame_000001.png
last frame: frame_000030.png
```

The first attempt used the media timing composition and exceeded a 10-minute timeout after writing 174 partial frames. The shorter PNG-specific composition is the reproducible proof.
