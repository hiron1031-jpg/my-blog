// クイズ解説パッチ適用スクリプト
// 使い方: node drafts/quiz-kaisetsu/apply-kaisetsu.cjs drafts/quiz-kaisetsu/XXX.json
// パッチ形式: { "<問題id>": { "explanation": "...", "question": "...(任意)", "options": {"0": "...(任意)"} } }
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "..", "src", "data", "quiz", "year-questions.json");
const patchFile = process.argv[2];
if (!patchFile) {
  console.error("パッチファイルを指定してください");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const patch = JSON.parse(fs.readFileSync(patchFile, "utf8"));

const applied = new Set();
for (const exam in data) {
  for (const year in data[exam]) {
    for (const term in data[exam][year]) {
      for (const q of data[exam][year][term]) {
        const p = patch[q.id];
        if (!p) continue;
        if (p.explanation) q.explanation = p.explanation;
        if (p.question) q.question = p.question;
        if (p.options) {
          for (const [idx, text] of Object.entries(p.options)) {
            q.options[Number(idx)] = text;
          }
        }
        applied.add(q.id);
      }
    }
  }
}

const missing = Object.keys(patch).filter((id) => !applied.has(id));
fs.writeFileSync(DATA, JSON.stringify(data, null, 2), "utf8");
console.log("適用:", applied.size, "問");
if (missing.length) console.log("⚠ 見つからなかったid:", missing.join(", "));

// 検証: JSONとして読み直し、解説付き問題数を数える
const check = JSON.parse(fs.readFileSync(DATA, "utf8"));
let total = 0, withExp = 0;
for (const exam in check)
  for (const year in check[exam])
    for (const term in check[exam][year])
      for (const q of check[exam][year][term]) {
        total++;
        if (q.explanation && q.explanation.length > 0) withExp++;
      }
console.log(`検証OK: 全${total}問中、解説あり${withExp}問`);
