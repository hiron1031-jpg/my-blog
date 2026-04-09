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

export type YearQuestionsMap = {
  [exam: string]: {
    [year: string]: QuizQuestion[];
  };
};

type ExamId = "all" | "doboku-1kyu" | "doboku-2kyu" | "zouen-1kyu" | "zouen-2kyu";
type Mode = "practice" | "year";
type Phase = "start" | "playing" | "answered" | "finished";

interface ExamScore {
  best: number;
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

// 年度別が存在する試験の定義
const YEAR_EXAM_CONFIGS: Array<{
  examKey: string;
  label: string;
  gradient: string;
}> = [
  {
    examKey: "doboku-1kyu",
    label: "1級土木施工管理技士",
    gradient: "from-[#1e3a5f] to-[#2d5494]",
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

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
  if (pct >= 0.9) return "🎉 素晴らしい！ほぼ完璧な正答率です！合格ライン突破！";
  if (pct >= 0.7) return "👍 合格ラインに到達！この調子で過去問もチャレンジしよう！";
  if (pct >= 0.5) return "📖 半分以上正解！もう少しで合格ラインです。苦手分野を復習しよう！";
  return "💪 まだ伸びしろがあります！解説をよく読んで再チャレンジしよう！";
}

function getExamLabel(id: string): string {
  const found = EXAM_CONFIGS.find((c) => c.id === id);
  if (found) return found.label;
  // Year key: "year-doboku-1kyu-R6" → "1級土木 R6年度"
  const m = id.match(/^year-(\w+)-(\w+)$/);
  if (m) {
    const exam = YEAR_EXAM_CONFIGS.find((e) => e.examKey === m[1]);
    return exam ? `${exam.label} ${m[2]}年度` : id;
  }
  return id;
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
  const [quizKey, setQuizKey] = useState<string>("all");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});

  // Load scores from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quiz-scores");
      if (saved) setScores(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // Derived
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

  function startYearQuiz(examKey: string, year: string) {
    const pool = yearQuestions[examKey]?.[year] ?? [];
    // Year quizzes are in order (not shuffled)
    setQuizKey(`year-${examKey}-${year}`);
    setActiveQuestions(pool);
    setCurrentIndex(0);
    setAnswers(new Array(pool.length).fill(null));
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
    const isLast = currentIndex === totalQuestions - 1;
    if (isLast) {
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
        localStorage.getItem("quiz-scores") ?? "{}"
      );
      const prev = saved[quizKey];
      saved[quizKey] = {
        best: prev && prev.best >= score ? prev.best : score,
        lastPlayed: today,
      };
      localStorage.setItem("quiz-scores", JSON.stringify(saved));
      setScores({ ...saved });
    } catch {
      // ignore
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
              {m === "practice" ? "📚 練習問題" : "📅 年度別"}
            </button>
          ))}
        </div>

        {/* Practice Mode */}
        {mode === "practice" && (
          <div className="space-y-3">
            <p className="text-xs text-secondary/50 px-1">試験種別を選んでスタート</p>
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
                  <p>前回ベスト</p>
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

        {/* Year Mode */}
        {mode === "year" && (
          <div className="space-y-5">
            {YEAR_EXAM_CONFIGS.map((examConfig) => {
              const years = Object.keys(yearQuestions[examConfig.examKey] ?? {}).sort(
                (a, b) => b.localeCompare(a)
              );
              if (years.length === 0) return null;
              return (
                <div key={examConfig.examKey} className="space-y-2">
                  <p className="text-sm font-bold text-heading px-1 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full inline-block" />
                    {examConfig.label}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {years.map((year) => {
                      const pool = yearQuestions[examConfig.examKey][year];
                      const scoreKey = `year-${examConfig.examKey}-${year}`;
                      const score = scores[scoreKey];
                      return (
                        <button
                          key={year}
                          onClick={() => startYearQuiz(examConfig.examKey, year)}
                          className={`flex flex-col items-start px-5 py-4 rounded-2xl bg-gradient-to-br ${examConfig.gradient} hover:from-[#162d4a] hover:to-[#1e3a5f] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white`}
                        >
                          <p className="font-bold text-lg">{year}年度</p>
                          <p className="text-white/80 text-xs mt-0.5">
                            全{pool.length}問
                          </p>
                          {score ? (
                            <p className="text-white/70 text-xs mt-2">
                              ベスト: {score.best}/{pool.length}問
                            </p>
                          ) : (
                            <p className="text-white/50 text-xs mt-2">未挑戦</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Coming soon notice for other exams */}
            <div className="rounded-xl border border-dashed border-border p-4 text-center text-secondary/40 text-sm">
              2級土木・造園の年度別問題は順次追加予定です
            </div>
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
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <BeaverMascot preset={pct >= 70 ? "celebrate" : "safety"} size={80} />
          </div>
          <p className="text-sm text-secondary/60 mb-2">{getExamLabel(quizKey)}</p>
          <div className="text-6xl font-bold text-primary mb-1">
            {finalScore}
            <span className="text-3xl text-secondary/40">/{totalQuestions}</span>
          </div>
          <p className="text-secondary font-medium mb-4">問正解（{pct}%）</p>
          <div className="w-full bg-border rounded-full h-3 mb-4">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-secondary mb-6">{getMessage(finalScore, totalQuestions)}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                // Retry same quiz
                const isYear = quizKey.startsWith("year-");
                if (isYear) {
                  const m = quizKey.match(/^year-(\w+)-(\w+)$/);
                  if (m) startYearQuiz(m[1], m[2]);
                } else {
                  startPracticeQuiz(quizKey as ExamId);
                }
              }}
              className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#c94f1c] transition-colors"
            >
              もう一度
            </button>
            <button
              onClick={() => setPhase("start")}
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

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-secondary/60">
        <span className="font-medium text-secondary text-xs">{getExamLabel(quizKey)}</span>
        <span>
          <span className="font-bold text-primary text-base">{currentIndex + 1}</span>
          /{totalQuestions}問
          {currentQuestion.number && (
            <span className="ml-2 text-xs text-secondary/40">
              （問題{currentQuestion.number}）
            </span>
          )}
        </span>
      </div>
      <div className="w-full bg-border rounded-full h-1.5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{
            width: `${
              ((currentIndex + (phase === "answered" ? 1 : 0)) / totalQuestions) * 100
            }%`,
          }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="mb-1">
          <span className="inline-block text-xs font-medium bg-surface border border-border text-secondary px-2 py-0.5 rounded-full">
            {currentQuestion.category}
          </span>
        </div>
        <p className="text-secondary font-medium text-base leading-relaxed mt-3">
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
            <span className="flex-shrink-0 inline-flex w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs font-bold items-center justify-center">
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
            selectedOption === currentQuestion.correctIndex
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-400 text-red-800"
          }`}
        >
          <p className="font-bold mb-1">
            {selectedOption === currentQuestion.correctIndex ? "✓ 正解！" : "✗ 不正解"}
          </p>
          <p>{currentQuestion.explanation}</p>
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
