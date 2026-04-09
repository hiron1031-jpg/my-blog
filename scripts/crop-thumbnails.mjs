/**
 * ビーバーパネル画像を切り出して記事サムネイルとして保存するスクリプト
 *
 * IMG_0999.PNG: 1380×752, 2列×2行
 *   panel1 (col0,row0): スコップ夕焼け
 *   panel2 (col1,row0): ショベル重機
 *   panel3 (col0,row1): PCデスク
 *   panel4 (col1,row1): 完成お祝い
 *
 * IMG_1003.PNG: 1380×752, 3列×2行
 *   A (col0,row0): 現場調査・夕焼け
 *   B (col1,row0): ダンプトラック
 *   C (col2,row0): ダム・水門
 *   D (col0,row1): ドローン
 *   E (col1,row1): 図面PC
 *   F (col2,row1): 2匹プレゼン
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像";
const OUT = join(ROOT, "public/images/posts");

// IMG_0999: 2列×2行 → 各パネル 690×376
const IMG0999 = join(SRC, "IMG_0999.PNG");
const W2 = 690, H2 = 376;

// IMG_1003: 3列×2行 → 各パネル 460×376
const IMG1003 = join(SRC, "IMG_1003.PNG");
const W3 = 460, H3 = 376;

const crops = [
  // 1級土木 勉強法 → IMG_0999 panel1 (スコップ夕焼け)
  {
    src: IMG0999,
    out: join(OUT, "doboku-1kyu-hero.jpg"),
    left: 0, top: 0, width: W2, height: H2,
    label: "1級土木 勉強法 (スコップ夕焼け)",
  },
  // 2級土木 勉強法 → IMG_0999 panel2 (ショベル重機)
  {
    src: IMG0999,
    out: join(OUT, "doboku-2kyu-hero.jpg"),
    left: W2, top: 0, width: W2, height: H2,
    label: "2級土木 勉強法 (ショベル重機)",
  },
  // 経験記述 → IMG_0999 panel3 (PCデスク)
  {
    src: IMG0999,
    out: join(OUT, "keiken-kijutsu-hero.jpg"),
    left: 0, top: H2, width: W2, height: H2,
    label: "経験記述 (PCデスク)",
  },
  // 1級土木 頻出分野 → IMG_1003 B (ダンプトラック)
  {
    src: IMG1003,
    out: join(OUT, "hinshutu-hero.jpg"),
    left: W3, top: 0, width: W3, height: H3,
    label: "1級土木 頻出分野 (ダンプトラック)",
  },
  // 1級造園 勉強法 → IMG_1003 C (ダム・水門)
  {
    src: IMG1003,
    out: join(OUT, "zouen-1kyu-hero.jpg"),
    left: W3 * 2, top: 0, width: W3, height: H3,
    label: "1級造園 勉強法 (ダム・水門)",
  },
  // 2級造園 勉強法 → IMG_1003 D (ドローン)
  {
    src: IMG1003,
    out: join(OUT, "zouen-2kyu-hero.jpg"),
    left: 0, top: H3, width: W3, height: H3,
    label: "2級造園 勉強法 (ドローン)",
  },
  // 合格率比較 → IMG_1003 F (2匹プレゼン)
  {
    src: IMG1003,
    out: join(OUT, "goukakuritsu-hero.jpg"),
    left: W3 * 2, top: H3, width: W3, height: H3,
    label: "合格率比較 (2匹プレゼン)",
  },
];

console.log("ビーバーサムネイル切り出し開始...\n");

for (const crop of crops) {
  try {
    await sharp(crop.src)
      .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
      .resize(800, 450, { fit: "cover", position: "centre" })
      .jpeg({ quality: 92 })
      .toFile(crop.out);
    console.log(`✓ ${crop.label}`);
    console.log(`  → ${crop.out.replace(ROOT, "")}`);
  } catch (err) {
    console.error(`✗ ${crop.label}: ${err.message}`);
  }
}

console.log("\n完了！");
