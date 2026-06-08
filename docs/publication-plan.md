# Publication Plan

## Recommended Angle

Publish this as a step-by-step build story, not as a generic HyperFrames review.

Recommended headline:

```text
HyperFrames explicandose a si mismo: como arme un video tecnico reproducible desde HTML
```

English headline:

```text
HyperFrames Explains Itself: Building a Reproducible Technical Video From HTML
```

## Why This Angle Works

The strongest asset is not only the rendered MP4. It is the documented process:

```text
idea -> scaffold -> local CLI -> validation -> first visual bugs -> Docker render -> audio -> captions -> experiments -> caveats -> final demo
```

That gives the post:

- A real narrative.
- Technical evidence.
- Honest limitations.
- Reproducible commands.
- A public repo readers can inspect.

## Blog Soul Pass

Do not publish the repository draft raw.

The repo is the evidence layer. The blog post needs the editorial layer:

```text
what I was trying to learn
where I got stuck
what I changed my mind about
what I would not oversell
what a developer can reuse from this process
why the folder structure matters
why publishing the process is more useful than only publishing the MP4
```

Recommended voice:

```text
first person
technical but not academic
honest about failed attempts
practical about commands and artifacts
skeptical about broad claims
clear about what was not tested
```

The strongest "juanchi.dev" imprint is this idea:

```text
I do not want a video artifact that only looks good.
I want a technical artifact whose path can be audited.
```

That should be the emotional center of the post.

## Evidence Folder Narrative

The article should explicitly explain the repository structure because that is part of the thesis:

```text
docs/ -> thinking, plans, audits, publication checklist
JOURNAL.md -> chronological build log
video/final-demo/ -> final composition, script, storyboard, render notes
video/final-demo/evidence/ -> FFprobe metadata and sampled frames
experiments/ -> small isolated probes
evidence/ -> global run evidence
article-assets/ -> editorial map of what to include
renders/ -> final delivery artifacts
```

This is not incidental organization. It is the argument:

```text
If a technical video is built like software, its source, tests, outputs and evidence should be inspectable.
```

## Publishing Order

1. Make the GitHub repo public as `JuanTorchia/hyperframes-explains-itself`.
2. Run the blog soul pass over `docs/article-howto-es.md` and `docs/article-howto-en.md`.
3. Publish the Spanish juanchi.dev post.
4. Publish the English juanchi.dev post.
5. Publish Dev.to ES/EN with canonical URLs pointing to juanchi.dev.
6. Publish X/Twitter launch post and thread.
7. Optional: publish the X Article after the blog URLs exist.

## Assets To Use In The Blog Post

Hero/demo:

```text
renders/final-demo.mp4
```

Inline evidence:

```text
video/final-demo/evidence/frame-02s.png
video/final-demo/evidence/frame-30s.png
video/final-demo/evidence/frame-50s.png
video/final-demo/evidence/frame-70s.png
video/final-demo/evidence/frame-88s.png
experiments/008-captions-layer/evidence/frames/frame-5s.png
experiments/013-adapter-sampler/evidence/frame-pixi.png
experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png
```

Evidence files to cite:

```text
video/final-demo/evidence/ffprobe-final-demo.json
experiments/003-cli-introspection/evidence/doctor.json
experiments/008-captions-layer/evidence/caption-comparison.json
experiments/013-adapter-sampler/evidence/adapter-summary.json
experiments/014-mov-output/evidence/ffprobe-mov-alpha.json
experiments/015-remove-background/evidence/alpha-samples.json
```

## Claims To Keep

- HyperFrames can render a developer video from HTML source.
- Docker was the reliable render path in this project.
- Lint and inspect helped catch issues before final rendering.
- Captions benefited from transcription timing, but needed curated copy.
- The final MP4 has FFprobe evidence.
- The repo documents mistakes and fixes, not only the happy path.

## Claims To Avoid

- HyperFrames covers every video workflow.
- All official adapter packages were validated.
- Cloud/publish/Lambda/auth were tested.
- TTS generation is perfectly deterministic.
- Background removal quality is proven beyond the tested public-domain portrait.
- The benchmark proves general rendering performance.

## Current Risk Before Publishing

The repo is around 135 MiB of Git objects before packing. That is acceptable for GitHub, but it is media-heavy. No individual tracked file appears over 100 MiB.

The largest tracked files are:

```text
21 MiB transparent PNG output
14 MiB MOV alpha proof
10 MiB source MP4
6-7 MiB final/demo renders
4 MiB WAV files
```

This is okay for an evidence repo, but it should not grow much more without moving large assets to releases or external storage.
