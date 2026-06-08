# Experiment 016: Init Template Probe

## Question

Can `hyperframes init` create a blank project in non-interactive mode, and can the generated project pass `lint` and `inspect`?

## Commands

```bash
npm run experiment:init-template
```

## Evidence

```text
experiments/016-init-template/generated/init-blank/
experiments/016-init-template/evidence/init-result.json
experiments/016-init-template/evidence/generated-tree.txt
experiments/016-init-template/evidence/lint.txt
experiments/016-init-template/evidence/inspect.txt
```

## Result

Validated.

The generated project included:

```text
AGENTS.md
CLAUDE.md
hyperframes.json
index.html
meta.json
package.json
```

The experiment validated both direct project checks and the generated package script:

```text
hyperframes lint experiments/016-init-template/generated/init-blank
hyperframes inspect experiments/016-init-template/generated/init-blank
cd experiments/016-init-template/generated/init-blank && npm run check
```

Finding: the generated `package.json` includes `hyperframes validate` inside `npm run check`. That command is operational in `hyperframes@0.6.81`, even though it is not listed in the top-level CLI command map captured earlier.

Reproducibility note: `meta.json` includes a `createdAt` timestamp, so the generated scaffold is structurally reproducible but not byte-for-byte deterministic across reruns.
