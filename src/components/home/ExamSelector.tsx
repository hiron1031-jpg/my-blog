import Link from "next/link";
import Image from "next/image";

const exams = [
  {
    href: "/shikaku/1doboku",
    img: "/images/exams/1doboku.png",
    alt: "1級土木施工管理技士",
  },
  {
    href: "/shikaku/2doboku",
    img: "/images/exams/2doboku.png",
    alt: "2級土木施工管理技士",
  },
  {
    href: "/shikaku/1zou",
    img: "/images/exams/1zou.png",
    alt: "1級造園施工管理技士",
  },
  {
    href: "/shikaku/2zou",
    img: "/images/exams/2zou.png",
    alt: "2級造園施工管理技士",
  },
];

export default function ExamSelector() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
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
            aria-label={e.alt}
            className="block relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-white group"
          >
            <Image
              src={e.img}
              alt={e.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
