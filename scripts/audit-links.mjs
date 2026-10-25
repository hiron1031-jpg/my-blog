// サイト内の全リンクを集めて、本番に実在するか確かめる。
//   node scripts/audit-links.mjs            … 内部リンクのみ
//   node scripts/audit-links.mjs --external … 外部リンクも確認（時間がかかる）
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.AUDIT_BASE ?? "https://doboku-torisetsu.com";
const checkExternal = process.argv.includes("--external");

// 走査対象
const ROOTS = ["content/posts", "src"];
const EXT = new Set([".mdx", ".md", ".ts", ".tsx"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (EXT.has(path.extname(e.name))) out.push(f);
  }
  return out;
}

const files = ROOTS.filter((r) => fs.existsSync(r)).flatMap((r) => walk(r));

/** リンク → それが書かれているファイルの一覧 */
const internal = new Map();
const external = new Map();

const add = (map, url, file) => {
  if (!map.has(url)) map.set(url, new Set());
  map.get(url).add(file);
};

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");

  // markdown の (/path) と href="/path" の両方
  for (const m of text.matchAll(/\]\((\/[^)\s"']*)\)/g)) add(internal, m[1], file);
  for (const m of text.matchAll(/href=["'`](\/[^"'`\s]*)["'`]/g)) add(internal, m[1], file);

  if (checkExternal) {
    for (const m of text.matchAll(/\]\((https?:\/\/[^)\s"']+)\)/g)) add(external, m[1], file);
    for (const m of text.matchAll(/href=["'`](https?:\/\/[^"'`\s]+)["'`]/g)) add(external, m[1], file);
  }
}

// 動的に組み立てているもの（${...} を含む）は除外
const skip = (u) =>
  u.includes("${") ||
  u.includes("[") ||
  u.startsWith("/api/") ||
  u === "/" ||
  u.startsWith("/#");

async function head(url) {
  try {
    const r = await fetch(url, { redirect: "follow" });
    return r.status;
  } catch {
    return 0;
  }
}

const targets = [...internal.keys()].filter((u) => !skip(u)).sort();
console.log(`内部リンク ${targets.length} 種類を確認します（${BASE}）\n`);

const bad = [];
for (let i = 0; i < targets.length; i += 10) {
  const batch = targets.slice(i, i + 10);
  const codes = await Promise.all(batch.map((u) => head(BASE + u)));
  batch.forEach((u, j) => {
    if (codes[j] !== 200) bad.push([u, codes[j], [...internal.get(u)]]);
  });
  process.stdout.write(".");
}
console.log("\n");

if (bad.length === 0) {
  console.log("✅ 内部リンクはすべて200でした");
} else {
  console.log(`⚠ 問題のある内部リンク ${bad.length} 件\n`);
  for (const [u, code, where] of bad) {
    console.log(`  ${code === 0 ? "接続不可" : code}  ${u}`);
    for (const f of where.slice(0, 4)) console.log(`        ← ${f}`);
  }
}

if (checkExternal) {
  const ex = [...external.keys()].sort();
  console.log(`\n外部リンク ${ex.length} 種類を確認します\n`);
  const exBad = [];
  for (let i = 0; i < ex.length; i += 6) {
    const batch = ex.slice(i, i + 6);
    const codes = await Promise.all(batch.map((u) => head(u)));
    batch.forEach((u, j) => {
      if (codes[j] >= 400 || codes[j] === 0) exBad.push([u, codes[j], [...external.get(u)]]);
    });
    process.stdout.write(".");
  }
  console.log("\n");
  if (exBad.length === 0) console.log("✅ 外部リンクもすべて到達できました");
  else {
    console.log(`⚠ 到達できない外部リンク ${exBad.length} 件\n`);
    for (const [u, code, where] of exBad) {
      console.log(`  ${code === 0 ? "接続不可" : code}  ${u}`);
      for (const f of where.slice(0, 3)) console.log(`        ← ${f}`);
    }
  }
}
