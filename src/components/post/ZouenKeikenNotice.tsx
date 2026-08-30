import Link from "next/link";

type Variant = "full" | "inline";

interface ZouenKeikenNoticeProps {
  /**
   * full   = 経験記述そのものを扱うページの冒頭に置く強い告知
   * inline = 二次対策・勉強法ページなどに置く短い補足
   */
  variant?: Variant;
  /** 誘導先の二次対策記事（既定は1級） */
  target?: "1kyu" | "2kyu";
}

const TARGETS = {
  "1kyu": {
    href: "/posts/zouen-1kyu-2ji-kijutsu",
    label: "1級造園 第二次検定の記述対策（現行形式）",
  },
  "2kyu": {
    href: "/posts/zouen-2kyu-2ji-kijutsu",
    label: "2級造園 第二次検定の記述対策（現行形式）",
  },
} as const;

/**
 * 造園施工管理技士の第二次検定は、令和6年度（R6）から経験記述が出題されなくなった。
 * （公式試験問題で確認：R5は「問題1＝あなたが経験した造園工事」だが、
 *   R6・R7は全問必須で、問題1は図面・工事数量表に基づく施工管理の設問）
 * 経験記述に触れている造園ページの冒頭に、この告知を必ず置く。
 */
export default function ZouenKeikenNotice({
  variant = "full",
  target = "1kyu",
}: ZouenKeikenNoticeProps) {
  const to = TARGETS[target];

  if (variant === "inline") {
    return (
      <p className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-heading">
        <b>⚠️ 造園の第二次検定は令和6年度から経験記述が出題されていません。</b>{" "}
        現在は図面・工事数量表をもとにした施工管理の記述が中心です（R6・R7とも全問必須）。
        本ページ内の経験記述に関する記述は、<b>令和5年度以前を受検した方向けの参考情報</b>としてお読みください。
      </p>
    );
  }

  return (
    <div className="my-8 rounded-xl border-2 border-amber-500 bg-amber-50 p-5">
      <p className="mb-2 text-base font-bold text-heading">
        ⚠️ 重要：造園の第二次検定から「経験記述」は出題されなくなりました
      </p>
      <p className="mb-3 text-sm leading-relaxed text-heading">
        令和5年度（R5）までは「あなたが経験した主な造園工事について述べなさい」という経験記述が問題1でしたが、
        <b>令和6年度（R6）から出題形式が変わり、1級・2級とも全問必須で、経験記述は出題されていません</b>。
        現在の問題1は、図面・工事数量表・工事に係る条件をもとに植栽基盤・移植・植栽・工程などを答える施工管理の設問です
        （R6・R7の公式試験問題で確認）。
      </p>
      <p className="mb-3 text-sm leading-relaxed text-heading">
        <b>これから造園の二次を受ける方は、経験記述の暗記に時間を使う必要はありません。</b>
        本ページは、令和5年度以前を受検した方の参考と、施工管理の記述力を鍛える練習用として残しています。
      </p>
      <Link
        href={to.href}
        className="inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white no-underline hover:bg-amber-700"
      >
        現行形式の対策はこちら → {to.label}
      </Link>
    </div>
  );
}
