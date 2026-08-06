// IndexNow 送信スクリプト
// 公開中の sitemap.xml から全URLを取得し、IndexNow（Bing等）へ「更新した」と通知する。
// 使い方: node scripts/indexnow.mjs
// ※キーファイル public/<KEY>.txt が本番で公開済みであること（デプロイ後に実行）。

const HOST = "doboku-torisetsu.com";
const KEY = "57771f2ba8b5f21379e31dbb28bc0993";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  // 1. sitemap.xml を取得して <loc> を抽出
  const res = await fetch(SITEMAP_URL, { headers: { "User-Agent": "indexnow-submitter" } });
  if (!res.ok) throw new Error(`sitemap取得失敗: HTTP ${res.status}`);
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urlList.length === 0) throw new Error("sitemapからURLを抽出できませんでした");
  console.log(`sitemapから ${urlList.length} 件のURLを取得`);

  // 2. IndexNow へ POST（1リクエスト最大10,000件）
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  const post = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await post.text();
  console.log(`IndexNow レスポンス: HTTP ${post.status} ${text || "(本文なし)"}`);
  // 200/202 = 受理。403 = キー不一致（キーファイル未公開など）。422 = URL/キー不正。
  if (post.status === 200 || post.status === 202) {
    console.log("✅ 送信成功。Bing等が順次クロールに来ます（反映まで数日）。");
  } else {
    console.log("⚠️ 送信は受理されませんでした。上のステータスを確認してください。");
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("エラー:", e.message);
  process.exitCode = 1;
});
