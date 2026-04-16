import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const EYE = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/アイキャッチ画像";
const ART = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/記事内画像";
const OUT = path.join(ROOT, 'public/images/posts');

const W = 1280, H = 720;

// cover-crop: fill 1280x720 without distortion (center crop)
async function coverCrop(src, dst) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

// Extract one panel from a grid image then cover-crop to 1280x720
async function panelCrop(src, dst, col, row, totalCols, totalRows) {
  const meta = await sharp(src).metadata();
  const pw = Math.floor(meta.width / totalCols);
  const ph = Math.floor(meta.height / totalRows);
  await sharp(src)
    .extract({ left: col * pw, top: row * ph, width: pw, height: ph })
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

// PNG → keep as PNG
async function coverCropPng(src, dst) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

const tasks = [
  // --- 土木施工管理技士 ---
  () => coverCrop(
    `${EYE}/勉強法ガイドとビーバー先生.png`,
    `${OUT}/doboku-1kyu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/土木試験対策イラスト.png`,
    `${OUT}/hinshutu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/2級土木施工管理技士の勉強法.png`,
    `${OUT}/doboku-2kyu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,
    `${OUT}/doboku-goukakuritsu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/土木施工管理技士の書き方ガイド.png`,
    `${OUT}/doboku-keiken-kijutsu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,
    `${OUT}/doboku-sankosho-hero.jpg`
  ),

  // --- 造園施工管理技士 ---
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_34_51.png`,
    `${OUT}/zouen-1kyu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_34_07.png`,
    `${OUT}/zouen-2kyu-hero.jpg`
  ),
  // zouen-goukakuritsu: IMG_1011上段左パネル (2x3グリッド, col=0, row=0)
  () => panelCrop(
    `${ART}/IMG_1011.PNG`,
    `${OUT}/zouen-goukakuritsu-hero.jpg`,
    0, 0, 3, 2
  ),
  () => coverCrop(
    `${EYE}/土木施工管理技士の書き方ガイド.png`,
    `${OUT}/zouen-keiken-kijutsu-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,
    `${OUT}/zouen-sankosho-hero.jpg`
  ),

  // --- 共通・ハブページ ---
  // keiken-kijutsu-kakikata: Gemini 5ステップ画像
  () => coverCrop(
    `${ART}/Gemini_Generated_Image_rjy526rjy526rjy5.png`,
    `${OUT}/keiken-kijutsu-kakikata-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,
    `${OUT}/sankosho-hikaku-hero.jpg`
  ),
  () => coverCrop(
    `${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,
    `${OUT}/sekoukanri-goukakuritsu-hero.jpg`
  ),
  // goukaku-career: Gemini 建設現場ビーバー（成功ムード）
  () => coverCrop(
    `${ART}/Gemini_Generated_Image_djmuiidjmuiidjmu.png`,
    `${OUT}/goukaku-career-hero.jpg`
  ),
];

console.log(`Processing ${tasks.length} images → ${OUT}\n`);
for (const task of tasks) {
  await task();
}
console.log('\n🎉 All done!');
