"use client";

import { useState } from "react";
import { buildAmazonUrl, buildAmazonAnyUrl } from "@/lib/affiliate";

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
  /** 書影画像URL（任意・指定時は優先表示）。未指定の場合はASINから自動推測 */
  imageUrl?: string;
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
  imageUrl,
}: AmazonLinkProps) {
  const href = asin
    ? buildAmazonUrl(asin)
    : url
      ? buildAmazonAnyUrl(url)
      : "#";
  // ISBN-10 → ISBN-13 変換（OpenBD はISBN-13が必要）
  const toIsbn13 = (isbn10: string) => {
    const base = "978" + isbn10.substring(0, 9);
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(base[i]) * (i % 2 === 0 ? 1 : 3);
    }
    return base + (10 - (sum % 10)) % 10;
  };
  const bookImageUrl =
    imageUrl ?? (asin ? `https://cover.openbd.jp/${toIsbn13(asin)}.jpg` : null);
  const [imgError, setImgError] = useState(false);
  const showImage = bookImageUrl && !imgError;

  return (
    <div className="my-6 border-2 border-border rounded-lg p-5 bg-surface">
      <div className="text-xs text-secondary mb-3">📚 筆者のおすすめ書籍</div>
      <div className="flex gap-4 items-start">
        {/* 書影画像（ASIN指定時のみ） */}
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 block"
          >
            <img
              src={bookImageUrl}
              alt={title}
              width={120}
              height={170}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-[120px] h-auto rounded shadow-sm border border-border bg-white object-contain"
            />
          </a>
        )}
        {/* 書籍情報 */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-heading text-lg mb-1 leading-tight">{title}</div>
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
            className="inline-block bg-primary text-white font-semibold px-5 py-2 rounded-md hover:bg-primary-dark transition-colors no-underline mt-2"
          >
            Amazonで見る →
          </a>
        </div>
      </div>
    </div>
  );
}
