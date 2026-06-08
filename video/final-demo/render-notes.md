# Final Demo Render Notes

Status: rendered and verified.

## Current State

The final demo has:

```text
script.md
storyboard.md
assets.md
render-notes.md
index.html
style.css
voiceover audio
rendered MP4
FFprobe evidence
sample frames
```

The final demo does not yet have:

```text
burned-in word-level captions
```

## Recommended Implementation

Create a dedicated composition under:

```text
video/final-demo/
```

Use:

```text
HTML/CSS for editorial layout
existing experiment MP4s as media inputs
existing evidence JSON/TXT as quoted visual data
curated captions from script.md
Docker render for final output
```

Do not:

```text
reuse every experiment
claim cloud/publish/lambda/auth coverage
claim official adapter package availability
claim background removal quality beyond the tested portrait
```

## Draft Render Command

Rendered with:

```bash
hyperframes lint video/final-demo
hyperframes inspect video/final-demo
hyperframes render video/final-demo --docker --strict-all --workers 1 --output renders/final-demo.mp4
```

NPM wrappers:

```bash
npm run tts:final-demo
npm run final-demo:check
npm run final-demo:render
```

## Render Result

Output:

```text
renders/final-demo.mp4
```

FFprobe summary:

```text
duration: 90.048000 seconds
size: 7,159,192 bytes
video: h264, 1920x1080, 30fps, 2700 frames
audio: aac, stereo, 48000Hz
```

Validation:

```text
npm run final-demo:check -> 0 errors, 0 warnings, 0 layout issues
npm run final-demo:render -> completed through Docker
```

## Evidence To Capture After Render

After a successful render, capture:

```text
renders/final-demo.mp4
video/final-demo/evidence/ffprobe-final-demo.json
video/final-demo/evidence/frame-02s.png
video/final-demo/evidence/frame-30s.png
video/final-demo/evidence/frame-50s.png
video/final-demo/evidence/frame-70s.png
video/final-demo/evidence/frame-88s.png
```

Recommended FFprobe command:

```bash
docker run --rm -v "${PWD}:/work" --entrypoint ffprobe hyperframes-renderer:0.6.81 -v error -show_streams -show_format -of json /work/renders/final-demo.mp4 > video/final-demo/evidence/ffprobe-final-demo.json
```

## Acceptance Criteria

The final demo is acceptable when:

```text
lint passes: done
inspect passes: done
render completes through Docker: done
FFprobe confirms expected duration and stream metadata: done
every claim maps to `docs/017-article-evidence-map.md`: done by script/storyboard constraints
JOURNAL.md records the render attempt and fixes: done
```

## Risk Notes

The demo uses existing media artifacts. If any video source causes sparse-keyframe or seek warnings, re-encode that source before using it in the final composition.

MOV alpha is evidence for editing output, but it may not be ideal as an embedded source in the final MP4. Prefer showing its FFprobe metadata as text.

The background removal output keeps RGB values under transparent regions. Use alpha evidence, not only a visual screenshot, when describing the result.
