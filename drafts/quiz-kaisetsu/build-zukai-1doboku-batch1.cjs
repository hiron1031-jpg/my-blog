/**
 * 図問題の画像付きクイズ：1級土木 第1バッチ＝R8 1次B の3問（No.3,6,7）。
 * 図は public/images/quiz/doboku-1kyu/doboku-1kyu-R8-1jB-{n}.png に切り抜き済み。
 * 正解は解答PDF(問題B)原本から抽出。配筋図・ネットワーク・施工体制図は自力で構造/経路を検証。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "doboku-1kyu", YR = "R8", SEC = "1次B";

const Q = [
  {
    n: 3, category: "コンクリート工",
    question: "下図は、逆T型擁壁の配筋図を示したものである。たて壁とかかと版の引張鉄筋の組合せとして、適当なものはどれか。",
    options: ["①と③", "①と④", "②と③", "②と④"],
    correct: 3,
    explanation: "正解は3（②と③）。たて壁は背面の土圧を受けて前方にたわむ片持ち梁で、背面側が引張となるため引張鉄筋は背面側の②D22。かかと版は上に載る土の重さで下向きに曲げられる片持ち版で、上面が引張となるため引張鉄筋は上面側の③D22。よって②と③の組合せが適当です。",
  },
  {
    n: 6, category: "工程管理",
    question: "下図のネットワーク式工程表に関する記述のうち、適当でないものはどれか。ただし、図中のイベント間のA〜Kは作業内容、数字は作業日数を示す。\n（1）クリティカルパスは、⓪→①→②→④→⑦→⑧→⑨である。\n（2）作業Iの最早開始時刻は、工事開始後18日である。\n（3）工事開始⓪から工事完了⑨までの必要日数（工期）は33日である。\n（4）作業Eが3日遅れると工期は当初工期より2日遅れる。",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 4,
    explanation: "正解は4（適当でない）。作業Eはクリティカルパス（⓪→①→②→④→⑦→⑧→⑨、いずれも所要33日）上の作業なので、3日遅れると工期もそのまま3日遅れて36日になります。「2日遅れる」は誤り。（1）はクリティカルパスの一つ、（2）作業Iの最早開始＝イベント⑦の18日、（3）工期33日はいずれも正しい記述です。",
  },
  {
    n: 7, category: "安全管理",
    question: "下図に示す施工体制の現場において、A社がB社に組み立てさせた作業足場でB社、C社、D社、F社、G社が作業を行い、E社はC社が持ち込んだ移動式足場でも作業を行うこととなった。労働安全衛生法令上、特定事業の仕事を行う注文者として積載荷重の表示、点検等の安全措置義務に関する記述のうち、正しいものはどれか。",
    options: [
      "A社は、作業足場について、B社、C社、D社の労働者に対し注文者としての安全措置義務を負う。",
      "A社は、C社が持ち込んだ移動式足場について、E社の労働者に対し注文者としての安全措置義務を負わない。",
      "C社は、移動式足場について、E社の労働者に対し注文者としての安全措置義務を負わない。",
      "A社は、作業足場について、F社、G社の労働者に対し注文者としての安全措置義務を負う。",
    ],
    correct: 1,
    explanation: "正解は1。注文者の安全措置義務は、足場等を提供した注文者が、それを使用する下請の労働者に対して負います。A社は作業足場を組み立てて提供し、同じ請負系統下のB社・C社・D社がこれを使用するため、A社はこれらの労働者に対して義務を負います。（4）のF社・G社はA社と請負関係がない別系統なので対象外、（3）の移動式足場はC社が持ち込んだものなのでC社が義務を負う（負わないは誤り）です。",
  },
];

let added = 0;
for (const q of Q) {
  const sec = data[EX][YR][SEC];
  if (sec.some((x) => x.originalNumber === q.n)) { console.log("既存スキップ:", q.n); continue; }
  const id = `${EX}-${YR}-1jB-${q.n}`;
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
