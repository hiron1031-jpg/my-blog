const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = 'C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/アイキャッチ画像';
const outDir = 'public/images/posts';

async function process(src, outName) {
  const srcPath = path.join(srcDir, src);
  const outPath = path.join(outDir, outName);
  await sharp(srcPath)
    .trim({ threshold: 30 })
    .resize({ width: 1280, withoutEnlargement: true })
    .png({ palette: true, quality: 85, compressionLevel: 9 })
    .toFile(outPath);
  const stats = fs.statSync(outPath);
  console.log(outName, '->', (stats.size / 1024).toFixed(0), 'KB');
}

(async () => {
  await process('ChatGPT Image 2026年4月23日 21_41_39.png', 'school-hikaku-zouen.png');
  await process('ChatGPT Image 2026年4月23日 21_44_38.png', 'school-hikaku-doboku.png');
})();
