"use client";

import {
  buildAmazonUrl,
  buildRakutenUrl,
  buildYahooUrl,
} from "@/lib/affiliate";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface MultiStoreLinkProps {
  /** Amazon商品のASIN */
  asin: string;
  /** 書籍・商品タイトル（楽天・Yahooの検索クエリにも使用） */
  title: string;
  /** サブタイトル・補足（任意） */
  subtitle?: string;
  /** 筆者コメント・選定理由（任意） */
  comment?: string;
  /** 楽天検索クエリを上書き（任意・デフォルトはtitle） */
  rakutenQuery?: string;
  /** Yahoo検索クエリを上書き（任意・デフォルトはtitle） */
  yahooQuery?: string;
}

/**
 * 複数ストア（Amazon / 楽天 / Yahoo!）並列リンクカード
 *
 * 書影画像なしの軽量版。もしもアフィリエイト承認後は
 * 「かんたんリンク」のHTMLに置き換える想定。
 */
export default function MultiStoreLink({
  asin,
  title,
  subtitle,
  comment,
  rakutenQuery,
  yahooQuery,
}: MultiStoreLinkProps) {
  const amazonUrl = buildAmazonUrl(asin);
  const rakutenUrl = buildRakutenUrl(rakutenQuery || title);
  const yahooUrl = buildYahooUrl(yahooQuery || title);

  const trackClick = (storeName: string, url: string) => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: `${storeName}: ${title}`,
        store_name: storeName,
        book_title: title,
        link_url: url,
        page_path:
          typeof location !== "undefined" ? location.pathname : "",
      });
    }
  };

  return (
    <div className="my-6 border-2 border-border rounded-lg p-5 bg-surface">
      <div className="text-xs text-secondary mb-2">📚 筆者のおすすめ書籍</div>
      <div className="font-bold text-heading text-lg mb-1">{title}</div>
      {subtitle && (
        <div className="text-sm text-secondary mb-2">{subtitle}</div>
      )}
      {comment && (
        <div className="text-sm text-secondary mb-3 border-l-4 border-accent pl-3 italic">
          {comment}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackClick("amazon", amazonUrl)}
          className="inline-block bg-[#ff9900] text-white font-semibold px-4 py-2 rounded-md hover:brightness-95 transition no-underline text-sm"
        >
          Amazonで見る
        </a>
        <a
          href={rakutenUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackClick("rakuten", rakutenUrl)}
          className="inline-block bg-[#bf0000] text-white font-semibold px-4 py-2 rounded-md hover:brightness-95 transition no-underline text-sm"
        >
          楽天ブックスで見る
        </a>
        <a
          href={yahooUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackClick("yahoo", yahooUrl)}
          className="inline-block bg-[#ff0033] text-white font-semibold px-4 py-2 rounded-md hover:brightness-95 transition no-underline text-sm"
        >
          Yahoo!で見る
        </a>
      </div>
      <div className="text-xs text-secondary/70 mt-3">
        ※ 本リンクはアフィリエイトリンク（もしもアフィリエイト経由）を含みます。楽天/Yahoo!は検索結果ページへ遷移します。価格・在庫は各ストアでご確認ください。
      </div>
    </div>
  );
}
