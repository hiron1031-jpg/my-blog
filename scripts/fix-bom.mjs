import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const base = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/my-blog/content/posts";
const files = [
  "goukaku-career/index.mdx",
  "zouen-keiken-kijutsu/index.mdx",
  "keiken-kijutsu-kakikata/index.mdx",
  "sankosho-hikaku/index.mdx",
  "sekoukanri-goukakuritsu/index.mdx",
];

for (const f of files) {
  const p = join(base, f);
  const buf = readFileSync(p);
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    writeFileSync(p, buf.slice(3));
    console.log("BOM removed:", f);
  } else {
    console.log("No BOM:", f);
  }
}
