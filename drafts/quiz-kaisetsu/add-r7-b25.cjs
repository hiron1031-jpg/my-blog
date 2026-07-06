// R7 1次B No.25（データ欠落分）を追加するスクリプト
// 正解は R7_kaitou.pdf で確認済み（No.25 = 4）
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "..", "src", "data", "quiz", "year-questions.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

const list = data["doboku-1kyu"]["R7"]["1次B"];
if (list.some((q) => q.id === "doboku-1kyu-R7-1jB-25")) {
  console.log("No.25 は既に存在します。スキップ。");
  process.exit(0);
}

const q25 = {
  id: "doboku-1kyu-R7-1jB-25",
  exam: "doboku-1kyu",
  category: "工程管理",
  question:
    "ネットワーク式工程表作成上の留意点と特徴に関する下記の①〜④の記述のうち，適当なものの数は次のうちどれか。　①工事を独立した作業（アクティビティ）に分類し，これら各作業を施工順序に従って矢線（アロー）の形で，左から右に向けて結び，工事全体を網状の矢線図（ネットワーク）で表す。　②作業と作業の結合点及びその作業の開始，終了を示すものとしてマル（〇）をつけイベントと呼び，〇の中には正整数を記入し，これをイベント番号という。　③ネットワーク手法には，日程，配員，費用の計画を行うPERT系と，時間を費用との関連で捉えて工期短縮と費用の増加の関係を見ながら，最適な工期と費用を設定するCPMがある。　④ダミーとは所要時間を持たない擬似作業で，アクティビティ相互の関係を示すために使われるものである。",
  options: ["1つ", "2つ", "3つ", "4つ"],
  correctIndex: 3,
  explanation:
    "正解は4（4つとも適当）。①の矢線図（ネットワーク）の描き方、②のイベント（結合点）とイベント番号、③のPERTとCPMの説明、④のダミー（所要時間を持たない擬似作業）の説明は、いずれもネットワーク式工程表の基本として正しい記述です。",
  originalNumber: 25,
};

const idx = list.findIndex((q) => q.originalNumber === 26);
list.splice(idx === -1 ? list.length : idx, 0, q25);
fs.writeFileSync(DATA, JSON.stringify(data, null, 2), "utf8");
console.log("R7 1次B No.25 を追加しました。現在の1次B問題数:", list.length);
