/**
 * 図問題の画像付きクイズ 第1バッチ：2級土木 R8前期・R7前期の5問。
 * 図は public/images/quiz/doboku-2kyu/{id}.png に切り抜き済み（pdftoppmで150dpi）。
 * 正解は全て解答PDFから直接再抽出し、生の正答表とも突き合わせて確定
 * （K照合データの未検証セルに誤りが複数あったため、Kは使わずPDF原本を採用）。
 * ネットワーク問題は図からクリティカルパスを自力で追い、公式正解と一致を確認済み。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

const Q = [
  {
    exam: "doboku-2kyu", year: "R8", section: "前期", id: "doboku-2kyu-R8-1j-50", n: 50, category: "専門工事",
    question: "下図は切土法面に設置した標準的なもたれ式擁壁の断面図を示しているが、もたれ式擁壁各部の「名称」と「記号」の表記として、2つとも適当なものはどれか。",
    options: ["擁壁高 H1、つま先版 B1", "擁壁高 H1、底版かかと B1", "擁壁高 H2、つま先版 B2", "擁壁高 H2、底版かかと B2"],
    correct: 1,
    explanation: "正解は1。擁壁高は擁壁全体の高さを指すのでH1（基礎底面から天端までの全高）が正しく、部分的な高さのH2ではありません。B1は底版の前面（法面と反対側）に張り出した部分＝つま先版です。B2は背面側の張出し＝底版かかと（かかと版）です。",
  },
  {
    exam: "doboku-2kyu", year: "R8", section: "前期", id: "doboku-2kyu-R8-1j-62", n: 62, category: "工程管理",
    question: "下図のネットワーク式工程表に関する文章中の（イ）〜（ニ）に当てはまる語句の組合せとして、正しいものはどれか。ただし、図中のイベント間のA〜Hは作業内容、数字は作業日数を表す。\n・（イ）及び（ロ）は、クリティカルパス上の作業である。\n・作業Hの最早開始時刻は、（ハ）である。\n・この工程全体の工期は、（ニ）である。",
    options: ["（イ）作業B（ロ）作業F（ハ）16日（ニ）20日", "（イ）作業D（ロ）作業G（ハ）15日（ニ）21日", "（イ）作業B（ロ）作業F（ハ）16日（ニ）21日", "（イ）作業D（ロ）作業G（ハ）15日（ニ）20日"],
    correct: 3,
    explanation: "正解は3。各経路の所要日数を計算すると、上ルートA→B→(ダミー)→F＝5+5+6＝16日が④→⑤へ至る最長。作業Hの最早開始時刻（＝イベント⑤の最早時刻）は16日。工期は⑤+H＝16+5＝21日（下ルートD→G＝5+7+8＝20日より長い）。クリティカルパスはA→B→F→Hで、（イ）（ロ）は作業Bと作業Fです。",
  },
  {
    exam: "doboku-2kyu", year: "R7", section: "前期", id: "doboku-2kyu-R7-1j-16", n: 16, category: "専門工事",
    question: "下図の土留め工の（イ）、（ロ）の部材名称に関する次の組合せのうち、適当なものはどれか。",
    options: ["（イ）切りばり（ロ）火打ち", "（イ）腹おこし（ロ）切りばり", "（イ）火打ち（ロ）腹おこし", "（イ）腹おこし（ロ）火打ち"],
    correct: 4,
    explanation: "正解は4。（イ）は土留め壁に沿って水平に設置され、土圧を受けて切りばりに伝える部材＝腹おこし（腹起し）です。（ロ）は隅角部に斜めに入れて変形を防ぐ補強材＝火打ち（火打ちばり）です。なお、対向する土留め壁の間を突っ張る水平材が切りばりです。",
  },
  {
    exam: "doboku-2kyu", year: "R7", section: "前期", id: "doboku-2kyu-R7-1j-50", n: 50, category: "専門工事",
    question: "下図は切土法面に設置した標準的なもたれ式擁壁の断面図を示しているが、もたれ式擁壁各部の名称と記号の表記として次のうち、2つとも適当なものはどれか。",
    options: ["擁壁高 H1、つま先版 B2", "擁壁高 H2、底版かかと B1", "擁壁高 H1、底版かかと B2", "擁壁高 H2、つま先版 B1"],
    correct: 3,
    explanation: "正解は3。擁壁高は擁壁全体の高さを指すのでH1（基礎底面から天端までの全高）が正しく、部分的なH2ではありません。B2は底版の背面側（山側）の張出し＝底版かかと（かかと版）です。B1は前面側の張出し＝つま先版です。",
  },
  {
    exam: "doboku-2kyu", year: "R7", section: "前期", id: "doboku-2kyu-R7-1j-62", n: 62, category: "工程管理",
    question: "下図のネットワーク式工程表に関する下記の文章中の（イ）〜（ニ）に当てはまる語句の組合せとして、正しいものは次のうちどれか。ただし、図中のイベント間のA〜Hは作業内容、数字は作業日数を表す。\n・（イ）及び（ロ）は、クリティカルパス上の作業である。\n・作業Fの最早開始時刻は、（ハ）である。\n・この工程全体の工期は、（ニ）である。",
    options: ["（イ）作業B（ロ）作業E（ハ）8日（ニ）16日間", "（イ）作業C（ロ）作業F（ハ）7日（ニ）15日間", "（イ）作業B（ロ）作業E（ハ）7日（ニ）16日間", "（イ）作業C（ロ）作業F（ハ）8日（ニ）15日間"],
    correct: 1,
    explanation: "正解は1。作業Fの最早開始時刻（＝イベント④の最早時刻）は、A→B→(ダミー)＝3+5＝8日で、C経由の3+4＝7日より遅い8日。工期は最長経路A→B→E→H＝3+5+5+3＝16日間（下のD→G経由は3+5+6＝14日で短い）。クリティカルパス上の作業（イ）（ロ）は作業Bと作業Eです。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[q.exam][q.year][q.section];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.id); continue; }
  const item = {
    id: q.id, exam: q.exam, category: q.category,
    question: q.question, options: q.options,
    correctIndex: q.correct - 1, explanation: q.explanation,
    originalNumber: q.n, imageUrl: `/images/quiz/doboku-2kyu/${q.id}.png`,
  };
  let idx = sec.findIndex((x) => x.originalNumber > q.n);
  if (idx === -1) idx = sec.length;
  sec.splice(idx, 0, item);
  added++;
  console.log("追加:", q.id, "正解", q.correct);
}
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
let total = 0;
for (const ex of Object.keys(data)) for (const y of Object.keys(data[ex])) for (const s of Object.keys(data[ex][y])) total += data[ex][y][s].length;
console.log(`完了: ${added}問追加 / 総 ${total}問`);
