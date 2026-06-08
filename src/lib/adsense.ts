/**
 * Google AdSense 設定
 *
 * AdSenseの「パブリッシャーID」をここに入れる。
 * 形式: "ca-pub-0000000000000000"（数字16桁）
 *
 * このIDは公開情報（ブラウザのページソースに必ず載る）なので、
 * affiliate.ts と同様にソースコードへ直接書いてOK。秘密情報ではない。
 *
 * 取得手順:
 *   1. https://adsense.google.com にGoogleアカウントでログイン
 *   2. サイト「doboku-torisetsu.com」を登録
 *   3. 発行された「ca-pub-...」をこの定数に貼り付ける
 *
 * 空文字のあいだは、AdSenseのスクリプトも広告枠も一切読み込まれない（=何も表示されない）。
 */
export const ADSENSE_CLIENT = "ca-pub-8503868196416646";

/** AdSenseが有効か（IDが設定済みか）を判定 */
export const isAdsenseEnabled = ADSENSE_CLIENT.startsWith("ca-pub-");
