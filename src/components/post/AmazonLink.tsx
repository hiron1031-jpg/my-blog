import { buildAmazonUrl, AMAZON_ASSOCIATE_TAG } from "@/lib/affiliate";

interface AmazonLinkProps {
  /** Amazon商品のASIN（例: "4816376895"）。URLの /dp/XXXXXXXXXX の部分 */
  asin?: string;
  /** ASIN不明時の直接URL指定 */
  url?: string;
  /** 書籍・商品タイトル */
  title: string;
  /** サブタイトル・補足（任意） */
  subtitle?: string;
  /** 筆者コメント（任意） */
  comment?: string;
}

/**
 * Amazon書籍CTAカード
 * MDX内で <AmazonLink asin="..." title="..." /> として使う
 */
export default function AmazonLink({
  asin,
  url,
  title,
  subtitle,
  comment,
}: AmazonLinkProps) {
  const href = asin ? buildAmazonUrl(asin) : url || "#";

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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-primary text-white font-semibold px-5 py-2 rounded-md hover:bg-primary-dark transition-colors no-underline"
      >
        Amazonで見る →
      </a>
      {AMAZON_ASSOCIATE_TAG && (
        <div className="text-xs text-secondary mt-3">
          ※ 本リンクはアフィリエイトリンクを含みます。
        </div>
      )}
    </div>
  );
}
