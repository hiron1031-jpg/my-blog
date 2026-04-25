import Link from "next/link";

const exams = [
  {
    href: "/shikaku/1doboku",
    label: "1級土木",
    sub: "施工管理技士",
    bg: "from-[#1e3a5f] to-[#2d5494]",
    hover: "hover:from-[#162d4a] hover:to-[#1e3a5f]",
    icon: "🌉",
  },
  {
    href: "/shikaku/2doboku",
    label: "2級土木",
    sub: "施工管理技士",
    bg: "from-[#2d5494] to-[#4a7bc8]",
    hover: "hover:from-[#1e3a5f] hover:to-[#2d5494]",
    icon: "🌉",
  },
  {
    href: "/shikaku/1zou",
    label: "1級造園",
    sub: "施工管理技士",
    bg: "from-[#2d6a4f] to-[#40916c]",
    hover: "hover:from-[#1b4332] hover:to-[#2d6a4f]",
    icon: "🌳",
  },
  {
    href: "/shikaku/2zou",
    label: "2級造園",
    sub: "施工管理技士",
    bg: "from-[#40916c] to-[#52b788]",
    hover: "hover:from-[#2d6a4f] hover:to-[#40916c]",
    icon: "🌳",
  },
];

export default function ExamSelector() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">
          🎯 受験する資格を選ぶ
        </h2>
      </div>
      <p className="text-sm text-secondary mb-5">
        資格別ハブページから、勉強法・過去問・参考書まで一気に確認できます。
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {exams.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br ${e.bg} ${e.hover} transition-all duration-200 px-4 py-6 sm:py-8 shadow-md hover:shadow-xl hover:-translate-y-1 group text-white`}
          >
            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">
              {e.icon}
            </span>
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold leading-tight">
                {e.label}
              </p>
              <p className="text-[11px] sm:text-xs opacity-80">{e.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
