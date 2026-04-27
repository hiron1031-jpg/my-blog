/**
 * もしもアフィリエイト（Amazon.co.jp商品購入プロモ）設定
 *
 * 各IDは「もしも管理画面 → Amazon.co.jp商品購入 → 広告リンクへ → どこでもリンク」
 * で生成されたソースHTMLから取得した値（URLパラメータの a_id / p_id / pc_id / pl_id）。
 *
 * これらのIDは公開情報（ブラウザのリンクに載る）なのでソースコードに直接書いてOK。
 */
const MOSHIMO_A_ID = "5508829";
const MOSHIMO_P_ID = "170";
const MOSHIMO_PC_ID = "185";
const MOSHIMO_PL_ID = "4062";

/**
 * 互換用：旧 AmazonアソシエイトID（未使用）。
 * もしも経由に切替済のため空文字のまま。
 */
export const AMAZON_ASSOCIATE_TAG = "";

/**
 * ASIN（Amazon商品ID）から「もしも経由のAmazonアフィリエイトURL」を生成する。
 * すべての <AmazonLink asin="..." /> / <MultiStoreLink asin="..." /> がこの関数を経由するため、
 * ここを差し替えるだけで全記事のリンクが自動的にもしも経由になる。
 *
 * @param asin 例: "4816378243"
 * @returns 例: "https://af.moshimo.com/af/c/click?a_id=...&url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4816378243"
 */
export function buildAmazonUrl(asin: string): string {
  const targetUrl = `https://www.amazon.co.jp/dp/${asin}`;
  const params = new URLSearchParams({
    a_id: MOSHIMO_A_ID,
    p_id: MOSHIMO_P_ID,
    pc_id: MOSHIMO_PC_ID,
    pl_id: MOSHIMO_PL_ID,
    url: targetUrl,
  });
  return `https://af.moshimo.com/af/c/click?${params.toString()}`;
}

/**
 * 楽天ブックス検索URLを生成（ISBN優先、フォールバックでタイトル検索）
 * ※ もしもの楽天プロモが提携承認されたら、buildAmazonUrl と同様にもしも経由に切替可能。
 */
export function buildRakutenUrl(query: string): string {
  return `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(query)}`;
}

/**
 * Yahoo!ショッピング検索URLを生成
 * ※ もしものYahoo!プロモが提携承認されたら、buildAmazonUrl と同様にもしも経由に切替可能。
 */
export function buildYahooUrl(query: string): string {
  return `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(query)}`;
}
