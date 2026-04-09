/**
 * ビーバーパネル画像を切り出して記事サムネイルとして保存するスクリプト
 *
 * ── 実測によるパネル内イラスト座標 ────────────────────────────
 *
 * IMG_0999.PNG (1380×752, 2列×2行)
 *   外枠マージン: 左54px / 右17px / 上35px / 下10px
 *   列間ガター: ~30px (sat低下域 x=692〜724)
 *   行間ガター:   8px (y=385〜393)
 *   各パネルイラスト: 約630×344px
 *
 * IMG_1003.PNG (1380×752, 3列×2行)
 *   外枠マージン: 左55px / 右19px / 上34px / 下10px
 *   列間ガター(A-B): ~10px (x=942〜954)
 *   列間ガター(B-C): col2実コンテンツ開始 x=954
 *   行間ガター: 3px (y=380〜383)
 *   各パネルイラスト: col0=426px幅 / col1=455px幅 / col2=407px幅
 *
 *   ★コーナーラベル（AI生成による埋め込み）
 *     A: 左上  B: 右下  C: 右上
 *     D: 右下  E: 左下  F: 右下
 *   → 使用パネル(B/D/F)は右・下を多めにトリムしてラベルを除外
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像";
const OUT = join(ROOT, "public/images/posts");

const IMG0999 = join(SRC, "IMG_0999.PNG");
const IMG1003 = join(SRC, "IMG_1003.PNG");

// ─── IMG_0999 実測座標（枠除外済み） ────────────────────────
// 枠の装飾コーナーを除外するため左57・上37でカット
const P99 = {
  c0: { left: 57,  width: 630 },   // col0: x=57〜687
  c1: { left: 727, width: 630 },   // col1: x=727〜1357
  r0: { top:  37, height: 344 },   // row0: y=37〜381
  r1: { top: 395, height: 344 },   // row1: y=395〜739
};

// ─── IMG_1003 実測座標（枠除外 + コーナーラベル除外） ────────
// col2は実コンテンツ開始が x=954（以前の x=931 は枠を含んでいた）
// B/D/F ラベルは右下20×20px → 右・下をそれぞれ40px多くトリム
const P03 = {
  // パネルB (col1/row0) - ダンプトラック
  // ラベルBは右下(x=912-942, y=345-375) → 右40px下10pxをトリム
  panelB: { left: 500, top: 40, width: 402, height: 332 },
  //         500+402=902 (ラベル x>912 を除外), 40+332=372

  // パネルC (col2/row0) - ダム・水門
  // 実コンテンツ x=954〜1361 / ラベルCは右上 → 左10px右20pxをトリム
  panelC: { left: 964, top: 44, width: 377, height: 332 },
  //         964+377=1341 (右ラベル除外), 44+332=376

  // パネルD (col0/row1) - ドローン
  // 実コンテンツ x=55〜481, y=383〜748 / ラベルDは右下 → 右45px下35pxトリム
  panelD: { left: 65, top: 393, width: 371, height: 320 },
  //         65+371=436 (右ラベル x>450 を除外), 393+320=713

  // パネルF (col2/row1) - 2匹プレゼン
  // 実コンテンツ x=954〜1361, y=383〜748 / ラベルFは右下 → 左10px右35px下35pxトリム
  panelF: { left: 964, top: 393, width: 362, height: 320 },
  //         964+362=1326 (右ラベル除外), 393+320=713
};

// ─── 切り出し定義 ────────────────────────────────────────────
const crops = [
  // 1級土木 勉強法 → IMG_0999 col0/row0 (スコップ夕焼け)
  {
    src: IMG0999, out: join(OUT, "doboku-1kyu-hero.jpg"),
    ...P99.c0, ...P99.r0,
    label: "1級土木 (スコップ夕焼け)", pos: "centre",
  },
  // 2級土木 勉強法 → IMG_0999 col1/row0 (ショベル重機)
  {
    src: IMG0999, out: join(OUT, "doboku-2kyu-hero.jpg"),
    ...P99.c1, ...P99.r0,
    label: "2級土木 (ショベル重機)", pos: "centre",
  },
  // 経験記述 → IMG_0999 col0/row1 (PCデスク)
  {
    src: IMG0999, out: join(OUT, "keiken-kijutsu-hero.jpg"),
    ...P99.c0, ...P99.r1,
    label: "経験記述 (PCデスク)", pos: "centre",
  },
  // 1級土木 頻出分野 → IMG_1003 パネルB (ダンプトラック)
  {
    src: IMG1003, out: join(OUT, "hinshutu-hero.jpg"),
    ...P03.panelB,
    label: "1級土木 頻出 (ダンプトラック)", pos: "entropy",
  },
  // 1級造園 勉強法 → IMG_1003 パネルC (ダム・水門)
  {
    src: IMG1003, out: join(OUT, "zouen-1kyu-hero.jpg"),
    ...P03.panelC,
    label: "1級造園 (ダム・水門)", pos: "entropy",
  },
  // 2級造園 勉強法 → IMG_1003 パネルD (ドローン)
  {
    src: IMG1003, out: join(OUT, "zouen-2kyu-hero.jpg"),
    ...P03.panelD,
    label: "2級造園 (ドローン)", pos: "entropy",
  },
  // 合格率比較 → IMG_1003 パネルF (2匹プレゼン)
  {
    src: IMG1003, out: join(OUT, "goukakuritsu-hero.jpg"),
    ...P03.panelF,
    label: "合格率比較 (2匹プレゼン)", pos: "entropy",
  },
];

console.log("ビーバーサムネイル切り出し開始...\n");

for (const crop of crops) {
  try {
    const pipeline = sharp(crop.src).extract({
      left: crop.left, top: crop.top,
      width: crop.width, height: crop.height,
    });

    if (crop.pos === "entropy") {
      // entropy: 情報量最大の領域を16:9に自動選択（ビーバー中心を優先）
      pipeline.resize(800, 450, { fit: "cover", position: sharp.strategy.entropy });
    } else {
      pipeline.resize(800, 450, { fit: "cover", position: "centre" });
    }

    await pipeline.jpeg({ quality: 92 }).toFile(crop.out);
    console.log(`✓ ${crop.label}  [${crop.width}×${crop.height} → 800×450]`);
  } catch (err) {
    console.error(`✗ ${crop.label}: ${err.message}`);
  }
}

console.log("\n完了！");
