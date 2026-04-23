const sharp = require('sharp');
const pngToIco = require('png-to-ico').default || require('png-to-ico');
const path = require('path');
const fs = require('fs');

const srcPath = 'C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像/記事内画像/アイコン.PNG';
const outDir = 'public';

async function main() {
  // 元画像は円形背景だが周囲に余白あり。trimで余白を削ってから正方形化
  const trimmed = await sharp(srcPath).trim({ threshold: 10 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const size = Math.max(meta.width, meta.height);

  // 正方形キャンバスに中央配置（透過ではなく元画像の背景色に合わせる）
  const square = await sharp(trimmed)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 253, g: 246, b: 227, alpha: 1 }, // クリーム色
    })
    .toBuffer();

  // apple-icon.png (180x180)
  await sharp(square).resize(180, 180).png().toFile(path.join(outDir, 'apple-icon.png'));
  console.log('apple-icon.png -> 180x180');

  // icon.png (512x512)
  await sharp(square).resize(512, 512).png().toFile(path.join(outDir, 'icon.png'));
  console.log('icon.png -> 512x512');

  // favicon.ico (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) => sharp(square).resize(s, s).png().toBuffer())
  );
  const icoBuffer = await pngToIco(pngBuffers);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuffer);
  console.log('favicon.ico -> 16/32/48');

  // 古い favicon.svg を削除
  const svgPath = path.join(outDir, 'favicon.svg');
  if (fs.existsSync(svgPath)) {
    fs.unlinkSync(svgPath);
    console.log('removed favicon.svg');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
