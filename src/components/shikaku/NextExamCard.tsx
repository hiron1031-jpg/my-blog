"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { todayJst, daysBetween, type ExamEvent } from "@/lib/exam-schedule";

// 日付はサーバー側で描画してHTMLに含める（「2級土木 試験日」等で検索されるため、
// 検索エンジンに読ませたい）。試験が終わったあとの非表示と「あと○日」のバッジだけ、
// 閲覧者のブラウザで判定する。
export default function NextExamCard({ exam }: { exam: ExamEvent }) {
  // null = 未判定（サーバー描画直後）。数値 = 判定済み。
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    setDaysLeft(daysBetween(todayJst(), exam.date));
  }, [exam.date]);

  // 試験日を過ぎていたら消す（ビルドしていなくても自動で消える）
  if (daysLeft !== null && daysLeft < 0) return null;

  const isUrgent = daysLeft !== null && daysLeft <= 30;

  return (
    <section className="mb-8">
      <div
        className={[
          "rounded-2xl border-2 p-5",
          isUrgent ? "border-red-500/60 bg-red-50" : "border-border bg-card",
        ].join(" ")}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
            <FiCalendar /> 次の試験日
          </span>
          {isUrgent && (
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
              {daysLeft === 0 ? "本日" : `あと${daysLeft}日`}
            </span>
          )}
        </div>

        <p className="text-lg font-extrabold text-heading leading-snug">
          {exam.dateLabel}
          {exam.note && (
            <span className="ml-2 text-sm font-bold text-secondary">（{exam.note}）</span>
          )}
        </p>

        {exam.results && exam.results.length > 0 && (
          <p className="mt-1.5 text-sm text-secondary">
            合格発表：
            {exam.results.map((r, i) => (
              <span key={r.label}>
                {i > 0 && "／"}
                {r.label} {r.date}
              </span>
            ))}
          </p>
        )}

        <Link
          href={exam.href}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-primary-dark"
        >
          {exam.linkLabel} →
        </Link>

        <p className="mt-2 text-xs text-secondary">
          出典：
          <a
            href="https://www.jctc.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            一般財団法人 全国建設研修センター
          </a>
        </p>
      </div>
    </section>
  );
}
