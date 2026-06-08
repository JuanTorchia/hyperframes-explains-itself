# HyperFrames Developer Walkthrough V2 Script

## Status

Rendered into the current v2 MP4.

## Target

- Duration: 75-90 seconds.
- Tone: technical, direct, human.
- Purpose: show a developer workflow, not a generic product teaser.

## Voiceover Script

Can HyperFrames explain HyperFrames?

This repository is the test.

The video you are watching is not edited in a traditional timeline. Its source is HTML, CSS, JavaScript, Markdown planning files, a generated voiceover asset, and a Docker render command.

The parent composition is `index.html`. It owns the duration, the audio track, and the scene mounts.

Each scene after the hook lives in `compositions/`. That keeps the timeline small enough to inspect, revise, and validate.

Timing is explicit. A scene enters with `data-start`, stays alive for `data-duration`, and the parent timeline controls visibility.

The same pattern can be reused with variables. One status-card composition can render different labels and values by changing `data-variable-values`.

Before rendering, the developer loop is boring on purpose:

Preview the composition.

Capture snapshots.

Run lint and layout inspection.

Only then render.

Docker is the default render path here because it gives us a fixed browser and FFmpeg stack. The host machine does not need FFmpeg on PATH.

The current target is MP4, but the renderer also supports WebM, MOV, and PNG sequences when the output needs a different artifact shape.

Audio is part of the same source graph. HyperFrames generated the voiceover with TTS, but the generated WAV is committed as a normal media asset.

That distinction matters: TTS is the variable step. The saved WAV is the reproducible input.

The final proof is not a slogan. It is `ffprobe`.

The MP4 has an H.264 video stream, an AAC audio stream, 1080p resolution, 30 frames per second, and a 108 second timeline.

We also found real issues along the way: a dense timeline warning, a blank first frame, Python dependencies for TTS, and mismatched sub-composition timeline IDs.

Those are now documented instead of hidden.

So the thesis is simple:

HTML is the source. MP4 is the artifact.

And the build log is part of the demo.

## On-Screen Text Beats

```text
Can HyperFrames explain HyperFrames?
```

```text
Source tree -> HTML composition -> MP4 artifact
```

```text
index.html mounts scenes from compositions/
```

```text
data-start + data-duration = explicit timing
```

```text
One component, many instances:
data-composition-variables
data-variable-values
```

```text
npm run dev
npm run snapshot
npm run check
```

```text
Docker render path
fixed browser + FFmpeg stack
```

```text
Output targets:
mp4
webm
mov
png-sequence
```

```text
voiceover.txt -> TTS -> committed WAV -> <audio>
```

```text
ffprobe:
h264 video
aac audio
1920x1080
30fps
```

```text
Mistakes documented:
dense timeline
blank t=0 frame
TTS deps
timeline ID mismatch
```

```text
HTML is the source.
MP4 is the artifact.
```

## Notes

- This script has been rendered as v2.
- The generated voiceover duration is `97.472000` seconds.
- The current MP4 container duration is `108.054000` seconds.
