# Video Expansion Plan

## Purpose

The first video proves that the workflow works. The next version should prove that HyperFrames is useful for more than a minimal demo.

The goal is to show more of what HyperFrames enables while keeping the video direct, technical, and reproducible.

## Current Limitation

The current composition is implemented in one `index.html` and HyperFrames reports:

```text
timeline_track_too_dense
```

This is a warning, not a failure. It means the video source is getting dense enough that future work should use smaller sub-compositions.

## Recommended Direction

Split the video into focused scene files and mount them from the parent composition.

Proposed structure:

```text
compositions/
  001-hook.html
  002-html-as-source.html
  003-timeline-and-scenes.html
  004-preview-snapshot-check.html
  005-docker-render.html
  006-audio-tts.html
  007-proof.html
index.html
```

The parent `index.html` should own duration, resolution, global styles, and scene mounting. Each scene file should own one visual idea.

## Scene Goals

### 1. Hook

Purpose:

```text
Can HyperFrames explain HyperFrames?
```

Visual:

- Clean type.
- HTML source lines entering as timeline elements.
- No feature claims yet.

### 2. HTML As Source

Purpose:

Show that the video source is an HTML document.

Visual:

- Side-by-side source and rendered frame.
- Highlight `data-width`, `data-height`, `data-duration`, and `data-fps`.

### 3. Timeline And Scenes

Purpose:

Show that scenes are timed elements, not editor tracks hidden in a GUI.

Visual:

- Timeline ruler.
- Scene blocks with `data-start` and `data-duration`.
- Seek marker moving across the blocks.

### 4. Preview, Snapshot, Check

Purpose:

Show the developer loop before rendering.

Visual:

- Terminal commands.
- Snapshot thumbnails.
- Lint and inspect badges.

Commands to show:

```bash
npm run dev
npm run snapshot
npm run check
```

### 5. Docker Render

Purpose:

Show why Docker is the default path for this project.

Visual:

- Host machine without FFmpeg on PATH.
- Docker renderer image.
- MP4 artifact output.

Command to show:

```bash
npm run render
```

### 6. Audio And TTS

Purpose:

Show how AI TTS fits without pretending it is deterministic.

Visual:

- `voiceover.txt`.
- `hyperframes tts`.
- Generated WAV.
- `<audio>` tag in HTML.

Message:

```text
TTS generates the voice. The committed WAV becomes the input.
```

### 7. Proof

Purpose:

Close with evidence, not a slogan.

Visual:

- `ffprobe` stream summary.
- MP4 path.
- Final line.

Closing line:

```text
HTML is the source. MP4 is the artifact.
```

## Additional Capabilities To Show

The next version should include at least four different visual patterns:

- Text animation.
- Timeline visualization.
- Code or command reveal.
- Screenshot/contact-sheet montage.
- Audio waveform or voiceover indicator.
- Render evidence summary.

These examples should be real and tied to this repository. Avoid fake dashboards, imaginary metrics, or generic stock UI.

## Constraints

- Keep all repository content in English.
- Do not claim future renders have already happened.
- Keep Docker as the recommended render path.
- Keep TTS disclosure explicit.
- Keep commands copy-pasteable.
- Keep the final video near 60 seconds unless the added examples require a deliberate duration change.

## Success Criteria

The expanded version is successful when:

- The `timeline_track_too_dense` warning is reduced or removed.
- Each scene has one clear technical point.
- The source is easier to inspect than the current single-file version.
- The video shows multiple HyperFrames capabilities.
- The evidence folder is updated after the next render.

## Pending Work

- Create `compositions/`.
- Move current scene markup into scene files.
- Update `index.html` to mount the scene files.
- Re-run `npm run check`.
- Re-run `npm run snapshot`.
- Re-render with Docker only after the source is clean.
- Refresh `evidence/` after the new render.

