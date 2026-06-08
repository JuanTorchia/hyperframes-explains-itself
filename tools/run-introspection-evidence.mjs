import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const evidenceDir = "experiments/003-cli-introspection/evidence";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

async function run(command, args, outputPath) {
  const result = await execFileAsync(command, args, {
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
  });

  await writeFile(outputPath, result.stdout || result.stderr || "", "utf8");
}

await mkdir(evidenceDir, { recursive: true });

await run(npxCommand, ["hyperframes", "info", "--json"], `${evidenceDir}/info.json`);
await run(npxCommand, ["hyperframes", "compositions", "--json"], `${evidenceDir}/compositions.json`);
await run(npxCommand, ["hyperframes", "doctor", "--json"], `${evidenceDir}/doctor.json`);
await run(npxCommand, ["hyperframes", "browser", "path"], `${evidenceDir}/browser-path.txt`);

console.log(`Wrote HyperFrames introspection evidence to ${evidenceDir}`);
