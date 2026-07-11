/**
 * 図問題の画像付きクイズ：1級造園 第1バッチ＝1次A の6問（R5/R6/R7 の No.26,32）。
 * 図は public/images/quiz/zouen-1kyu/{id}.png に切り抜き済み。
 * 正解は解答PDF原本から抽出。工程・原価・品質の図は関係(U字/増加/減少)で検証。
 * ※ID表記：R5/R6は「-1次A-」、R7は「-1jA-」（既存の年度別慣習に合わせる）。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "zouen-1kyu";

const Q = [
  {
    yr: "R7", sec: "1次A", id: "zouen-1kyu-R7-1jA-26", n: 26, category: "造園施工",
    question: "木材の接合に関する次の記述の（A）〜（C）に当てはまる語句の組合せとして、適当なものはどれか。\n「2つの部材を長手方向につぐ接合を（A）といい、2つ以上の部材を角度をもたせて接合したものを（B）という。下図は、（B）の基本形の一つで（C）という。」",
    options: ["（A）継手（B）仕口（C）留め", "（A）継手（B）仕口（C）相欠き", "（A）仕口（B）継手（C）留め", "（A）仕口（B）継手（C）相欠き"],
    correct: 1,
    explanation: "正解は1。2つの部材を長手方向につなぐ接合を「継手」（A）、2つ以上の部材を角度をもたせて接合したものを「仕口」（B）といいます。図は仕口の基本形の一つで、部材の端部を45°に切って直角に接合する「留め」（C）です。相欠きは部材を半分ずつ欠き取って重ねる接合です。",
  },
  {
    yr: "R7", sec: "1次A", id: "zouen-1kyu-R7-1jA-32", n: 32, category: "法規・管理",
    question: "工程、原価、品質の一般的な関係を示した図のうち、適当なものはどれか。（下の図（1）〜（4）から選ぶ。X軸＝工程→はやい、Y軸＝原価高い↑、Z軸＝品質良い←）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 2,
    explanation: "正解は2。工程・原価・品質の一般的な関係は、①工程と原価＝施工を速めると原価は下がるが速すぎるとかえって上がる（原価が最小となる経済速度がある）ため下に凸の曲線、②工程と品質＝施工を速めると品質は低下する、③品質と原価＝品質を高めると原価は増加する、という関係です。これらを正しく表しているのは（2）です。",
  },
  {
    yr: "R6", sec: "1次A", id: "zouen-1kyu-R6-1次A-26", n: 26, category: "造園施工",
    question: "下図に示す木造建築物の和小屋組及び床組の（A）〜（C）の部材の名称の組合せとして、適当なものはどれか。",
    options: ["（A）小屋梁（B）垂木（C）根太", "（A）小屋梁（B）棟木（C）大引", "（A）小屋束（B）垂木（C）大引", "（A）小屋束（B）棟木（C）根太"],
    correct: 2,
    explanation: "正解は2。（A）は小屋組の底部で柱に架け渡す横架材＝小屋梁、（B）は屋根の最上部の棟に渡す横木＝棟木、（C）は床組で根太を支える太い横木＝大引です。垂木は棟木から軒へ渡す斜材、小屋束は小屋梁の上に立てる短い柱、根太は大引の上に渡す小さな横木です。",
  },
  {
    yr: "R6", sec: "1次A", id: "zouen-1kyu-R6-1次A-32", n: 32, category: "法規・管理",
    question: "原価、工程、品質の一般的な関係を表した下図の「X軸」「Y軸」「Z軸」を示す名称の組合せとして、適当なものはどれか。ただし、矢印の方向は、原価については高い、工程については早い、品質については良いを表している。",
    options: ["（X軸）工程（Y軸）品質（Z軸）原価", "（X軸）原価（Y軸）品質（Z軸）工程", "（X軸）品質（Y軸）工程（Z軸）原価", "（X軸）品質（Y軸）原価（Z軸）工程"],
    correct: 4,
    explanation: "正解は4。①Y-Zの図（U字型）は「工程を速めると原価は下がるが速すぎると上がる」関係＝Y原価・Z工程、②Y-Xの図（増加）は「品質を高めると原価が増える」関係＝X品質、③X-Zの図（減少）は「工程を速めると品質が下がる」関係、と整合します。よってX軸＝品質、Y軸＝原価、Z軸＝工程の（4）が適当です。",
  },
  {
    yr: "R5", sec: "1次A", id: "zouen-1kyu-R5-1次A-26", n: 26, category: "造園施工",
    question: "建築物を下図に示す（A）、（B）の2方向から見た場合の「屋根の形状（模式図）」と、その「形式」を表す語句の組合せとして、適当なものはどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 1,
    explanation: "正解は1。寄棟屋根は4方向に傾斜する屋根で、（A）（B）どちらの方向から見ても妻側に下がり棟（傾斜）が見えます。（1）の2方向の見え方が寄棟屋根に一致します。（2）方形屋根、（3）陸屋根、（4）越屋根は、いずれも図の見え方と一致しません。",
  },
  {
    yr: "R5", sec: "1次A", id: "zouen-1kyu-R5-1次A-32", n: 32, category: "法規・管理",
    question: "工程、原価、品質の一般的な関係を示した図の組合せとして、適当なものはどれか。（下の図（1）〜（4）から選ぶ。各組は 原価-工程／工程-品質／原価-品質 の3図）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 1,
    explanation: "正解は1。①原価と工程＝施工を早めると原価は下がるが早すぎるとかえって上がるため、原価が最小となる下に凸（U字）の曲線。②工程と品質＝品質を高めるほど施工速度は落ちるため右下がりの曲線。③原価と品質＝品質を高めるほど原価は増加するため右上がりの曲線。これらを正しく表しているのは（1）です。（3）（4）は原価と工程の関係が上に凸（逆U字）で誤りです。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][q.yr][q.sec];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.yr, q.n); continue; }
  const item = {
    id: q.id, exam: EX, category: q.category,
    question: q.question, options: q.options,
    correctIndex: q.correct - 1, explanation: q.explanation,
    originalNumber: q.n, imageUrl: `/images/quiz/zouen-1kyu/${q.id}.png`,
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
