import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const venvDir = ".venv";
const pythonBin = process.platform === "win32"
  ? join(venvDir, "Scripts", "python.exe")
  : join(venvDir, "bin", "python");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });

    child.on("error", reject);
  });
}

if (!existsSync(pythonBin)) {
  await run("python", ["-m", "venv", venvDir]);
}

await run(pythonBin, ["-m", "pip", "install", "--upgrade", "pip"]);
await run(pythonBin, ["-m", "pip", "install", "kokoro-onnx", "soundfile"]);

