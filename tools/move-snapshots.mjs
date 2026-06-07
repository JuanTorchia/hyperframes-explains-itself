import { mkdir, readdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";

const sourceDir = "snapshots";
const targetDir = "video/hyperframes-in-60-seconds/screenshots";

await mkdir(targetDir, { recursive: true });

let files = [];

try {
  files = await readdir(sourceDir);
} catch {
  console.error("No snapshots directory found. Run `hyperframes snapshot` first.");
  process.exit(1);
}

for (const file of files) {
  await rename(join(sourceDir, file), join(targetDir, file));
}

await rm(sourceDir, { recursive: true, force: true });

console.log(`Moved ${files.length} snapshot files to ${targetDir}`);

