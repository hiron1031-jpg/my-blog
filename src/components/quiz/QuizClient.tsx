"use client";

import { useState, useEffect } from "react";
import BeaverMascot from "@/components/layout/BeaverMascot";

// ---- Types ----
export interface QuizQuestion {
  id: string;
  exam: string;
  year?: string;
  number?: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// セクション付き年度別データ構造
// { exam: { year: { section: QuizQuestion[] } } }
export type YearQuestionsMap = {
  [exam: string]: {
    [year: string]: {
      [section: string]: QuizQuestion[];
    };
  };
};

type ExamId = "all" | "doboku-1kyu" | "doboku-2kyu" | "zouen-1kyu" | "zouen-2kyu";
type Mode = "practice" | "year";
type Phase = "start" | "select-section" | "playing" | "answered" | "finished";
type PlayMode = "all" | "random";

interface ExamScore {
  best: number;
  total: number;
  lastPlayed: string;
}
type ScoreMap = Record<string, ExamScore>;

// ---- Constants ----
const EXAM_CONFIGS: Array<{
  id: ExamId;
  label: string;
  sub: string;
  gradient: string;
  hover: string;
}> = [
  {
    id: "all",
    label: "全問題",
    sub: "40問・全試験種別",
    gradient: "from-[#1e3a5f] to-[#2d5494]",
    hover: "hover:from-[#162d4a] hover:to-[#1e3a5f]",
  },
  {
    id: "doboku-1kyu",
    label: "1級土木",
    sub: "10問",
    gradient: "from-[#1e3a5f] to-[#2d5494]",
    hover: "hover:from-[#162d4a] hover:to-[#1e3a5f]",
  },
  {
    id: "doboku-2kyu",
    label: "2級土木",
    sub: "10問",
    gradient: "from-[#e8622a] to-[#f08c4b]",
    hover: "hover:from-[#c94f1c] hover:to-[#e8622a]",
  },
  {
    id: "zouen-1kyu",
    label: "1級造園",
    sub: "10問",
    gradient: "from-[#2d6a4f] to-[#40916c]",
    hover: "hover:from-[#1b4332] hover:to-[#2d6a4f]",
  },
  {
    id: "zouen-2kyu",
    label: "2級造園",
    sub: "10問",
    gradient: "from-[#f4a261] to-[#e76f51]",
    hover: "hover:from-[#e76f51] hover:to-[#d4522a]",
  },
];

const YEAR_EXAM_CONFIGS: Array<{
  examKey: string;
  label: string;
  gradient: string;
  hover: string;
  color: string;
}> = [
  {
    examKey: "doboku-1kyu",
    label: "1級土木施工管理技士",
    gradient: "from-[#1e3a5f] to-[#2d5494]",
    hover: "hover:from-[#162d4a] hover:to-[#1e3a5f]",
    color: "#1e3a5f",
  },
  {
    examKey: "doboku-2kyu",
    label: "2級土木施工管理技士",
    gradient: "from-[#e8622a] to-[#f08c4b]",
    hover: "hover:from-[#c94f1c] hover:to-[#e8622a]",
    color: "#e8622a",
  },
  {
    examKey: "zouen-1kyu",
    label: "1級造園施工管理技士",
    gradient: "from-[#2d6a4f] to-[#40916c]",
    hover: "hover:from-[#1b4332] hover:to-[#2d6a4f]",
    color: "#2d6a4f",
  },
  {
    examKey: "zouen-2kyu",
    label: "2級造園施工管理技士",
    gradient: "from-[#f4a261] to-[#e76f51]",
    hover: "hover:from-[#e76f51] hover:to-[#d4522a]",
    color: "#e76f51",
  },
];

const OPTION_LABELS = ["⑴", "⑵", "⑶", "⑷"];
const RANDOM_COUNT_OPTIONS = [10, 20, 30] as const;

// ---- Utilities ----
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMessage(correct: number, total: number): string {
  const pct = correct / total;
  if (pct >= 0.9) return "素晴らしい！ほぼ完璧な正答率です！合格ライン突破！";
  if (pct >= 0.7) return "合格ラインに到達！この調子で過去問もチャレンジしよう！";
  if (pct >= 0.5) return "半分以上正解！もう少しで合格ラインです。苦手分野を復習しよう！";
  return "まだ伸びしろがあります！解説をよく読んで再チャレンジしよう！";
}

function getScoreKey(examKey: string, year: string, section: string, playMode: PlayMode, count: number) {
  return `year-${examKey}-${year}-${section}-${playMode}-${count}`;
}

// ---- Main Component ----
export default function QuizClient({
  questions,
  yearQuestions,
}: {
  questions: QuizQuestion[];
  yearQuestions: YearQuestionsMap;
}) {
  const [mode, setMode] = useState<Mode>("practice");
  const [phase, setPhase] = useState<Phase>("start");

  // 現在のクイズ設定
  const [quizKey, setQuizKey] = useState<string>("all");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});

  // セクション選択状態
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [playMode, setPlayMode] = useState<PlayMode>("all");
  const [randomCount, setRandomCount] = useState<number>(10);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("quiz-scores-v2");
      if (saved) setScores(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;

  // ---- Handlers ----
  function startPracticeQuiz(examId: ExamId) {
    const pool =
      examId === "all"
        ? questions
        : questions.filter((q) => q.exam === examId);
    const shuffled = shuffle(pool);
    setQuizKey(examId);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers(new Array(shuffled.length).fill(null));
    setSelectedOption(null);
    setPhase("playing");
  }

  function openSectionSelect(examKey: string, year: string) {
    setSelectedExam(examKey);
    setSelectedYear(year);
    const sections = Object.keys(yearQuestions[examKey]?.[year] ?? {});
    if (sections.length === 1) {
      setSelectedSection(sections[0]);
      setPhase("select-section");
    } else {
      setSelectedSection(sections[0] ?? "");
      setPhase("select-section");
    }
  }

  function launchYearQuiz(examKey: string, year: string, section: string, pMode: PlayMode, rCount: number) {
    const pool = yearQuestions[examKey]?.[year]?.[section] ?? [];
    const total = pool.length;
    if (total === 0) return;

    let finalPool: QuizQuestion[];
    if (pMode === "all") {
      // 全問: 出題番号順
      finalPool = [...pool].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
    } else {
      // ランダム: min(rCount, total)問
      finalPool = shuffle(pool).slice(0, Math.min(rCount, total));
    }

    const key = getScoreKey(examKey, year, section, pMode, finalPool.length);
    setQuizKey(key);
    setActiveQuestions(finalPool);
    setCurrentIndex(0);
    setAnswers(new Array(finalPool.length).fill(null));
    setSelectedOption(null);
    setPhase("playing");
  }

  function selectAnswer(optionIndex: number) {
    if (phase === "answered") return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
    setPhase("answered");
  }

  function nextQuestion() {
    if (currentIndex === totalQuestions - 1) {
      finishQuiz();
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setPhase("playing");
    }
  }

  function finishQuiz() {
    setPhase("finished");
    try {
      const score = answers.filter(
        (a, i) => a !== null && a === activeQuestions[i]?.correctIndex
      ).length;
      const today = new Date().toISOString().slice(0, 10);
      const saved: ScoreMap = JSON.parse(
        localStorage.getItem("quiz-scores-v2") ?? "{}"
      );
      const prev = saved[quizKey];
      saved[quizKey] = {
        best: prev && prev.best >= score ? prev.best : score,
        total: totalQuestions,
        lastPlayed: today,
      };
      localStorage.setItem("quiz-scores-v2", JSON.stringify(saved));
      setScores({ ...saved });
    } catch { /* ignore */ }
  }

  function retryQuiz() {
    if (quizKey.startsWith("year-")) {
      launchYearQuiz(selectedExam, selectedYear, selectedSection, playMode, randomCount);
    } else {
      startPracticeQuiz(quizKey as ExamId);
    }
  }

  function getOptionClass(optionIndex: number): string {
    const base =
      "w-full text-left flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 font-medium transition-all duration-150 text-sm";
    if (phase !== "answered") {
      return `${base} border-border bg-white text-secondary hover:border-primary hover:bg-surface cursor-pointer`;
    }
    if (optionIndex === currentQuestion?.correctIndex) {
      return `${base} border-green-500 bg-green-50 text-green-800 cursor-default`;
    }
    if (optionIndex === selectedOption) {
      return `${base} border-red-400 bg-red-50 text-red-800 cursor-default`;
    }
    return `${base} border-border bg-white text-secondary/40 cursor-default`;
  }

  // ---- Render: Section Select Screen ----
  if (phase === "select-section") {
    const examConfig = YEAR_EXAM_CONFIGS.find((e) => e.examKey === selectedExam);
    const yearData = yearQuestions[selectedExam]?.[selectedYear] ?? {};
    const sections = Object.keys(yearData).sort();

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={() => setPhase("start")}
          className="text-sm text-secondary/50 hover:text-secondary flex items-center gap-1"
        >
          ← 戻る
        </button>

        <div
          className="rounded-2xl p-5 text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${examConfig?.color ?? "#1e3a5f"} 0%, #2d5494 100%)` }}
        >
          <p className="text-sm font-medium text-white/70">{examConfig?.label}</p>
          <p className="text-2xl font-bold mt-1">{selectedYear}年度</p>
        </div>

        {/* セクション選択 */}
        {sections.length > 1 && (
          <div>
            <p className="text-xs font-bold text-secondary/50 mb-2 px-1">試験区分を選択</p>
            <div className="flex gap-2 flex-wrap">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSection(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-colors ${
                    selectedSection === s
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-secondary hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSection && (() => {
          const pool = yearData[selectedSection] ?? [];
          const total = pool.length;
          const scoreAll = scores[getScoreKey(selectedExam, selectedYear, selectedSection, "all", total)];
          const availableRandom = RANDOM_COUNT_OPTIONS.filter((n) => n < total);

          return (
            <div className="space-y-3">
              <p className="text-xs text-secondary/50 px-1">
                {selectedSection}　全<span className="font-bold text-secondary">{total}</span>問
              </p>

              {/* 全問チャレンジ */}
              <button
                onClick={() => launchYearQuiz(selectedExam, selectedYear, selectedSection, "all", total)}
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-secondary text-white hover:bg-[#162d4a] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="text-left">
                  <p className="font-bold text-lg">全問チャレンジ</p>
                  <p className="text-white/70 text-sm">全{total}問を出題順に解く</p>
                </div>
                <div className="text-right">
                  {scoreAll ? (
                    <div className="text-sm text-white/70">
                      <p>ベスト</p>
                      <p className="font-bold text-white text-base">
                        {scoreAll.best}/{total}
                      </p>
                    </div>
                  ) : (
                    <span className="text-white/40 text-2xl">→</span>
                  )}
                </div>
              </button>

              {/* ランダム */}
              <div className="bg-white border border-border rounded-2xl p-4 space-y-3">
                <p className="text-sm font-bold text-secondary">ランダム出題</p>
                <div className="grid grid-cols-3 gap-2">
                  {availableRandom.map((n) => {
                    const scoreRand = scores[getScoreKey(selectedExam, selectedYear, selectedSection, "random", n)];
                    return (
                      <button
                        key={n}
                        onClick={() => launchYearQuiz(selectedExam, selectedYear, selectedSection, "random", n)}
                        className="flex flex-col items-center px-3 py-3 rounded-xl bg-surface border border-border hover:border-primary hover:bg-[#fdf3ee] transition-colors text-secondary"
                      >
                        <span className="font-bold text-xl text-primary">{n}</span>
                        <span className="text-xs text-secondary/60">問</span>
                        {scoreRand && (
                          <span className="text-xs text-secondary/50 mt-1">
                            {scoreRand.best}/{n}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {/* 全問ランダム */}
                  <button
                    onClick={() => launchYearQuiz(selectedExam, selectedYear, selectedSection, "random", total)}
                    className="flex flex-col items-center px-3 py-3 rounded-xl bg-surface border border-border hover:border-primary hover:bg-[#fdf3ee] transition-colors text-secondary"
                  >
                    <span className="font-bold text-xl text-primary">{total}</span>
                    <span className="text-xs text-secondary/60">問（全問）</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // ---- Render: Start Screen ----
  if (phase === "start") {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Mode Tabs */}
        <div className="flex gap-1 bg-surface border border-border rounded-xl p-1">
          {(["practice", "year"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-colors ${
                mode === m
                  ? "bg-white text-secondary shadow-sm"
                  : "text-secondary/50 hover:text-secondary"
              }`}
            >
              {m === "practice" ? "📚 練習モード" : "📅 年度別"}
            </button>
          ))}
        </div>

        {/* ── 練習モード ── */}
        {mode === "practice" && (
          <div className="space-y-3">
            <p className="text-xs text-secondary/50 px-1">試験種別を選んでスタート（ランダム出題）</p>
            <button
              onClick={() => startPracticeQuiz("all")}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-br ${EXAM_CONFIGS[0].gradient} ${EXAM_CONFIGS[0].hover} transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white`}
            >
              <div className="text-left">
                <p className="font-bold text-lg">{EXAM_CONFIGS[0].label}</p>
                <p className="text-white/80 text-sm">{EXAM_CONFIGS[0].sub}</p>
              </div>
              {scores["all"] && (
                <div className="text-right text-sm text-white/80">
                  <p>ベスト</p>
                  <p className="font-bold text-white text-base">
                    {scores["all"].best}/{questions.length}問
                  </p>
                </div>
              )}
            </button>
            <div className="grid grid-cols-2 gap-3">
              {EXAM_CONFIGS.slice(1).map((config) => {
                const examQs = questions.filter((q) => q.exam === config.id);
                const score = scores[config.id];
                return (
                  <button
                    key={config.id}
                    onClick={() => startPracticeQuiz(config.id)}
                    className={`flex flex-col items-start px-4 py-4 rounded-2xl bg-gradient-to-br ${config.gradient} ${config.hover} transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white`}
                  >
                    <p className="font-bold text-base">{config.label}</p>
                    <p className="text-white/80 text-xs mt-0.5">{config.sub}</p>
                    {score ? (
                      <p className="text-white/70 text-xs mt-2">
                        ベスト: {score.best}/{examQs.length}問
                      </p>
                    ) : (
                      <p className="text-white/50 text-xs mt-2">未挑戦</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 年度別モード ── */}
        {mode === "year" && (
          <div className="space-y-6">
            {YEAR_EXAM_CONFIGS.map((examConfig) => {
              const examData = yearQuestions[examConfig.examKey];
              if (!examData) return null;
              const years = Object.keys(examData).sort((a, b) => b.localeCompare(a));
              if (years.length === 0) return null;

              return (
                <div key={examConfig.examKey} className="space-y-2">
                  <p className="text-sm font-bold text-heading px-1 flex items-center gap-2">
                    <span
                      className="w-1 h-4 rounded-full inline-block"
                      style={{ background: examConfig.color }}
                    />
                    {examConfig.label}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {years.map((year) => {
                      const yearData = examData[year];
                      // 全セクションの問題数合計
                      const totalQ = Object.values(yearData).reduce(
                        (sum, qs) => sum + qs.length,
                        0
                      );
                      const sections = Object.keys(yearData);
                      const firstSection = sections[0] ?? "";
                      const firstPool = yearData[firstSection] ?? [];
                      const bestScore = scores[
                        getScoreKey(examConfig.examKey, year, firstSection, "all", firstPool.length)
                      ];

                      return (
                        <button
                          key={year}
                          onClick={() => openSectionSelect(examConfig.examKey, year)}
                          className={`flex flex-col items-start px-4 py-4 rounded-2xl bg-gradient-to-br ${examConfig.gradient} ${examConfig.hover} transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white text-left`}
                        >
                          <p className="font-bold text-lg">{year}年度</p>
                          <p className="text-white/70 text-xs mt-0.5">
                            {sections.length > 1
                              ? sections.join(" / ")
                              : firstSection}
                            　{totalQ}問
                          </p>
                          {bestScore ? (
                            <p className="text-white/60 text-xs mt-2">
                              ベスト: {bestScore.best}/{firstPool.length}
                            </p>
                          ) : (
                            <p className="text-white/40 text-xs mt-2">未挑戦</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    );
  }

  // ---- Render: Result Screen ----
  if (phase === "finished") {
    const finalScore = answers.filter(
      (a, i) => a !== null && a === activeQuestions[i]?.correctIndex
    ).length;
    const pct = Math.round((finalScore / totalQuestions) * 100);

    // カテゴリ別正答率
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    activeQuestions.forEach((q, i) => {
      if (!categoryStats[q.category]) categoryStats[q.category] = { correct: 0, total: 0 };
      categoryStats[q.category].total++;
      if (answers[i] === q.correctIndex) categoryStats[q.category].correct++;
    });
    const weakCategories = Object.entries(categoryStats)
      .filter(([, s]) => s.total >= 2 && s.correct / s.total < 0.5)
      .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
      .slice(0, 3);

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <BeaverMascot preset={pct >= 70 ? "celebrate" : "safety"} size={80} />
          </div>
          <div className="text-6xl font-bold text-primary mb-1">
            {finalScore}
            <span className="text-3xl text-secondary/40">/{totalQuestions}</span>
          </div>
          <p className="text-secondary font-medium mb-3">問正解（{pct}%）</p>
          <div className="w-full bg-border rounded-full h-3 mb-4">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-secondary mb-6">{getMessage(finalScore, totalQuestions)}</p>

          {/* 苦手カテゴリ */}
          {weakCategories.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs font-bold text-orange-700 mb-2">復習が必要なカテゴリ</p>
              {weakCategories.map(([cat, s]) => (
                <div key={cat} className="flex items-center justify-between text-sm text-orange-800 mb-1">
                  <span>{cat}</span>
                  <span className="font-bold">
                    {s.correct}/{s.total}問正解
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={retryQuiz}
              className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#c94f1c] transition-colors"
            >
              もう一度
            </button>
            <button
              onClick={() => { setPhase("start"); }}
              className="flex-1 py-3 bg-surface border border-border text-secondary font-bold rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              別のクイズへ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Render: Playing / Answered Screen ----
  if (!currentQuestion) return null;

  const progressPct = ((currentIndex + (phase === "answered" ? 1 : 0)) / totalQuestions) * 100;
  const isCorrect = phase === "answered" && selectedOption === currentQuestion.correctIndex;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-sm text-secondary/60">
        <span className="text-xs text-secondary/60 truncate max-w-[60%]">
          {quizKey.startsWith("year-")
            ? `${selectedYear}年度 ${selectedSection}`
            : EXAM_CONFIGS.find((c) => c.id === quizKey)?.label ?? quizKey}
        </span>
        <span>
          <span className="font-bold text-primary text-base">{currentIndex + 1}</span>
          <span className="text-secondary/40">/{totalQuestions}</span>
          {currentQuestion.number && (
            <span className="ml-2 text-xs text-secondary/40">（No.{currentQuestion.number}）</span>
          )}
        </span>
      </div>
      <div className="w-full bg-border rounded-full h-1.5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <span className="inline-block text-xs font-medium bg-surface border border-border text-secondary px-2 py-0.5 rounded-full mb-3">
          {currentQuestion.category}
        </span>
        <p className="text-secondary font-medium text-base leading-relaxed">
          {currentQuestion.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => selectAnswer(i)}
            className={getOptionClass(i)}
            disabled={phase === "answered"}
          >
            <span className="flex-shrink-0 inline-flex w-7 h-7 rounded-full bg-secondary/10 text-secondary text-xs font-bold items-center justify-center">
              {OPTION_LABELS[i]}
            </span>
            <span className="flex-1">{option}</span>
            {phase === "answered" && i === currentQuestion.correctIndex && (
              <span className="flex-shrink-0 text-green-600 font-bold text-sm">✓</span>
            )}
            {phase === "answered" &&
              i === selectedOption &&
              i !== currentQuestion.correctIndex && (
                <span className="flex-shrink-0 text-red-500 font-bold text-sm">✗</span>
              )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {phase === "answered" && (
        <div
          className={`rounded-xl border-l-4 p-4 text-sm leading-relaxed ${
            isCorrect
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-400 text-red-800"
          }`}
        >
          <p className="font-bold mb-1">
            {isCorrect ? "✓ 正解！" : `✗ 不正解　正解は ${OPTION_LABELS[currentQuestion.correctIndex]}`}
          </p>
          {currentQuestion.explanation && (
            <p>{currentQuestion.explanation}</p>
          )}
        </div>
      )}

      {/* Next button */}
      {phase === "answered" && (
        <button
          onClick={nextQuestion}
          className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl hover:bg-[#162d4a] transition-colors"
        >
          {currentIndex === totalQuestions - 1 ? "結果を見る →" : "次の問題 →"}
        </button>
      )}
    </div>
  );
}
