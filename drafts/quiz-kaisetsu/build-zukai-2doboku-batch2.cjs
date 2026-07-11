/**
 * 図問題の画像付きクイズ 第2バッチ：2級土木 R7後期の6問。
 * 図は public/images/quiz/doboku-2kyu/doboku-2kyu-R7-2j-{n}.png に切り抜き済み。
 * 正解は解答PDF（種別:土木）原本から抽出、計算・ネットワークは自力検算で一致確認済み。
 * No.3は選択肢が図のため、図(1)〜(4)を1枚に含め、選択肢は「図（n）」とする。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "doboku-2kyu", YR = "R7", SEC = "後期";

const Q = [
  {
    n: 3, id: "doboku-2kyu-R7-2j-3", category: "構造力学",
    question: "下図の単純梁に集中荷重Pが作用した場合の曲げモーメント図として、適当なものは下の図（1）〜（4）のうちどれか。ただし、梁の自重は考慮しないものとする。",
    options: ["図（1）", "図（2）", "図（3）", "図（4）"],
    correct: 4,
    explanation: "正解は4。単純梁の中央に集中荷重Pが作用したときの曲げモーメント図は、中央で最大値PL/4となる三角形になります。荷重が下向きで梁の下縁が引張となるため、モーメント図は軸線の下側に頂点をもつ三角形＝（4）です。（1）の段違いの長方形、（2）の正負が入れ替わる形、（3）の上向き三角形はいずれも誤りです。",
  },
  {
    n: 4, id: "doboku-2kyu-R7-2j-4", category: "構造力学",
    question: "下図において、点Oの周りに矢印の向きで力P1、P2が作用する場合において、点Oに対する力のモーメント（Mo）は次の値のうち、正しいものはどれか。ただし、各力のモーメントの符号は、点Oを中心として時計まわりを正、反時計まわりを負とする。",
    options: ["Mo＝45 [kN・m]", "Mo＝25 [kN・m]", "Mo＝10 [kN・m]", "Mo＝5 [kN・m]"],
    correct: 4,
    explanation: "正解は4。モーメント＝力×距離で計算します。P1（5kN、上向き、Oの左5m）は反時計まわりなので −5×5＝−25kN・m。P2（10kN、上向き、Oの右2m）は時計まわりなので ＋10×2＝＋20kN・m。合計は −25＋20＝−5kN・m。大きさは5kN・mなので（4）が正解です。",
  },
  {
    n: 5, id: "doboku-2kyu-R7-2j-5", category: "水理学",
    question: "下図の定常流の流れの管を通過する水の流速v1＝2.0m/sであるとき、v2は次のうち、適当なものはどれか。ただし、断面の拡大に伴うエネルギーの損失は考慮しないものとする。",
    options: ["0.16 m/s", "0.32 m/s", "0.40 m/s", "0.80 m/s"],
    correct: 2,
    explanation: "正解は2。連続の式（A1×v1＝A2×v2）で求めます。管の断面積は直径の2乗に比例するので、面積比は（20÷50)²＝0.16。したがってv2＝v1×(A1÷A2)＝2.0×0.16＝0.32m/sで（2）が正解です。",
  },
  {
    n: 36, id: "doboku-2kyu-R7-2j-36", category: "専門工事",
    question: "下水道の剛性管渠を施工する際の下図の「基礎地盤の土質区分」と「基礎の種類」の組合せとして、適当なものはどれか。\n（イ）硬質土（硬質粘土、礫混じり土及び礫混じり砂）\n（ロ）極軟弱土（非常に緩いシルト及び有機質土）",
    options: ["（イ）鉄筋コンクリート基礎（ロ）砂基礎", "（イ）はしご胴木基礎（ロ）鉄筋コンクリート基礎", "（イ）はしご胴木基礎（ロ）砂基礎", "（イ）砂基礎（ロ）鉄筋コンクリート基礎"],
    correct: 4,
    explanation: "正解は4。支持力の大きい硬質土（イ）では、簡易な砂基礎で十分です。一方、非常に緩く支持力の小さい極軟弱土（ロ）では、荷重を分散させて沈下を防ぐため剛性の高い鉄筋コンクリート基礎が必要です。よって（イ）砂基礎・（ロ）鉄筋コンクリート基礎の（4）が正解。はしご胴木基礎は両者の中間的な軟弱地盤に用います。",
  },
  {
    n: 50, id: "doboku-2kyu-R7-2j-50", category: "専門工事",
    question: "下図は鋼道路橋の一般的な構造を示しているが、（イ）〜（ニ）の橋の部材の名称に関する組合せとして次のうち、適当なものはどれか。",
    options: ["（イ）対傾構（ロ）支承（ハ）主桁（ニ）横桁", "（イ）補剛材（ロ）支承（ハ）主桁（ニ）横桁", "（イ）横桁（ロ）伸縮装置（ハ）対傾構（ニ）主桁", "（イ）対傾構（ロ）伸縮装置（ハ）補剛材（ニ）横桁"],
    correct: 1,
    explanation: "正解は1。（イ）は主桁どうしを横方向につなぎ橋の傾きや変形を防ぐ骨組＝対傾構。（ロ）は桁と橋脚の間で荷重を伝える支持部＝支承。（ハ）は橋を主に支える縦方向の桁＝主桁。（ニ）は主桁の間を横方向につなぐ桁＝横桁。よって（1）が正解です。",
  },
  {
    n: 62, id: "doboku-2kyu-R7-2j-62", category: "工程管理",
    question: "下図のネットワーク式工程表に関する下記の文章中の（イ）〜（ニ）に当てはまる語句の組合せとして、正しいものは次のうちどれか。ただし、図中のイベント間のA〜Hは作業内容、数字は作業日数を表す。\n・（イ）及び（ロ）は、クリティカルパス上の作業である。\n・作業Fの最早開始時刻は、（ハ）である。\n・この工程全体の工期は、（ニ）である。",
    options: ["（イ）作業C（ロ）作業F（ハ）10日（ニ）22日間", "（イ）作業C（ロ）作業F（ハ）11日（ニ）22日間", "（イ）作業B（ロ）作業E（ハ）11日（ニ）21日間", "（イ）作業B（ロ）作業E（ハ）10日（ニ）21日間"],
    correct: 2,
    explanation: "正解は2。作業Fの最早開始時刻（イベント④の最早時刻）は、A→C＝5+6＝11日で、A→B→ダミー＝5+5＝10日より遅い11日。工期は最長経路A→C→F→H＝5+6+7+4＝22日間（下のD→G経由＝5+7+8＝20日より長い）。クリティカルパス上の作業（イ）（ロ）は作業Cと作業Fです。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][YR][SEC];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.id); continue; }
  const item = {
    id: q.id, exam: EX, category: q.category,
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
