"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const NOTE = "https://note.com/dobokutorisetsu/n/";

type Pack = { url: string; price: string; listPrice: string; note: string };

type Exam = {
  key: string;
  name: string;
  /** 二次検定の日程など、その資格の「いま」 */
  timing: string;
  free: string;
  kaisetsu: string;
  model: string;
  /** 買い切りマガジン。未公開のうちは null */
  pack: Pack | null;
};

const EXAMS: Exam[] = [
  {
    key: "1doboku",
    name: "1級土木",
    timing: "第二次検定 10/4",
    free: "nc8cc72e51116",
    kaisetsu: "n051d4898f173",
    model: "nb501fa18250f",
    pack: {
      url: "https://note.com/dobokutorisetsu/m/m64d6358b6c04",
      price: "1,980円",
      listPrice: "2,780円",
      note: "＋直前キット・経験記述の例文集16例",
    },
  },
  {
    key: "2doboku",
    name: "2級土木",
    timing: "第二次検定 10/25",
    free: "ne3a94a016790",
    kaisetsu: "n0e58e6ebd207",
    model: "nbe4ef1799e5a",
    // TODO: マガジン公開後にURLを設定する（それまでパック行は表示されない）
    pack: null,
  },
  {
    key: "1zouen",
    name: "1級造園",
    timing: "第二次検定 12/6",
    free: "nd58fb8b0dc66",
    kaisetsu: "n77af23ad86bb",
    model: "nb4729f913dec",
    pack: null,
  },
  {
    key: "2zouen",
    name: "2級造園",
    timing: "第一次・第二次 11/15",
    free: "n182d32f7df17",
    kaisetsu: "n5dbb382823d4",
    model: "nf2b089e7550b",
    pack: null,
  },
];

function track(label: string, url: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "affiliate_click", {
      event_category: "note_home",
      event_label: label,
      link_url: url,
    });
  }
}

export default function NoteBanner() {
  const packs = EXAMS.filter((e) => e.pack);

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">
          📝 令和7年度 第二次検定の解答解説（note）
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm text-secondary mb-4">
          4資格すべての第二次検定について、
          <b className="text-heading">全問の解答解説と練習用の解答用紙</b>
          をnoteで公開しています。
          <b className="text-heading">練習用の解答用紙はすべて無料</b>
          なので、まずはそこからどうぞ。
        </p>

        {/* 合格パック（公開済みの資格だけ表示） */}
        {packs.length > 0 && (
          <div className="mb-5 space-y-3">
            {packs.map((e) => (
              <a
                key={e.key}
                href={e.pack!.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(`${e.key}-pack`, e.pack!.url)}
                className="block rounded-xl border-2 border-primary bg-primary/5 p-4 no-underline hover:bg-primary/10 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-primary text-white text-[11px] font-bold px-2 py-1 rounded-lg">
                    まとめ買いがお得
                  </span>
                  <span className="text-sm font-bold text-heading">
                    {e.name} 二次検定 合格パック
                  </span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">
                  解答解説＋模範解答{e.pack!.note}。
                  単品合計{e.pack!.listPrice} →{" "}
                  <b className="text-primary">パックなら{e.pack!.price}</b>
                </p>
              </a>
            ))}
          </div>
        )}

        {/* 資格別の単品 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXAMS.map((e) => (
            <div
              key={e.key}
              className="rounded-xl border border-border bg-card p-3"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm font-bold text-heading">{e.name}</span>
                <span className="text-[11px] text-secondary">{e.timing}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`${NOTE}${e.free}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track(`${e.key}-free`, `${NOTE}${e.free}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-heading no-underline hover:border-emerald-500 transition-colors"
                >
                  <span className="text-emerald-600">無料</span>
                  練習用 解答用紙
                </a>
                <a
                  href={`${NOTE}${e.kaisetsu}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track(`${e.key}-kaisetsu`, `${NOTE}${e.kaisetsu}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold text-heading no-underline hover:border-primary transition-colors"
                >
                  <span className="text-orange-600">500円</span>
                  全問 解答解説
                </a>
                <a
                  href={`${NOTE}${e.model}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track(`${e.key}-model`, `${NOTE}${e.model}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold text-heading no-underline hover:border-primary transition-colors"
                >
                  <span className="text-teal-600">300円</span>
                  模範解答つき
                </a>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://note.com/dobokutorisetsu"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
        >
          note「土木のトリセツ」をもっと見る →
        </a>
      </div>
    </section>
  );
}
