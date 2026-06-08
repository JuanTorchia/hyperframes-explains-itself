# Final Demo Storyboard

Status: draft storyboard.

Target length: 75-90 seconds.

## Scene 1: Hook

- Timestamp: 0:00-0:06
- On-screen text: "Can HyperFrames explain HyperFrames?"
- Suggested visual: Minimal title card with a small source-to-artifact diagram.
- Source evidence: `README.md`, `docs/001-thesis.md`
- Animation notes: Fast text reveal, then hold. No decorative hero treatment.

## Scene 2: Source First

- Timestamp: 0:06-0:14
- On-screen text: "Start from source, not a timeline"
- Suggested visual: HTML/CSS/JS/source files feeding a composition frame.
- Source evidence: `index.html`, `compositions/`
- Animation notes: Files slide into a clean stack; frame appears as the output of source.

## Scene 3: Init Scaffold

- Timestamp: 0:14-0:24
- On-screen text: "`hyperframes init --example blank`"
- Suggested visual: Generated file tree from `experiments/016-init-template/evidence/generated-tree.txt`.
- Source evidence: `experiments/016-init-template/evidence/init-result.json`
- Animation notes: Build file tree line by line. Include `AGENTS.md`, `hyperframes.json`, `index.html`, and `package.json`.

## Scene 4: Check Before Render

- Timestamp: 0:24-0:32
- On-screen text: "lint -> inspect -> validate"
- Suggested visual: Terminal cards showing passing evidence from generated init and project root checks.
- Source evidence:
  - `experiments/016-init-template/evidence/lint.txt`
  - `experiments/016-init-template/evidence/inspect.txt`
  - `experiments/016-init-template/evidence/generated-npm-check.txt`
- Animation notes: Show commands as verified steps, not fake terminal spam.

## Scene 5: Render Artifacts

- Timestamp: 0:32-0:42
- On-screen text: "MP4, WebM, PNG frames, MOV"
- Suggested visual: Four artifact tiles with format labels and small metadata.
- Source evidence:
  - `renders/hyperframes-in-60-seconds.mp4`
  - `experiments/002-output-formats/evidence/ffprobe-webm.json`
  - `experiments/002-output-formats/evidence/png-sequence-summary.txt`
  - `experiments/014-mov-output/evidence/ffprobe-mov-alpha.json`
- Animation notes: Reveal one artifact at a time. MOV tile should mention ProRes 4444 and alpha-capable pixel format.

## Scene 6: Captions Need Curation

- Timestamp: 0:42-0:52
- On-screen text: "Transcribe, then edit"
- Suggested visual: Use `experiments/008-captions-layer/output/captions-layer-proof.mp4` or frame `frame-5s.png`.
- Source evidence:
  - `experiments/008-captions-layer/evidence/caption-comparison.json`
  - `experiments/008-captions-layer/output/captions-layer-proof.mp4`
- Animation notes: Split automatic captions and curated captions. Keep labels readable.

## Scene 7: Browser Animation Libraries

- Timestamp: 0:52-1:04
- On-screen text: "Seekable browser animation"
- Suggested visual: Quick grid of adapter frames: Three.js, Anime.js, D3, Lottie, PixiJS, WAAPI.
- Source evidence:
  - `experiments/012-waapi-adapter/evidence/frame-2s.png`
  - `experiments/013-adapter-sampler/evidence/adapter-summary.json`
  - `experiments/013-adapter-sampler/evidence/frame-pixi.png`
- Animation notes: Move a playhead line across the grid to imply deterministic seeking.

## Scene 8: Honest Build Log

- Timestamp: 1:04-1:16
- On-screen text: "Mistakes are part of the proof"
- Suggested visual: Journal snippets as three compact cards.
- Source evidence:
  - `JOURNAL.md`
  - `docs/011-experiment-suite.md`
- Cards:
  - "Sparse keyframes required re-encoding."
  - "Adapter package docs did not match npm availability."
  - "The first background-removal fixture was invalid."
- Animation notes: Cards should feel like engineering notes, not dramatic warnings.

## Scene 9: Remaining Surfaces

- Timestamp: 1:16-1:24
- On-screen text: "Mapped, not claimed"
- Suggested visual: Small checklist with skipped or pending surfaces.
- Source evidence: `docs/015-hyperframes-coverage-audit.md`
- Items:
  - "Cloud / publish / Lambda: account-bound"
  - "Auth: credential-sensitive"
  - "Rive / dotLottie: asset-dependent"
- Animation notes: Use neutral status markers. Do not imply failure.

## Scene 10: Close

- Timestamp: 1:24-1:30
- On-screen text: "HTML is the source. MP4 is the artifact."
- Suggested visual: Source stack on the left, MP4 artifact on the right, build log underneath.
- Source evidence: `docs/017-article-evidence-map.md`
- Animation notes: Hold long enough to read. End cleanly.
