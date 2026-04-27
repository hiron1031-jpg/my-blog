/**
 * もしもアフィリエイト設定
 *
 * 各IDは「もしも管理画面 → 該当プロモ → 広告リンクへ → どこでもリンク」
 * で生成されたソースHTMLから取得した値（URLパラメータの a_id / p_id / pc_id / pl_id）。
 *
 * これらのIDは公開情報（ブラウザのリンクに載る）なのでソースコードに直接書いてOK。
 * 提携プロモごとに a_id まで含めて異なるので、まるごと定数で持つ。
 */

// Amazon.co.jp 商品購入
const AMAZON_MOSHIMO = {
  a_id: "5508829",
  p_id: "170",
  pc_id: "185",
  pl_id: "4062",
};

// 楽天ブックス 商品購入
const RAKUTEN_MOSHIMO = {
  a_id: "5513089",
  p_id: "56",
  pc_id: "56",
  pl_id: "637",
};

// Yahoo!ショッピング 商品購入
const YAHOO_MOSHIMO = {
  a_id: "5508831",
  p_id: "1225",
  pc_id: "1925",
  pl_id: "18502",
};

/**
 * 互換用：旧 AmazonアソシエイトID（未使用）。
 * もしも経由に切替済のため空文字のまま。
 */
export const AMAZON_ASSOCIATE_TAG = "";

/** もしも「どこでもリンク」形式のクリックURLを組み立てる共通関数 */
function buildMoshimoClickUrl(
  ids: { a_id: string; p_id: string; pc_id: string; pl_id: string },
  targetUrl: string,
): string {
  const params = new URLSearchParams({
    a_id: ids.a_id,
    p_id: ids.p_id,
    pc_id: ids.pc_id,
    pl_id: ids.pl_id,
    url: targetUrl,
  });
  return `https://af.moshimo.com/af/c/click?${params.toString()}`;
}

/**
 * ASIN（Amazon商品ID）から「もしも経由のAmazonアフィリエイトURL」を生成する。
 * すべての <AmazonLink asin="..." /> / <MultiStoreLink asin="..." /> がこの関数を経由するため、
 * ここを差し替えるだけで全記事のリンクが自動的にもしも経由になる。
 *
 * @param asin 例: "4816378243"
 */
export function buildAmazonUrl(asin: string): string {
  return buildMoshimoClickUrl(
    AMAZON_MOSHIMO,
    `https://www.amazon.co.jp/dp/${asin}`,
  );
}

/**
 * 楽天ブックス検索URLを「もしも経由」で生成する。
 * 既存の検索ページ遷移はそのまま、もしも経由のクリック計測になる。
 */
export function buildRakutenUrl(query: string): string {
  const target = `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(query)}`;
  return buildMoshimoClickUrl(RAKUTEN_MOSHIMO, target);
}

/**
 * Yahoo!ショッピング検索URLを「もしも経由」で生成する。
 * 既存の検索ページ遷移はそのまま、もしも経由のクリック計測になる。
 */
export function buildYahooUrl(query: string): string {
  const target = `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(query)}`;
  return buildMoshimoClickUrl(YAHOO_MOSHIMO, target);
}
