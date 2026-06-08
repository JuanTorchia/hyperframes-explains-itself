# Publication Checklist

## Purpose

This checklist turns the repository evidence into a publishable technical post without inventing results.

## Before Drafting

- [ ] Review `renders/hyperframes-in-60-seconds-with-captions.mp4` end to end.
- [ ] Confirm whether the captioned render is the preferred final artifact.
- [ ] Re-read `JOURNAL.md` for the chronological build story.
- [ ] Re-read `docs/011-experiment-suite.md` for the capability map.
- [ ] Re-read `docs/012-local-tooling-fixes.md` for failure and fix details.
- [ ] Re-read `docs/013-captioned-main-render.md` for captioned render status.

## Claims To Keep

- [ ] HyperFrames rendered the main MP4 from HTML source.
- [ ] Docker was the reliable render path on this machine.
- [ ] TTS generated the voiceover, and the generated WAV is committed.
- [ ] Official `ggml-org/whisper.cpp` Windows x64 `whisper-cli.exe` worked for direct audio transcription.
- [ ] The Python `whisper.cpp-cli` package did not work as a HyperFrames drop-in because it lacked `--suppress-nst`.
- [ ] Captions are better treated as source artifacts, with Whisper timing and curated copy.
- [ ] FFprobe evidence exists for the final artifacts.

## Claims To Avoid

- [ ] Do not claim HyperFrames is universally better than timeline editors.
- [ ] Do not claim benchmarks are universal; one 4-worker preset remains unstable.
- [ ] Do not claim raw Whisper text is final caption quality.
- [ ] Do not claim host-local rendering is solved; Docker remains the default path.
- [ ] Do not claim every setup step is cross-platform yet.

## Media To Include

- [ ] Main render or captioned render MP4.
- [ ] Caption comparison screenshot from `experiments/008-captions-layer/evidence/frames/`.
- [ ] Captioned main render screenshot from `evidence/captions/frames/`.
- [ ] Contact sheet from the main render.
- [ ] Optional: WebM or PNG sequence proof as short capability examples.

## Commands To Include

```bash
npm install
npm run doctor:docker
npm run check
npm run render
npm run tts:setup
npm run tts
npm run transcribe:setup:official
npm run experiment:transcribe:official
npm run render:captions
```

## Open Follow-Ups

- [ ] Decide whether to add a one-command `npm run reproduce` script.
- [ ] Decide whether to create a `docs/article-draft.md` prose draft.
- [ ] Decide whether to publish the captioned render as the default output.
- [ ] Investigate benchmark 4-worker instability before writing any performance section.
- [ ] Use `docs/015-hyperframes-coverage-audit.md` to avoid claiming full HyperFrames coverage.
