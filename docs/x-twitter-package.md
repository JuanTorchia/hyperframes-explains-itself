# X / Twitter Package

> Status: ready-to-edit publication copy. I cannot publish this without an authenticated X flow, but this file is prepared for manual or browser-assisted posting.

## Launch Post

```text
I tried HyperFrames by making it explain itself.

Not a polished demo only: repo, commands, mistakes, fixes, captions, audio, screenshots, FFprobe evidence and final MP4.

The thesis:

HTML is the source.
MP4 is the artifact.

Repo:
https://github.com/JuanTorchia/hyperframes-explains-itself
```

## Thread

### 1

```text
I wanted to test HyperFrames without turning it into a theoretical take.

So I made the test concrete:

Can HyperFrames explain HyperFrames?
```

### 2

```text
The project uses HyperFrames to build a technical video about HyperFrames.

But the important part is not only the final MP4.

The repo includes source, commands, mistakes, fixes, screenshots, audio, captions and render evidence.
```

### 3

```text
The first rule was:

No claim without a command, artifact or documented caveat.

That changed the article. It became a build journal, not a polished conclusion written after the fact.
```

### 4

```text
The first useful finding was boring but important:

No global CLI assumptions.
No hidden FFmpeg dependency.

HyperFrames is installed locally and Docker is the main render path.
```

### 5

```text
The first render path also showed real friction:

Docker had to build the renderer image, and the first attempt took longer than expected.

That belongs in the post because a real how-to should explain what readers may hit.
```

### 6

```text
Snapshots caught bugs before the final render:

Scenes visible at the same time.
Then a blank 0.0s frame after the first fix.

Video from HTML still needs careful initial state, timeline and sampling discipline.
```

### 7

```text
Captions were another useful lesson.

Transcription helps with timing, but raw machine text is not the final editorial product.

For technical video, curated captions matter.
```

### 8

```text
Instead of making one broad claim, I built small probes:

media timing
output formats
captions
social aspect ratios
render controls
WAAPI
animation bridges
MOV alpha
background removal
init scaffold
```

### 9

```text
The most important part: I also documented what the repo does NOT prove.

No cloud render.
No Lambda.
No auth.
No Rive/dotLottie.
No claim that every official adapter package is installable.
```

### 10

```text
Final result:

90s demo
HTML source
Docker render
H264 MP4
AAC audio
FFprobe evidence
sample frames

The final file matters, but the process matters more.
```

### 11

```text
My takeaway:

For technical videos, the final file should not be the only artifact.

The process should be publishable too.

HTML is the source.
MP4 is the artifact.
```

### 12

```text
Repo:
https://github.com/JuanTorchia/hyperframes-explains-itself

Full article:
https://juanchi.dev/en/blog/hyperframes-reproducible-technical-video-html
```

## X Article Draft

# HyperFrames Explains Itself

I wanted to test HyperFrames without turning it into a theoretical take.

So I made the test concrete:

```text
Can HyperFrames explain HyperFrames?
```

The idea was to use HyperFrames to build a video about HyperFrames, then publish the whole process: source files, commands, mistakes, fixes, screenshots, audio, captions, renders and evidence.

The repository is not only a demo. It is a build journal.

The editorial rule was simple:

```text
No claim without a command, artifact or documented caveat.
```

That rule made the result better. It forced me to keep boring but useful details: Docker preflight, missing FFmpeg, first render cost, caption quality, adapter caveats and what I did not test.

The workflow starts from HTML. HyperFrames validates the composition with lint and inspect. Then Docker renders the final artifact.

The final demo is about 90 seconds and has FFprobe evidence next to it:

```text
duration: 90.048s
video: h264, 1920x1080, 30fps
audio: aac, stereo, 48000Hz
```

The most useful lesson was not "this tool can make a video". The useful lesson was that a technical video can be treated like a software project:

```text
source files
scripts
validation
assets
evidence
renders
documented mistakes
pinned versions
```

I also kept the limits explicit. I did not test cloud render, Lambda, auth, Rive, dotLottie, GPU render or personalized video at scale.

That makes the claim smaller, but stronger.

My takeaway:

```text
For technical videos, the final file should not be the only artifact.
The process should be publishable too.
```

HTML is the source. MP4 is the artifact.

Repo:

https://github.com/JuanTorchia/hyperframes-explains-itself

Full post:

https://juanchi.dev/en/blog/hyperframes-reproducible-technical-video-html

