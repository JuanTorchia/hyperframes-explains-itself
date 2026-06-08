# Adapter Package Investigation

## Purpose

This note records the mismatch found while testing HyperFrames frame adapters.

Question:

```text
Are the documented `@hyperframes/adapters/*` packages currently available and usable?
```

## Date

2026-06-08

## Commands

```bash
npm view hyperframes version versions --json
npm search hyperframes --json
npm view @hyperframes/adapters version versions --json
npm view @hyperframes/core version files exports main types --json
npm pack @hyperframes/core@0.6.81 --pack-destination tools/.cache/npm-inspect
```

## Findings

Latest npm versions at the time of investigation:

```text
hyperframes -> 0.6.81
@hyperframes/core -> 0.6.81
```

`@hyperframes/adapters` was not available from the public npm registry:

```text
404 Not Found - GET https://registry.npmjs.org/@hyperframes%2fadapters
```

`npm search hyperframes --json` showed the public first-party packages:

```text
hyperframes
@hyperframes/core
@hyperframes/engine
@hyperframes/producer
@hyperframes/player
@hyperframes/studio
@hyperframes/shader-transitions
@hyperframes/aws-lambda
```

The published `@hyperframes/core@0.6.81` tarball contains adapter internals, but only for GSAP:

```text
dist/adapters/gsap.js
dist/adapters/gsap.d.ts
dist/adapters/index.js
dist/adapters/types.d.ts
```

The GitHub `main` branch matched this result. `packages/core/src/adapters` contained:

```text
gsap.ts
gsap.test.ts
index.ts
types.ts
```

No published first-party adapter implementations were found for:

```text
Lottie
Three.js
Anime.js
D3
PixiJS
Rive
dotLottie
```

## Interpretation

The safest current interpretation is:

```text
HyperFrames has a real frame adapter pattern and a first-party GSAP adapter implementation.
The broader adapter documentation appears ahead of the public npm package surface, or it refers to skills/guidance rather than installable adapter packages.
```

The repository's `013-adapter-sampler` experiment should therefore continue to describe its proofs as project-local `hf-seek` bridges.

Use this wording in the article:

```text
HyperFrames documents a Frame Adapter pattern and ships GSAP adapter internals in `@hyperframes/core`. For Lottie, Three.js, Anime.js, and D3, this repository uses local seek bridges based on the documented `hf-seek` pattern, because `@hyperframes/adapters/*` was not available as a public npm package during testing.
```

Avoid:

```text
The project uses the official HyperFrames Lottie, Three.js, Anime.js, and D3 adapter packages.
```

## Project Change

The repository was updated from:

```text
hyperframes@0.6.80
```

to:

```text
hyperframes@0.6.81
```

Verification after the update is tracked in the journal.
