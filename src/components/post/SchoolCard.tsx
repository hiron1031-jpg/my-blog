"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface SchoolCardProps {
  /** スクール・講座名 */
  name: string;
  /** キャッチコピー・特徴（任意） */
  tagline?: string;
  /** アフィリエイトURL（A8.net等から発行される広告URL） */
  url: string;
  /** 画像URL（A8.netから取得できるバナー画像等、任意） */
  imageUrl?: string;
  /** 価格帯・料金目安（任意） */
  price?: string;
  /** 特徴を箇条書きで表示（任意） */
  features?: string[];
  /** こんな人におすすめ（任意） */
  recommendedFor?: string;
  /** 筆者コメント（任意） */
  comment?: string;
  /** CTAボタン文言（任意・デフォルト「公式サイトを見る →」） */
  ctaText?: string;
}

/**
 * スクール・通信講座紹介カード（アフィリエイト用）
 * MDX内で <SchoolCard name="SAT" url="..." /> として使う
 *
 * 注意: アフィリエイトリンクなので rel="sponsored" を必ず付与
 */
export default function SchoolCard({
  name,
  tagline,
  url,
  imageUrl,
  price,
  features,
  recommendedFor,
  comment,
  ctaText = "公式サイトを見る →",
}: SchoolCardProps) {
  return (
    <div className="my-8 border-2 border-primary/30 rounded-xl overflow-hidden bg-card shadow-sm">
      {/* PR ラベル */}
      <div className="bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark border-b border-primary/20">
        PR・広告
      </div>

      <div className="p-5">
        {/* ヘッダー：画像 + 名前 */}
        <div className="flex gap-4 mb-3 items-start">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              className="w-24 h-24 object-contain rounded-lg border border-border bg-surface shrink-0"
              loading="lazy"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-secondary mb-1">🎓 おすすめ講座</div>
            <div className="font-bold text-heading text-lg leading-tight">
              {name}
            </div>
            {tagline && (
              <div className="text-sm text-secondary mt-1">{tagline}</div>
            )}
            {price && (
              <div className="text-sm font-semibold text-primary-dark mt-1">
                💰 {price}
              </div>
            )}
          </div>
        </div>

        {/* 特徴リスト */}
        {features && features.length > 0 && (
          <ul className="my-3 space-y-1">
            {features.map((f, i) => (
              <li key={i} className="text-sm text-secondary flex gap-2">
                <span className="text-primary shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* こんな人におすすめ */}
        {recommendedFor && (
          <div className="bg-blue-50 border-l-4 border-blue-400 px-3 py-2 my-3 text-sm text-heading">
            <span className="font-semibold">こんな人におすすめ：</span>
            {recommendedFor}
          </div>
        )}

        {/* 筆者コメント */}
        {comment && (
          <div className="text-sm text-secondary my-3 border-l-4 border-accent pl-3 italic">
            {comment}
          </div>
        )}

        {/* CTA ボタン */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => {
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
              window.gtag("event", "affiliate_click", {
                event_category: "affiliate",
                event_label: name,
                school_name: name,
                link_url: url,
                page_path:
                  typeof location !== "undefined" ? location.pathname : "",
              });
            }
          }}
          className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-md hover:bg-primary-dark transition-colors no-underline mt-2"
        >
          {ctaText}
        </a>

        {/* 注記 */}
        <div className="text-xs text-secondary/70 mt-3">
          ※ 本リンクはアフィリエイトリンクを含みます。金額・内容は最新情報を公式サイトでご確認ください。
        </div>
      </div>
    </div>
  );
}
