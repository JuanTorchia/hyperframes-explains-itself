# Experiment 006: Registry Components

## Question

Can registry blocks or components improve the tutorial without hiding how the composition works?

## Surfaces To Test

- `hyperframes catalog --json`
- `hyperframes catalog --type block --json`
- `hyperframes catalog --tag captions --json`
- `hyperframes add <name> --json --no-clipboard`

## Decision Rule

Do not install a registry item into the main tutorial until it has a clear teaching purpose. If a block is installed, capture the exact files written by the command.

## Expected Evidence

```text
experiments/006-registry-components/evidence/catalog.json
experiments/006-registry-components/evidence/catalog-captions.json
experiments/006-registry-components/evidence/add-result.json
```

## Result

Catalog discovery was captured:

```text
experiments/006-registry-components/evidence/catalog.json
experiments/006-registry-components/evidence/catalog-captions.json
```

The caption catalog includes reusable caption style components such as `caption-pill-karaoke`, `caption-neon-accent`, and `caption-weight-shift`.

## Pending

An isolated component install was tested:

```bash
npx hyperframes add caption-weight-shift --dir experiments/006-registry-components/install-sandbox --no-clipboard --json
```

It wrote:

```text
experiments/006-registry-components/install-sandbox/compositions/components/caption-weight-shift.html
```

Evidence:

```text
experiments/006-registry-components/evidence/add-caption-weight-shift.json
```

Open finding: the JSON reports `clipboardCopied: true` even though the command passed `--no-clipboard`.
