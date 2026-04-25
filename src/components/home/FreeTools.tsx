import Link from "next/link";

const tools = [
  {
    href: "/pastproblems",
    label: "過去問 無料ダウンロード",
    sub: "H24〜R7年度のPDFを全問配布中",
    badge: "無料",
    bg: "from-[#e8622a] to-[#f08c4b]",
    hover: "hover:from-[#c94f1c] hover:to-[#e8622a]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="34" width="32" height="6" rx="3" fill="white" opacity="0.9" />
        <path
          d="M24 8 L24 28 M14 20 L24 30 L34 20"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/quiz",
    label: "過去問チャレンジ",
    sub: "R4〜R7年度・全1,178問の4択クイズ",
    badge: "NEW",
    bg: "from-[#7b2d8b] to-[#a855a8]",
    hover: "hover:from-[#5c1f6a] hover:to-[#7b2d8b]",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="17" stroke="white" strokeWidth="3" fill="none" opacity="0.9" />
        <path
          d="M18 19c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.5-1.5 4.5-3.5 5.5C25.5 25.5 24 26.5 24 29"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="34" r="2" fill="white" />
      </svg>
    ),
  },
];

export default function FreeTools() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-accent rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">
          🆓 無料で使えるツール
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`relative flex items-center gap-4 rounded-2xl bg-gradient-to-br ${t.bg} ${t.hover} transition-all duration-200 px-6 py-6 shadow-md hover:shadow-xl hover:-translate-y-1 group text-white`}
          >
            <span className="absolute top-3 right-3 bg-white text-[#e8622a] text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide shadow">
              {t.badge}
            </span>
            <div className="opacity-90 group-hover:scale-110 transition-transform duration-200 shrink-0">
              {t.icon}
            </div>
            <div>
              <p className="text-lg font-bold leading-snug">{t.label}</p>
              <p className="text-xs mt-1 opacity-80">{t.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
