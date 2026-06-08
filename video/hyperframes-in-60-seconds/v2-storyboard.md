# HyperFrames Developer Walkthrough V2 Storyboard

## Status

Rendered into the current v2 MP4.

## Scene 1: Hook

- Timestamp: 0:00-0:06
- On-screen text: "Can HyperFrames explain HyperFrames?"
- Suggested visual: The current title treatment, but with a subtle source-tree cursor or file path signal.
- Animation notes: Keep the hook inline in `index.html` so the exact `t=0` frame stays visible.

## Scene 2: Repository As Proof

- Timestamp: 0:06-0:14
- On-screen text: "The repository is the demo"
- Suggested visual: A compact file tree showing `README.md`, `JOURNAL.md`, `index.html`, `compositions/`, `audio/`, `evidence/`, and `renders/`.
- Animation notes: Reveal the tree in three groups: planning, source, proof.

## Scene 3: Parent Composition

- Timestamp: 0:14-0:22
- On-screen text: "`index.html` owns the timeline"
- Suggested visual: A simplified source panel with root attributes: `data-duration`, `data-width`, `data-height`, `data-fps`.
- Animation notes: Highlight one attribute at a time. Do not show fake code that is not in the repo.

## Scene 4: Sub-Compositions

- Timestamp: 0:22-0:32
- On-screen text: "Scenes live in `compositions/`"
- Suggested visual: `index.html` on the left with `data-composition-src`; scene files on the right.
- Animation notes: Draw mount lines from the parent to each scene file. Use real filenames.

## Scene 5: Explicit Timing

- Timestamp: 0:32-0:42
- On-screen text: "`data-start` + `data-duration`"
- Suggested visual: A horizontal timeline with blocks for hook, source, setup, preview, render, close.
- Animation notes: A playhead moves across scene blocks. Each block shows start and duration.

## Scene 6: Variables And Reuse

- Timestamp: 0:42-0:52
- On-screen text: "One composition, many instances"
- Suggested visual: A reusable `status-card.html` scene mounted three times with different `data-variable-values`.
- Animation notes: Show `Lint -> 0 warnings`, `Inspect -> 0 layout issues`, and `Render -> MP4` using one shared visual pattern.

## Scene 7: Developer Loop

- Timestamp: 0:52-1:04
- On-screen text: "Preview. Snapshot. Check."
- Suggested visual: Terminal commands plus four snapshot thumbnails.
- Animation notes: Commands appear as real commands:

```bash
npm run dev
npm run snapshot
npm run check
```

Show `0 errors`, `0 warnings`, `0 layout issues`.

## Scene 8: Docker Render And Output Formats

- Timestamp: 1:04-1:14
- On-screen text: "Docker is the default render path"
- Suggested visual: Docker renderer box producing `renders/hyperframes-in-60-seconds.mp4`.
- Animation notes: Include `--strict-all --workers 1`. Mention fixed browser and FFmpeg stack. Add small output chips: `mp4`, `webm`, `mov`, `png-sequence`.

## Scene 9: Audio And TTS

- Timestamp: 1:14-1:24
- On-screen text: "TTS is variable. The WAV is input."
- Suggested visual: `voiceover.txt` -> `hyperframes tts` -> generated WAV -> `<audio>` tag.
- Animation notes: Add a simple waveform strip or level meter. Keep the disclosure clear.

## Scene 10: Evidence

- Timestamp: 1:24-1:34
- On-screen text: "`ffprobe` confirms the artifact"
- Suggested visual: Evidence panel with the real stream summary:

```text
h264 video
aac audio
1920x1080
30fps
60.054s container
```

- Animation notes: Use a compact proof card, not a big celebratory finish.

## Scene 11: Mistakes Found

- Timestamp: 1:34-1:44
- On-screen text: "Mistakes are part of the build log"
- Suggested visual: Four short issue cards:

```text
timeline_track_too_dense
blank t=0 frame
TTS Python deps
timeline ID mismatch
```

- Animation notes: Each issue flips to a short fix. Keep text readable.

## Scene 12: Close

- Timestamp: 1:44-1:50
- On-screen text: "HTML is the source. MP4 is the artifact."
- Suggested visual: Source tree on the left, MP4 artifact and evidence on the right.
- Animation notes: Clean final hold. No extra marketing copy.

## Visual Patterns Required

- File tree reveal.
- Code attribute highlight.
- Timeline block visualization.
- Variable-driven reusable cards.
- Terminal command sequence.
- Snapshot/contact-sheet montage.
- Docker render diagram.
- Output format chips.
- Audio waveform or TTS pipeline.
- Evidence card.
- Mistake/fix cards.

## Implementation Constraints

- Keep all content in English.
- Use real filenames and real commands.
- V2 has rendered; update evidence after future changes.
- Keep `npm run check` at 0 errors and 0 warnings after implementation.
- Regenerate voiceover only after the script is stable.
