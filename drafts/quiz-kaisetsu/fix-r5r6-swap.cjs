// 2級土木クイズデータ修正スクリプト（2026-07-03）
// 1) R5⇔R6の年度入れ替え（PDFの中身と一致させる）
// 2) 後期3年分（R4・R5・R6）のcorrectIndexを解答PDFの「種別:土木」表に修正
//    （従来は「薬液注入」等の別種別の表が使われていた）
// 3) R4前期No.61の正解修正
const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "..", "..", "src", "data", "quiz", "year-questions.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const ex = data["doboku-2kyu"];

// --- 1) R5⇔R6 入れ替え＋id/year書き換え ---
const oldR5 = ex["R5"], oldR6 = ex["R6"];
function relabel(obj, from, to) {
  for (const term in obj) {
    for (const q of obj[term]) {
      if (q.id) q.id = q.id.replace(`-${from}-`, `-${to}-`);
      if (q.year) q.year = q.year.replace(from, to);
    }
  }
  return obj;
}
ex["R5"] = relabel(oldR6, "R6", "R5"); // 旧R6(=令和5の中身) → R5へ
ex["R6"] = relabel(oldR5, "R5", "R6"); // 旧R5(=令和6の中身) → R6へ

// --- 2) 正答表（解答PDF 種別:土木 より） ---
const tables = {
  // 令和4年度後期
  "R4|後期": [3,1,4,1,1,3,3,4,1,1,4,2,4,2,3,2,1,4,1,2,4,1,2,2,3,3,4,3,3,4,1,3,2,3,4,2,2,3,2,1,1,2,3,4,3,3,1,3,2,1,4,3,4,2,4,4,2,1,3,2,1],
  // 令和4年度前期（No.61のみ既存とズレ）
  "R4|前期": [4,1,3,2,3,4,3,2,3,2,1,3,2,2,3,2,4,1,1,4,3,4,3,2,3,4,2,1,3,3,2,1,4,1,4,1,3,4,3,4,4,1,3,2,3,3,2,2,1,4,1,4,3,1,3,2,1,4,1,3,2],
  // 令和5年度後期（入れ替え後はR5）
  "R5|後期": [2,4,2,3,2,2,4,3,4,1,3,4,1,3,1,3,4,2,4,3,1,3,1,2,4,2,1,1,2,3,2,3,2,3,4,1,4,1,2,2,3,3,3,4,4,1,4,4,1,2,2,2,3,1,1,4,1,1,3,4,3],
  // 令和5年度前期（入れ替え後はR5。検証用）
  "R5|前期": [1,1,4,3,1,2,1,3,1,1,3,2,4,4,2,1,2,3,2,3,4,2,2,4,3,3,2,3,4,1,4,2,1,1,4,4,1,3,1,4,4,2,4,1,3,4,2,1,4,2,3,4,3,1,2,3,2,3,3,2,1],
  // 令和6年度後期（入れ替え後はR6）
  "R6|後期": [1,3,3,4,1,3,2,3,1,2,2,4,2,4,4,1,4,4,3,1,3,2,4,2,3,1,2,2,3,2,3,2,2,4,1,4,1,2,2,1,3,4,2,3,1,2,4,3,3,1,1,2,4,3,4,1,2,1,1,3,3,4,1,4,4,3],
  // 令和6年度前期（入れ替え後はR6。検証用）
  "R6|前期": [2,1,4,4,1,3,4,3,4,1,2,3,4,3,4,2,1,3,4,4,2,1,2,2,4,4,3,1,3,2,2,1,2,2,3,1,3,1,4,1,4,2,2,1,4,4,1,3,2,1,1,3,3,4,4,1,3,2,3,4,3,1,3,2,2,3],
};

for (const [key, tab] of Object.entries(tables)) {
  const [year, term] = key.split("|");
  const qs = (ex[year] && ex[year][term]) || [];
  let fixed = 0, ok = 0, skipped = 0;
  for (const q of qs) {
    const no = q.originalNumber || q.number;
    if (!no || no > tab.length) { skipped++; continue; }
    const correct = tab[no - 1] - 1; // 0始まりに変換
    if (q.correctIndex === correct) { ok++; }
    else { q.correctIndex = correct; fixed++; }
  }
  console.log(`${year} ${term}: 一致${ok} / 修正${fixed} / 対象外${skipped} (全${qs.length}問)`);
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2), "utf8");

// --- 検証 ---
const check = JSON.parse(fs.readFileSync(DATA, "utf8"));
let total = 0, withExp = 0;
for (const e in check) for (const y in check[e]) for (const t in check[e][y]) for (const q of check[e][y][t]) { total++; if (q.explanation) withExp++; }
console.log(`検証OK: 全${total}問 / 解説あり${withExp}問`);
console.log("R5前期 第1問id:", check["doboku-2kyu"]["R5"]["前期"][0].id);
console.log("R6後期 第1問id:", check["doboku-2kyu"]["R6"]["後期"][0].id);
