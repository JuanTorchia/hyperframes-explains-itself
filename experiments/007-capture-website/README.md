# Experiment 007: Capture Website

## Question

Can HyperFrames capture a real website into editable video-production assets?

## Strategy

Use a local static page first. That avoids depending on an external website changing or blocking automation.

## Command

```bash
npm run experiment:capture
```

## Expected Output

```text
experiments/007-capture-website/output/
```

## Result

Local capture completed.

Evidence:

```text
experiments/007-capture-website/evidence/capture.json
experiments/007-capture-website/evidence/capture.stderr.txt
```

Output:

```text
experiments/007-capture-website/output/
```

The capture created screenshots, extracted design tokens, visible text, font metadata, and agent instructions for the captured page.
