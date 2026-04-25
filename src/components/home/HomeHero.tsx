import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-lg">
      {/* Background image */}
      <div className="relative w-full aspect-[2000/750] sm:aspect-[2000/650]">
        <Image
          src="/images/home-hero.png"
          alt="土木のトリセツ メインビジュアル"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-right sm:object-center"
        />
        {/* Left-side gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/65 sm:via-black/25 sm:to-transparent" />

        {/* Text content (overlaid) */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-5 sm:px-10 md:px-14 max-w-3xl text-white space-y-3 sm:space-y-4">
            <p className="inline-block bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 rounded-full">
              独学3冠合格者が運営
            </p>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md">
              施工管理技士の独学合格を、
              <br />
              最短ルートで。
            </h1>
            <p className="hidden sm:block text-sm md:text-base text-white/90 leading-relaxed max-w-xl drop-shadow">
              2級造園 → 1級造園 → 1級土木をすべて独学1発合格した
              <strong className="text-white">ビーバー監督</strong>
              が、勉強法・参考書・過去問・経験記述まで現場目線で解説します。
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
              <Link
                href="/pastproblems"
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-heading font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg transition"
              >
                📥 過去問を無料DL
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition"
              >
                筆者プロフィール →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
