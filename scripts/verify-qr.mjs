// 生成したQRコードSVGを、実際に画像化してデコードし、
// 意図したURLに読めるかを検証する。
// （qrcodeのCLIが座標NaNの壊れたSVGを吐いた実例があるため、目視では不十分）
//   node scripts/verify-qr.mjs
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import os from "node:os";
import { PNG } from "pngjs";
import jsQR from "jsqr";
import { TARGETS, OUT_DIR } from "./gen-qr.mjs";

const run = promisify(execFile);

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const tmp = path.join(os.tmpdir(), "qr-verify");
await mkdir(tmp, { recursive: true });

let failed = 0;

for (const t of TARGETS) {
  const svgPath = path.resolve(`${OUT_DIR}/${t.name}.svg`);
  const svg = await readFile(svgPath, "utf8");

  // SVGを白背景の固定サイズでHTMLに埋め、ヘッドレスChromeでPNG化する
  const html = `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:#fff}svg{width:600px;height:600px;display:block}</style>
${svg}`;
  const htmlPath = path.join(tmp, `${t.name}.html`);
  const pngPath = path.join(tmp, `${t.name}.png`);
  await writeFile(htmlPath, html, "utf8");

  await run(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=600,600",
    `--screenshot=${pngPath}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`,
  ]);

  const png = PNG.sync.read(await readFile(pngPath));
  const result = jsQR(
    new Uint8ClampedArray(png.data),
    png.width,
    png.height
  );

  const decoded = result ? result.data : "(読み取れず)";
  const ok = decoded === t.url;
  if (!ok) failed++;

  console.log(`${ok ? "✅ OK" : "❌ NG"}  ${t.name}.svg`);
  console.log(`   期待: ${t.url}`);
  console.log(`   復号: ${decoded}\n`);
}

await rm(tmp, { recursive: true, force: true });

if (failed > 0) {
  console.error(`${failed}件のQRが検証に失敗しました。`);
  process.exit(1);
}
console.log("全てのQRが正しく読み取れました。");
