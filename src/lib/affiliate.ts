/**
 * Amazonアソシエイト設定
 *
 * 使い方：
 *   1. AmazonアソシエイトでトラッキングID（例: "mysite-22"）を取得する
 *   2. 下記の AMAZON_ASSOCIATE_TAG に貼り付ける
 *   3. これだけで全記事のAmazonリンクに自動で付与される
 *
 * 注意：
 *   - トラッキングIDは公開情報（URLに載る）のでソースコードに直接書いてOK
 *   - ただし取得前にサイト公開するとアソシエイトプログラム規約違反になる可能性あり
 *   - 未取得の間は空文字にしておけば通常のAmazonリンクとして動作する
 */
export const AMAZON_ASSOCIATE_TAG = "";

/**
 * ASIN（Amazon商品ID）からアフィリエイトURLを生成する
 * @param asin 例: "4816376895"
 * @returns 例: "https://www.amazon.co.jp/dp/4816376895?tag=mysite-22"
 */
export function buildAmazonUrl(asin: string): string {
  const base = `https://www.amazon.co.jp/dp/${asin}`;
  return AMAZON_ASSOCIATE_TAG ? `${base}?tag=${AMAZON_ASSOCIATE_TAG}` : base;
}
