import type { Metadata } from "next";
import QuizClient from "@/components/quiz/QuizClient";
import JsonLd from "@/components/JsonLd";
import questionsData from "@/data/quiz/questions.json";
import yearQuestionsData from "@/data/quiz/year-questions.json";
import type { QuizQuestion, YearQuestionsMap } from "@/components/quiz/QuizClient";
import Breadcrumb from "@/components/layout/Breadcrumb";
import BeaverMascot from "@/components/layout/BeaverMascot";

export const metadata: Metadata = {
  title: "施工管理技士 練習問題クイズ",
  description:
    "1級・2級土木施工管理技士、1級・2級造園施工管理技士の練習問題を4択クイズ形式で出題。解説付き全40問 + R7・R4年度の過去問チャレンジ機能付き。",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "施工管理技士 練習問題クイズ | 土木のトリセツ",
    description:
      "1級・2級土木施工管理技士、1級・2級造園施工管理技士の練習問題を4択クイズで出題。解説付き全40問 + 年度別過去問モード搭載。",
    url: "/quiz",
  },
  keywords: "施工管理技士,クイズ,練習問題,過去問,1級土木,2級土木,1級造園,2級造園,試験対策",
};

export default function QuizPage() {
  const questions = questionsData as QuizQuestion[];
  const yearQuestions = yearQuestionsData as unknown as YearQuestionsMap;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のトリセツ";

  // JSON-LD: EducationalWebPage + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalWebPage",
        "@id": `${siteUrl}/quiz#page`,
        "name": "施工管理技士 練習問題クイズ",
        "description": "1級・2級土木施工管理技士、1級・2級造園施工管理技士の練習問題を4択クイズで出題。解説付き全40問 + 年度別過去問モード搭載。",
        "url": `${siteUrl}/quiz`,
        "inLanguage": "ja-JP",
        "educationalLevel": "professional",
        "learningResourceType": "quiz",
        "teaches": "施工管理技士 第一次検定",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          "name": siteName,
          "url": siteUrl,
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "練習問題クイズ", "item": `${siteUrl}/quiz` },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "name": "施工管理技士 練習問題クイズ",
        "mainEntity": questions.slice(0, 5).map((q) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.explanation,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />

      <Breadcrumb items={[{ label: "練習問題クイズ" }]} />

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-secondary to-[#2d5494] text-white px-6 py-8 mb-8 shadow-md">
        <div className="flex items-center gap-4 mb-3">
          <BeaverMascot preset="computer" size={72} className="drop-shadow-md flex-shrink-0" />
          <h1 className="text-2xl font-bold">施工管理技士 練習問題クイズ</h1>
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          1級・2級 土木施工管理技士と造園施工管理技士の練習問題です。
          4択形式で解答後に解説を表示。スコアはブラウザに自動保存されます。
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: "1級土木", count: 10 },
            { label: "2級土木", count: 10 },
            { label: "1級造園", count: 10 },
            { label: "2級造園", count: 10 },
          ].map((item) => (
            <span
              key={item.label}
              className="bg-white/20 px-3 py-1 rounded-full font-medium"
            >
              {item.label}：{item.count}問
            </span>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <QuizClient questions={questions} yearQuestions={yearQuestions} />
    </div>
  );
}
