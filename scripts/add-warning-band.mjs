import sharp from "sharp";
import path from "node:path";

const DIR = process.argv[2];
const names = [
  "zouen-keiken-kijutsu-anzen",
  "zouen-keiken-kijutsu-hinshitsu",
  "zouen-keiken-kijutsu-kankyo",
];

const BAND_H = 72;
const TEXT = "R6から出題なし ｜ R5以前の受検者・記述練習用";

for (const name of names) {
  const src = path.join(DIR, `${name}.png`);
  const out = path.join(DIR, `${name}-v2.png`);
  const { width, height } = await sharp(src).metadata();
  const y = height - BAND_H;

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${y}" width="${width}" height="${BAND_H}" fill="#D92B1C" fill-opacity="0.96"/>
  <rect x="0" y="${y}" width="${width}" height="4" fill="#8E1710"/>
  <text x="${width / 2}" y="${y + BAND_H / 2 + 15}"
        font-family="Yu Gothic UI, Yu Gothic, Meiryo, MS Gothic, sans-serif"
        font-size="42" font-weight="bold" fill="#FFFFFF"
        text-anchor="middle">${TEXT}</text>
</svg>`;

  await sharp(src)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(out);
  console.log(`wrote ${name}-v2.png (${width}x${height}, band ${BAND_H}px)`);
}
