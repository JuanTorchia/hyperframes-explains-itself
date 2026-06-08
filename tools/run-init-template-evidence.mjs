import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectDir = "experiments/016-init-template";
const generatedDir = `${projectDir}/generated`;
const outputDir = `${generatedDir}/init-blank`;
const evidenceDir = `${projectDir}/evidence`;
const command = process.platform === "win32" ? "cmd.exe" : process.execPath;

function hyperframesArgs(args) {
  const binary = process.platform === "win32"
    ? resolve("node_modules/.bin/hyperframes.cmd")
    : resolve("node_modules/.bin/hyperframes");
  return process.platform === "win32" ? ["/d", "/c", binary, ...args] : [binary, ...args];
}

async function runHyperframes(args, options = {}) {
  return execFileAsync(command, hyperframesArgs(args), {
    cwd: options.cwd || process.cwd(),
    maxBuffer: 100 * 1024 * 1024,
  });
}

async function runNpm(args, options = {}) {
  const npmArgs = process.platform === "win32" ? ["/d", "/c", "npm", ...args] : args;
  const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";
  return execFileAsync(npmCommand, npmArgs, {
    cwd: options.cwd || process.cwd(),
    maxBuffer: 100 * 1024 * 1024,
  });
}

async function listTree(root, prefix = "") {
  const entries = await readdir(root, { withFileTypes: true });
  const lines = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = `${prefix}${entry.name}`;
    lines.push(entry.isDirectory() ? `${relative}/` : relative);
    if (entry.isDirectory()) {
      lines.push(...await listTree(`${root}/${entry.name}`, `${relative}/`));
    }
  }

  return lines;
}

async function run() {
  await mkdir(evidenceDir, { recursive: true });
  await mkdir(generatedDir, { recursive: true });
  await rm(outputDir, { recursive: true, force: true });

  const startedAt = new Date().toISOString();
  const init = await runHyperframes([
    "init",
    "init-blank",
    "--example",
    "blank",
    "--non-interactive",
    "--skip-skills",
  ], { cwd: generatedDir });

  const lint = await runHyperframes(["lint", outputDir]);
  const inspect = await runHyperframes(["inspect", outputDir]);
  const generatedCheck = await runNpm(["run", "check"], { cwd: resolve(outputDir) });
  const output = await stat(outputDir);
  const tree = await listTree(outputDir);

  await writeFile(`${evidenceDir}/init-result.json`, JSON.stringify({
    command: "hyperframes init init-blank --example blank --non-interactive --skip-skills",
    cwd: generatedDir,
    output: outputDir,
    startedAt,
    completedAt: new Date().toISOString(),
    directoryCreated: output.isDirectory(),
    stdout: init.stdout,
    stderr: init.stderr,
  }, null, 2), "utf8");
  await writeFile(`${evidenceDir}/lint.txt`, lint.stdout + lint.stderr, "utf8");
  await writeFile(`${evidenceDir}/inspect.txt`, inspect.stdout + inspect.stderr, "utf8");
  await writeFile(`${evidenceDir}/generated-npm-check.txt`, generatedCheck.stdout + generatedCheck.stderr, "utf8");
  await writeFile(`${evidenceDir}/generated-tree.txt`, `${tree.join("\n")}\n`, "utf8");

  console.log(`Wrote init evidence to ${evidenceDir}`);
}

await run();
