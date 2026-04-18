// 過去問データ（PastProblemsClient と 年度別LPで共有）

export type ExamFile = {
  label: string;
  path: string;
  variant: "question" | "answer" | "second";
};

export type YearEntry = {
  key: string;
  label: string;
  note?: string;
  files: ExamFile[];
};

export type ExamCategory = {
  id: string;
  name: string;
  shortName: string;
  accent: string;
  textAccent: string;
  borderAccent: string;
  hex: string;           // LP 用 hex カラー
  years: YearEntry[];
};

function q(label: string, path: string): ExamFile {
  return { label, path, variant: "question" };
}
function a(label: string, path: string): ExamFile {
  return { label, path, variant: "answer" };
}
function s(label: string, path: string): ExamFile {
  return { label, path, variant: "second" };
}

export const CATEGORIES: ExamCategory[] = [
  {
    id: "1doboku",
    name: "1級土木施工管理技士",
    shortName: "1級土木",
    accent: "bg-secondary",
    textAccent: "text-secondary",
    borderAccent: "border-secondary",
    hex: "#1e3a5f",
    years: [
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
    hex: "#e8622a",
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
    hex: "#1a5c38",
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
      { key:"H30", label:"平成30年度",
        files:[ q("学科A","/pastproblems/1zou/H30_A.pdf"), q("学科B","/pastproblems/1zou/H30_B.pdf"), s("実地","/pastproblems/1zou/H30_jitti.pdf"), a("解答","/pastproblems/1zou/H30_kaitou.pdf") ]
      },
      { key:"H29", label:"平成29年度",
        files:[ q("学科A","/pastproblems/1zou/H29_A.pdf"), q("学科B","/pastproblems/1zou/H29_B.pdf"), s("実地","/pastproblems/1zou/H29_jitti.pdf"), a("解答","/pastproblems/1zou/H29_kaitou.pdf") ]
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
    hex: "#d97706",
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
      { key:"R6", label:"令和6年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R6_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R6_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R6_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R6_kouki_kaitou.pdf"),
          s("第二次検定","/pastproblems/2zou/R6_jissi.pdf"),
        ]
      },
      { key:"R5", label:"令和5年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R5_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R5_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R5_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R5_kouki_kaitou.pdf"),
          s("第二次検定","/pastproblems/2zou/R5_jissi.pdf"),
        ]
      },
      { key:"R4", label:"令和4年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R4_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R4_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R4_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R4_kouki_kaitou.pdf"),
          s("第二次検定","/pastproblems/2zou/R4_jissi.pdf"),
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
      { key:"R2", label:"令和2年度", note:"後期のみ実施（COVID-19）",
        files:[
          q("後期 学科","/pastproblems/2zou/R2_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R2_kouki_kaitou.pdf"),
          s("実地","/pastproblems/2zou/R2_jissi.pdf"),
        ]
      },
      { key:"R1", label:"令和元年度",
        files:[
          q("前期 学科","/pastproblems/2zou/R1_zenki.pdf"),
          a("前期 解答","/pastproblems/2zou/R1_zenki_kaitou.pdf"),
          q("後期 学科","/pastproblems/2zou/R1_kouki.pdf"),
          a("後期 解答","/pastproblems/2zou/R1_kouki_kaitou.pdf"),
          s("実地","/pastproblems/2zou/R1_jissi.pdf"),
        ]
      },
      { key:"H30", label:"平成30年度",
        files:[
          q("学科","/pastproblems/2zou/H30_gakka.pdf"),
          a("解答","/pastproblems/2zou/H30_kaitou.pdf"),
          s("実地","/pastproblems/2zou/H30_jissi.pdf"),
        ]
      },
      { key:"H29", label:"平成29年度",
        files:[
          q("学科","/pastproblems/2zou/H29_gakka.pdf"),
          a("解答","/pastproblems/2zou/H29_kaitou.pdf"),
          s("実地","/pastproblems/2zou/H29_jissi.pdf"),
        ]
      },
    ],
  },
];

export function getCategory(examId: string): ExamCategory | undefined {
  return CATEGORIES.find((c) => c.id === examId);
}

export function getYearEntry(examId: string, yearKey: string): { category: ExamCategory; year: YearEntry } | undefined {
  const category = getCategory(examId);
  if (!category) return undefined;
  const year = category.years.find((y) => y.key === yearKey);
  if (!year) return undefined;
  return { category, year };
}

// 全ページの静的生成用
export function getAllExamYearParams(): Array<{ exam: string; year: string }> {
  return CATEGORIES.flatMap((c) => c.years.map((y) => ({ exam: c.id, year: y.key })));
}

// 年度→西暦変換
export function yearKeyToWestern(key: string): number {
  if (key.startsWith("R")) {
    const n = key === "R1" ? 1 : parseInt(key.substring(1), 10);
    return 2018 + n; // R1 = 2019
  }
  if (key.startsWith("H")) {
    const n = parseInt(key.substring(1), 10);
    return 1988 + n; // H1 = 1989
  }
  return 0;
}
