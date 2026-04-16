import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const EYE = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/アイキャッチ画像";
const ART = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/記事内画像";
const OUT = path.join(ROOT, 'public/images/posts');

const W = 1280, H = 720;

/**
 * バナー画像用（1536x1024 = 3:2）
 * クロップせず全体を収め、画像の枠色で余白を埋める。
 * → 1080x720 に縮小して左右 100px ずつ枠色で埋め 1280x720 に。
 */
async function containBanner(src, dst) {
  // 左上隅 1px をサンプリして枠色を取得
  const rawResult = await sharp(src)
    .extract({ left: 2, top: 2, width: 1, height: 1 })
    .flatten()
    .raw()
    .toBuffer();
  const bg = { r: rawResult[0], g: rawResult[1], b: rawResult[2] };

  // 全体を 1280x720 に収める（アスペクト比維持）
  const fitted = await sharp(src)
    .resize(W, H, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  const meta = await sharp(fitted).metadata();
  const padLeft  = Math.floor((W - meta.width)  / 2);
  const padRight = W - meta.width  - padLeft;
  const padTop   = Math.floor((H - meta.height) / 2);
  const padBot   = H - meta.height - padTop;

  await sharp(fitted)
    .extend({ top: padTop, bottom: padBot, left: padLeft, right: padRight, background: bg })
    .jpeg({ quality: 93 })
    .toFile(dst);

  console.log(`✅ ${path.basename(dst)}  (bg: rgb(${bg.r},${bg.g},${bg.b})  content: ${meta.width}x${meta.height})`);
}

/**
 * イラスト画像用（中央にキャラクター、余白不要）
 * → cover + centre でトリミング
 */
async function coverCentre(src, dst) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log(`✅ ${path.basename(dst)}  (cover-centre)`);
}

const tasks = [
  // ── 土木施工管理技士 ───────────────────────────
  () => containBanner(`${EYE}/勉強法ガイドとビーバー先生.png`,                       `${OUT}/doboku-1kyu-hero.jpg`),
  () => containBanner(`${EYE}/土木試験対策イラスト.png`,                             `${OUT}/hinshutu-hero.jpg`),
  () => containBanner(`${EYE}/2級土木施工管理技士の勉強法.png`,                      `${OUT}/doboku-2kyu-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,            `${OUT}/doboku-goukakuritsu-hero.jpg`),
  () => containBanner(`${EYE}/土木施工管理技士の書き方ガイド.png`,                    `${OUT}/doboku-keiken-kijutsu-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,            `${OUT}/doboku-sankosho-hero.jpg`),

  // ── 造園施工管理技士 ───────────────────────────
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_34_51.png`,            `${OUT}/zouen-1kyu-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_34_07.png`,            `${OUT}/zouen-2kyu-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,            `${OUT}/zouen-goukakuritsu-hero.jpg`),
  () => containBanner(`${EYE}/土木施工管理技士の書き方ガイド.png`,                    `${OUT}/zouen-keiken-kijutsu-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,            `${OUT}/zouen-sankosho-hero.jpg`),

  // ── 共通・ハブページ ───────────────────────────
  () => containBanner(`${EYE}/土木施工管理技士の書き方ガイド.png`,                    `${OUT}/keiken-kijutsu-kakikata-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,            `${OUT}/sankosho-hikaku-hero.jpg`),
  () => containBanner(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,            `${OUT}/sekoukanri-goukakuritsu-hero.jpg`),

  // ── キャリア（横長イラスト → cover で OK）────────
  () => coverCentre(`${ART}/Gemini_Generated_Image_djmuiidjmuiidjmu.png`,           `${OUT}/goukaku-career-hero.jpg`),
];

console.log(`Processing ${tasks.length} images → ${OUT}\n`);
for (const task of tasks) {
  await task();
}
console.log('\nDone!');
