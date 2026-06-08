# Demo V2 Implementation Plan

## Status

Planning document. No v2 render has been produced yet.

## Objective

Improve the demo from a minimal 60 second proof into a developer walkthrough that shows how HyperFrames works in this repository.

The v2 demo should explain:

- The repository is the source of truth.
- `index.html` is the parent composition.
- `compositions/` keeps scenes modular.
- Timing is declared with `data-start` and `data-duration`.
- The developer loop uses preview, snapshot, lint, inspect, and render.
- Docker is the default render path.
- TTS is used, but the committed WAV is the reproducible input.
- Evidence comes from `ffprobe` and captured command output.
- Mistakes are documented instead of hidden.

## Recommended Duration

Target 75-90 seconds.

Reason:

The current 60 second version is useful as proof, but it is too compressed to show architecture, Docker, TTS, evidence, and mistakes clearly.

## Proposed Scene Files

Keep the hook inline in `index.html`.

Add or replace scene files under `compositions/`:

```text
compositions/002-repository-proof.html
compositions/003-parent-composition.html
compositions/004-sub-compositions.html
compositions/005-explicit-timing.html
compositions/006-developer-loop.html
compositions/007-docker-render.html
compositions/008-audio-tts.html
compositions/009-evidence.html
compositions/010-mistakes-found.html
compositions/011-close.html
```

The current scene files can be reused where they still fit, but v2 should not be constrained by the v1 labels.

## Parent Timeline

Update `index.html` only after the v2 script and storyboard are accepted.

Expected duration:

```text
100 seconds maximum
90 seconds preferred
```

Each mounted scene must:

- Have a unique host `id`.
- Use the same value for host `data-composition-id` and the sub-composition root `data-composition-id`.
- Register `window.__timelines[compositionId]`.
- Stay under the lint threshold for dense timelines.

## Visual System Additions

Add shared CSS components in `styles/video.css`:

- `.file-tree`
- `.source-panel`
- `.timeline-strip`
- `.timeline-block`
- `.command-stack`
- `.status-badge`
- `.proof-card`
- `.mistake-grid`
- `.waveform`

Keep the existing dark technical style, but add more information density. Avoid making it look like a product landing page.

## Audio Plan

After the v2 script is stable:

1. Update `audio/source/voiceover.txt`.
2. Run:

```bash
npm run tts
```

3. Measure the WAV duration.
4. Update the `<audio>` tag duration in `index.html`.
5. Document the voice settings and duration in `audio/README.md` and render notes.

## Verification Plan

Run before rendering:

```bash
npm run check
npm run snapshot
```

Required result:

```text
0 errors
0 warnings
0 layout issues
```

Then render:

```bash
npm run render
```

Then update evidence:

```text
evidence/2026-06-07/npm-run-check.txt
evidence/2026-06-07/ffprobe-render.json
evidence/2026-06-07/artifact-manifest.txt
video/hyperframes-in-60-seconds/screenshots/render-contact-sheet.jpg
```

## Success Criteria

V2 is successful when:

- It shows at least six HyperFrames capabilities or workflow concepts.
- It still validates with zero warnings.
- The visual examples are tied to real repository files.
- The final MP4 includes audio.
- The article outline can cite the v2 evidence without inventing results.
- The journal records any new issues found during implementation.

## Current Pending Work

- Review `v2-script.md`.
- Review `v2-storyboard.md`.
- Implement v2 scene files.
- Update parent timeline and duration.
- Regenerate TTS.
- Run check, snapshot, render, and evidence refresh.

