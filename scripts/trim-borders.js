const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const files = [
  "doboku-beaver.png",
  "zouen-beaver.png",
  "kanri-beaver.png",
  "benkyochu-beaver.png",
  "study-steps.png",
  "mondai-scene.png",
];

const base = path.join(__dirname, "..", "public", "images", "posts");

(async () => {
  for (const name of files) {
    const p = path.join(base, name);
    if (!fs.existsSync(p)) {
      console.log("SKIP (not found):", name);
      continue;
    }
    try {
      const before = await sharp(p).metadata();
      // Trim pixels similar to the top-left (border) color; threshold 30
      const trimmed = await sharp(p)
        .trim({ threshold: 30 })
        .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
        .toBuffer();
      const meta = await sharp(trimmed).metadata();
      fs.writeFileSync(p, trimmed);
      console.log(
        `${name.padEnd(28)} ${before.width}x${before.height} -> ${meta.width}x${meta.height}  (ratio: ${(meta.width / meta.height).toFixed(2)})`
      );
    } catch (e) {
      console.error("ERROR on", name, e.message);
    }
  }
})();
