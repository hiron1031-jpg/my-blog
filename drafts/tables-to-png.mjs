// 1級原稿のmarkdown表を画像用HTMLに変換し、原稿の表を画像挿入指示に置き換える
// 使い方: node tables-to-png.mjs <input.md> <出力ディレクトリ> <画像名プレフィックス>
import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outDir, prefix] = process.argv;
if (!inputPath || !outDir || !prefix) {
  console.error("Usage: node tables-to-png.mjs <input.md> <outDir> <prefix>");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

const lines = fs.readFileSync(inputPath, "utf8").split("\n");
const out = [];
let tableNo = 0;
let i = 0;

while (i < lines.length) {
  if (/^\|.+\|\s*$/.test(lines[i])) {
    // 表ブロックを収集
    const block = [];
    while (i < lines.length && /^\|.+\|\s*$/.test(lines[i])) {
      block.push(lines[i]);
      i++;
    }
    tableNo++;
    const name = `${prefix}-table-${String(tableNo).padStart(2, "0")}`;

    // ヘッダー・区切り・本体に分解
    const rows = block
      .filter((l) => !/^\|[\s:|-]+\|\s*$/.test(l)) // 区切り行除去
      .map((l) => l.replace(/^\||\|\s*$/g, "").split("|").map((c) => inline(c.trim())));
    const header = rows[0];
    const body = rows.slice(1);

    const html = `<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8"><style>
body { margin:0; background:#fff; font-family:"Yu Gothic","Meiryo",sans-serif; }
.wrap { padding:16px 20px; width:820px; }
table { border-collapse:collapse; width:780px; font-size:20px; }
th, td { border:2px solid #000; padding:10px 14px; text-align:left; line-height:1.6; }
th { background:#f0f0f0; font-size:20px; }
</style></head><body><div class="wrap">
<table>
<tr>${header.map((h) => `<th>${h}</th>`).join("")}</tr>
${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("\n")}
</table>
</div></body></html>`;

    fs.writeFileSync(path.join(outDir, `${name}.html`), html);
    // 高さの目安（スクリーンショット用）
    const height = 60 + (body.length + 1) * 62;
    console.log(`${name}.html\t高さ目安:${height}`);

    out.push(`（このすぐ下に表の画像を挿入：${name}.png）`);
  } else {
    out.push(lines[i]);
    i++;
  }
}

fs.writeFileSync(inputPath, out.join("\n"));
console.log("表を画像指示に置換:", tableNo, "個");
