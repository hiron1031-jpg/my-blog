import Link from "next/link";

type Step = {
  num: string;
  icon: string;
  label: string;
  sub: string;
  href: string | null;
};

const STEPS: Step[] = [
  { num: "1", icon: "📄", label: "過去問を解く", sub: "14年分 無料PDF", href: "/pastproblems" },
  { num: "2", icon: "✍️", label: "自己採点する", sub: "弱い分野に印をつける", href: null },
  { num: "3", icon: "📱", label: "クイズで反復", sub: "スキマ時間に1,178問", href: "/quiz" },
  { num: "4", icon: "📚", label: "記事で補強", sub: "頻出分野・勉強法", href: "/posts" },
  { num: "5", icon: "📝", label: "二次は経験記述", sub: "書き方と合格文例", href: "/posts/keiken-kijutsu-kakikata" },
];

function StepCard({ step }: { step: Step }) {
  const inner = (
    <>
      <div className="text-[10px] font-bold text-primary mb-1">STEP {step.num}</div>
      <div className="text-2xl mb-1" aria-hidden>{step.icon}</div>
      <div className="text-sm font-bold text-heading leading-tight">{step.label}</div>
      <div className="text-[11px] text-secondary mt-1 leading-tight">{step.sub}</div>
    </>
  );
  const cls =
    "flex-1 min-w-0 text-center bg-card border border-border rounded-xl px-2 py-3 transition-all";
  if (step.href) {
    return (
      <Link href={step.href} className={`${cls} hover:border-primary hover:shadow-md`}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}

/**
 * 合格までの学習サイクル図
 * このサイトの使い方（過去問→採点→反復→補強→二次対策）を一枚で見せる
 */
export default function LearningCycle() {
  return (
    <section className="bg-surface border border-border rounded-2xl p-5 md:p-7">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">合格までの学習サイクル</h2>
      </div>
      <p className="text-xs text-secondary mb-5">
        このサイトの教材は、すべてこの流れで使うように作られています。
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
        {STEPS.map((step, i) => (
          <div key={step.num} className="contents">
            <StepCard step={step} />
            {i < STEPS.length - 1 && (
              <span
                className="text-primary font-bold text-lg text-center shrink-0 rotate-90 sm:rotate-0 leading-none"
                aria-hidden
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-secondary mt-4 flex items-center gap-1.5">
        <span aria-hidden>🔁</span>
        間違えた分野がなくなるまで STEP 1〜4 を繰り返すのが、独学合格の最短ルートです。
      </p>
    </section>
  );
}
