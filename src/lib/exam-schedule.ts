// 試験日程の唯一の正。ここ以外に日付を直書きしないこと。
//
// 出典：一般財団法人 全国建設研修センター（JCTC）各資格ページ
//   1級土木 https://www.jctc.jp/exam/doboku-1/
//   2級土木 https://www.jctc.jp/exam/doboku-2/
//   1級造園 https://www.jctc.jp/exam/zouen-1/
//   2級造園 https://www.jctc.jp/exam/zouen-2/
// 最終確認：2026-10-22
//
// 新年度の日程が公表されたら、ここに追記するだけでトップのバナーと
// 各資格ページの表示が同時に更新される。

export type ExamId = "1doboku" | "2doboku" | "1zou" | "2zou";

export type ExamEvent = {
  examId: ExamId;
  /** バナーに出す名前。短く */
  name: string;
  /** 何の検定か。「第一次・第二次 同日」などの補足 */
  note?: string;
  /** JSTの試験日。YYYY-MM-DD */
  date: string;
  /** 表示用の和暦 */
  dateLabel: string;
  /** 直前対策など、その試験の人に読ませたい記事 */
  href: string;
  /** リンクの文言 */
  linkLabel: string;
  /**
   * 試験当日だけ飛ばす先（持ち物・タイムスケジュールの記事）。
   * 当日の朝に「直前対策の6週間プラン」を見せても意味がないため。
   */
  hrefOnExamDay?: string;
  /** 試験当日のリンク文言 */
  linkLabelOnExamDay?: string;
  /** 合格発表（分かっている場合） */
  results?: { label: string; date: string }[];
};

export const EXAM_EVENTS: ExamEvent[] = [
  {
    examId: "2doboku",
    name: "2級土木 後期",
    note: "第一次・第二次 同日",
    date: "2026-10-25",
    dateLabel: "令和8年10月25日（日）",
    href: "/posts/doboku-2kyu-r8-kouki-chokuzen",
    linkLabel: "直前対策を見る",
    hrefOnExamDay: "/posts/doboku-2kyu-tojitsu",
    linkLabelOnExamDay: "持ち物と当日の流れ",
    results: [
      { label: "第一次検定", date: "令和8年12月2日（水）" },
      { label: "第二次検定", date: "令和9年2月3日（水）" },
    ],
  },
  {
    examId: "2zou",
    name: "2級造園",
    note: "第一次（後期）・第二次 同日",
    date: "2026-11-15",
    dateLabel: "令和8年11月15日（日）",
    href: "/posts/zouen-2kyu-r8-chokuzen",
    linkLabel: "直前対策を見る",
    hrefOnExamDay: "/posts/zouen-2kyu-tojitsu",
    linkLabelOnExamDay: "持ち物と当日の流れ",
    results: [
      { label: "第一次検定（後期）", date: "令和9年1月5日（火）" },
      { label: "第二次検定", date: "令和9年3月3日（水）" },
    ],
  },
  {
    examId: "1zou",
    name: "1級造園 第二次",
    date: "2026-12-06",
    dateLabel: "令和8年12月6日（日）",
    href: "/posts/zouen-1kyu-2ji-oikomi",
    linkLabel: "追い込み対策を見る",
    hrefOnExamDay: "/posts/zouen-1kyu-tojitsu",
    linkLabelOnExamDay: "持ち物と当日の流れ",
    results: [{ label: "第二次検定", date: "令和9年3月3日（水）" }],
  },
];

/** JSTでの「今日」を YYYY-MM-DD で返す */
export function todayJst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** YYYY-MM-DD どうしの日数差。相手が未来なら正。 */
export function daysBetween(fromYmd: string, toYmd: string): number {
  const a = Date.parse(fromYmd + "T00:00:00Z");
  const b = Date.parse(toYmd + "T00:00:00Z");
  return Math.round((b - a) / 86_400_000);
}

/** バナーを出し始める日数 */
export const BANNER_LEAD_DAYS = 30;

/**
 * いま告知すべき試験を1件返す。無ければ null。
 * 試験日を過ぎたものは自動的に対象外になるので、消し忘れが起きない。
 */
export function getUpcomingExam(now: Date = new Date()): { exam: ExamEvent; daysLeft: number } | null {
  const today = todayJst(now);
  const candidates = EXAM_EVENTS.map((exam) => ({ exam, daysLeft: daysBetween(today, exam.date) }))
    .filter(({ daysLeft }) => daysLeft >= 0 && daysLeft <= BANNER_LEAD_DAYS)
    .sort((a, b) => a.daysLeft - b.daysLeft);
  return candidates[0] ?? null;
}

/** 資格ページ用。その資格の次の試験を返す（日数制限なし） */
export function getNextExamFor(examId: string, now: Date = new Date()): ExamEvent | null {
  const today = todayJst(now);
  return (
    EXAM_EVENTS.filter((e) => e.examId === examId && daysBetween(today, e.date) >= 0).sort((a, b) =>
      a.date.localeCompare(b.date),
    )[0] ?? null
  );
}
