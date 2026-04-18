import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiDownload,
  FiArrowLeft,
  FiArrowRight,
  FiFileText,
  FiHelpCircle,
  FiBookOpen,
  FiExternalLink,
} from "react-icons/fi";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  CATEGORIES,
  getYearEntry,
  getAllExamYearParams,
  yearKeyToWestern,
  type ExamFile,
} from "@/lib/pastproblems-data";

// ---- Static params ----
export function generateStaticParams() {
  return getAllExamYearParams();
}

// ---- Metadata ----
type PageProps = {
  params: Promise<{ exam: string; year: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam, year } = await params;
  const found = getYearEntry(exam, year);
  if (!found) return {};
  const { category, year: entry } = found;
  const western = yearKeyToWestern(entry.key);

  const title = `${entry.label} ${category.name} 過去問【問題・解答PDF無料ダウンロード】`;
  const description = `${entry.label}（${western}年度）の${category.name}本試験問題と解答をPDFで無料ダウンロード。第一次検定・第二次検定の出題傾向と対策ポイントを独学合格者が解説。`;

  return {
    title,
    description,
    keywords: `${entry.label} ${category.shortName} 過去問,${category.shortName} ${entry.key} 過去問,${western}年度 ${category.shortName} 過去問,${category.shortName} pdf ${entry.key},${category.name} 過去問 ダウンロード`,
    alternates: { canonical: `/pastproblems/${exam}/${year}` },
    openGraph: {
      title: `${entry.label} ${category.name} 過去問 | 土木のトリセツ`,
      description,
      url: `/pastproblems/${exam}/${year}`,
    },
  };
}

// ---- Exam-specific study tips ----
function getExamTips(examId: string): { focus: string; advice: string }[] {
  switch (examId) {
    case "1doboku":
      return [
        { focus: "コンクリート", advice: "毎年5〜6問出題される最重要分野。スランプ・水セメント比・空気量などの数値は暗記必須。" },
        { focus: "施工管理法（ネットワーク工程表）", advice: "クリティカルパス計算はパターン化されているため、3問解けば要領がつかめる。" },
        { focus: "土工", advice: "土量変化率（L・C）、含水比、締固めの仕組みを理解すれば得点源。" },
        { focus: "安全管理（作業主任者）", advice: "選任が必要な作業の暗記問題が頻出。暗記シートで一気に攻略できる。" },
      ];
    case "2doboku":
      return [
        { focus: "前期・後期共通の頻出分野", advice: "コンクリート・土工・安全管理の3分野で全体の50%以上を占める。" },
        { focus: "選択問題の戦略", advice: "必須解答数と選択解答数を事前に把握。選択問題は得意分野だけ解けばOK。" },
        { focus: "第二次検定（実地）", advice: "経験記述が最重要。3テーマ（品質・工程・安全）を早期に準備。" },
      ];
    case "1zou":
      return [
        { focus: "植物・造園材料", advice: "毎年必ず出る造園特有の分野。樹木カード等で継続暗記が必要。" },
        { focus: "造園工事施工", advice: "植栽・高木剪定・公園施設の工法は図と一緒に理解すると定着しやすい。" },
        { focus: "第二次検定（記述式）", advice: "造園工事に特化した経験記述を3テーマ準備。1級は記述量が多い。" },
      ];
    case "2zou":
      return [
        { focus: "植物知識", advice: "2級でも樹木の分類・特性は頻出。日常の現場作業と結びつけて覚える。" },
        { focus: "施工・安全", advice: "高所作業・伐採作業に関する安全基準は押さえておく。" },
        { focus: "第二次検定", advice: "造園工事の経験記述は、公園整備・植栽工事のどちらかに絞って準備すると効率的。" },
      ];
    default:
      return [];
  }
}

// ---- Variant styles for download buttons ----
const variantStyles: Record<ExamFile["variant"], string> = {
  question: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  answer: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  second: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
};

// ---- Related benkyoho article slug ----
function getBenkyohoSlug(examId: string): string | null {
  switch (examId) {
    case "1doboku": return "doboku-1kyu-benkyoho";
    case "2doboku": return "doboku-2kyu-benkyoho";
    case "1zou": return "zouen-1kyu-benkyoho";
    case "2zou": return "zouen-2kyu-benkyoho";
    default: return null;
  }
}

// ---- Page component ----
export default async function Page({ params }: PageProps) {
  const { exam, year } = await params;
  const found = getYearEntry(exam, year);
  if (!found) notFound();
  const { category, year: entry } = found;

  // Prev/next year navigation
  const idx = category.years.findIndex((y) => y.key === entry.key);
  const prev = idx >= 0 && idx < category.years.length - 1 ? category.years[idx + 1] : null; // 古い年度
  const next = idx > 0 ? category.years[idx - 1] : null; // 新しい年度

  const tips = getExamTips(exam);
  const western = yearKeyToWestern(entry.key);
  const benkyohoSlug = getBenkyohoSlug(exam);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": `${entry.label} ${category.name} 過去問`,
        "description": `${entry.label}（${western}年度）の${category.name}本試験問題と解答PDF、出題傾向の解説。`,
        "url": `${siteUrl}/pastproblems/${exam}/${year}`,
        "inLanguage": "ja-JP",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "過去問ダウンロード", "item": `${siteUrl}/pastproblems` },
            { "@type": "ListItem", "position": 3, "name": `${entry.label} ${category.shortName}`, "item": `${siteUrl}/pastproblems/${exam}/${year}` },
          ],
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />

      <Breadcrumb
        items={[
          { label: "過去問ダウンロード", href: "/pastproblems" },
          { label: `${entry.label} ${category.shortName}` },
        ]}
      />

      {/* Hero */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 px-6 py-8 md:px-10 md:py-10 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${category.hex} 0%, ${category.hex}dd 100%)` }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full mb-3">
          <FiDownload size={12} />
          {western}年度 過去問 PDF
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
          {entry.label}{" "}
          <span className="md:inline block">{category.name} 過去問</span>
        </h1>
        <p className="text-white/85 text-sm md:text-base leading-relaxed">
          {entry.label}（{western}年度）に実施された{category.name}の本試験問題・解答を無料でPDFダウンロードできます。
          印刷して本番形式で演習することで、試験本番の感覚をつかめます。
        </p>
      </div>

      {/* Download buttons */}
      <section className="mb-10 bg-white border border-border rounded-xl p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
          <FiFileText size={20} style={{ color: category.hex }} />
          問題・解答 PDF ダウンロード
        </h2>
        {entry.note && (
          <p className="text-xs text-gray-500 mb-3">※ {entry.note}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {entry.files.map((f) => (
            <a
              key={f.path}
              href={f.path}
              download
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${variantStyles[f.variant]}`}
            >
              <FiDownload size={14} className="flex-shrink-0" />
              {f.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          出典：公益財団法人 全国建設研修センター（掲載許諾済み）
        </p>
      </section>

      {/* 出題傾向・対策 */}
      {tips.length > 0 && (
        <section className="mb-10 bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-800 mb-4">
            <FiBookOpen size={20} className="text-primary" />
            {category.shortName}の出題傾向と対策ポイント
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-5">
            {entry.label}の問題を解く前に、{category.shortName}の定番頻出分野と対策のコツを押さえておくと効率的です。
            以下のポイントを意識して過去問に取り組んでください。
          </p>
          <ul className="space-y-3">
            {tips.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: category.hex }}
                >
                  {i + 1}
                </span>
                <div>
                  <strong className="text-gray-800">{t.focus}</strong>
                  <p className="text-gray-700 mt-0.5">{t.advice}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 使い方ミニガイド */}
      <section className="mb-10 bg-surface border border-border rounded-xl p-5 md:p-6">
        <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-800 mb-3">
          <FiHelpCircle size={18} className="text-primary" />
          この年度の過去問をこう使う
        </h2>
        <ol className="space-y-2 text-sm text-gray-700">
          <li>1. <strong>まず本番と同じ時間配分</strong>で通しで解いてみる</li>
          <li>2. 間違えた問題は<strong>分野別に印</strong>をつける（コンクリート・土工など）</li>
          <li>3. <strong>同じ分野の他年度</strong>も解いて、出題パターンを掴む</li>
          <li>4. 3日後・1週間後に<strong>間違えた問題だけ再挑戦</strong></li>
          <li>5. スキマ時間は<Link href="/quiz" className="text-primary underline hover:no-underline">過去問チャレンジ</Link>で反復</li>
        </ol>
      </section>

      {/* Prev/Next navigation */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prev ? (
          <Link
            href={`/pastproblems/${exam}/${prev.key}`}
            className="group flex items-center gap-3 bg-white border border-border rounded-xl p-4 hover:border-primary hover:shadow-sm transition"
          >
            <FiArrowLeft size={18} className="text-gray-400 group-hover:text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">前の年度</div>
              <div className="text-sm font-bold text-gray-800 truncate">
                {prev.label} {category.shortName}
              </div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={`/pastproblems/${exam}/${next.key}`}
            className="group flex items-center gap-3 bg-white border border-border rounded-xl p-4 hover:border-primary hover:shadow-sm transition justify-end text-right"
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">次の年度</div>
              <div className="text-sm font-bold text-gray-800 truncate">
                {next.label} {category.shortName}
              </div>
            </div>
            <FiArrowRight size={18} className="text-gray-400 group-hover:text-primary flex-shrink-0" />
          </Link>
        ) : <div />}
      </section>

      {/* Other exams 横断リンク */}
      <section className="mb-10 bg-white border border-border rounded-xl p-5 md:p-6">
        <h2 className="text-base font-bold text-gray-800 mb-3">他の級・種別の{entry.label}過去問</h2>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.filter((c) => c.id !== exam).map((c) => {
            const sameYear = c.years.find((y) => y.key === entry.key);
            if (!sameYear) return null;
            return (
              <Link
                key={c.id}
                href={`/pastproblems/${c.id}/${entry.key}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-surface transition"
                style={{ color: c.hex }}
              >
                <FiExternalLink size={14} />
                {entry.label} {c.shortName}
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-10 rounded-xl p-6 bg-gradient-to-br from-[#2d5a8e] to-[#1e3a5f] text-white shadow-md">
        <h2 className="text-base font-bold mb-2">過去問をもっと効率的に解くなら</h2>
        <p className="text-sm text-white/85 leading-relaxed mb-4">
          紙で解いたあとは、<strong>4択Webクイズ形式</strong>で復習するのがおすすめ。解説付きで苦手分野を一気に潰せます。
          スマホでスキマ時間に反復できる無料ツールを用意しています。
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] text-sm font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition"
        >
          過去問チャレンジ（無料Webクイズ）を試す
          <FiArrowRight size={14} />
        </Link>
      </section>

      {/* 関連記事 */}
      {benkyohoSlug && (
        <section className="mb-10 bg-surface border border-border rounded-xl p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">{category.shortName}の合格対策記事</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/posts/${benkyohoSlug}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                <FiArrowRight size={14} />
                {category.name} 勉強法【独学合格の全手順】
              </Link>
            </li>
            <li>
              <Link href="/pastproblems" className="inline-flex items-center gap-2 text-primary hover:underline">
                <FiArrowRight size={14} />
                過去問ダウンロードトップ（14年分の一覧）
              </Link>
            </li>
          </ul>
        </section>
      )}

      {/* Footer note */}
      <div className="mt-10 pt-6 border-t border-border text-xs text-gray-400">
        <p>出典：公益財団法人 全国建設研修センター</p>
        <p>掲載している過去問は同センターの許諾のもと、このサイトで公開しています。無断での二次配布はご遠慮ください。</p>
      </div>
    </div>
  );
}
