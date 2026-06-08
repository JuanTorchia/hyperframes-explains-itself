# Final Demo Script

Status: draft for the final evidence-driven demo.

Target length: 75-90 seconds.

## Voiceover

Can HyperFrames explain HyperFrames?

That started as a simple test. Use HyperFrames to build a video about HyperFrames, then keep the source, commands, mistakes, and rendered artifacts visible.

The workflow starts with source, not with an editor timeline.

`hyperframes init` creates a project with HTML as the composition surface. The generated scaffold includes the project files, agent notes, metadata, and scripts for preview, check, render, and publish.

Before rendering, the project runs through validation. Lint checks the composition. Inspect samples the layout. The generated scaffold also runs `hyperframes validate`, which catches browser-side issues.

Then the render turns HTML into artifacts. MP4 is the delivery file. WebM, PNG sequences, and ProRes MOV are alternate outputs for different jobs.

The interesting part is what can live inside that HTML source: media timing, captions, track attributes, social aspect ratios, and browser animation libraries.

We tested captions from transcription, then compared them with curated captions. The machine output was useful, but the final tutorial copy still needed human editing.

We tested animation bridges for Three.js, Anime.js, D3, Lottie, WAAPI, and PixiJS. Those proofs use local seek-clock bridges, so they are integration evidence, not a claim that every official adapter package is published and installable.

We also tested background removal. It worked on a real public domain portrait, but the first flat icon fixture failed as evidence. That mistake matters because reproducible demos need honest fixtures.

The result is not a claim that every HyperFrames surface is covered. Cloud, publish, Lambda, auth, Rive, and dotLottie still need separate decisions or credentials.

The result is a developer workflow with a visible build log.

HTML is the source. MP4 is the artifact.

## Tone Notes

- Technical and direct.
- Avoid hype.
- Do not claim untested cloud, publish, Lambda, auth, Rive, or dotLottie coverage.
- Treat mistakes as evidence, not embarrassment.
- Keep the closing line unchanged.
