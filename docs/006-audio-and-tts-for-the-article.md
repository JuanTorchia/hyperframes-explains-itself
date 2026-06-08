# Audio And TTS Notes For The Article

## Why Audio Matters In This Project

The first render proved that HyperFrames can turn HTML into an MP4. Adding voiceover makes the tutorial more complete because it shows that HyperFrames is not only visual composition. It can also mix ordinary media assets into the final artifact.

The important technical point:

> Audio is part of the HTML composition. The voiceover is an `<audio>` element with timeline attributes.

That keeps the mental model simple. Scenes, timing, visuals, and audio all live in one inspectable source graph.

## What HyperFrames Provides

HyperFrames provides two pieces we used:

- A render-time audio model based on standard `<audio>` tags plus `data-*` timing attributes.
- A local `hyperframes tts` command that can generate speech using Kokoro-82M.

The docs describe the audio model as:

- `data-start`: when the track enters the timeline.
- `data-duration`: how long it plays.
- `data-trim-start`: where to begin inside the source file.
- `data-volume`: linear gain from `0.0` to `1.0`.
- `data-fade`: optional envelope fades.

The renderer picks up the audio elements and mixes them through FFmpeg.

## What We Actually Did

We created a source text file:

```text
audio/source/voiceover.txt
```

We generated speech with:

```bash
npm run tts:setup
npm run tts
```

The script maps to:

```bash
hyperframes tts audio/source/voiceover.txt --voice af_nova --lang en-us --speed 1.15 --output audio/generated/hyperframes-in-60-seconds-af-nova.wav
```

Generated output:

```text
audio/generated/hyperframes-in-60-seconds-af-nova.wav
```

Measured duration:

```text
97.472000 seconds
```

We added the generated WAV to `index.html`:

```html
<audio
  id="voiceover"
  src="audio/generated/hyperframes-in-60-seconds-af-nova.wav"
  data-start="0"
  data-duration="97.472000"
  data-track-index="0"
  data-volume="1"
></audio>
```

Then we rendered with Docker:

```bash
npm run render
```

The final MP4 includes:

```text
Video stream: h264, 1920x1080, 30fps, 108.000000 seconds
Audio stream: aac, 108.053333 seconds
Container duration: 108.054000 seconds
```

## What To Say In The Article

Use this framing:

> HyperFrames treats audio like the rest of the composition: a media element on a deterministic timeline. The TTS generation step is not deterministic, so we commit the generated WAV and document the voice settings. After that, Docker rendering produces a reproducible MP4 from the same HTML and audio source.

This is the honest distinction:

- TTS generation is creative and can vary by model/version.
- The saved WAV is a normal source asset.
- The Docker render from HTML plus WAV is reproducible.

## The Mistake Worth Mentioning

The first TTS command failed:

```text
Speech synthesis failed: The kokoro-onnx package is not installed. Run: pip install kokoro-onnx soundfile
```

We did not install Python packages globally. Instead, we created a local `.venv` and added scripts:

```bash
npm run tts:setup
npm run tts
```

That matters because the article should show the boring but useful engineering work: keeping the project reproducible instead of relying on hidden machine state.

## Article Bullet Points

- The voiceover text is source-controlled.
- The generated WAV is committed as an artifact because TTS is the non-deterministic step.
- The HTML references the WAV through a normal `<audio>` tag.
- HyperFrames lints the audio reference and timing attributes.
- Docker render produces an MP4 with both video and AAC audio.
- We verified the final MP4 with `ffprobe` inside the Docker renderer image.

## Sources Used

- HyperFrames audio and voiceover docs: `https://hyperframes.video/docs/recipes/audio-and-voiceover`
- HyperFrames data attributes docs: `https://hyperframes.video/docs/concepts/data-attributes`
- HyperFrames timing and tracks docs: `https://hyperframes.video/docs/concepts/timing-and-tracks`
- HyperFrames CLI TTS help from local `hyperframes@0.6.80`.
