/**
 * 記事内差し込み画像を記事内容に合わせて処理するスクリプト
 * 1280x720 (16:9) で統一
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT   = path.join(__dirname, '..');
const ART    = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/記事内画像";
const OUT    = path.join(ROOT, 'public/images/posts');

const W = 1280, H = 720;

/** グリッド画像の1パネルを切り出して 1280x720 に */
async function panel(src, dst, col, row, cols, rows) {
  const meta = await sharp(src).metadata();
  const pw = Math.floor(meta.width  / cols);
  const ph = Math.floor(meta.height / rows);
  // パネルを切り出し → 1280x720 に cover リサイズ（パネル自体は横長なので中央crop）
  await sharp(src)
    .extract({ left: col * pw, top: row * ph, width: pw, height: ph })
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(dst);
  console.log(`✅ ${path.basename(dst)}  [panel col=${col} row=${row}]`);
}

/** 横長イラスト全体を 1280x720 に収める（枠色で余白埋め） */
async function containFull(src, dst) {
  const rawResult = await sharp(src)
    .extract({ left: 2, top: 2, width: 1, height: 1 })
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer();
  const bg = { r: rawResult[0], g: rawResult[1], b: rawResult[2] };

  const fitted = await sharp(src)
    .resize(W, H, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const meta = await sharp(fitted).metadata();
  const padL = Math.floor((W - meta.width)  / 2);
  const padR = W - meta.width  - padL;
  const padT = Math.floor((H - meta.height) / 2);
  const padB = H - meta.height - padT;

  await sharp(fitted)
    .extend({ top: padT, bottom: padB, left: padL, right: padR, background: bg })
    .png()
    .toFile(dst);
  console.log(`✅ ${path.basename(dst)}  (contain-full, bg:rgb(${bg.r},${bg.g},${bg.b}))`);
}

/** 円形アイコンを白背景で 1280x720 に配置 */
async function iconOnBg(src, dst, bgColor = { r: 252, g: 248, b: 243 }) {
  const size = 660; // アイコン表示サイズ（大きめに）
  const iconBuf = await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const left = Math.floor((W - size) / 2);
  const top  = Math.floor((H - size) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: bgColor } })
    .composite([{ input: iconBuf, left, top }])
    .png()
    .toFile(dst);
  console.log(`✅ ${path.basename(dst)}  (icon-on-bg)`);
}

// ── 処理一覧 ─────────────────────────────────────────────────────

console.log(`Processing article images → ${OUT}\n`);

// study-steps.png
// 用途: 勉強のイメージ（1級土木・2級土木・2級造園 勉強法記事）
// → IMG_1009 col=2 row=1: 本棚・証書パネル（勉強→達成のイメージ）
await panel(`${ART}/IMG_1009.PNG`, `${OUT}/study-steps.png`, 2, 1, 3, 2);

// mondai-scene.png
// 用途: 勉強ステップのイメージ（1級土木 勉強法記事）
// → IMG_1009 col=0 row=0: 図面を広げて計画するビーバー（学習計画・勉強ステップのイメージ）
await panel(`${ART}/IMG_1009.PNG`, `${OUT}/mondai-scene.png`, 0, 0, 3, 2);

// doboku-beaver.png
// 用途: 頻出分野・対策イメージ（1級土木 頻出分野記事）
// → IMG_1010 col=0 row=1: 測量・計測シーン（土木施工の現場作業）
await panel(`${ART}/IMG_1010.PNG`, `${OUT}/doboku-beaver.png`, 0, 1, 3, 2);

// kanri-beaver.png
// 用途: 合格率・難易度分析（土木合格率記事）
// → IMG_1011 col=0 row=1: パソコンで分析チャート（合格率データ分析のイメージ）
await panel(`${ART}/IMG_1011.PNG`, `${OUT}/kanri-beaver.png`, 0, 1, 3, 2);

// benkyochu-beaver.png
// 用途: テキスト・参考書（土木/造園 参考書記事、2級造園記事）
// → IMG_1011 col=2 row=0: 図書館・本棚（テキストで勉強のイメージ）
await panel(`${ART}/IMG_1011.PNG`, `${OUT}/benkyochu-beaver.png`, 2, 0, 3, 2);

// zouen-beaver.png
// 用途: 造園のイメージ（1級造園勉強法・造園合格率記事）
// → 8610C775（チェーンソーで木を切るビーバー = 造園現場作業）をクリーム背景に
// ※白い矩形とのギャップを避けるためアイコンの白に近い背景色を使用
await iconOnBg(`${ART}/8610C775-6BAF-4CC1-89F4-6DEC78DAD9C9.png`,
               `${OUT}/zouen-beaver.png`,
               { r: 252, g: 252, b: 248 }); // ほぼ白いクリーム（アイコンの白背景と自然につながる）

// goukaku-hero.png
// 用途: 合格後キャリアのイメージ（goukaku-career記事）
// → Gemini_djmuii: 建設現場で喜ぶビーバー（合格・成功のイメージ）
await containFull(`${ART}/Gemini_Generated_Image_djmuiidjmuiidjmu.png`,
                  `${OUT}/goukaku-hero.png`);

console.log('\n🎉 All article images done!');
