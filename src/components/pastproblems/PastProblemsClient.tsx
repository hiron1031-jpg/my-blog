"use client";

import { useState } from "react";
import { FiDownload, FiFileText, FiCheckSquare } from "react-icons/fi";

// ---- Type definitions ----
type ExamFile = {
  label: string;
  path: string;
  variant: "question" | "answer" | "second";
};

type YearEntry = {
  key: string;
  label: string;
  note?: string;
  files: ExamFile[];
};

type ExamCategory = {
  id: string;
  name: string;
  shortName: string;
  accent: string;        // tailwind bg color
  textAccent: string;    // tailwind text color
  borderAccent: string;  // tailwind border color
  years: YearEntry[];
};

// ---- Helpers ----
function q(label: string, path: string): ExamFile {
  return { label, path, variant: "question" };
}
function a(label: string, path: string): ExamFile {
  return { label, path, variant: "answer" };
}
function s(label: string, path: string): ExamFile {
  return { label, path, variant: "second" };
}

// ---- Data ----
const CATEGORIES: ExamCategory[] = [
  {
    id: "1doboku",
    name: "1級土木施工管理技士",
    shortName: "1級土木",
    accent: "bg-secondary",
    textAccent: "text-secondary",
    borderAccent: "border-secondary",
    years: [
      // R3以降は「第一次検定」「第二次検定」名称に統一
      { key:"R7",  label:"令和7年度",  files:[ q("第一次検定A","/pastproblems/1doboku/R7_A.pdf"), q("第一次検定B","/pastproblems/1doboku/R7_B.pdf"), s("第二次検定","/pastproblems/1doboku/R7_jitti.pdf"), a("解答","/pastproblems/1doboku/R7_kaitou.pdf") ] },
      { key:"R6",  label:"令和6年度",  files:[ q("第一次検定A","/pastproblems/1doboku/R6_A.pdf"), q("第一次検定B","/pastproblems/1doboku/R6_B.pdf"), s("第二次検定","/pastproblems/1doboku/R6_jitti.pdf"), a("解答","/pastproblems/1doboku/R6_kaitou.pdf") ] },
      { key:"R5",  label:"令和5年度",  files:[ q("第一次検定A","/pastproblems/1doboku/R5_A.pdf"), q("第一次検定B","/pastproblems/1doboku/R5_B.pdf"), s("第二次検定","/pastproblems/1doboku/R5_jitti.pdf"), a("解答","/pastproblems/1doboku/R5_kaitou.pdf") ] },
      { key:"R4",  label:"令和4年度",  files:[ q("第一次検定A","/pastproblems/1doboku/R4_A.pdf"), q("第一次検定B","/pastproblems/1doboku/R4_B.pdf"), s("第二次検定","/pastproblems/1doboku/R4_jitti.pdf"), a("解答","/pastproblems/1doboku/R4_kaitou.pdf") ] },
      { key:"R3",  label:"令和3年度",  files:[ q("第一次検定A","/pastproblems/1doboku/R3_A.pdf"), q("第一次検定B","/pastproblems/1doboku/R3_B.pdf"), s("第二次検定","/pastproblems/1doboku/R3_jitti.pdf"), a("解答","/pastproblems/1doboku/R3_kaitou.pdf") ] },
      { key:"R2",  label:"令和2年度",  files:[ q("学科A","/pastproblems/1doboku/R2_A.pdf"), q("学科B","/pastproblems/1doboku/R2_B.pdf"), s("実地","/pastproblems/1doboku/R2_jitti.pdf"), a("解答","/pastproblems/1doboku/R2_kaitou.pdf") ] },
      { key:"R1",  label:"令和元年度", files:[ q("学科A","/pastproblems/1doboku/R1_A.pdf"), q("学科B","/pastproblems/1doboku/R1_B.pdf"), s("実地","/pastproblems/1doboku/R1_jitti.pdf"), a("解答","/pastproblems/1doboku/R1_kaitou.pdf") ] },
      { key:"H30", label:"平成30年度", files:[ q("学科A","/pastproblems/1doboku/H30_A.pdf"), q("学科B","/pastproblems/1doboku/H30_B.pdf"), s("実地","/pastproblems/1doboku/H30_jitti.pdf"), a("解答","/pastproblems/1doboku/H30_kaitou.pdf") ] },
      { key:"H29", label:"平成29年度", files:[ q("学科A","/pastproblems/1doboku/H29_A.pdf"), q("学科B","/pastproblems/1doboku/H29_B.pdf"), s("実地","/pastproblems/1doboku/H29_jitti.pdf"), a("解答","/pastproblems/1doboku/H29_kaitou.pdf") ] },
      { key:"H28", label:"平成28年度", files:[ q("学科A","/pastproblems/1doboku/H28_A.pdf"), q("学科B","/pastproblems/1doboku/H28_B.pdf"), s("実地","/pastproblems/1doboku/H28_jitti.pdf"), a("解答","/pastproblems/1doboku/H28_kaitou.pdf") ] },
      { key:"H27", label:"平成27年度", files:[ q("学科A","/pastproblems/1doboku/H27_A.pdf"), q("学科B","/pastproblems/1doboku/H27_B.pdf"), s("実地","/pastproblems/1doboku/H27_jitti.pdf"), a("解答","/pastproblems/1doboku/H27_kaitou.pdf") ] },
      { key:"H26", label:"平成26年度", files:[ q("学科A","/pastproblems/1doboku/H26_A.pdf"), q("学科B","/pastproblems/1doboku/H26_B.pdf"), s("実地","/pastproblems/1doboku/H26_jitti.pdf"), a("解答","/pastproblems/1doboku/H26_kaitou.pdf") ] },
      { key:"H25", label:"平成25年度", files:[ q("学科A","/pastproblems/1doboku/H25_A.pdf"), q("学科B","/pastproblems/1doboku/H25_B.pdf"), s("実地","/pastproblems/1doboku/H25_jitti.pdf"), a("解答","/pastproblems/1doboku/H25_kaitou.pdf") ] },
      { key:"H24", label:"平成24年度", files:[ q("学科A","/pastproblems/1doboku/H24_A.pdf"), q("学科B","/pastproblems/1doboku/H24_B.pdf"), s("実地","/pastproblems/1doboku/H24_jitti.pdf"), a("解答","/pastproblems/1doboku/H24_kaitou.pdf") ] },
    ],
  },
  {
    id: "2doboku",
    name: "2級土木施工管理技士",
    shortName: "2級土木",
    accent: "bg-primary",
    textAccent: "text-primary",
    borderAccent: "border-primary",
    years: [
      { key:"R7",  label:"令和7年度", note:"土木／塗装／薬液 種別あり",
        files:[
          q("前期 学科（土木）","/pastproblems/2doboku/R7_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R7_1_kaitou.pdf"),
          q("後期 学科（土木）","/pastproblems/2doboku/R7_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R7_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R7_jitti.pdf"),
          q("塗装 学科","/pastproblems/2doboku/R7_tosou_gakka.pdf"),
          s("塗装 実地","/pastproblems/2doboku/R7_tosou_jitti.pdf"),
          q("薬液 学科","/pastproblems/2doboku/R7_yaku_gakka.pdf"),
          s("薬液 実地","/pastproblems/2doboku/R7_yaku_jitti.pdf"),
        ]
      },
      { key:"R6",  label:"令和6年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/R6_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R6_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/R6_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R6_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R6_jitti.pdf"),
        ]
      },
      { key:"R5",  label:"令和5年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/R5_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R5_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/R5_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R5_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R5_jitti.pdf"),
        ]
      },
      { key:"R4",  label:"令和4年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/R4_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R4_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/R4_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R4_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R4_jitti.pdf"),
        ]
      },
      { key:"R3",  label:"令和3年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/R3_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R3_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/R3_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R3_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R3_jitti.pdf"),
        ]
      },
      { key:"R2",  label:"令和2年度", note:"前期のみ実施（COVID-19）",
        files:[
          q("前期 学科","/pastproblems/2doboku/R2_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R2_1_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R2_jitti.pdf"),
        ]
      },
      { key:"R1",  label:"令和元年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/R1_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/R1_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/R1_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/R1_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/R1_jitti.pdf"),
        ]
      },
      { key:"H30", label:"平成30年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/H30_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/H30_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/H30_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/H30_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/H30_jitti.pdf"),
        ]
      },
      { key:"H29", label:"平成29年度",
        files:[
          q("前期 学科","/pastproblems/2doboku/H29_1_gakka.pdf"),
          a("前期 解答","/pastproblems/2doboku/H29_1_kaitou.pdf"),
          q("後期 学科","/pastproblems/2doboku/H29_2_gakka.pdf"),
          a("後期 解答","/pastproblems/2doboku/H29_2_kaitou.pdf"),
          s("実地","/pastproblems/2doboku/H29_jitti.pdf"),
        ]
      },
      { key:"H28", label:"平成28年度",
        files:[ q("学科","/pastproblems/2doboku/H28_gakka.pdf"), a("解答","/pastproblems/2doboku/H28_kaitou.pdf"), s("実地","/pastproblems/2doboku/H28_jitti.pdf") ]
      },
      { key:"H27", label:"平成27年度",
        files:[ q("学科","/pastproblems/2doboku/H27_gakka.pdf"), a("解答","/pastproblems/2doboku/H27_kaitou.pdf"), s("実地","/pastproblems/2doboku/H27_jitti.pdf") ]
      },
      { key:"H26", label:"平成26年度",
        files:[ q("学科","/pastproblems/2doboku/H26_gakka.pdf"), a("解答","/pastproblems/2doboku/H26_kaitou.pdf"), s("実地","/pastproblems/2doboku/H26_jitti.pdf") ]
      },
      { key:"H25", label:"平成25年度",
        files:[ q("学科","/pastproblems/2doboku/H25_gakka.pdf"), a("解答","/pastproblems/2doboku/H25_kaitou.pdf"), s("実地","/pastproblems/2doboku/H25_jitti.pdf") ]
      },
      { key:"H24", label:"平成24年度",
        files:[ q("学科","/pastproblems/2doboku/H24_gakka.pdf"), a("解答","/pastproblems/2doboku/H24_kaitou.pdf"), s("実地","/pastproblems/2doboku/H24_jitti.pdf") ]
      },
    ],
  },
  {
    id: "1zou",
    name: "1級造園施工管理技士",
    shortName: "1級造園",
    accent: "bg-green-700",
    textAccent: "text-green-700",
    borderAccent: "border-green-700",
    years: [
      { key:"R7", label:"令和7年度",
        files:[ q("第一次検定A","/pastproblems/1zou/R7_A.pdf"), q("第一次検定B","/pastproblems/1zou/R7_B.pdf"), s("第二次検定","/pastproblems/1zou/R7_jitti.pdf"), a("解答","/pastproblems/1zou/R7_kaitou.pdf") ]
      },
      { key:"R6", label:"令和6年度",
        files:[ q("第一次検定A","/pastproblems/1zou/R6_A.pdf"), q("第一次検定B","/pastproblems/1zou/R6_B.pdf"), s("第二次検定","/pastproblems/1zou/R6_jitti.pdf"), a("解答","/pastproblems/1zou/R6_kaitou.pdf") ]
      },
      { key:"R5", label:"令和5年度",
        files:[ q("第一次検定A","/pastproblems/1zou/R5_A.pdf"), q("第一次検定B","/pastproblems/1zou/R5_B.pdf"), s("第二次検定","/pastproblems/1zou/R5_jitti.pdf"), a("解答","/pastproblems/1zou/R5_kaitou.pdf") ]
      },
      { key:"R4", label:"令和4年度",
        files:[ q("第一次検定A","/pastproblems/1zou/R4_A.pdf"), q("第一次検定B","/pastproblems/1zou/R4_B.pdf"), s("第二次検定","/pastproblems/1zou/R4_jitti.pdf") ]
      },
      { key:"R3", label:"令和3年度",
        files:[ q("第一次検定A","/pastproblems/1zou/R3_A.pdf"), q("第一次検定B","/pastproblems/1zou/R3_B.pdf"), a("解答","/pastproblems/1zou/R3_kaitou.pdf") ]
      },
      { key:"R2", label:"令和2年度",
        files:[ q("学科A","/pastproblems/1zou/R2_A.pdf"), q("学科B","/pastproblems/1zou/R2_B.pdf"), s("実地","/pastproblems/1zou/R2_jitti.pdf"), a("解答","/pastproblems/1zou/R2_kaitou.pdf") ]
      },
      { key:"R1", label:"令和元年度",
        files:[ q("学科A","/pastproblems/1zou/R1_A.pdf"), q("学科B","/pastproblems/1zou/R1_B.pdf"), s("実地","/pastproblems/1zou/R1_jitti.pdf"), a("解答","/pastproblems/1zou/R1_kaitou.pdf") ]
      },
    ],
  },
  {
    id: "2zou",
    name: "2級造園施工管理技士",
    shortName: "2級造園",
    accent: "bg-amber-600",
    textAccent: "text-amber-600",
    borderAccent: "border-amber-600",
    years: [
      { key:"R7", label:"令和7年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R7_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R7_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R7_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R7_kouki_kaitou.pdf"),
          s("実地","/pastproblems/2zou/R7_jissi.pdf"),
        ]
      },
      { key:"R3", label:"令和3年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R3_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R3_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R3_kouki.pdf"),
          q("後期 学科②","/pastproblems/2zou/R3_kouki2.pdf"),
          a("後期 解答","/pastproblems/2zou/R3_kouki_kaitou.pdf"),
        ]
      },
    ],
  },
];

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

function YearCard({ entry }: { entry: YearEntry }) {
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
          <YearCard key={entry.key} entry={entry} />
        ))}
      </div>
    </div>
  );
}
