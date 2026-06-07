# Agent Video Brief Prompt

Use this prompt when asking an agent to help with the video source, script, storyboard, or render workflow.

```text
Create a short technical video about HyperFrames using HyperFrames itself.

The video should be roughly 60 seconds.

Required content:
- Hook: "Can HyperFrames explain HyperFrames?"
- Explain what HyperFrames is.
- Explain why HTML as a video source is interesting.
- Mention setup: Node 22 + FFmpeg.
- Show the workflow: init, preview, render.
- End with: "HTML is the source. MP4 is the artifact."

Tone:
Technical, direct, human, not corporate.

Constraints:
- Do not claim that rendering has already worked.
- Do not invent command output.
- Mark unverified commands as pending.
- Keep the implementation reproducible.
- Update the journal with real observations.
```

