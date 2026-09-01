"use client";

import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Target = "quiz" | "pastproblems";

const TARGETS: Record<
  Target,
  { qr: string; url: string; title: string; body: string; cta: string }
> = {
  quiz: {
    qr: "/images/qr/quiz.svg",
    url: "/quiz",
    title: "スキマ時間はスマホで解くのが続きます",
    body: "通勤・昼休み・現場の休憩中に1問ずつ。スマホのカメラでこのQRを読み取ると、この過去問クイズがそのまま開きます。",
    cta: "スマホで過去問クイズを開く",
  },
  pastproblems: {
    qr: "/images/qr/pastproblems.svg",
    url: "/pastproblems",
    title: "帰ってからも続きを見たい方へ",
    body: "スマホのカメラでこのQRを読み取ると、このダウンロードページがスマホで開きます。移動中や自宅でも続きを確認できます。",
    cta: "スマホでこのページを開く",
  },
};

interface MobileHandoffProps {
  target: Target;
  className?: string;
}

/**
 * PCで見ている読者をスマホへ橋渡しするQRカード。
 *
 * このサイトは読者の7割超がEdge（＝職場のWindows PC）からで、
 * 滞在時間もPCが最も長い。一方でクイズや購入はスマホの方が向いているため、
 * PC表示のときだけQRを出して端末をまたげるようにする。
 * スマホでは無意味なので md 未満では非表示。
 */
export default function MobileHandoff({
  target,
  className = "",
}: MobileHandoffProps) {
  const t = TARGETS[target];

  return (
    <aside
      className={`hidden md:flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 ${className}`}
    >
      <div className="shrink-0 rounded-xl bg-white p-2 border border-border">
        <Image
          src={t.qr}
          alt={`${t.cta}ためのQRコード`}
          width={116}
          height={116}
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-base font-bold text-heading mb-1">
          <span aria-hidden>📱</span>
          {t.title}
        </p>
        <p className="text-sm text-secondary leading-relaxed">{t.body}</p>
        <p className="mt-2 text-xs text-secondary">
          読み取れない場合は{" "}
          <a
            href={t.url}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("event", "mobile_handoff_click", {
                  event_category: "handoff",
                  event_label: target,
                });
              }
            }}
            className="text-blue-600 underline underline-offset-2"
          >
            doboku-torisetsu.com{t.url}
          </a>{" "}
          をスマホのブラウザに入力してください。
        </p>
      </div>
    </aside>
  );
}
