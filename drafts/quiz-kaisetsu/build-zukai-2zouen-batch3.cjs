/**
 * 図問題の画像付きクイズ：2級造園 第3バッチ＝R7前期 3問（2級造園コンプリート）。
 * 図は public/images/quiz/zouen-2kyu/zouen-2kyu-R7-前期-{n}.png に切り抜き済み。
 * 正解は解答PDF原本から抽出。ネットワークは自力検算で一致。選択肢が図の問題は「（n）」形式。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "zouen-2kyu", YR = "R7", SEC = "前期";

const Q = [
  {
    n: 19, category: "造園施工",
    question: "擁壁の構造形式を示した図（模式図）のうち、控え壁式擁壁はどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 4,
    explanation: "正解は4。控え壁式擁壁は、擁壁の背面に一定間隔で控え壁（三角形のリブ）を設けて壁を補強する形式です。（4）が三角形の控え壁を持つ形状で、これに当たります。（1）は重力式、（2）はもたれ式、（3）はL型（片持ち式）擁壁です。",
  },
  {
    n: 20, category: "造園施工",
    question: "飛石の打ち方を示す図のうち、「千鳥がけ」はどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 3,
    explanation: "正解は3。千鳥がけは、飛石を中心線の左右に交互にジグザグ（チドリ＝千鳥の足跡状）に打つ打ち方で、図の（3）がこれに当たります。（1）は一直線に打つ直打ち、（2）は二石ずつまとめて打つ打ち方、（4）は斜めに連続させる雁掛けです。",
  },
  {
    n: 26, category: "法規・管理",
    question: "下図に示すネットワーク式工程表で表される工事におけるクリティカルパスの所要日数として、正しいものはどれか。ただし、図中のイベント間のA〜Hは作業内容を、日数は作業日数を表す。",
    options: ["10日", "12日", "13日", "14日"],
    correct: 4,
    explanation: "正解は4。各経路の所要日数を計算すると、①→②→③→（ダミー）→④→⑥→⑦（B→D→E→H＝2+4+6+2＝14日）が最長です。よってクリティカルパスの所要日数は14日です。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][YR][SEC];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.n); continue; }
  const id = `${EX}-${YR}-${SEC}-${q.n}`;
  const item = {
    id, exam: EX, category: q.category,
    question: q.question, options: q.options,
    correctIndex: q.correct - 1, explanation: q.explanation,
    originalNumber: q.n, imageUrl: `/images/quiz/zouen-2kyu/${id}.png`,
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
