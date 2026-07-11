/**
 * 図問題の画像付きクイズ 第5バッチ（2級土木ラスト）：R4前期2問・R4後期3問。
 * 図は public/images/quiz/doboku-2kyu/doboku-2kyu-R4-{前期|後期}-{n}.png に切り抜き済み。
 * 正解は解答PDF（後期は種別:土木）原本から抽出、ネットワークは自力検算で一致。
 * No.57(後期)は日数(G=3日)を拡大確認し工期21日を検証（5日との誤読を訂正）。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "doboku-2kyu";

const Q = [
  // ===== R4 前期 =====
  {
    yr: "R4", sec: "前期", n: 45, category: "専門工事",
    question: "下図は標準的なブロック積擁壁の断面図であるが、ブロック積擁壁各部の名称と寸法記号の表記として2つとも適当なものは、次のうちどれか。",
    options: ["擁壁の直高 L1、裏込め材 N2", "擁壁の直高 L2、裏込めコンクリート N1", "擁壁の直高 L1、裏込めコンクリート N2", "擁壁の直高 L2、裏込め材 N1"],
    correct: 3,
    explanation: "正解は3。擁壁の直高は擁壁全体の鉛直高さを指すのでL1が正しく、部分的なL2ではありません。N2はブロック背面に打設するコンクリート＝裏込めコンクリート、N1はその背後に入れる栗石・砕石等＝裏込め材です。",
  },
  {
    yr: "R4", sec: "前期", n: 57, category: "工程管理",
    question: "下図のネットワーク式工程表について記載している下記の文章中の（イ）〜（ニ）に当てはまる語句の組合せとして、適当なものは次のうちどれか。ただし、図中のイベント間のA〜Gは作業内容、数字は作業日数を表す。\n・（イ）及び（ロ）は、クリティカルパス上の作業である。\n・作業Dが（ハ）遅延しても、全体の工期に影響はない。\n・この工程全体の工期は、（ニ）である。",
    options: ["（イ）作業C（ロ）作業F（ハ）5日（ニ）21日間", "（イ）作業B（ロ）作業D（ハ）5日（ニ）16日間", "（イ）作業B（ロ）作業D（ハ）6日（ニ）16日間", "（イ）作業C（ロ）作業F（ハ）6日（ニ）21日間"],
    correct: 1,
    explanation: "正解は1。クリティカルパスはA→C→F→Gで、工期は3+6+7+5＝21日間。クリティカルパス上の作業（イ）（ロ）は作業Cと作業F。作業D（②→⑤、3日）は②の最早8日から⑤へ11日で到達するが、⑤の最早時刻は16日なので余裕（フロート）は5日。よって作業Dが5日遅延しても工期に影響しません（ハ＝5日）。",
  },
  // ===== R4 後期 =====
  {
    yr: "R4", sec: "後期", n: 25, category: "専門工事",
    question: "下図は傾斜型海岸堤防の構造を示したものである。図の（イ）〜（ハ）の構造名称に関する次の組合せのうち、適当なものはどれか。",
    options: ["（イ）裏法被覆工（ロ）根留工（ハ）基礎工", "（イ）表法被覆工（ロ）基礎工（ハ）根留工", "（イ）表法被覆工（ロ）根留工（ハ）基礎工", "（イ）裏法被覆工（ロ）基礎工（ハ）根留工"],
    correct: 3,
    explanation: "正解は3。（イ）は堤体の表（海）側法面を波などから保護する表法被覆工。（ロ）は被覆工の脚部を固定し滑動・洗掘を防ぐ根留工。（ハ）は海側基部で堤体・被覆工を支える基礎工です。",
  },
  {
    yr: "R4", sec: "後期", n: 45, category: "専門工事",
    question: "下図は橋の一般的な構造を表したものであるが、（イ）〜（ニ）の橋の長さを表す名称に関する組合せとして、適当なものは次のうちどれか。",
    options: ["（イ）橋長（ロ）桁長（ハ）径間長（ニ）支間長", "（イ）桁長（ロ）橋長（ハ）支間長（ニ）径間長", "（イ）橋長（ロ）桁長（ハ）支間長（ニ）径間長", "（イ）支間長（ロ）桁長（ハ）橋長（ニ）径間長"],
    correct: 3,
    explanation: "正解は3。（イ）は橋の全長で両端の橋台間の長さ＝橋長。（ロ）は桁そのものの長さ＝桁長。（ハ）は支承（支点）の中心間距離＝支間長。（ニ）は橋脚・橋台の前面間の距離＝径間長です。",
  },
  {
    yr: "R4", sec: "後期", n: 57, category: "工程管理",
    question: "下図のネットワーク式工程表について記載している下記の文章中の（イ）〜（ニ）に当てはまる語句の組合せとして、正しいものは次のうちどれか。ただし、図中のイベント間のA〜Gは作業内容、数字は作業日数を表す。\n・（イ）及び（ロ）は、クリティカルパス上の作業である。\n・作業Bが（ハ）遅延しても、全体の工期に影響はない。\n・この工程全体の工期は、（ニ）である。",
    options: ["（イ）作業B（ロ）作業D（ハ）3日（ニ）20日間", "（イ）作業C（ロ）作業E（ハ）2日（ニ）21日間", "（イ）作業B（ロ）作業D（ハ）3日（ニ）21日間", "（イ）作業C（ロ）作業E（ハ）2日（ニ）20日間"],
    correct: 2,
    explanation: "正解は2。クリティカルパスはA→C→E→Gで、工期は3+6+9+3＝21日間。クリティカルパス上の作業（イ）（ロ）は作業Cと作業E。作業B（①→②、4日）は、②の最遅時刻9日に対し最早時刻が7日なので、余裕（フロート）は2日。よって作業Bが2日遅延しても工期に影響しません（ハ＝2日）。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][q.yr][q.sec];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.yr, q.sec, q.n); continue; }
  const id = `${EX}-${q.yr}-${q.sec}-${q.n}`;
  const item = {
    id, exam: EX, category: q.category,
    question: q.question, options: q.options,
    correctIndex: q.correct - 1, explanation: q.explanation,
    originalNumber: q.n, imageUrl: `/images/quiz/doboku-2kyu/${id}.png`,
  };
  let idx = sec.findIndex((x) => x.originalNumber > q.n);
  if (idx === -1) idx = sec.length;
  sec.splice(idx, 0, item);
  added++;
  console.log("追加:", id, "正解", q.correct);
}
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
let total = 0;
for (const ex of Object.keys(data)) for (const y of Object.keys(data[ex])) for (const s of Object.keys(data[ex][y])) total += data[ex][y][s].length;
console.log(`完了: ${added}問追加 / 総 ${total}問`);
