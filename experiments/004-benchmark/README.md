# Experiment 004: Benchmark

## Question

Can HyperFrames compare render settings on a small composition before we spend time rendering the full tutorial?

## Strategy

Benchmarking the 108-second main video would be slow. This experiment uses a tiny 3-second composition so the benchmark can test the tool without blocking the tutorial workflow.

## Command

```bash
npm run experiment:benchmark
```

## Result

The benchmark command is now reproducible through a project runner:

```bash
npm run experiment:benchmark
```

Evidence:

```text
experiments/004-benchmark/evidence/benchmark-runs-1-fixed.txt
experiments/004-benchmark/evidence/benchmark-fixed-summary.txt
```

Earlier attempts are preserved:

```text
experiments/004-benchmark/evidence/benchmark-runs-1.txt
```

## Fixes Applied

The first attempt failed because render workers did not receive a Puppeteer executable path. The second attempt fixed browser discovery but failed because host `ffmpeg` was missing.

The runner now:

- Reads the managed Chrome path from `experiments/003-cli-introspection/evidence/browser-path.txt`.
- Sets `HYPERFRAMES_BROWSER_PATH`, `PRODUCER_HEADLESS_SHELL_PATH`, and `PUPPETEER_EXECUTABLE_PATH`.
- Copies `ffmpeg-static` into `tools/.cache/bin/ffmpeg.exe`.
- Prepends `tools/.cache/bin` to `PATH` before running `hyperframes benchmark`.

## Latest Summary

```text
30fps · draft · 2w: avgTimeMs=19946, avgSizeBytes=88195, failures=0
30fps · standard · 2w: avgTimeMs=16207, avgSizeBytes=67450, failures=0
30fps · high · 2w: avgTimeMs=31899, avgSizeBytes=93022, failures=0
30fps · standard · 4w: avgTimeMs=, avgSizeBytes=, failures=1
60fps · standard · 4w: avgTimeMs=30778, avgSizeBytes=65465, failures=0
```

The benchmark is fixed enough to produce useful evidence, but the failed 4-worker standard preset should be mentioned honestly in the article.
