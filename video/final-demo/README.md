# Final Demo

Status: rendered and verified.

## Output

```text
renders/final-demo.mp4
```

## Commands

```bash
npm run tts:final-demo
npm run final-demo:check
npm run final-demo:render
```

## Evidence

```text
video/final-demo/evidence/ffprobe-final-demo.json
video/final-demo/evidence/frame-02s.png
video/final-demo/evidence/frame-30s.png
video/final-demo/evidence/frame-50s.png
video/final-demo/evidence/frame-70s.png
video/final-demo/evidence/frame-88s.png
```

## Result

FFprobe confirms:

```text
format: MP4
video: H.264, 1920x1080, 30fps, 2700 frames
audio: AAC stereo, 48kHz
duration: 90.048 seconds
size: 7,159,192 bytes
```

## Notes

The composition uses copied still assets under `video/final-demo/assets/stills/` so the demo directory can render reliably as its own HyperFrames project.

The source experiment outputs remain the canonical evidence. Copied stills are render inputs for this final demo only.
