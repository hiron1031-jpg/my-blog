// タグ統合スクリプト（一回限り実行用）
// 61種類のタグを13本の太いタグに統合する
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = "content/posts";

// 旧タグ → 新タグ（空文字は廃止）
const MAP = {
  "施工管理技士": "",
  "独学": "勉強法",
  "勉強法": "勉強法",
  "第二次検定": "第二次検定",
  "経験記述": "経験記述",
  "土木施工管理技士": "",
  "1級土木": "1級土木",
  "造園施工管理技士": "",
  "参考書": "参考書",
  "テキスト": "参考書",
  "2級土木": "2級土木",
  "1級造園": "1級造園",
  "試験対策": "",
  "第一次検定": "勉強法",
  "例文": "経験記述",
  "2級造園": "2級造園",
  "通信講座": "通信講座",
  "試験当日": "試験当日",
  "持ち物": "試験当日",
  "実務経験証明書": "受験申込",
  "受験申込": "受験申込",
  "キャリア": "キャリア",
  "頻出分野": "勉強法",
  "記述問題": "第二次検定",
  "合格戦略": "勉強法",
  "スクール": "通信講座",
  "おすすめ": "",
  "難易度": "合格率",
  "資格手当": "キャリア",
  "記述対策": "経験記述",
  "比較": "",
  "合格率": "合格率",
  "合格": "",
  "直前対策": "試験当日",
  "環境対策": "経験記述",
  "独学合格": "勉強法",
  "年収": "キャリア",
  "安全管理": "経験記述",
  "品質管理": "経験記述",
  "勉強時間": "勉強法",
  "令和8年度": "",
  "造園から土木": "キャリア",
  "造園": "",
  "転職": "キャリア",
  "資格の順番": "キャリア",
  "能セン": "通信講座",
  "給料": "キャリア",
  "監理技術者": "キャリア",
  "独学サポート事務局": "通信講座",
  "添削": "通信講座",
  "未経験": "キャリア",
  "建設業法": "キャリア",
  "土木": "",
  "前期": "試験当日",
  "前日": "試験当日",
  "入門書": "参考書",
  "主任技術者": "キャリア",
  "マンガ": "参考書",
  "ダブルライセンス": "キャリア",
  "コスパ": "",
  "SAT": "通信講座",
};

// スラッグから級タグを補完
function levelTagsFromSlug(slug) {
  const tags = [];
  if (slug.includes("doboku-1kyu")) tags.push("1級土木");
  if (slug.includes("doboku-2kyu")) tags.push("2級土木");
  if (slug.includes("zouen-1kyu")) tags.push("1級造園");
  if (slug.includes("zouen-2kyu")) tags.push("2級造園");
  return tags;
}

const LEVEL_ORDER = ["1級土木", "2級土木", "1級造園", "2級造園"];

let unknown = new Set();
let changed = 0;

for (const slug of fs.readdirSync(POSTS_DIR)) {
  const file = path.join(POSTS_DIR, slug, "index.mdx");
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(/^tags: \[(.*)\]$/m);
  if (!m) {
    console.log("tags行なし:", slug);
    continue;
  }
  const oldTags = m[1]
    .split(",")
    .map((t) => t.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);

  const mapped = [];
  for (const t of oldTags) {
    if (!(t in MAP)) {
      unknown.add(t);
      continue;
    }
    if (MAP[t]) mapped.push(MAP[t]);
  }
  for (const lv of levelTagsFromSlug(slug)) mapped.push(lv);

  // 重複除去 → 級タグ先頭 → 最大4つ
  const uniq = [...new Set(mapped)];
  const levels = LEVEL_ORDER.filter((l) => uniq.includes(l));
  const topics = uniq.filter((t) => !LEVEL_ORDER.includes(t));
  const finalTags = [...levels, ...topics].slice(0, 4);

  if (finalTags.length === 0) {
    console.log("タグゼロ:", slug, "←要確認");
    continue;
  }

  const newLine = `tags: [${finalTags.map((t) => `"${t}"`).join(", ")}]`;
  const out = src.replace(/^tags: \[.*\]$/m, newLine);
  if (out !== src) {
    fs.writeFileSync(file, out);
    changed++;
    console.log(slug, "→", finalTags.join(" / "));
  }
}

console.log("\n変更ファイル数:", changed);
if (unknown.size) console.log("マッピング漏れタグ:", [...unknown].join(", "));
