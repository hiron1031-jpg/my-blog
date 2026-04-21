const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const files = [
  // thumbnails (v2)
  "doboku-2kyu-benkyoho-v2.png",
  "doboku-1kyu-hinshutu-v2.png",
  "doboku-1kyu-benkyoho-v2.png",
  "doboku-sankosho-v2.png",
  "doboku-goukakuritsu-v2.png",
  "doboku-keiken-kijutsu-v2.png",
  "goukaku-career-v2.png",
  "sankosho-hikaku-v2.png",
  "zouen-goukakuritsu-v2.png",
  "zouen-sankosho-v2.png",
  "zouen-2kyu-benkyoho-v2.png",
  "zouen-keiken-kijutsu-v2.png",
  "sekoukanri-goukakuritsu-v2.png",
  "zouen-1kyu-benkyoho-v2.png",
  "keiken-kijutsu-kakikata-v2.png",
  // in-article images
  "kanri-beaver.png",
  "study-steps.png",
  "mondai-scene.png",
  "doboku-beaver.png",
  "zouen-beaver.png",
  "benkyochu-beaver.png",
];

const base = path.join(__dirname, "..", "public", "images", "posts");

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  for (const name of files) {
    const p = path.join(base, name);
    if (!fs.existsSync(p)) {
      console.log("SKIP (not found):", name);
      continue;
    }
    const before = fs.statSync(p).size;
    try {
      const buf = await sharp(p)
        .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
        .toBuffer();
      // only overwrite if it's actually smaller
      if (buf.length < before) {
        fs.writeFileSync(p, buf);
        const after = buf.length;
        totalBefore += before;
        totalAfter += after;
        console.log(
          `${name.padEnd(40)} ${(before / 1024).toFixed(0).padStart(6)} KB -> ${(after / 1024).toFixed(0).padStart(6)} KB  (-${(100 - (after / before) * 100).toFixed(1)}%)`
        );
      } else {
        console.log(`${name.padEnd(40)} already optimized, skipped`);
      }
    } catch (e) {
      console.error("ERROR on", name, e.message);
    }
  }
  console.log("");
  console.log(
    `TOTAL: ${(totalBefore / 1024).toFixed(0)} KB -> ${(totalAfter / 1024).toFixed(0)} KB  (saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB)`
  );
})();
