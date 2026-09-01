// スマホ誘導用のQRコードSVGを生成する。
// 読者の7割超がPC（職場のEdge）なので、スマホへ橋渡しするために使う。
// 生成物は public/images/qr/ にコミットするので、実行は必要なときだけでOK。
//   node scripts/gen-qr.mjs        生成
//   node scripts/verify-qr.mjs     生成物を実際にデコードして検証
import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const SITE = "https://doboku-torisetsu.com";

// utmを付けてGA4で「QR経由のスマホ流入」を計測できるようにする
const utm = (campaign) => `utm_source=qr&utm_medium=pc&utm_campaign=${campaign}`;

export const TARGETS = [
  { name: "quiz", url: `${SITE}/quiz?${utm("sumaho_quiz")}` },
  { name: "pastproblems", url: `${SITE}/pastproblems?${utm("sumaho_pdf")}` },
];

export const OUT_DIR = "public/images/qr";

export const QR_OPTIONS = {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#1a1a1a", light: "#ffffff" },
};

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const t of TARGETS) {
    const svg = await QRCode.toString(t.url, QR_OPTIONS);

    // qrcodeのCLIは座標がNaNになる不具合があったので、ここでも念のため弾く
    if (svg.includes("NaN")) {
      throw new Error(`${t.name}: 生成に失敗しました（座標がNaN）`);
    }

    const path = `${OUT_DIR}/${t.name}.svg`;
    await writeFile(path, svg, "utf8");
    console.log(`生成: ${path}  →  ${t.url}`);
  }

  console.log("\n次に `node scripts/verify-qr.mjs` で読み取り検証してください。");
}

// verify-qr.mjs からimportされたときは生成を走らせない
// （パスに日本語が含まれるとURLエンコードの差で単純比較は一致しないため pathToFileURL を使う）
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
