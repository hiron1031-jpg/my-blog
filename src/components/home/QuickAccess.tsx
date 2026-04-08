import Link from "next/link";

const items = [
  {
    href: "/categories/%E5%9C%9F%E6%9C%A8%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB",
    label: "土木施工管理技士",
    sub: "1級・2級の勉強法・試験対策",
    badge: null,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        {/* Bridge icon */}
        <path d="M4 36 L4 24 Q24 10 44 24 L44 36" stroke="white" strokeWidth="3" strokeLinejoin="round" fill="none"/>
        <line x1="4" y1="36" x2="44" y2="36" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <line x1="14" y1="36" x2="14" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="24" y1="36" x2="24" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="36" x2="34" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    bg: "from-[#1e3a5f] to-[#2d5494]",
    hover: "hover:from-[#162d4a] hover:to-[#1e3a5f]",
    textColor: "text-white",
  },
  {
    href: "/categories/%E9%80%A0%E5%9C%92%E6%96%BD%E5%B7%A5%E7%AE%A1%E7%90%86%E6%8A%80%E5%A3%AB",
    label: "造園施工管理技士",
    sub: "1級・2級の勉強法・試験対策",
    badge: null,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        {/* Tree icon */}
        <path d="M24 8 L12 26 L18 26 L14 40 L34 40 L30 26 L36 26 Z" fill="white" opacity="0.9"/>
        <circle cx="24" cy="16" r="9" fill="white" opacity="0.3"/>
      </svg>
    ),
    bg: "from-[#2d6a4f] to-[#40916c]",
    hover: "hover:from-[#1b4332] hover:to-[#2d6a4f]",
    textColor: "text-white",
  },
  {
    href: "/pastproblems",
    label: "過去問 無料ダウンロード",
    sub: "H24〜R7年度 PDF全問対応",
    badge: "無料",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        {/* Download icon */}
        <rect x="8" y="34" width="32" height="6" rx="3" fill="white" opacity="0.9"/>
        <path d="M24 8 L24 28 M14 20 L24 30 L34 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "from-[#e8622a] to-[#f08c4b]",
    hover: "hover:from-[#c94f1c] hover:to-[#e8622a]",
    textColor: "text-white",
  },
  {
    href: "/quiz",
    label: "練習問題クイズ",
    sub: "4択クイズで実力チェック！全40問",
    badge: "NEW",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        {/* Question mark icon */}
        <circle cx="24" cy="24" r="17" stroke="white" strokeWidth="3" fill="none" opacity="0.9"/>
        <path d="M18 19c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.5-1.5 4.5-3.5 5.5C25.5 25.5 24 26.5 24 29" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="24" cy="34" r="2" fill="white"/>
      </svg>
    ),
    bg: "from-[#7b2d8b] to-[#a855a8]",
    hover: "hover:from-[#5c1f6a] hover:to-[#7b2d8b]",
    textColor: "text-white",
  },
];

export default function QuickAccess() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">コンテンツから探す</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${item.bg} ${item.hover} transition-all duration-200 px-6 py-8 shadow-md hover:shadow-xl hover:-translate-y-1 group`}
          >
            {item.badge && (
              <span className="absolute top-3 right-3 bg-white text-[#e8622a] text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide shadow">
                {item.badge}
              </span>
            )}
            <div className="opacity-90 group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </div>
            <div className="text-center">
              <p className={`text-lg font-bold leading-snug ${item.textColor}`}>
                {item.label}
              </p>
              <p className={`text-xs mt-1 opacity-80 ${item.textColor}`}>
                {item.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
