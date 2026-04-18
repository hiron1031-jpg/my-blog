"use client";

import Link from "next/link";
import { useState } from "react";
import { FiDownload, FiFileText, FiCheckSquare, FiExternalLink } from "react-icons/fi";
import { CATEGORIES, type ExamFile, type YearEntry } from "@/lib/pastproblems-data";


// ---- Sub-components ----
const variantStyles = {
  question: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  answer:   "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  second:   "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
};

function DownloadButton({ file }: { file: ExamFile }) {
  return (
    <a
      href={file.path}
      download
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${variantStyles[file.variant]}`}
    >
      <FiDownload size={12} className="flex-shrink-0" />
      {file.label}
    </a>
  );
}

function YearCard({ entry, examId }: { entry: YearEntry; examId: string }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-secondary text-sm">{entry.label}</h3>
        {entry.note && (
          <span className="text-xs text-gray-400 text-right leading-tight">{entry.note}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {entry.files.map((f) => (
          <DownloadButton key={f.path} file={f} />
        ))}
      </div>
      <Link
        href={`/pastproblems/${examId}/${entry.key}`}
        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-auto pt-1"
      >
        <FiExternalLink size={11} />
        {entry.label} の出題傾向・解説
      </Link>
    </div>
  );
}

// ---- Main export ----
export default function PastProblemsClient() {
  const [activeTab, setActiveTab] = useState("1doboku");

  const current = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                isActive
                  ? `${cat.accent} text-white border-transparent shadow-md`
                  : `bg-white ${cat.textAccent} ${cat.borderAccent} hover:brightness-95`
              }`}
            >
              {cat.shortName}
              <span className="ml-2 text-xs opacity-75">
                {cat.years.length}年度
              </span>
            </button>
          );
        })}
      </div>

      {/* Current category header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-secondary mb-1">
          {current.name}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <FiFileText size={14} />
            {current.years.length}年度分
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckSquare size={14} />
            {current.years.reduce((n, y) => n + y.files.length, 0)}ファイル
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
        <span className="font-semibold text-gray-500">凡例：</span>
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
          <FiFileText size={11} /> 問題
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200">
          <FiFileText size={11} /> 実地 / 第二次検定
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200">
          <FiFileText size={11} /> 解答
        </span>
      </div>

      {/* Year cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {current.years.map((entry) => (
          <YearCard key={entry.key} entry={entry} examId={current.id} />
        ))}
      </div>
    </div>
  );
}
