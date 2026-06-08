# Experiment 005: Transcribe And Captions

## Question

Can HyperFrames produce or import transcript data that can become captions?

## Surfaces To Test

- `hyperframes transcribe audio/generated/hyperframes-in-60-seconds-af-nova.wav --model tiny.en --language en --json`
- `hyperframes transcribe experiments/005-transcribe-captions/source/manual-transcript.srt --json`
- direct `whisper.cpp-cli` JSON generation followed by `hyperframes transcribe <whisper-json> --json`
- official `ggml-org/whisper.cpp` Windows x64 `whisper-cli.exe` with direct HyperFrames audio transcription

## Notes

Audio transcription may download or require a Whisper model. The first safe probe is transcript import from SRT, because it avoids model setup and still tests the command path.

The second probe uses `whisper.cpp-cli` installed in the project Python virtual environment. This is not the final recommended production setup. It is a local experiment to find out how close a lightweight install can get before a full `whisper.cpp` build is required.

The third probe uses the official `ggml-org/whisper.cpp` Windows x64 release asset. This is the first local path that worked with HyperFrames direct audio transcription.

## Expected Evidence

```text
experiments/005-transcribe-captions/evidence/imported-transcript.json
experiments/005-transcribe-captions/evidence/generated-transcript.json
experiments/005-transcribe-captions/evidence/generated-transcript-with-local-whisper.json
experiments/005-transcribe-captions/evidence/generated-transcript-fixed.json
experiments/005-transcribe-captions/evidence/direct-whisper.stderr.txt
experiments/005-transcribe-captions/evidence/direct-whisper-nosuppress.stderr.txt
experiments/005-transcribe-captions/evidence/direct-whisper-nosuppress.stdout.txt
experiments/005-transcribe-captions/evidence/ffmpeg-voiceover-16k.stderr.txt
experiments/005-transcribe-captions/evidence/imported-direct-whisper-json.json
experiments/005-transcribe-captions/source/direct-whisper-transcript.json
experiments/005-transcribe-captions/source/direct-whisper-imported-transcript.json
experiments/005-transcribe-captions/evidence/official-whisper-release.json
experiments/005-transcribe-captions/evidence/official-whisper-cli-help.stderr.txt
experiments/005-transcribe-captions/evidence/generated-transcript-official-whisper.json
experiments/005-transcribe-captions/source/official-hyperframes-transcript.json
audio/generated/transcript.json
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

Direct HyperFrames audio transcription was attempted without a local Whisper binary:

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

Then `whisper.cpp-cli` was installed locally:

```bash
npm run transcribe:setup
```

With `HYPERFRAMES_WHISPER_PATH` pointing at `.venv/Scripts/whisper-cpp.exe`, HyperFrames advanced past the missing Whisper error and then failed because host FFmpeg was not on `PATH`:

```json
{"ok":false,"error":"spawnSync ffmpeg ENOENT"}
```

With project-local `ffmpeg-static` on `PATH`, HyperFrames advanced again, downloaded `ggml-tiny.en.bin`, and then failed with:

```json
{"ok":false,"error":"Whisper did not produce output. Check the input file."}
```

Directly running the Python package binary with the same relevant arguments exposed the compatibility issue:

```text
error: unknown argument: --suppress-nst
```

HyperFrames currently passes `--suppress-nst`; the `whisper.cpp-cli` package tested here does not accept that flag.

## Working Workaround

The same local Whisper binary can still produce a Whisper JSON file if `--suppress-nst` is omitted:

```bash
.\.venv\Scripts\whisper-cpp.exe --model "%USERPROFILE%\.cache\hyperframes\whisper\models\ggml-tiny.en.bin" --output-json-full --output-file experiments\005-transcribe-captions\source\direct-whisper-transcript --dtw tiny.en --language en experiments\005-transcribe-captions\scratch\voiceover-16k.wav
```

HyperFrames can import that JSON:

```bash
npx hyperframes transcribe experiments/005-transcribe-captions/source/direct-whisper-transcript.json --json
```

That produced:

```text
experiments/005-transcribe-captions/evidence/imported-direct-whisper-json.json
experiments/005-transcribe-captions/source/direct-whisper-imported-transcript.json
```

The transcript is real local evidence, but it should not be presented as final caption quality. It used `tiny.en`, and the recognized text contains transcription errors.

## Working Direct Audio Path

The official Windows x64 release asset was installed with:

```bash
npm run transcribe:setup:official
```

That downloaded the latest `ggml-org/whisper.cpp` release asset tested here:

```json
{
  "tagName": "v1.8.6",
  "assetName": "whisper-bin-x64.zip"
}
```

The official binary exposes the flag HyperFrames passes:

```text
--suppress-nst
```

Direct HyperFrames audio transcription then worked:

```bash
npm run experiment:transcribe:official
```

Result:

```json
{"ok":true,"model":"tiny.en","wordCount":315,"durationSeconds":97.22,"speechOnsetSeconds":null,"transcriptPath":"C:\\Users\\jstor\\OneDrive\\Documentos\\HyperFrame\\audio\\generated\\transcript.json"}
```

This is the recommended local transcription path for the article on Windows: use the official `whisper-bin-x64.zip`, not the Python `whisper.cpp-cli` package.

## Reproducible Command

```bash
npm run experiment:transcribe
npm run transcribe:setup:official
npm run experiment:transcribe:official
```

These commands record the failed Python-package path, the unsupported-flag probe, the direct Whisper JSON workaround, and the successful official direct-audio HyperFrames path.

## Pending

- Decide whether the final video should use generated captions from Whisper, curated captions from the approved script, or both.
- Test the same official setup inside Docker if we want the caption workflow to be fully containerized.
