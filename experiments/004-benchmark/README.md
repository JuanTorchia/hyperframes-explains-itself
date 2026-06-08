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

## Result

The benchmark command was attempted:

```bash
npm run experiment:benchmark
```

Evidence:

```text
experiments/004-benchmark/evidence/benchmark-runs-1.txt
```

The local benchmark did not produce useful timing comparisons. Render workers failed with:

```text
An `executablePath` or `channel` must be specified for `puppeteer-core`
```

The current CLI help for `hyperframes benchmark` exposes `--runs` and `--json`, but not `--docker`, so this remains a local-environment limitation rather than a Docker-first benchmark proof.
