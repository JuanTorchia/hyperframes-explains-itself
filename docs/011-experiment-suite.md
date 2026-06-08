# HyperFrames Experiment Suite Notes

## Purpose

The main walkthrough proves the core workflow, but it should not carry every HyperFrames capability at once. The experiment suite creates small proofs that can later become short clips, screenshots, or article sections.

## Current Experiments

| Experiment | Result |
| --- | --- |
| `001-media-timing` | Rendered a 6-second MP4 using real video media, `data-media-start`, low-volume source audio, image layer, and HTML overlays. |
| `002-output-formats` | Rendered and verified a WebM artifact from the same media composition. PNG sequence is pending. |
| `003-cli-introspection` | Captured `info`, `compositions`, `doctor`, and browser-path evidence. |
| `004-benchmark` | Prepared a tiny benchmark composition; not run yet. |
| `005-transcribe-captions` | Imported an SRT transcript into HyperFrames transcript JSON. Audio transcription is pending. |
| `006-registry-components` | Captured full catalog and captions catalog JSON. No install yet. |
| `007-capture-website` | Captured a local static website into HyperFrames capture output. |

## Practical Findings

### Media Timing

The first media render used the main tutorial MP4 directly as a source. HyperFrames warned about sparse keyframes:

```text
Video "trimmed-source-video" has sparse keyframes.
```

That matters because `data-media-start` relies on reliable seeking. The source was re-encoded with FFmpeg inside the Docker renderer image:

```bash
docker run --rm -v "${PWD}:/work" -w /work --entrypoint ffmpeg hyperframes-renderer:0.6.80 -y -i renders/hyperframes-in-60-seconds.mp4 -c:v libx264 -r 30 -g 30 -keyint_min 30 -movflags +faststart -c:a copy experiments/001-media-timing/assets/source-tutorial-keyframed.mp4
```

After that, the MP4 proof rendered with `hasAudio=true`.

### WebM Output

The WebM artifact was produced and verified:

```text
video: vp9, 1920x1080, 30fps
audio: opus
duration: 6.008000 seconds
size: 564992 bytes
```

The command exceeded the shell timeout, so article wording should say the artifact was verified after a timed-out command wrapper, not that the command cleanly returned.

### CLI Introspection

`doctor.json` confirms why this project remains Docker-first:

```text
Host FFmpeg: not found
Host FFprobe: not found
Docker: running
Chrome: cached
```

`info.json` reported `duration: 107`, while `compositions.json` reported `main.duration: 108`. Do not cite `info.duration` as proof until this mismatch is understood.

### Capture

The local capture output includes screenshots, design tokens, visible text, font metadata, and generated agent instructions. This is useful article material because it shows HyperFrames can inspect an existing page before building video source from it.

### Registry

The captions catalog has useful components. The next safe step is to install one caption component into an isolated experiment and document the files written by `hyperframes add`.

## Next Recommended Proofs

1. Run PNG sequence output from `001-media-timing`.
2. Run the tiny benchmark and store JSON output.
3. Install one caption registry component in an isolated experiment.
4. Decide whether to run Whisper transcription on the generated TTS audio.
5. Extract 2-3 short clips from the experiment artifacts for the article draft.
