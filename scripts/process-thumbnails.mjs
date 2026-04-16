import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const EYE = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/アイキャッチ画像";
const ART = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/記事内画像";
const OUT = path.join(ROOT, 'public/images/posts');

const W = 1280, H = 720;

// バナー画像（タイトル文字が上にある）→ position: 'top' で上を基準にクロップ
async function cropTop(src, dst) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

// イラスト画像（中央に被写体）→ position: 'centre'
async function cropCentre(src, dst) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

// グリッド画像から1パネルを切り出してリサイズ
async function panelCrop(src, dst, col, row, totalCols, totalRows, pos = 'centre') {
  const meta = await sharp(src).metadata();
  const pw = Math.floor(meta.width / totalCols);
  const ph = Math.floor(meta.height / totalRows);
  await sharp(src)
    .extract({ left: col * pw, top: row * ph, width: pw, height: ph })
    .resize(W, H, { fit: 'cover', position: pos })
    .jpeg({ quality: 92 })
    .toFile(dst);
  console.log('✅', path.basename(dst));
}

const tasks = [
  // ── 土木施工管理技士 ──────────────────────────────────────────
  // タイトルが上にあるバナー画像はすべて cropTop
  () => cropTop(`${EYE}/勉強法ガイドとビーバー先生.png`,                        `${OUT}/doboku-1kyu-hero.jpg`),
  () => cropTop(`${EYE}/土木試験対策イラスト.png`,                              `${OUT}/hinshutu-hero.jpg`),
  () => cropTop(`${EYE}/2級土木施工管理技士の勉強法.png`,                       `${OUT}/doboku-2kyu-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,             `${OUT}/doboku-goukakuritsu-hero.jpg`),
  () => cropTop(`${EYE}/土木施工管理技士の書き方ガイド.png`,                     `${OUT}/doboku-keiken-kijutsu-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,             `${OUT}/doboku-sankosho-hero.jpg`),

  // ── 造園施工管理技士 ──────────────────────────────────────────
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_34_51.png`,             `${OUT}/zouen-1kyu-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_34_07.png`,             `${OUT}/zouen-2kyu-hero.jpg`),
  // zouen-goukakuritsu: 合格率バナーを流用（前回の実験パネルから変更）
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,             `${OUT}/zouen-goukakuritsu-hero.jpg`),
  // zouen-keiken-kijutsu: 書き方ガイドを流用（土木バナーだが内容は同じ）
  () => cropTop(`${EYE}/土木施工管理技士の書き方ガイド.png`,                     `${OUT}/zouen-keiken-kijutsu-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,             `${OUT}/zouen-sankosho-hero.jpg`),

  // ── 共通・ハブページ ──────────────────────────────────────────
  // keiken-kijutsu-kakikata: 書き方ガイドが最も内容に合う（前回の地盤調査図から変更）
  () => cropTop(`${EYE}/土木施工管理技士の書き方ガイド.png`,                     `${OUT}/keiken-kijutsu-kakikata-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_35_11.png`,             `${OUT}/sankosho-hikaku-hero.jpg`),
  () => cropTop(`${EYE}/ChatGPT Image 2026年4月16日 06_49_38.png`,             `${OUT}/sekoukanri-goukakuritsu-hero.jpg`),
  // goukaku-career: 中央に被写体のイラストなので cropCentre のまま
  () => cropCentre(`${ART}/Gemini_Generated_Image_djmuiidjmuiidjmu.png`,        `${OUT}/goukaku-career-hero.jpg`),
];

console.log(`Processing ${tasks.length} images → ${OUT}\n`);
for (const task of tasks) {
  await task();
}
console.log('\n🎉 All done!');
