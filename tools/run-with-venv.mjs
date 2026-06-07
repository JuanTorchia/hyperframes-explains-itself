import { spawn } from "node:child_process";
import { join } from "node:path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node tools/run-with-venv.mjs <command> [...args]");
  process.exit(1);
}

const venvBin = process.platform === "win32"
  ? join(process.cwd(), ".venv", "Scripts")
  : join(process.cwd(), ".venv", "bin");
const pathKey = process.platform === "win32" ? "Path" : "PATH";
const separator = process.platform === "win32" ? ";" : ":";
const [command, ...commandArgs] = args;
const executable = command === "hyperframes"
  ? process.execPath
  : command;
const executableArgs = command === "hyperframes"
  ? [join(process.cwd(), "node_modules", "hyperframes", "dist", "cli.js"), ...commandArgs]
  : commandArgs;

const child = spawn(executable, executableArgs, {
  cwd: process.cwd(),
  env: {
    ...process.env,
    [pathKey]: `${venvBin}${separator}${process.env[pathKey] || process.env.PATH || ""}`,
  },
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`${command} exited with signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});
