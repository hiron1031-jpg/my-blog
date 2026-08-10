"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PACK_URL = "https://note.com/dobokutorisetsu/m/m64d6358b6c04";

interface PackCtaProps {
  /** 見出しの一言（文脈に合わせて上書き可） */
  lead?: string;
}

/**
 * 1級土木 二次検定 合格パック（買い切りマガジン）への導線カード。
 * 経験記述・二次記述など「二次を準備する読者」が読む記事に置く。
 * 現状は1級土木のみ販売中。
 */
export default function PackCta({
  lead = "1級土木の二次検定を受ける方へ",
}: PackCtaProps) {
  return (
    <a
      href={PACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "affiliate_click", {
            event_category: "note_pack",
            event_label: "1doboku-pack",
            link_url: PACK_URL,
          });
        }
      }}
      className="block my-6 rounded-xl border-2 border-primary bg-primary/5 p-5 no-underline hover:bg-primary/10 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg" aria-hidden>💰</span>
        <span className="text-sm font-bold text-primary">{lead}</span>
      </div>
      <p className="text-[15px] font-bold text-heading leading-snug mb-1">
        二次対策をまとめた「合格パック」で、準備をこれ一つに
      </p>
      <p className="text-sm text-secondary leading-relaxed mb-3">
        解答解説＋模範解答＋解答用紙＋直前キット＋経験記述の例文集16例。
        自己採点から本番の記述練習まで完結します。単品合計2,780円 → <b>パックなら1,980円</b>。
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-white bg-primary rounded-lg px-4 py-2">
        合格パック（1,980円）を見てみる →
      </span>
    </a>
  );
}
