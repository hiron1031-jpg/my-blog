import type { Metadata } from "next";
import Link from "next/link";
import { FiCheckCircle, FiHelpCircle, FiArrowRight, FiDownload } from "react-icons/fi";
import QuizClient from "@/components/quiz/QuizClient";
import JsonLd from "@/components/JsonLd";
import questionsData from "@/data/quiz/questions.json";
import yearQuestionsData from "@/data/quiz/year-questions.json";
import type { QuizQuestion, YearQuestionsMap } from "@/components/quiz/QuizClient";
import Breadcrumb from "@/components/layout/Breadcrumb";
import BeaverMascot from "@/components/layout/BeaverMascot";

export const metadata: Metadata = {
  title: "施工管理技士 過去問チャレンジ【無料Web問題集・解説付】",
  description:
    "1級・2級 土木/造園施工管理技士の過去問を4択Webクイズで無料演習。R4〜R7年度の本試験問題を収録、解説付きで苦手分野を見える化。スマホでスキマ時間に学習できる独学合格者向けの無料問題集です。",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "施工管理技士 過去問チャレンジ【無料Web問題集】| 土木のトリセツ",
    description:
      "1級・2級 土木/造園施工管理技士の過去問を4択Webクイズで演習。R4〜R7年度別過去問モード（1,178問）搭載。スマホ対応・解説付き・完全無料。",
    url: "/quiz",
  },
  keywords: "施工管理技士 過去問 アプリ,施工管理技士 過去問 無料,過去問 webアプリ,1級土木 練習問題,2級土木 クイズ,1級造園 問題集,2級造園 クイズ,第一次検定 対策,過去問チャレンジ",
};

const quizFaqs = [
  {
    q: "過去問チャレンジは完全無料ですか？",
    a: "はい、会員登録もアプリインストールも不要で完全無料です。ブラウザでアクセスするだけでスマホ・PCから演習できます。解答結果はブラウザ内に自動保存されるため、続きからいつでも再開できます。",
  },
  {
    q: "どの年度の過去問が出題されますか？",
    a: "令和4年度〜令和7年度（R4〜R7）の本試験問題を収録しています。1級土木・2級土木・1級造園・2級造園の4区分に対応。第一次検定の過去問を中心に、類題も多数含まれています。",
  },
  {
    q: "解答後に解説は表示されますか？",
    a: "はい、各問題には解答の根拠・ポイントを記した解説が付いています。正解でも不正解でも解説を読むことで知識が定着します。間違えた問題だけを後で見直すこともできます。",
  },
  {
    q: "PDFで過去問をまとめて解きたい場合は？",
    a: "印刷して本番形式で解きたい方は『過去問ダウンロード』ページからH24〜R7年度（14年分）のPDFを無料で取得できます。Web演習と紙の演習を使い分けると効果的です。",
  },
  {
    q: "どの区分から始めればいいですか？",
    a: "これから受験する級・種別と同じ区分を選んでください。2級受験者でも1級の過去問を解くと応用力が身に付きます。造園受験者は土木の共通分野（安全・環境など）も確認すると得点源になります。",
  },
];

export default function QuizPage() {
  const questions = questionsData as QuizQuestion[];
  const yearQuestions = yearQuestionsData as unknown as YearQuestionsMap;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のトリセツ";

  // 総問題数を計算
  const totalYearQuestions = Object.values(yearQuestions).reduce(
    (sum, examData) =>
      sum +
      Object.values(examData).reduce(
        (s2, yearData) =>
          s2 + Object.values(yearData).reduce((s3, qs) => s3 + qs.length, 0),
        0
      ),
    0
  );

  // JSON-LD: EducationalWebPage + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalWebPage",
        "@id": `${siteUrl}/quiz#page`,
        "name": "施工管理技士 過去問チャレンジ",
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
            { "@type": "ListItem", "position": 2, "name": "過去問チャレンジ", "item": `${siteUrl}/quiz` },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "name": "施工管理技士 過去問チャレンジ",
        "mainEntity": quizFaqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />

      <Breadcrumb items={[{ label: "過去問チャレンジ" }]} />

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-secondary to-[#2d5494] text-white px-6 py-8 mb-8 shadow-md">
        <div className="flex items-center gap-4 mb-3">
          <BeaverMascot preset="computer" size={72} className="drop-shadow-md flex-shrink-0" />
          <h1 className="text-2xl font-bold">施工管理技士 過去問チャレンジ</h1>
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          1級・2級 土木施工管理技士と造園施工管理技士の年度別過去問を4択形式で出題。
          解答後に解説を表示。スコアはブラウザに自動保存されます。
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
            土木・造園 全{totalYearQuestions}問収録
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
            R4〜R7年度対応
          </span>
        </div>
      </div>

      {/* Features */}
      <section className="mb-8 bg-white border border-border rounded-xl p-5 md:p-6 shadow-sm">
        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">このツールの特徴</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-2">
            <FiCheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div><strong>完全無料・登録不要</strong>：ブラウザで開くだけ。アプリインストール不要でスマホからも使えます。</div>
          </li>
          <li className="flex gap-2">
            <FiCheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div><strong>R4〜R7年度の本試験問題を収録</strong>：最新の出題傾向を反映した合計1,178問。</div>
          </li>
          <li className="flex gap-2">
            <FiCheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div><strong>4択クイズ＋解説付き</strong>：解答直後に解説を表示。なぜその答えになるかが身に付きます。</div>
          </li>
          <li className="flex gap-2">
            <FiCheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div><strong>スコア自動保存</strong>：ブラウザに進捗が保存されるので、通勤や休憩の合間に続きから再開できます。</div>
          </li>
          <li className="flex gap-2">
            <FiCheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div><strong>4区分すべてに対応</strong>：1級土木・2級土木・1級造園・2級造園の過去問を網羅。</div>
          </li>
        </ul>
      </section>

      {/* Quiz */}
      <QuizClient yearQuestions={yearQuestions} />

      {/* FAQ */}
      <section className="mt-12 mb-10 bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <FiHelpCircle size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">よくある質問</h2>
        </div>
        <div className="space-y-5">
          {quizFaqs.map((f, i) => (
            <div key={i} className="border-b border-border last:border-b-0 pb-5 last:pb-0">
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2">Q. {f.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">A. {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to download page */}
      <section className="mb-10 rounded-xl p-6 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] text-white shadow-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <FiDownload size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold mb-2">紙で解きたい方は過去問PDFもどうぞ</h2>
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              印刷して本番形式で演習したい方は、H24〜R7年度（14年分）の問題・解答PDFをまとめて無料ダウンロードできます。
            </p>
            <Link href="/pastproblems" className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] text-sm font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition">
              過去問ダウンロードページへ
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="mb-10 bg-surface border border-border rounded-xl p-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">あわせて読みたい合格対策記事</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/posts/doboku-1kyu-hinshutu" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級土木施工管理技士 頻出問題・分野別攻略ガイド
            </Link>
          </li>
          <li>
            <Link href="/posts/doboku-1kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級土木施工管理技士の勉強法【独学合格の全手順】
            </Link>
          </li>
          <li>
            <Link href="/posts/doboku-2kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              2級土木施工管理技士の勉強法
            </Link>
          </li>
          <li>
            <Link href="/posts/zouen-1kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級造園施工管理技士の勉強法
            </Link>
          </li>
          <li>
            <Link href="/posts/zouen-2kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              2級造園施工管理技士の勉強法
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
