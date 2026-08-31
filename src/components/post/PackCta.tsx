"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type PackKey = "1doboku" | "2doboku";

interface Pack {
  /** noteの買い切りマガジンURL。未公開のうちは空文字にしておく（カードは非表示になる） */
  url: string;
  defaultLead: string;
  body: string;
  price: string;
  listPrice: string;
}

const PACKS: Record<PackKey, Pack> = {
  "1doboku": {
    url: "https://note.com/dobokutorisetsu/m/m64d6358b6c04",
    defaultLead: "1級土木の二次検定を受ける方へ",
    body: "解答解説＋模範解答＋解答用紙＋直前キット＋経験記述の例文集16例。自己採点から本番の記述練習まで完結します。",
    price: "1,980円",
    listPrice: "2,780円",
  },
  "2doboku": {
    url: "https://note.com/dobokutorisetsu/m/mf8bc375f28a3",
    defaultLead: "2級土木の二次検定（10月25日）を受ける方へ",
    body: "解答解説（全8問）＋模範解答入り解答用紙＋直前キット＋経験記述の例文集16例。一次の発表を待たずに二次の準備を始められます。",
    price: "1,480円",
    listPrice: "2,280円",
  },
};

interface PackCtaProps {
  /** どの資格のパックを出すか（既定は1級土木） */
  exam?: PackKey;
  /** 見出しの一言（文脈に合わせて上書き可） */
  lead?: string;
}

/**
 * 二次検定 合格パック（noteの買い切りマガジン）への導線カード。
 * 経験記述・二次記述など「二次を準備する読者」が読む記事に置く。
 * URLが未設定の資格は何も表示しない（公開前に置いておいても安全）。
 */
export default function PackCta({ exam = "1doboku", lead }: PackCtaProps) {
  const pack = PACKS[exam];
  if (!pack.url) return null;

  return (
    <a
      href={pack.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "affiliate_click", {
            event_category: "note_pack",
            event_label: `${exam}-pack`,
            link_url: pack.url,
          });
        }
      }}
      className="block my-6 rounded-xl border-2 border-primary bg-primary/5 p-5 no-underline hover:bg-primary/10 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg" aria-hidden>💰</span>
        <span className="text-sm font-bold text-primary">{lead ?? pack.defaultLead}</span>
      </div>
      <p className="text-[15px] font-bold text-heading leading-snug mb-1">
        二次対策をまとめた「合格パック」で、準備をこれ一つに
      </p>
      <p className="text-sm text-secondary leading-relaxed mb-3">
        {pack.body}
        単品合計{pack.listPrice} → <b>パックなら{pack.price}</b>。
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-white bg-primary rounded-lg px-4 py-2">
        合格パック（{pack.price}）を見てみる →
      </span>
    </a>
  );
}
