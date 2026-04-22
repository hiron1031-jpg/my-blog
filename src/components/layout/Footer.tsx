import Link from "next/link";
import BeaverMascot from "./BeaverMascot";

const footerNav = [
  {
    heading: "資格別記事",
    links: [
      { label: "1級土木施工管理技士", href: "/categories/%E5%9C%9F%E6%9C%A8%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB" },
      { label: "2級土木施工管理技士", href: "/categories/%E5%9C%9F%E6%9C%A8%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB" },
      { label: "1級造園施工管理技士", href: "/categories/%E9%80%A0%E5%9C%92%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB" },
      { label: "2級造園施工管理技士", href: "/categories/%E9%80%A0%E5%9C%92%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB" },
    ],
  },
  {
    heading: "コンテンツ",
    links: [
      { label: "過去問 無料ダウンロード", href: "/pastproblems" },
      { label: "試験対策・勉強法", href: "/categories/%E8%A9%A6%E9%A8%93%E5%AF%BE%E7%AD%96" },
      { label: "最新記事一覧", href: "/posts" },
    ],
  },
  {
    heading: "サイト情報",
    links: [
      { label: "このサイトについて", href: "/about" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "広告表記", href: "/disclosure" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 group">
              <BeaverMascot preset="icon" size={44} className="rounded-xl" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-semibold text-white/50 tracking-widest">
                  DOBOKU NO TORISETSU
                </span>
                <span className="text-lg font-bold text-white">
                  土木のトリセツ
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed">
              1級土木・造園施工管理技士を取得した現役職員が、
              資格取得を目指す方を全力でサポートするブログです。
              過去問無料ダウンロードも提供中！
            </p>
            {/* Quick access badge */}
            <Link
              href="/pastproblems"
              className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors"
            >
              📥 過去問 無料ダウンロード
            </Link>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                  {col.heading}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ad disclosure (景品表示法・ステマ規制対応) */}
        <div className="pt-6 border-t border-white/15 text-xs text-white/50 leading-relaxed mb-3">
          本サイトはアフィリエイトプログラムに参加しており、
          紹介した商品・サービスが成約した場合に報酬を得ることがあります。
          詳しくは <Link href="/disclosure" className="underline hover:text-white">広告表記</Link> をご確認ください。
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>© {currentYear} 土木のトリセツ. All rights reserved.</span>
          <span>1級土木・造園施工管理技士 資格取得サポートブログ</span>
        </div>
      </div>
    </footer>
  );
}
