// R5 1次B No.26（データ欠落分）を追加するスクリプト
// 正解は R5_kaitou.pdf で確認済み（No.26 = 1）
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "..", "src", "data", "quiz", "year-questions.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

const list = data["doboku-1kyu"]["R5"]["1次B"];
if (list.some((q) => q.id === "doboku-1kyu-R5-1次B-26")) {
  console.log("R5 No.26 は既に存在します。スキップ。");
  process.exit(0);
}

const q26 = {
  id: "doboku-1kyu-R5-1次B-26",
  exam: "doboku-1kyu",
  category: "一般問題",
  question:
    "工程管理に用いられる各工程表の特徴に関する下記の文章中の（イ）〜（ニ）に当てはまる語句の組合せとして，適当なものは次のうちどれか。　・座標式工程表は，一方の軸に工事期間を，他の軸に工事量等を座標で表現するもので，（イ）工事では工事内容を確実に示すことができる。　・グラフ式工程表は，横軸に工期を，縦軸に各作業の（ロ）を表示し，予定と実績の差を直視的に比較でき，施工中の作業の進捗状況もよくわかる。　・バーチャートは，横軸に時間をとり各工種が時間経過に従って表現され，作業間の関連がわかり，工期に影響する作業がどれであるか（ハ）。　・ネットワーク式工程表は，2つの作業の遅れや変化が工事全体の工期にどのように影響してくるかを（ニ）。",
  options: [
    "（イ）路線に沿った／（ロ）出来高比率／（ハ）は掴みにくい／（ニ）正確に捉えることができる",
    "（イ）平面的に広がりのある／（ロ）工事費構成率／（ハ）も掴みやすい／（ニ）把握することは難しい",
    "（イ）平面的に広がりのある／（ロ）出来高比率／（ハ）は掴みにくい／（ニ）正確に捉えることができる",
    "（イ）路線に沿った／（ロ）工事費構成率／（ハ）も掴みやすい／（ニ）把握することは難しい",
  ],
  correctIndex: 0,
  explanation:
    "正解は1。座標式工程表は道路やトンネルのような路線に沿った工事に適します。グラフ式工程表は縦軸に出来高比率をとり、予定と実績を直視的に比較できます。バーチャートは作業間の関連はわかるものの工期に影響する作業は掴みにくく、それを正確に捉えられるのがネットワーク式工程表です。",
  originalNumber: 26,
};

const idx = list.findIndex((q) => q.originalNumber === 27);
list.splice(idx === -1 ? list.length : idx, 0, q26);
fs.writeFileSync(DATA, JSON.stringify(data, null, 2), "utf8");
console.log("R5 1次B No.26 を追加しました。現在の1次B問題数:", list.length);
