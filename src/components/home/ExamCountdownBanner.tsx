"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUpcomingExam, type ExamEvent } from "@/lib/exam-schedule";

// トップページは静的生成されるため、サーバー側で日数を計算すると
// ビルドした日の値で固定されてしまう。閲覧者のブラウザで計算する。
export default function ExamCountdownBanner() {
  const [state, setState] = useState<{ exam: ExamEvent; daysLeft: number } | null>(null);

  useEffect(() => {
    setState(getUpcomingExam());
  }, []);

  if (!state) return null;

  const { exam, daysLeft } = state;
  const isToday = daysLeft === 0;
  const isUrgent = daysLeft <= 7;

  const headline = isToday
    ? `今日は${exam.name}の試験日です`
    : `${exam.name}まで あと${daysLeft}日`;

  return (
    <section className="mb-5 sm:mb-6">
      <Link
        href={exam.href}
        className={[
          "group flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5",
          "border-2 shadow-sm transition hover:shadow-md",
          isUrgent ? "border-red-500/70 bg-red-50" : "border-accent/70 bg-accent/10",
        ].join(" ")}
      >
        <span
          className={[
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white",
            isUrgent ? "bg-red-600" : "bg-primary",
          ].join(" ")}
        >
          {isToday ? "本番" : "試験直前"}
        </span>

        <span className="text-sm sm:text-base font-extrabold text-heading">
          {isToday ? "🎌" : "⏰"} {headline}
        </span>

        <span className="text-xs sm:text-sm text-secondary">
          {exam.dateLabel}
          {exam.note ? `・${exam.note}` : ""}
        </span>

        <span className="ml-auto shrink-0 text-xs sm:text-sm font-bold text-primary group-hover:underline">
          {isToday ? "持ち物と当日の流れ" : exam.linkLabel} →
        </span>
      </Link>
    </section>
  );
}
