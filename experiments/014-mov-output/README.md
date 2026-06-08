# Experiment 014: MOV Output

## Question

Can HyperFrames render a transparent MOV proof from an HTML composition?

## Commands

```bash
npm run experiment:mov:check
npm run experiment:mov:render
```

## Evidence

```text
experiments/014-mov-output/output/mov-alpha-proof.mov
experiments/014-mov-output/evidence/ffprobe-mov-alpha.json
```

## Result

Validated.

The render produced a 2-second QuickTime MOV file:

```text
codec: prores
profile: 4444
pixel format: yuva444p12le
frames: 60
duration: 2.000000 seconds
size: 14,844,297 bytes
```

This proves the local Docker render path can produce a transparent ProRes 4444 MOV artifact from an HTML composition.
