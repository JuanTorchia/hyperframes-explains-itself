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

Audio transcription was attempted:

```bash
npx hyperframes transcribe audio/generated/hyperframes-in-60-seconds-af-nova.wav --model tiny.en --language en --json
```

It failed quickly with:

```json
{"ok":false,"error":"whisper-cpp not found. Install: See https://github.com/ggml-org/whisper.cpp#building"}
```

Evidence:

```text
experiments/005-transcribe-captions/evidence/generated-transcript.json
experiments/005-transcribe-captions/evidence/generated-transcript.stderr.txt
```

This separates two caption paths for the article: transcript import works now; audio transcription requires installing `whisper-cpp`.
