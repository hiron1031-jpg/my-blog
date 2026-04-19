import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiDownload,
  FiBookOpen,
  FiCheckSquare,
  FiTarget,
  FiTrendingUp,
  FiExternalLink,
  FiAward,
} from "react-icons/fi";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { CATEGORIES, getCategory } from "@/lib/pastproblems-data";

// ---- Static params ----
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ exam: c.id }));
}

type PageProps = { params: Promise<{ exam: string }> };

// ---- Exam meta (概要・難易度・合格率) ----
type ExamMeta = {
  tagline: string;
  overview: string;
  difficulty: string;
  passRateFirst: string;   // 第一次検定
  passRateSecond: string;  // 第二次検定 / 実地
  passCriteria: string;
  scopeFirst: string[];    // 第一次検定出題範囲
  scopeSecond: string[];   // 第二次検定出題範囲
  studyHours: string;
  relatedSlugs: { slug: string; label: string }[];
};

const EXAM_META: Record<string, ExamMeta> = {
  "1doboku": {
    tagline: "土木工事の現場監督・主任技術者・監理技術者として活躍するための国家資格",
    overview:
      "1級土木施工管理技士は、大規模な土木工事の監理技術者になれる国家資格です。公共工事の入札条件にも含まれ、建設業界で最も評価される資格の一つ。第一次検定（旧学科）と第二次検定（旧実地）の2段階で実施され、経験記述の記述力が合否を大きく左右します。",
    difficulty: "難易度は高め。特に第二次検定の経験記述は実務経験ベースで自分の言葉で書く必要があり、丸暗記では合格できません。",
    passRateFirst: "令和7年度 43.1%（公式発表）",
    passRateSecond: "30〜40%程度（一般的な目安）",
    passCriteria: "第一次・第二次ともに得点率60%以上が合格ライン（国土交通省発表）",
    scopeFirst: [
      "土木一般（土工・コンクリート・基礎工）",
      "専門土木（構造物・河川・砂防・道路・舗装・ダム・トンネル・海岸・港湾・鉄道・地下構造物・上下水道）",
      "法規（建設業法・労働基準法・労働安全衛生法・道路法・河川法・環境関連法など）",
      "共通工学（測量・設計図書・契約）",
      "施工管理法（工程・品質・安全・原価管理）",
    ],
    scopeSecond: [
      "経験記述（最重要・配点が高い）",
      "土工・コンクリート工の専門記述",
      "安全管理・品質管理・工程管理の記述",
      "建設副産物・環境対策",
    ],
    studyHours: "初受験は300〜400時間程度、関連資格あり100〜150時間（いずれも一般的な目安）",
    relatedSlugs: [
      { slug: "doboku-1kyu-benkyoho", label: "1級土木施工管理技士 独学勉強法【完全ロードマップ】" },
      { slug: "doboku-1kyu-hinshutu", label: "1級土木 頻出問題・分野別対策" },
      { slug: "doboku-goukakuritsu", label: "土木施工管理技士の合格率と難易度の推移" },
      { slug: "doboku-sankosho", label: "1級土木 おすすめ参考書ランキング" },
      { slug: "doboku-keiken-kijutsu", label: "経験記述の書き方とコツ" },
      { slug: "goukaku-career", label: "施工管理技士取得後のキャリア戦略" },
    ],
  },
  "2doboku": {
    tagline: "土木工事の主任技術者として、中小規模の現場を任せてもらえる登竜門資格",
    overview:
      "2級土木施工管理技士は、主任技術者として土木工事の現場を担当できる国家資格です。1級のステップアップ前提で取得する方が多く、19歳以上から受験できる「第一次検定のみ」の新制度により受験者数が増加傾向。前期（6月）・後期（10月）の年2回チャンスがあります。",
    difficulty: "1級に比べると難易度は抑えめ。ただし第二次検定の経験記述は1級同様、添削を受けておくと安心。",
    passRateFirst: "令和6年度(前期) 43.0%（公式発表）",
    passRateSecond: "令和6年度 35.0%（公式発表）",
    passCriteria: "第一次・第二次ともに得点率60%以上が合格ライン（国土交通省発表）",
    scopeFirst: [
      "土木一般（土工・コンクリート・基礎工）",
      "専門土木（構造物・河川・砂防・道路・舗装・上下水道など）",
      "法規（建設業法・労働基準法・安全衛生法など）",
      "共通工学（測量・設計図書・契約）",
      "施工管理法（工程・品質・安全管理）",
    ],
    scopeSecond: [
      "経験記述（配点大）",
      "土工・コンクリート工の専門記述",
      "安全管理・品質管理の記述",
    ],
    studyHours: "150〜230時間程度が一般的な目安（1日1時間で4〜6ヶ月）",
    relatedSlugs: [
      { slug: "doboku-2kyu-benkyoho", label: "2級土木施工管理技士 独学勉強法" },
      { slug: "doboku-goukakuritsu", label: "土木施工管理技士の合格率と難易度" },
      { slug: "doboku-sankosho", label: "土木施工管理技士 おすすめ参考書" },
      { slug: "doboku-keiken-kijutsu", label: "経験記述の書き方とコツ" },
    ],
  },
  "1zou": {
    tagline: "造園工事業の監理技術者として、公園・緑化・庭園工事を統括できる国家資格",
    overview:
      "1級造園施工管理技士は、造園工事の監理技術者として大規模工事を担当できる国家資格です。公共緑化工事や都市公園、再開発プロジェクトの入札要件となっており、造園業界でのキャリアアップに不可欠。受験者数は土木系より少なく、情報が少ないのが特徴です。",
    difficulty: "植物学・造園史・施工法など範囲が広く、土木系より覚える内容が独特。第二次検定の記述では造園特有の用語と施工知識が問われます。",
    passRateFirst: "40〜50%程度（一般的な目安）",
    passRateSecond: "令和6年度 40.0%（公式発表）",
    passCriteria: "第一次・第二次ともに得点率60%以上が合格ライン（国土交通省発表）",
    scopeFirst: [
      "造園原論（造園史・植物学・造園材料）",
      "造園施工（土工・植栽・石材工・竹垣工・排水工）",
      "法規（都市公園法・自然公園法・建設業法・労基法など）",
      "測量・設計図書・積算",
      "施工管理法（工程・品質・安全）",
    ],
    scopeSecond: [
      "経験記述（造園工事での管理項目）",
      "植栽・移植・支柱などの施工記述",
      "安全管理・工程管理の記述",
      "樹木・樹種の同定問題",
    ],
    studyHours: "初受験は250〜350時間程度、2級造園取得済み100〜150時間（一般的な目安）",
    relatedSlugs: [
      { slug: "zouen-1kyu-benkyoho", label: "1級造園施工管理技士 独学勉強法" },
      { slug: "zouen-goukakuritsu", label: "造園施工管理技士の合格率" },
      { slug: "zouen-sankosho", label: "造園施工管理技士 おすすめ参考書" },
      { slug: "zouen-keiken-kijutsu", label: "造園の経験記述の書き方" },
    ],
  },
  "2zou": {
    tagline: "造園工事業の主任技術者として現場を任される、造園キャリアの第一歩",
    overview:
      "2級造園施工管理技士は、造園工事の主任技術者として中小規模の現場を担当できる国家資格です。庭園・公園・緑化工事の現場監督に必須レベルの資格で、1級へのステップとしても最適。19歳以上から第一次検定のみ受験できる新制度で、受験者数が増えています。",
    difficulty: "造園史・植物学の暗記量は多いものの、出題範囲は1級より絞られ、過去問対策で十分合格が狙えます。",
    passRateFirst: "直近数年の平均 約53%（目安）",
    passRateSecond: "直近数年の平均 約47%（目安）",
    passCriteria: "第一次・第二次ともに得点率60%以上が合格ライン（国土交通省発表）",
    scopeFirst: [
      "造園原論（造園史・植物基礎）",
      "造園施工（植栽・土工・石材工など基本）",
      "法規（都市公園法・建設業法・労基法など）",
      "測量・設計図書",
      "施工管理法",
    ],
    scopeSecond: [
      "経験記述（造園工事での管理）",
      "植栽・移植の施工記述",
      "樹木の同定",
    ],
    studyHours: "150〜230時間程度が一般的な目安（1日1時間で4〜6ヶ月）",
    relatedSlugs: [
      { slug: "zouen-2kyu-benkyoho", label: "2級造園施工管理技士 独学勉強法" },
      { slug: "zouen-goukakuritsu", label: "造園施工管理技士の合格率" },
      { slug: "zouen-sankosho", label: "造園施工管理技士 おすすめ参考書" },
    ],
  },
};

// ---- Metadata ----
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  const cat = getCategory(exam);
  const meta = EXAM_META[exam];
  if (!cat || !meta) return {};

  const title = `${cat.name}とは｜難易度・合格率・勉強法・過去問まとめ`;
  const description = `${cat.name}の難易度、合格率、試験範囲、独学勉強法、過去問PDFダウンロードをまとめた総合ガイド。${meta.tagline}`;

  return {
    title,
    description,
    keywords: `${cat.name},${cat.shortName},${cat.shortName} 難易度,${cat.shortName} 合格率,${cat.shortName} 勉強法,${cat.shortName} 過去問,${cat.shortName} 独学`,
    alternates: { canonical: `/shikaku/${exam}` },
    openGraph: {
      title: `${cat.name}｜難易度・合格率・勉強法・過去問｜土木のトリセツ`,
      description,
      type: "article",
    },
  };
}

// ---- Page ----
export default async function ShikakuHubPage({ params }: PageProps) {
  const { exam } = await params;
  const cat = getCategory(exam);
  const meta = EXAM_META[exam];
  if (!cat || !meta) notFound();

  const latestYears = cat.years.slice(0, 3);
  const otherExams = CATEGORIES.filter((c) => c.id !== exam);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${cat.name}｜難易度・合格率・勉強法・過去問まとめ`,
    description: meta.overview,
    url: `${siteUrl}/shikaku/${exam}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${cat.name}の難易度は？`,
        acceptedAnswer: { "@type": "Answer", text: meta.difficulty },
      },
      {
        "@type": "Question",
        name: `${cat.name}の合格率は？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `第一次検定は${meta.passRateFirst}、第二次検定は${meta.passRateSecond}が目安です。${meta.passCriteria}。`,
        },
      },
      {
        "@type": "Question",
        name: `${cat.name}の独学に必要な勉強時間は？`,
        acceptedAnswer: { "@type": "Answer", text: meta.studyHours },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "資格ガイド", item: `${siteUrl}/shikaku/${exam}` },
      { "@type": "ListItem", position: 3, name: cat.name, item: `${siteUrl}/shikaku/${exam}` },
    ],
  };

  return (
    <>
      <JsonLd schema={webPageLd} />
      <JsonLd schema={faqLd} />
      <JsonLd schema={breadcrumbLd} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: cat.name },
          ]}
        />

        {/* Hero */}
        <div
          className="rounded-2xl p-8 mb-8 text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${cat.hex} 0%, ${cat.hex}dd 100%)` }}
        >
          <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
            <FiAward /> 資格ガイド
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{cat.name}</h1>
          <p className="text-base opacity-95 leading-relaxed">{meta.tagline}</p>
        </div>

        {/* 概要 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <FiBookOpen /> {cat.name}とは
          </h2>
          <p className="text-gray-700 leading-relaxed">{meta.overview}</p>
        </section>

        {/* 難易度・合格率 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <FiTrendingUp /> 難易度・合格率
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white border border-border rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">第一次検定 合格率</div>
              <div className="text-2xl font-bold" style={{ color: cat.hex }}>
                {meta.passRateFirst}
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">第二次検定 合格率</div>
              <div className="text-2xl font-bold" style={{ color: cat.hex }}>
                {meta.passRateSecond}
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">必要勉強時間（独学）</div>
              <div className="text-base font-bold text-secondary leading-tight">
                {meta.studyHours}
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <strong>合格基準：</strong>{meta.passCriteria}
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">{meta.difficulty}</p>
          <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
            ※ 合格率は
            <a href="https://www.jctc.jp/exam/itstatus/" target="_blank" rel="noopener noreferrer" className="text-primary underline mx-1">一般財団法人 全国建設研修センターの公表資料</a>
            および国土交通省発表をもとに記載しています。最新の合格基準・受験要項は必ず公式発表をご確認ください。勉強時間は独学合格者の一般的な目安で、個人差があります。
          </p>
        </section>

        {/* 試験範囲 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <FiTarget /> 試験範囲
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">第一次検定（旧学科）</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                {meta.scopeFirst.map((s) => (
                  <li key={s} className="flex gap-2">
                    <FiCheckSquare className="flex-shrink-0 mt-0.5 text-blue-600" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-green-900 mb-3">第二次検定（旧実地）</h3>
              <ul className="space-y-2 text-sm text-gray-800">
                {meta.scopeSecond.map((s) => (
                  <li key={s} className="flex gap-2">
                    <FiCheckSquare className="flex-shrink-0 mt-0.5 text-green-600" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 過去問ダウンロード */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <FiDownload /> 最新の過去問（無料PDF）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            直近{latestYears.length}年度の過去問PDFです。全{cat.years.length}年度分は
            <Link href="/pastproblems" className="text-primary underline ml-1">過去問ダウンロードページ</Link>
            から入手できます。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {latestYears.map((y) => (
              <Link
                key={y.key}
                href={`/pastproblems/${exam}/${y.key}`}
                className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="font-bold text-secondary mb-1">{y.label}</div>
                <div className="text-xs text-gray-500 mb-2">{y.files.length}ファイル</div>
                <div className="text-xs text-primary flex items-center gap-1">
                  <FiExternalLink size={11} /> 出題傾向・解説を見る
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/pastproblems"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-bold shadow hover:shadow-md transition"
            style={{ background: cat.hex }}
          >
            <FiDownload /> 全{cat.years.length}年度分をダウンロード
          </Link>
        </section>

        {/* Quiz CTA */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">無料Web問題集で腕試し</h3>
            <p className="text-sm text-gray-700 mb-4">
              R4〜R7年度の過去問をブラウザで解ける「過去問チャレンジ」を無料公開中。解説付きで、スキマ時間に学習できます。
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold shadow hover:shadow-md transition"
            >
              <FiBookOpen /> 過去問チャレンジに挑戦
            </Link>
          </div>
        </section>

        {/* 関連記事 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <FiBookOpen /> おすすめ記事
          </h2>
          <ul className="space-y-2">
            {meta.relatedSlugs.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/posts/${r.slug}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <FiExternalLink size={14} />
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 他資格 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-secondary mb-4">他の資格ガイド</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherExams.map((c) => (
              <Link
                key={c.id}
                href={`/shikaku/${c.id}`}
                className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="font-bold text-sm mb-1" style={{ color: c.hex }}>
                  {c.name}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <FiExternalLink size={11} /> 詳細を見る
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
