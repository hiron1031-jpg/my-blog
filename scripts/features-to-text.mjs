// SchoolCard の features={[...]} を featuresText="A｜B｜C" に変換する。
//
// 背景：next-mdx-remote v6 が JSX の {...} 形式の属性を落とすため、
// MDXから配列で渡した特徴リストがサイト全体で非表示になっていた（2026-10-22判明）。
//
// 使い方:
//   node scripts/features-to-text.mjs          … 変更せず件数だけ表示（ドライラン）
//   node scripts/features-to-text.mjs --write  … 実際に書き換える

import fs from "node:fs";
import path from "node:path";

const POSTS = "content/posts";
const SEP = "｜";
const write = process.argv.includes("--write");

// 複数行形式:  features={[\n    "A",\n    "B",\n  ]}
const MULTI = /([ \t]*)features=\{\[\r?\n((?:[ \t]*"[^"]*",?[ \t]*\r?\n)+)[ \t]*\]\}/g;
// 単一行形式:  features={["A","B"]}
const SINGLE = /([ \t]*)features=\{\[((?:"[^"]*"\s*,?\s*)+)\]\}/g;

function parseItems(body) {
  return [...body.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
}

let files = 0;
let blocks = 0;
const problems = [];

for (const dir of fs.readdirSync(POSTS)) {
  const file = path.join(POSTS, dir, "index.mdx");
  if (!fs.existsSync(file)) continue;

  const original = fs.readFileSync(file, "utf8");
  let out = original;
  let hits = 0;

  const replacer = (_m, indent, body) => {
    const items = parseItems(body);
    if (items.length === 0) {
      problems.push(`${dir}: 項目を取り出せませんでした`);
      return _m;
    }
    for (const it of items) {
      if (it.includes(SEP)) problems.push(`${dir}: 項目に「${SEP}」が含まれます → ${it}`);
      if (it.includes('"')) problems.push(`${dir}: 項目に引用符が含まれます → ${it}`);
    }
    hits++;
    return `${indent}featuresText="${items.join(SEP)}"`;
  };

  out = out.replace(MULTI, replacer).replace(SINGLE, replacer);

  if (hits > 0) {
    files++;
    blocks += hits;
    if (write) fs.writeFileSync(file, out);
  }

  // 取り残しが無いか確認
  if (/features=\{\[/.test(out)) {
    problems.push(`${dir}: 変換できない features={[ が残っています`);
  }
}

console.log(`${write ? "書き換え" : "ドライラン"}: ${files}記事 / ${blocks}ブロック`);
console.log(problems.length ? "⚠ 要確認:\n" + problems.join("\n") : "✅ 問題なし");
