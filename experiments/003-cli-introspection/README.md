# Experiment 003: CLI Introspection

## Question

What metadata can HyperFrames expose without rendering?

## What This Tests

- `hyperframes info --json`
- `hyperframes compositions --json`
- `hyperframes doctor --json`
- `hyperframes browser path`

## Command

```bash
npm run experiment:introspection
```

## Expected Evidence

```text
experiments/003-cli-introspection/evidence/info.json
experiments/003-cli-introspection/evidence/compositions.json
experiments/003-cli-introspection/evidence/doctor.json
experiments/003-cli-introspection/evidence/browser-path.txt
```

## Status

Evidence captured.

## Result Notes

- `info.json` captured project metadata.
- `compositions.json` listed the parent composition and nested scene compositions.
- `doctor.json` confirmed Docker and cached Chrome are available, while host FFmpeg and FFprobe are not available.
- `browser-path.txt` captured the managed Chrome path.

Open finding: `info.json` reported `duration: 107`, while `compositions.json` reported `main.duration: 108`. Do not use `info.duration` as proof until this mismatch is understood.
