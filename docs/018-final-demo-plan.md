# Final Demo Plan

## Status

Rendered and verified.

Output:

```text
renders/final-demo.mp4
```

Evidence:

```text
video/final-demo/evidence/ffprobe-final-demo.json
video/final-demo/evidence/frame-02s.png
video/final-demo/evidence/frame-30s.png
video/final-demo/evidence/frame-50s.png
video/final-demo/evidence/frame-70s.png
video/final-demo/evidence/frame-88s.png
```

## Goal

Create one cohesive final demo from the evidence gathered so far.

The final demo should not try to show every command. It should show the developer workflow and use selected experiments as proof points.

## Recommended Story

```text
HyperFrames starts from HTML, validates the composition, renders video artifacts, and can be extended with media, captions, formats, and browser animation libraries.
```

## Demo Shape

Target:

```text
60 to 90 seconds
technical narration
developer-first pacing
no corporate claims
```

Primary line:

```text
HTML is the source. MP4 is the artifact.
```

## Scene Outline

| Time | Scene | Visual Source | Claim |
| --- | --- | --- | --- |
| 0-6s | Hook | Main composition or title card | Can HyperFrames explain HyperFrames? |
| 6-14s | Scaffold | `experiments/016-init-template/evidence/generated-tree.txt` and generated `index.html` | Start from CLI scaffold. |
| 14-24s | Validate | Terminal-style overlay with `npm run check` | Lint and inspect before rendering. |
| 24-34s | Render | Main render or media timing proof | HTML becomes video artifact. |
| 34-44s | Captions | `experiments/008-captions-layer/output/captions-layer-proof.mp4` | Machine captions need curation. |
| 44-56s | Formats | WebM/PNG/MOV evidence cards | Outputs can target delivery, frames, or editing. |
| 56-68s | Motion libraries | Adapter sampler frames/clips | Browser libraries can follow the seek clock. |
| 68-78s | Honest findings | Journal snippets | The build log preserves mistakes. |
| 78-90s | Close | Final composition | HTML is the source. MP4 is the artifact. |

## What To Include

Include:

```text
init scaffold
lint/inspect
Docker render
captions comparison
MOV alpha proof
adapter sampler
remove-background alpha evidence
one or two mistakes from JOURNAL.md
```

Do not include:

```text
cloud render
publish
lambda
auth
Rive
claims that all adapter packages worked
claims that background removal is perfect
```

## Demo Architecture

Recommended implementation:

```text
Keep the final demo as a separate composition from the experiment suite.
Reference experiment outputs as media inputs.
Use curated captions from the script, not raw transcription.
Use Docker render for the final artifact.
```

Proposed folder:

```text
video/final-demo/
video/final-demo/script.md
video/final-demo/storyboard.md
video/final-demo/render-notes.md
video/final-demo/assets.md
```

## Draft Commands

Rendered with:

```bash
npm run check
hyperframes render video/final-demo --docker --strict-all --workers 1 --output renders/final-demo.mp4
```

## Acceptance Criteria

The final demo is ready when:

```text
The script does not claim untested features: done.
Every visual claim maps to an artifact in `article-assets/README.md`: done.
The final render passes lint and inspect: done.
FFprobe evidence exists for the final MP4: done.
The journal records at least one failed assumption and its fix: done.
```

## Open Decisions

1. Whether the final demo should be 60 seconds or closer to 90 seconds.
2. Whether to use the existing TTS voice or record human narration.
3. Whether the article embeds raw experiment clips or only the final demo.
4. Whether to produce a portrait cut after the landscape final demo.
