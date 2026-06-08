# Experiment 015: Remove Background

## Question

Can the local HyperFrames `remove-background` command process a real image input and produce transparent PNG output?

## Commands

```bash
npm run experiment:remove-background:source
npm run experiment:remove-background:info
npm run experiment:remove-background:render
```

## Evidence

```text
experiments/015-remove-background/source/scott-carpenter-portrait.jpg
experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png
experiments/015-remove-background/evidence/source-image.json
experiments/015-remove-background/evidence/remove-background-info.json
experiments/015-remove-background/evidence/remove-background-result.json
experiments/015-remove-background/evidence/remove-background-summary.json
experiments/015-remove-background/evidence/alpha-samples.json
```

## Result

Validated with caveats.

The command completed on CPU:

```text
provider: CPU
frames processed: 1
duration: 9.81 seconds
format: png
```

The output keeps RGB data under transparent regions, so visual inspection alone is misleading. Alpha samples confirm the result:

```text
background pixels: alpha 0
subject pixels: alpha 255
```

The first attempted fixture was a flat synthetic icon. It produced a command success result, but the entire output was transparent. That input was rejected as weak evidence because `u2net_human_seg` is intended for human subjects, not simple icon geometry.

The final fixture is a NASA public domain portrait documented on Wikimedia Commons. The source URL and license note are captured in `source-image.json`.
