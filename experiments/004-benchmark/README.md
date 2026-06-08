# Experiment 004: Benchmark

## Question

Can HyperFrames compare render settings on a small composition before we spend time rendering the full tutorial?

## Strategy

Benchmarking the 108-second main video would be slow. This experiment uses a tiny 3-second composition so the benchmark can test the tool without blocking the tutorial workflow.

## Command

```bash
npm run experiment:benchmark
```

## Expected Evidence

Save output to:

```text
experiments/004-benchmark/evidence/benchmark-runs-1.json
```

## Status

Ready to run, but potentially slower than introspection or snapshot checks.
