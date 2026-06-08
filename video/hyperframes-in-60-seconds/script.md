# HyperFrames In 60 Seconds Script

Status: legacy v1 script. The current rendered walkthrough uses `v2-script.md`.

Target length: approximately 60 seconds.

## Voiceover

Can HyperFrames explain HyperFrames?

That is the test.

HyperFrames is a way to make video from web-native source files. Instead of treating video as something edited only on a timeline, it lets developers build scenes with the tools they already understand: HTML, CSS, JavaScript, and components.

That is interesting because HTML becomes inspectable source. Layout, timing, text, animation, and visual states can live in code. The MP4 is not the starting point. It is the artifact generated from the source.

For this project, the setup target is simple: Node 22 and Docker. Docker gives the render step a fixed environment, including the FFmpeg stack.

First, initialize the project.

Then, preview the video so the timing, layout, and motion can be checked before creating a final file.

Finally, render the MP4 and document exactly what happened.

This repository will keep the script, storyboard, prompts, setup notes, mistakes, fixes, screenshots, and final output path visible.

The goal is not to pretend the workflow is perfect. The goal is to make it reproducible.

HTML is the source. MP4 is the artifact.

## Notes

- This script was used for the first proof render.
- It is kept to document the original shorter version and the project evolution.
- The current rendered audio and MP4 are documented in `v2-script.md`, `render-notes.md`, and `evidence/`.
