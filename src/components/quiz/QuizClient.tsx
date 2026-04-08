"use client";

import { useState, useEffect } from "react";

// ---- Types ----
export interface QuizQuestion {
  id: string;
  exam: "doboku-1kyu" | "doboku-2kyu" | "zouen-1kyu" | "zouen-2kyu";
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

type ExamId = "all" | "doboku-1kyu" | "doboku-2kyu" | "zouen-1kyu" | "zouen-2kyu";
type Phase = "start" | "playing" | "answered" | "finished";

interface ExamScore {
  best: number;
  lastPlayed: string;
}
type ScoreMap = Partial<Record<ExamId, ExamScore>>;

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

function getExamLabel(id: ExamId): string {
  return EXAM_CONFIGS.find((c) => c.id === id)?.label ?? "全問題";
}

// ---- Main Component ----
export default function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const [phase, setPhase] = useState<Phase>("start");
  const [selectedExam, setSelectedExam] = useState<ExamId>("all");
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

  // Derived values
  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;
  const finalScore = answers.filter(
    (a, i) => a !== null && a === activeQuestions[i]?.correctIndex
  ).length;

  // ---- Handlers ----
  function startQuiz(examId: ExamId) {
    const pool =
      examId === "all"
        ? questions
        : questions.filter((q) => q.exam === examId);
    const shuffled = shuffle(pool);
    setSelectedExam(examId);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers(new Array(shuffled.length).fill(null));
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
    // Save score to localStorage
    try {
      const score = answers.filter(
        (a, i) => a !== null && a === activeQuestions[i]?.correctIndex
      ).length;
      const today = new Date().toISOString().slice(0, 10);
      const saved: ScoreMap = JSON.parse(
        localStorage.getItem("quiz-scores") ?? "{}"
      );
      const prev = saved[selectedExam];
      saved[selectedExam] = {
        best: prev && prev.best >= score ? prev.best : score,
        lastPlayed: today,
      };
      localStorage.setItem("quiz-scores", JSON.stringify(saved));
      setScores({ ...saved });
    } catch {
      // ignore localStorage errors
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
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 text-center">
          <div className="text-5xl mb-3">📝</div>
          <h2 className="text-xl font-bold text-heading mb-2">試験種別を選んでスタート</h2>
          <p className="text-secondary text-sm">
            解答後に解説を表示。スコアはブラウザに記録されます。
          </p>
        </div>

        {/* Exam selector buttons */}
        <div className="space-y-3">
          {/* Full-width "all" button */}
          <button
            onClick={() => startQuiz("all")}
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

          {/* 2×2 grid for exam types */}
          <div className="grid grid-cols-2 gap-3">
            {EXAM_CONFIGS.slice(1).map((config) => {
              const examQuestions = questions.filter((q) => q.exam === config.id);
              const score = scores[config.id];
              return (
                <button
                  key={config.id}
                  onClick={() => startQuiz(config.id)}
                  className={`flex flex-col items-start px-4 py-4 rounded-2xl bg-gradient-to-br ${config.gradient} ${config.hover} transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white`}
                >
                  <p className="font-bold text-base">{config.label}</p>
                  <p className="text-white/80 text-xs mt-0.5">{config.sub}</p>
                  {score ? (
                    <p className="text-white/70 text-xs mt-2">
                      ベスト: {score.best}/{examQuestions.length}問
                    </p>
                  ) : (
                    <p className="text-white/50 text-xs mt-2">未挑戦</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ---- Render: Result Screen ----
  if (phase === "finished") {
    const pct = Math.round((finalScore / totalQuestions) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center">
          <p className="text-sm text-secondary/60 mb-2">{getExamLabel(selectedExam)}</p>
          <div className="text-6xl font-bold text-primary mb-1">
            {finalScore}
            <span className="text-3xl text-secondary/40">/{totalQuestions}</span>
          </div>
          <p className="text-secondary font-medium mb-4">問正解</p>

          {/* Progress bar */}
          <div className="w-full bg-border rounded-full h-3 mb-4">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-secondary mb-6">{getMessage(finalScore, totalQuestions)}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => startQuiz(selectedExam)}
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
        <span className="font-medium text-secondary">
          {getExamLabel(selectedExam)}
        </span>
        <span>
          <span className="font-bold text-primary text-base">{currentIndex + 1}</span>
          /{totalQuestions}問
        </span>
      </div>
      <div className="w-full bg-border rounded-full h-1.5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (phase === "answered" ? 1 : 0)) / totalQuestions) * 100}%` }}
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

      {/* Explanation (shown after answering) */}
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
