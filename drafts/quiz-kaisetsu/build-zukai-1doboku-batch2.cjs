/**
 * 図問題の画像付きクイズ：1級土木 第2バッチ＝R7 1次A No.25・1次B No.3,6。
 * 図は public/images/quiz/doboku-1kyu/doboku-1kyu-R7-1j{A|B}-{n}.png に切り抜き済み。
 * 正解は解答PDF原本から抽出。ネットワークは日数・ダミー向き(⑧→⑤)を拡大確認し自力検算で一致。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "doboku-1kyu", YR = "R7";

const Q = [
  {
    sec: "1次A", tag: "1jA", n: 25, category: "コンクリート工",
    question: "下図に示す（1）〜（4）のコンクリート構造物のひび割れのうち、コンクリートの沈下やブリーディングにより施工後の比較的早い時期に発生すると考えられるものは、下の図（1）〜（4）のうちどれか。",
    options: ["図（1）", "図（2）", "図（3）", "図（4）"],
    correct: 2,
    explanation: "正解は2。コンクリートの沈下・ブリーディングによるひび割れは、打込み後まもなく、コンクリートが沈下する際に上側の鉄筋などに拘束されて、鉄筋に沿って上面付近に発生します。（2）は上部の鉄筋に沿って水平方向にひび割れが生じており、これに該当します。（1）（3）（4）は乾燥収縮や温度応力、アルカリシリカ反応など別の原因によるひび割れの形態です。",
  },
  {
    sec: "1次B", tag: "1jB", n: 3, category: "コンクリート工",
    question: "下図は、逆T型擁壁の配筋図を示したものである。かかと版の引張鉄筋に該当する鉄筋番号は、次のうちどれか。",
    options: ["①D13", "②D22", "③D13", "④D22"],
    correct: 2,
    explanation: "正解は2。かかと版は上に載る土の重さで下向きに曲げられる片持ち版で、上面が引張となります。よって引張鉄筋は、かかと版の上面に配置された主鉄筋②D22です。①D13・③D13は径の小さい配力筋・底面側の鉄筋、④D22はたて壁の鉄筋です。",
  },
  {
    sec: "1次B", tag: "1jB", n: 6, category: "工程管理",
    question: "下図のネットワーク式工程表に関する次の記述のうち、適当でないものはどれか。ただし、図中のA〜Kは作業内容を、数字は作業日数を示す。\n（1）クリティカルパスは、⓪→①→⑥→⑦→⑧→⑤→⑨である。\n（2）作業Jの最早開始時刻は、工事開始後24日である。\n（3）工事開始⓪から工事完了⑨までの必要日数（工期）は29日である。\n（4）作業Dが3日遅れると工期は当初工期より1日遅れる。",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 3,
    explanation: "正解は3（適当でない）。工期は最長経路⓪→①→⑥→⑦→⑧→⑤→⑨（A→G→H→I→ダミー→J＝5+7+6+6+6＝30日）で30日です。「29日」は誤り。（1）はそのクリティカルパス、（2）作業J（⑤→⑨）の最早開始＝イベント⑤の24日、（4）作業Dを3日遅らせても工期は31日で1日遅れ、はいずれも正しい記述です。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][YR][q.sec];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.sec, q.n); continue; }
  const id = `${EX}-${YR}-${q.tag}-${q.n}`;
  const item = {
    id, exam: EX, category: q.category,
    question: q.question, options: q.options,
    correctIndex: q.correct - 1, explanation: q.explanation,
    originalNumber: q.n, imageUrl: `/images/quiz/doboku-1kyu/${id}.png`,
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
