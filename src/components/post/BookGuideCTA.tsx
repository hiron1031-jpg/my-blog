import Link from "next/link";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

interface BookGuideCTAProps {
  category: string;
}

/**
 * 記事末に表示する参考書ガイドへの誘導CTA。
 * 記事のカテゴリに応じて、土木 / 造園 / 共通 のおすすめ参考書記事へ振り分ける。
 */
export default function BookGuideCTA({ category }: BookGuideCTAProps) {
  // カテゴリで土木 or 造園を判別
  const isZouen = category.includes("造園");
  const isDoboku = category.includes("土木");

  const target = isZouen
    ? {
        href: "/posts/zouen-sankosho",
        label: "造園施工管理技士の参考書を見る",
        sub: "1級・2級造園 独学合格者が選ぶおすすめ書籍",
      }
    : isDoboku
      ? {
          href: "/posts/doboku-sankosho",
          label: "土木施工管理技士の参考書を見る",
          sub: "1級・2級土木 独学合格者が選ぶおすすめ書籍",
        }
      : {
          href: "/posts/sankosho-hikaku",
          label: "おすすめ参考書を見る",
          sub: "施工管理技士 独学合格者が選ぶ書籍ガイド",
        };

  return (
    <div className="mt-10 rounded-2xl overflow-hidden border border-border shadow-sm">
      <div className="bg-gradient-to-br from-[#1976d2] to-[#42a5f5] p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <FiBookOpen size={18} />
          <p className="text-[11px] font-bold opacity-90 tracking-wide">
            📚 合格への近道
          </p>
        </div>
        <p className="text-base font-bold leading-snug mb-1">
          独学合格者が厳選した参考書ガイド
        </p>
        <p className="text-xs opacity-80 leading-relaxed">
          {target.sub}。買って失敗しない1冊が見つかります。
        </p>
      </div>
      <Link
        href={target.href}
        className="flex items-center justify-between px-5 py-3 bg-card hover:bg-surface transition-colors group"
      >
        <span className="text-sm font-bold text-heading group-hover:text-primary transition-colors">
          {target.label}
        </span>
        <FiArrowRight
          size={16}
          className="text-primary group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
}
