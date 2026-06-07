# Research Notes

These notes are for facts, links, observations, and open questions discovered while preparing and building the project.

## Current Assumptions

- HyperFrames can generate video from web-native source files.
- Node.js 22 or newer is the target runtime.
- FFmpeg 6 or newer is required for rendering support.
- A short tutorial video is a good first test because it forces the workflow to cover setup, preview, and render.

Some assumptions are now partially validated.

## Questions To Validate

- What is the exact HyperFrames initialization command?
- What files does HyperFrames create by default?
- What is the expected preview command?
- What is the expected render command?
- Where does the rendered MP4 get written?
- Does the project need a package manager preference?
- Are there version constraints for FFmpeg?
- Are there platform-specific issues on Windows?

## Notes

- Official install docs describe `npm install -g hyperframes` and `hyperframes doctor`.
- The local npm package exposes a `hyperframes` binary.
- `hyperframes init --example blank --non-interactive --skip-skills --resolution landscape` creates `hyperframes.json`, `meta.json`, `index.html`, and npm scripts.
- The local project uses a pinned dev dependency instead of a global HyperFrames install.
- Do not invent command output.
- Do not claim a render has succeeded until it has.
- Keep source files and generated artifacts clearly separated.
- Prefer short, repeatable commands over manual steps.

## Pending Research

- Best FFmpeg install path for Windows.
- Rendering requirements.
- Common setup failures.
