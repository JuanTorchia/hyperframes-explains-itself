# Experiment 005: Transcribe And Captions

## Question

Can HyperFrames produce or import transcript data that can become captions?

## Surfaces To Test

- `hyperframes transcribe audio/generated/hyperframes-in-60-seconds-af-nova.wav --model tiny.en --language en --json`
- `hyperframes transcribe experiments/005-transcribe-captions/source/manual-transcript.srt --json`

## Notes

Audio transcription may download or require a Whisper model. The first safe probe is transcript import from SRT, because it avoids model setup and still tests the command path.

## Expected Evidence

```text
experiments/005-transcribe-captions/evidence/imported-transcript.json
experiments/005-transcribe-captions/evidence/generated-transcript.json
```

## Result

SRT import was tested:

```bash
npx hyperframes transcribe experiments/005-transcribe-captions/source/manual-transcript.srt --json
```

It produced:

```text
experiments/005-transcribe-captions/source/transcript.json
experiments/005-transcribe-captions/evidence/imported-transcript.json
```

The import result is useful for caption workflows even before running Whisper transcription.

## Pending

Run audio transcription only after deciding whether the model download/runtime cost is acceptable for the article.
