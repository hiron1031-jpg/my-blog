import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    no: "STEP 1",
    title: "勉強法を知る",
    desc: "独学合格の最短ルートを知る。学習スケジュール・優先順位を把握。",
    href: "/posts/doboku-1kyu-benkyoho",
    cta: "勉強法ガイドを読む",
    color: "bg-[#1e3a5f]",
    img: "/images/steps/step1-study.png",
    alt: "勉強するビーバー監督",
  },
  {
    no: "STEP 2",
    title: "参考書を選ぶ",
    desc: "独学3冠合格者が実際に使った参考書を、土木・造園別に紹介。",
    href: "/posts/sankosho-hikaku",
    cta: "参考書ガイドを読む",
    color: "bg-[#e8622a]",
    img: "/images/steps/step2-books.png",
    alt: "参考書を選ぶビーバー監督",
  },
  {
    no: "STEP 3",
    title: "過去問を解く",
    desc: "14年分の過去問PDFと1,178問のWebクイズで合格力を高める。",
    href: "/pastproblems",
    cta: "過去問を入手する",
    color: "bg-[#7b2d8b]",
    img: "/images/steps/step3-past.png",
    alt: "過去問を解くビーバー監督",
  },
  {
    no: "STEP 4",
    title: "経験記述・スクール検討",
    desc: "第二次検定の経験記述添削や通信講座の活用も検討。",
    href: "/posts/school-hikaku",
    cta: "スクール比較を見る",
    color: "bg-[#2d6a4f]",
    img: "/images/steps/step4-school.png",
    alt: "スクール比較するビーバー監督",
  },
];

export default function LearningSteps() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">
          📚 学習ステップ別ガイド
        </h2>
      </div>
      <p className="text-sm text-secondary mb-5">
        独学合格までの4ステップ。順番に進めば迷わずゴールにたどり着けます。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <Link
            key={s.no}
            href={s.href}
            className="group flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="relative aspect-[2/1] overflow-hidden bg-surface">
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span
                className={`absolute top-2 left-2 ${s.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest shadow`}
              >
                {s.no}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-4 gap-2">
              <h3 className="text-base font-bold text-heading leading-snug">
                {s.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed flex-1">
                {s.desc}
              </p>
              <span className="inline-flex items-center text-xs font-bold text-primary group-hover:text-primary-dark mt-1">
                {s.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
