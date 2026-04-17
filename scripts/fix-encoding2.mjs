import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const iconv = require(join(__dirname, "../node_modules/iconv-lite/lib/index.js"));

const base = join(__dirname, "../content/posts");
const files = [
  "goukaku-career/index.mdx",
  "keiken-kijutsu-kakikata/index.mdx",
  "sankosho-hikaku/index.mdx",
  "sekoukanri-goukakuritsu/index.mdx",
];

for (const f of files) {
  const p = join(base, f);
  const buf = readFileSync(p);

  // Remove BOM if present
  const data = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? buf.slice(3) : buf;

  // Reverse the PowerShell encoding damage:
  // Original UTF-8 → PowerShell read as cp932 → saved as UTF-8
  // Reverse: current UTF-8 → encode as cp932 → decode as UTF-8
  const garbledStr = data.toString("utf8");
  const originalBytes = iconv.encode(garbledStr, "cp932");
  const restored = originalBytes.toString("utf8");

  if (/[\u3000-\u9FFF]/.test(restored)) {
    writeFileSync(p, restored, "utf8");
    console.log(`✓ Restored: ${f}`);
    restored.split("\n").slice(0, 4).forEach(l => console.log("  " + l));
  } else {
    console.log(`✗ Failed: ${f}`);
    console.log("  First 100 chars:", restored.substring(0, 100));
  }
}
