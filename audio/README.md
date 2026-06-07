# Audio

This project uses AI text-to-speech for voiceover, generated locally through the HyperFrames CLI.

The audio workflow must stay reproducible:

- Keep the source text in `audio/source/voiceover.txt`.
- Record the voice ID, language, speed, command, and output path.
- Do not claim a voiceover is final until it has been rendered into the MP4 and verified.
- Keep generated audio files in `audio/generated/`.

## Current Voice Direction

The first full voiceover uses:

- Model path: HyperFrames `tts`, Kokoro-82M.
- Voice: `af_nova`.
- Language: `en-us`.
- Speed: `1.15`.
- Output: `audio/generated/hyperframes-in-60-seconds-af-nova.wav`.

## Commands

List available voices:

```bash
npx hyperframes tts --list
```

Generate the current voiceover:

```bash
npx hyperframes tts audio/source/voiceover.txt --voice af_nova --lang en-us --speed 1.15 --output audio/generated/hyperframes-in-60-seconds-af-nova.wav
```

## Notes

This is AI-generated speech. It should be disclosed as part of the build log because it affects the final artifact.

