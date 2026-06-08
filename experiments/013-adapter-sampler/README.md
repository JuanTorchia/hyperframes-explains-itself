# Experiment 013: Adapter Sampler

## Question

Can the project exercise several popular animation libraries against the HyperFrames seek clock?

## Scope

This experiment tests project-local bridges for:

```text
Three.js
Anime.js
D3
Lottie
```

The official docs describe adapters under `@hyperframes/adapters/*`, but `@hyperframes/adapters` was not available from the public npm registry during this run. The published `@hyperframes/core@0.6.81` tarball exposes adapter internals only for GSAP. These proofs therefore use the documented `hf-seek` pattern directly instead of claiming official adapter package coverage.

## Commands

```bash
npm run experiment:adapters:check
npm run experiment:adapters:render
npm run experiment:adapters:frames
```

## Evidence

```text
experiments/013-adapter-sampler/evidence/adapter-summary.json
experiments/013-adapter-sampler/evidence/frame-three.png
experiments/013-adapter-sampler/evidence/frame-anime.png
experiments/013-adapter-sampler/evidence/frame-d3.png
experiments/013-adapter-sampler/evidence/frame-lottie.png
experiments/013-adapter-sampler/output/three-adapter-proof.mp4
experiments/013-adapter-sampler/output/anime-adapter-proof.mp4
experiments/013-adapter-sampler/output/d3-adapter-proof.mp4
experiments/013-adapter-sampler/output/lottie-adapter-proof.mp4
```

## Result

Validated.

All four proofs rendered as 3-second 1920x1080 MP4 files at 30fps:

| Adapter Proof | Library | Output Size | Bridge |
| --- | --- | --- | --- |
| `three` | Three.js | 418,195 bytes | Project-local `hf-seek` bridge |
| `anime` | Anime.js | 221,247 bytes | Project-local `hf-seek` bridge |
| `d3` | D3 | 80,397 bytes | Project-local `hf-seek` bridge |
| `lottie` | Lottie Web | 122,212 bytes | Project-local `hf-seek` bridge |

Finding: these are useful integration proofs, but they are not proof that the documented `@hyperframes/adapters/*` packages are installable from npm in this environment.
