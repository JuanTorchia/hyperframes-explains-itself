import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";

const releaseApiUrl = "https://api.github.com/repos/ggml-org/whisper.cpp/releases/latest";
const cacheDir = "tools/.cache/whisper-official";
const zipPath = join(cacheDir, "whisper-bin-x64.zip");
const extractDir = join(cacheDir, "x64");

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });

    child.on("error", reject);
  });
}

if (process.platform !== "win32") {
  console.error("This setup script currently targets the official Windows x64 release asset.");
  process.exit(1);
}

const releaseResponse = await fetch(releaseApiUrl);

if (!releaseResponse.ok) {
  console.error(`Failed to read latest whisper.cpp release: ${releaseResponse.status}`);
  process.exit(1);
}

const release = await releaseResponse.json();
const asset = release.assets.find((item) => item.name === "whisper-bin-x64.zip");

if (!asset) {
  console.error(`whisper-bin-x64.zip was not found in ${release.tag_name}.`);
  process.exit(1);
}

await mkdir(cacheDir, { recursive: true });
await mkdir(extractDir, { recursive: true });
await writeFile(join(cacheDir, "release.json"), JSON.stringify({
  tagName: release.tag_name,
  assetName: asset.name,
  assetUrl: asset.browser_download_url,
}, null, 2), "utf8");

const downloadResponse = await fetch(asset.browser_download_url);

if (!downloadResponse.ok) {
  console.error(`Failed to download ${asset.name}: ${downloadResponse.status}`);
  process.exit(1);
}

await pipeline(downloadResponse.body, createWriteStream(zipPath));

const tempScript = join(tmpdir(), `hyperframes-expand-whisper-${Date.now()}.ps1`);
await writeFile(tempScript, `Expand-Archive -Path "${resolve(zipPath)}" -DestinationPath "${resolve(extractDir)}" -Force\n`, "utf8");
await run("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", tempScript]);

console.log(`Installed official whisper.cpp ${release.tag_name} asset to ${extractDir}`);
