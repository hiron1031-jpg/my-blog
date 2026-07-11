/**
 * 図問題の画像付きクイズ：2級造園 第1バッチ＝R8前期 5問（No.13,19,20,21,27）。
 * 図は public/images/quiz/zouen-2kyu/zouen-2kyu-R8-前期-{n}.png に切り抜き済み。
 * 正解は解答PDF原本から抽出。ネットワークは自力検算で一致。選択肢が図の問題は「（n）」形式。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "zouen-2kyu", YR = "R8", SEC = "前期";

const Q = [
  {
    n: 13, category: "造園施工",
    question: "下図に示す張芝方法の名称として、適当なものはどれか。",
    options: ["互の目張り", "目地張り", "市松張り", "筋張り"],
    correct: 2,
    explanation: "正解は2。図は芝を方形に切り、目地（すき間）を空けながら全面に張る方法で「目地張り」です。互の目張りは目地を互い違いにずらす張り方、市松張りは芝と地面を市松（チェック）状に交互に張る方法、筋張りは芝を帯状（筋状）に張る方法です。",
  },
  {
    n: 19, category: "造園施工",
    question: "下図に示す練積みによるブロック積擁壁の（A）、（B）の名称の組合せとして、適当なものはどれか。",
    options: ["（A）胴込め材（B）均しコンクリート", "（A）胴込め材（B）基礎コンクリート", "（A）裏込め材（B）均しコンクリート", "（A）裏込め材（B）基礎コンクリート"],
    correct: 4,
    explanation: "正解は4。（A）はブロックの背面に入れる栗石・砕石等の材料＝裏込め材、（B）は擁壁の底部を支える基礎コンクリートです。胴込め材はブロック間に充填する材料、均しコンクリートは基礎の下に敷く薄い均し層で、いずれもここでは該当しません。",
  },
  {
    n: 20, category: "造園施工",
    question: "屋根の「形状」とその「名称」の組合せとして、適当でないものはどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 1,
    explanation: "正解は1（適当でない）。（1）の図は4方向に傾斜して妻（三角形の壁面）がない「寄棟屋根」で、入母屋屋根ではありません。入母屋屋根は上部が切妻、下部が寄棟状になった屋根です。（2）方形屋根（ピラミッド状）、（3）越屋根（屋根上に小屋根）、（4）切妻屋根（2方向の傾斜）はいずれも正しい組合せです。",
  },
  {
    n: 21, category: "造園施工",
    question: "電気設備設計図に用いられる一般的な「記号」とその「名称」の組合せとして、適当でないものはどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 1,
    explanation: "正解は1（適当でない）。（1）の記号は「接地（アース）」を表す記号で、受電点ではありません。（2）スピーカ、（3）埋設標（地中線・コンクリート製）、（4）屋外灯の記号と名称は正しい組合せです。",
  },
  {
    n: 27, category: "法規・管理",
    question: "下図に示すネットワーク式工程表で表される工事において、Cの作業日数を短縮して6日にした場合、全体工期は何日短縮されるか。ただし、図中のイベント間のA〜Eは作業内容を、日数は作業日数を表す。",
    options: ["0日", "1日", "2日", "3日"],
    correct: 2,
    explanation: "正解は2。当初の工期はクリティカルパスA→C→E＝5+8+9＝22日です。Cを6日にするとA→C→E＝5+6+9＝20日となりますが、A→B→（ダミー）→E＝5+7+9＝21日が新たな最長経路となります。よって工期は22日→21日となり、短縮されるのは1日だけです。",
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
