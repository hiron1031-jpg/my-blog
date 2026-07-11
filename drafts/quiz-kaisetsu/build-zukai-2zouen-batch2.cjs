/**
 * 図問題の画像付きクイズ：2級造園 第2バッチ＝R7後期 8問。
 * 図は public/images/quiz/zouen-2kyu/zouen-2kyu-R7-後期-{n}.png に切り抜き済み。
 * 正解は解答PDF原本から抽出。ネットワークは自力検算で一致。
 */
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "../../src/data/quiz/year-questions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const EX = "zouen-2kyu", YR = "R7", SEC = "後期";

const Q = [
  {
    n: 9, category: "造園材料",
    question: "下図に示す、庭石を正面から見たときの（A）の名称として、適当なものはどれか。",
    options: ["鼻", "とも面", "見付き", "見込み"],
    correct: 3,
    explanation: "正解は3。庭石を正面（見る方向）から見たときに正面に見える面を「見付き（みつき）」といいます。「見込み」は奥行き方向の側面、「鼻」は石の突き出た部分を指します。",
  },
  {
    n: 16, category: "造園施工",
    question: "日本庭園における滝石組の役石を示した図のうち、「水落石」を示す番号として適当なものはどれか。",
    options: ["①", "②", "③", "④"],
    correct: 1,
    explanation: "正解は1。滝石組において水が流れ落ちる中心の石を「水落石（みずおちいし）」といいます。正面から見た図で、水が落ちている中央上部の石＝①が水落石です。",
  },
  {
    n: 17, category: "造園施工",
    question: "法面勾配8分を示した図として、正しいものはどれか。（下の図（1）〜（4）から選ぶ）",
    options: ["（1）", "（2）", "（3）", "（4）"],
    correct: 4,
    explanation: "正解は4。法面勾配「8分」は、鉛直方向1に対して水平方向0.8（1：0.8）の勾配を表します。よって、垂直（高さ）1.0・水平（幅）0.8で示された（4）が正しい図です。（1）（3）は斜辺が1.0、（2）は垂直0.8・水平1.0で、いずれも1：0.8を正しく表していません。",
  },
  {
    n: 20, category: "造園施工",
    question: "下図に示す木造建築物の和小屋組及び床組の（A）〜（D）の部材のうち、根太はどれか。",
    options: ["（A）", "（B）", "（C）", "（D）"],
    correct: 3,
    explanation: "正解は3。根太は、床板を直接支えるために大引の上に一定間隔で渡す小さな横木です。図の床組にある（C）がこの根太に当たります。（A）（B）は小屋組（屋根）の部材、（D）は根太を支える大引です。",
  },
  {
    n: 22, category: "造園施工",
    question: "下図に示す給水装置（A）、（B）の名称の組合せとして、適当なものはどれか。",
    options: ["（A）給水栓（B）散水栓", "（A）給水栓（B）止水栓", "（A）分水栓（B）散水栓", "（A）分水栓（B）止水栓"],
    correct: 4,
    explanation: "正解は4。（A）は配水管から給水管を分岐させるために取り付ける「分水栓」です。（B）は敷地の境界付近（水道メーターの手前）に設けて給水を止めるための「止水栓」です。給水栓は蛇口、散水栓は屋外の水やり用の栓で、ここでは該当しません。",
  },
  {
    n: 24, category: "法規・管理",
    question: "下図に示す施工管理の一般的な手順を示したデミング・サークルにおいて、（A）で行う作業内容の解説として、適当なものはどれか。",
    options: ["調査記録したデータを計画と比較して検討する。", "実施と計画のずれを確認し、適切な是正措置をとる。", "施工状態に関するデータを調査記録する。", "施工内容に関わる事前調査を行う。"],
    correct: 1,
    explanation: "正解は1。デミング・サークル（PDCA）は「計画→実施→検討（確認）→処置」の順で回します。（A）は実施（Do）の次の段階＝検討（Check）にあたり、「調査記録したデータを計画と比較して検討する」作業を行います。（2）は処置（Act）、（3）は実施中の記録、（4）は計画（Plan）の段階です。",
  },
  {
    n: 27, category: "法規・管理",
    question: "下図に示すネットワーク式工程表で表される工事におけるクリティカルパスの所要日数として、正しいものはどれか。ただし、図中のイベント間のA〜Hは作業内容を、日数は作業日数を表す。",
    options: ["8日", "9日", "10日", "11日"],
    correct: 3,
    explanation: "正解は3。各経路の所要日数を計算すると、①→③→（ダミー）→④→⑤→⑦（B→E→H＝5+2+3＝10日）が最長です。よってクリティカルパスの所要日数は10日です。",
  },
  {
    n: 28, category: "法規・管理",
    question: "下図に示すヒストグラムから読み取り、判断した記述として、適当なものはどれか。",
    options: ["山が2つあるが、分布が規格値内におさまっており、良好である。", "上限規格値を外れるものがあり、平均値を小さいほうにずらす必要がある。", "規格値に対するゆとりもあり、また、平均値が規格値の幅の中央付近にあり、良好である。", "将来、少しの変動でも規格値を外れるものが出る可能性があり、注意が必要である。"],
    correct: 4,
    explanation: "正解は4。ヒストグラムを見ると、分布は規格値内におさまっていますが、山（分布の中心）が上限規格値側（右）に寄っており、上限側の余裕がほとんどありません。このため、将来わずかな変動が生じると上限規格値を外れるものが出るおそれがあり、注意が必要です。（2）現状で規格値を外れるものはなく、（3）平均値は中央になく上限側に寄っているため、いずれも誤りです。",
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
