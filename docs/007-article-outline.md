# Article Outline

## Working Title

HyperFrames Explains Itself: Building A Video From HTML, Docker, And A Voiceover Asset

## Core Claim

HyperFrames is easiest to evaluate when the source is visible. This project uses HyperFrames to generate a short video about HyperFrames, while keeping the script, storyboard, HTML, audio, commands, logs, mistakes, and final MP4 in the same repository.

The article should not claim that the workflow is perfect. It should show what worked, what failed, and what still needs improvement.

## Audience

Developers who want to understand whether HyperFrames can fit into a reproducible video workflow.

They probably care about:

- How the source is structured.
- What tools are required.
- Whether Docker removes host FFmpeg setup issues.
- How preview, snapshot, lint, inspect, TTS, and render fit together.
- What evidence proves that the final artifact is real.

## Thesis Paragraph

The experiment starts from a simple question: can HyperFrames explain HyperFrames? The answer is not just the final MP4. The answer is the repository trail: HTML as the editable source, Markdown as the planning layer, Docker as the render environment, TTS as a documented asset-generation step, and FFmpeg verification as proof that the output contains both video and audio.

## Article Structure

### 1. The Question

Open with the actual hook:

```text
Can HyperFrames explain HyperFrames?
```

Explain that the goal is not to build a polished marketing clip first. The goal is to produce a useful developer artifact that can be inspected and reproduced.

### 2. The Project Shape

Show the important repository paths:

```text
README.md
JOURNAL.md
docs/
prompts/
video/hyperframes-in-60-seconds/
audio/
evidence/
index.html
package.json
renders/hyperframes-in-60-seconds.mp4
```

Point to the idea that the video is not hidden inside a nonlinear editor. The video source is a normal web document plus normal media assets.

### 3. Why HTML As Video Source Matters

Explain the practical benefits:

- The source is inspectable.
- Text, layout, animation, and media are versioned.
- Agents and humans can edit the same files.
- Linting and inspection can catch structural issues before render.
- The final MP4 is treated as an artifact, not the source of truth.

Avoid overselling. This is a good fit for programmatic video, tutorials, explainers, batch variants, and agent workflows. It is not automatically the right tool for every editorial video.

### 4. The Setup

List the current setup:

```text
Node.js: 22+ required
HyperFrames: 0.6.80
GSAP: 3.14.2
Docker: default render path
Host FFmpeg: not required for the Docker path
```

Include the commands:

```bash
npm install
npm run dev
npm run snapshot
npm run check
npm run render
```

Explain why Docker is the recommended render path in this project: host FFmpeg and FFprobe were missing, while Docker gave a consistent renderer image.

### 5. The First Mistakes

Include the real mistakes:

- Snapshot frames initially stacked scenes together.
- The first frame was blank after the first visibility fix.
- The first Docker render attempt timed out while the renderer image was still building.
- TTS initially failed because `kokoro-onnx` and `soundfile` were not installed.

Explain the fixes without drama:

- Explicit timeline visibility.
- Keep the hook scene visible before timeline evaluation.
- Retry after the Docker image build completed.
- Use a local `.venv` for TTS dependencies instead of global Python packages.

### 6. Audio And TTS

Use the distinction from `docs/006-audio-and-tts-for-the-article.md`:

```text
The TTS generation step is not deterministic. The generated WAV is committed and treated as a source asset. The Docker render from HTML plus WAV is reproducible.
```

Show the actual source path:

```text
audio/source/voiceover.txt
audio/generated/hyperframes-in-60-seconds-af-nova.wav
```

Show the actual command:

```bash
npm run tts:setup
npm run tts
```

Show how the asset enters the composition:

```html
<audio
  id="voiceover"
  src="audio/generated/hyperframes-in-60-seconds-af-nova.wav"
  data-start="0"
  data-duration="55.850667"
  data-track-index="0"
  data-volume="1"
></audio>
```

### 7. The Proof

Use `evidence/2026-06-07/`.

Include the important facts:

```text
Video stream: h264, 1920x1080, 30fps, 60.000000 seconds
Audio stream: aac, 60.053333 seconds
Container duration: 60.054000 seconds
MP4 size: 2488679 bytes
```

Also include:

```text
npm run check -> 0 errors, 1 warning, 0 layout issues
```

Be clear that the warning remains:

```text
timeline_track_too_dense
```

That warning becomes a useful next step, not something to hide.

### 8. What The First Version Proves

The current version proves:

- The repo can generate a real MP4.
- The MP4 contains video and audio.
- Docker can be the default render path.
- The voiceover can be generated, committed, and referenced as a normal asset.
- HyperFrames lint and inspect can validate the current source.
- The build log contains real issues, not a cleaned-up story.

### 9. What It Does Not Prove Yet

The current version does not prove:

- That the video is the best possible explanation of HyperFrames.
- That the composition is cleanly modularized.
- That long-form videos will remain easy to maintain without sub-compositions.
- That the TTS output is stable across future model or package changes.

### 10. Next Iteration

The next iteration should expand the video beyond a minimal proof:

- Split scenes into sub-compositions.
- Show more HyperFrames capabilities.
- Add more visual examples.
- Keep the evidence folder updated after each render.
- Turn the article outline into a finished technical post only after the video source improves.

## Pull Quotes

```text
HTML is the source. MP4 is the artifact.
```

```text
The proof is not only the video. The proof is the repository trail.
```

```text
TTS is the variable step. The committed WAV is the reproducible input.
```

## Current Status

Pending article draft. This outline is a planning document, not a published post.

