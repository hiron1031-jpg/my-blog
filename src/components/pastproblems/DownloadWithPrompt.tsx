"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import type { ExamFile } from "@/lib/pastproblems-data";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const variantStyles: Record<ExamFile["variant"], string> = {
  question: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  answer: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  second: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
};

/** 二次検定 合格パック（noteの買い切りマガジン）。造園は未販売 */
const PACKS: Record<string, { url: string; price: string; label: string }> = {
  "1doboku": {
    url: "https://note.com/dobokutorisetsu/m/m64d6358b6c04",
    price: "1,980円",
    label: "1級土木 二次検定 合格パック",
  },
  "2doboku": {
    url: "https://note.com/dobokutorisetsu/m/mf8bc375f28a3",
    price: "1,480円",
    label: "2級土木 二次検定 合格パック",
  },
};

interface Props {
  files: ExamFile[];
  /** pdfUrl() を通した後のURLをサーバ側で解決して渡す */
  urls: string[];
  exam: string;
  examShortName: string;
  note?: string;
}

/**
 * 過去問PDFのダウンロードボタン群。
 *
 * このページの平均滞在は約22秒で、読者は「開く→DLする→去る」で離脱している。
 * 下方に置いた導線はスクロールされず届かないため、
 * **ダウンロードを押したその瞬間に、ボタンのすぐ下**へ次の一歩を出す。
 */
export default function DownloadWithPrompt({
  files,
  urls,
  exam,
  examShortName,
  note,
}: Props) {
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const pack = PACKS[exam];

  const handleDownload = (label: string) => {
    setDownloaded(label);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "download_prompt_shown", {
        event_category: "pastproblems",
        event_label: `${exam}-${label}`,
      });
    }
  };

  const track = (name: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, {
        event_category: "download_prompt",
        event_label: exam,
      });
    }
  };

  return (
    <>
      {note && <p className="text-xs text-gray-500 mb-3">※ {note}</p>}

      <div className="flex flex-wrap gap-2">
        {files.map((f, i) => (
          <a
            key={f.path}
            href={urls[i]}
            download
            onClick={() => handleDownload(f.label)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${variantStyles[f.variant]}`}
          >
            <FiDownload size={14} className="flex-shrink-0" />
            {f.label}
          </a>
        ))}
      </div>

      {downloaded && (
        <div className="mt-5 rounded-xl border-2 border-primary bg-primary/5 p-4 md:p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-heading mb-1">
            <FiCheckCircle size={18} className="text-primary shrink-0" />
            「{downloaded}」をダウンロードしました
          </p>
          <p className="text-sm text-secondary leading-relaxed mb-4">
            印刷して解いたあとは、<b className="text-heading">間違えた分野だけをクイズで潰す</b>
            のが最短ルートです。{examShortName}の過去問を年度別に出題できます（無料・登録不要・解説つき）。
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* PCで見ている読者にはQRでスマホへ渡す（読者の7割超がPC） */}
            <div className="hidden md:block shrink-0 rounded-lg bg-white p-2 border border-border">
              <Image
                src="/images/qr/quiz.svg"
                alt="スマホで過去問クイズを開くQRコード"
                width={92}
                height={92}
                unoptimized
              />
            </div>

            <div className="min-w-0 space-y-2">
              <Link
                href="/quiz"
                onClick={() => track("prompt_quiz_click")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white no-underline hover:opacity-90 transition"
              >
                無料クイズで弱点をつぶす
                <FiArrowRight size={15} />
              </Link>
              <p className="hidden md:block text-xs text-secondary">
                左のQRをスマホのカメラで読み取ると、通勤中や現場の休憩中にそのまま続けられます。
              </p>

              {pack && (
                <p className="text-xs text-secondary pt-1">
                  第二次検定まで受ける方は{" "}
                  <a
                    href={pack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("prompt_pack_click")}
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    {pack.label}（{pack.price}）
                  </a>{" "}
                  もあります。
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
