import Link from "next/link";
import BeaverMascot from "@/components/layout/BeaverMascot";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a5f] via-[#2d5494] to-[#2d6a4f] text-white px-6 py-10 md:px-12 md:py-14 shadow-lg">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -left-8 w-56 h-56 bg-accent/20 rounded-full blur-2xl" />

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="space-y-4">
          <p className="inline-block bg-white/15 text-xs font-bold tracking-widest px-3 py-1 rounded-full">
            独学3冠合格者が運営
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            施工管理技士の独学合格を、
            <br className="hidden sm:inline" />
            最短ルートで。
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
            2級造園 → 1級造園 → 1級土木をすべて独学1発合格した
            <strong className="text-white">ビーバー監督</strong>
            が、勉強法・参考書・過去問・経験記述まで現場目線で解説します。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/pastproblems"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-heading font-bold text-sm px-5 py-2.5 rounded-full shadow transition"
            >
              📥 過去問を無料でダウンロード
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-sm px-5 py-2.5 rounded-full transition"
            >
              筆者プロフィール →
            </Link>
          </div>
        </div>
        <div className="hidden md:block shrink-0">
          <BeaverMascot preset="celebrate" size={220} />
        </div>
      </div>
    </section>
  );
}
