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

No registry item has been installed yet. Installation should happen in a throwaway branch or isolated experiment first, because `hyperframes add` writes files into the project.
