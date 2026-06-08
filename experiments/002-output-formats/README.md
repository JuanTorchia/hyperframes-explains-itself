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
experiments/002-output-formats/output/media-timing-proof-frames/
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

PNG sequence output is still pending.
