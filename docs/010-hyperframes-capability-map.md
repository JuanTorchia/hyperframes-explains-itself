# HyperFrames Capability Map

## Status

Planning document. This maps HyperFrames capabilities to practical examples for the v2 demo. It does not claim that the v2 video has rendered.

## Source Basis

This map is based on:

- Local CLI help from `hyperframes@0.6.80`.
- Local package docs in `node_modules/hyperframes/dist/docs/`.
- Capabilities already used in this repository.

## Selection Rule

The video should not become a command encyclopedia. The v2 demo should show the capabilities that help developers understand the workflow. Lower-priority capabilities can stay in documentation unless they become relevant to this project.

## Capability Matrix

| Capability | HyperFrames Surface | Practical Example For This Repo | Show In Video? | Evidence |
| --- | --- | --- | --- | --- |
| Project scaffold | `hyperframes init` | Explain that the repo now acts as the scaffolded tutorial project | Mention only | README and project tree |
| Live preview | `hyperframes preview`, `npm run dev` | Start the local studio and inspect the timeline before render | Yes | Render notes |
| HTML composition | `data-composition-id`, `data-width`, `data-height`, `data-fps` | `index.html` owns the parent composition | Yes | `index.html` |
| Nested compositions | `data-composition-src` | Parent scene mounts from `compositions/` | Yes | `compositions/*.html` |
| Explicit timing | `data-start`, `data-duration`, `data-track-index` | Scene blocks on a timeline strip | Yes | `index.html` |
| GSAP animation | `gsap.timeline({ paused: true })`, `window.__timelines[...]` | Animate cards, playhead, file tree, command reveals | Yes | `index.html`, scene files |
| Composition variables | `data-composition-variables`, `data-variable-values`, `--variables` | Reuse one status-card scene with different labels, values, and colors | Yes | New v2 scene |
| Audio track | `<audio>`, `data-volume`, `data-start`, `data-duration` | Voiceover WAV mounted as a timed audio element | Yes | `index.html`, `audio/README.md` |
| Media trimming | `<video>`, `data-media-start`, `data-duration` | Optional short clip or simulated trim panel showing source offset | Maybe | Only if a real media asset is added |
| TTS | `hyperframes tts` | `voiceover.txt` becomes a generated WAV | Yes | `audio/source/voiceover.txt`, generated WAV |
| Validation | `hyperframes lint`, `hyperframes inspect` | Keep the source at 0 errors, 0 warnings, 0 layout issues | Yes | `evidence/` |
| Snapshots | `hyperframes snapshot` | Capture key frames and contact sheet | Yes | `video/.../screenshots/` |
| Docker render | `hyperframes render --docker` | Render through fixed browser and FFmpeg stack | Yes | `renders/`, render notes |
| Strict rendering | `--strict-all` | Fail render if lint warnings appear | Yes | `package.json` |
| Worker control | `--workers 1` | Pin one worker because capture is heavy on this machine | Mention only | `package.json`, render notes |
| Output formats | `--format mp4`, `--format webm`, `--format mov`, `--format png-sequence` | Show MP4 as current target and list other supported artifacts | Briefly | CLI help |
| Quality settings | `--quality draft|standard|high` | Explain current render uses standard quality | Briefly | `package.json` |
| Environment check | `hyperframes doctor`, `npm run doctor` | Validate Node, browser, FFmpeg, Docker state | Briefly | render notes |
| Browser management | `hyperframes browser` | Ensure managed Chrome is available | Mention only | render notes |
| Composition listing | `hyperframes compositions` | Show scenes as inspectable composition units | Maybe | CLI output if captured later |
| Project info | `hyperframes info` | Print project metadata for debugging | Docs only | Optional evidence |
| Benchmark | `hyperframes benchmark` | Compare render configs | Docs only for now | Not needed for v2 |
| Capture website | `hyperframes capture` | Capture a website for video production | Docs only for now | Out of scope |
| Registry blocks | `hyperframes add`, `hyperframes catalog` | Install reusable blocks/components | Docs only for now | Out of scope |
| Publish | `hyperframes publish` | Upload project for stable public URL | Docs only for now | Requires publication decision |
| Cloud render | `hyperframes cloud` | Render without local Chrome/FFmpeg | Docs only for now | Requires account/cloud path |
| Lambda render | `hyperframes lambda` | Distributed rendering on AWS Lambda | Docs only for now | Out of scope |
| Transcription | `hyperframes transcribe` | Word-level captions from audio/video | Later candidate | Needs transcript/caption design |
| Background removal | `hyperframes remove-background` | Transparent media from video/image | Later candidate | Needs real asset |
| Telemetry/settings | `hyperframes telemetry`, `hyperframes feedback` | Explain opt-out only if relevant | No | Not part of tutorial |

## V2 Capabilities To Actually Demonstrate

The v2 video should demonstrate these directly:

1. HTML as source.
2. Nested compositions.
3. Explicit timing.
4. GSAP timeline registration.
5. Composition variables.
6. Preview, snapshot, lint, and inspect.
7. Docker render.
8. Audio and TTS asset workflow.
9. FFprobe proof.
10. Mistakes and fixes.

## Practical Example Additions For V2

### Reusable Status Card With Variables

Create one sub-composition that declares variables:

```html
<html data-composition-variables='[
  {"id":"label","type":"string","label":"Label","default":"Check"},
  {"id":"value","type":"string","label":"Value","default":"0 warnings"},
  {"id":"accent","type":"color","label":"Accent","default":"#7bdcb5"}
]'>
```

Mount it multiple times with `data-variable-values`:

```html
<div
  data-composition-id="lint-card"
  data-composition-src="compositions/status-card.html"
  data-variable-values='{"label":"Lint","value":"0 warnings","accent":"#7bdcb5"}'
></div>
```

Why it matters:

```text
One scene source can produce multiple visual instances.
```

### Output Format Strip

Show supported render targets as small artifact chips:

```text
mp4
webm
mov
png-sequence
```

The current project should still render MP4. The other formats are capabilities, not current outputs.

### Media Timing Panel

Show the audio track as a real media example:

```html
<audio
  src="audio/generated/hyperframes-in-60-seconds-af-nova.wav"
  data-start="0"
  data-duration="55.850667"
  data-volume="1"
></audio>
```

If a real video clip is added later, then demonstrate `data-media-start`. Do not fake a source asset just to show the attribute.

### Tooling Strip

Show the practical loop:

```bash
npm run dev
npm run snapshot
npm run check
npm run render
```

Then show evidence:

```text
0 errors
0 warnings
0 layout issues
h264 video
aac audio
```

## What Not To Put In V2

Do not add cloud, Lambda, publishing, transcription, background removal, registry blocks, or benchmark scenes unless this project actually uses them.

Those capabilities can be listed in the article as "available, not used in this build." That is more honest than pretending the demo exercised them.

## Documentation Follow-Up

The article should include two sections:

- "What this tutorial actually uses"
- "What HyperFrames also provides, but this build does not exercise yet"

That keeps the tutorial practical without hiding the broader tool surface.

