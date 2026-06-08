# Final Demo Render Notes

Status: pre-render planning. Do not claim a final render exists yet.

## Current State

The final demo has:

```text
script.md
storyboard.md
assets.md
render-notes.md
```

The final demo does not yet have:

```text
index.html
composition implementation
voiceover audio
captions
rendered MP4
FFprobe evidence
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

Do not run until `index.html` exists:

```bash
hyperframes lint video/final-demo
hyperframes inspect video/final-demo
hyperframes render video/final-demo --docker --strict-all --workers 1 --output renders/final-demo.mp4
```

## Evidence To Capture After Render

After a successful render, capture:

```text
renders/final-demo.mp4
video/final-demo/evidence/ffprobe-final-demo.json
video/final-demo/evidence/render-log.txt
video/final-demo/evidence/frame-*.png
```

Recommended FFprobe command:

```bash
docker run --rm -v "${PWD}:/work" --entrypoint ffprobe hyperframes-renderer:0.6.81 -v error -show_streams -show_format -of json /work/renders/final-demo.mp4 > video/final-demo/evidence/ffprobe-final-demo.json
```

## Acceptance Criteria

The final demo is acceptable when:

```text
lint passes
inspect passes
render completes through Docker
FFprobe confirms expected duration and stream metadata
captions match the final script
every claim maps to `docs/017-article-evidence-map.md`
JOURNAL.md records the render attempt and any fixes
```

## Risk Notes

The demo uses existing media artifacts. If any video source causes sparse-keyframe or seek warnings, re-encode that source before using it in the final composition.

MOV alpha is evidence for editing output, but it may not be ideal as an embedded source in the final MP4. Prefer showing its FFprobe metadata as text.

The background removal output keeps RGB values under transparent regions. Use alpha evidence, not only a visual screenshot, when describing the result.
