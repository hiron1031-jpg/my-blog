import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiDownload, FiCheckCircle } from "react-icons/fi";
import { CATEGORIES, getCategory, yearKeyToWestern } from "@/lib/pastproblems-data";
import PackCta from "@/components/post/PackCta";

// 以前ここは最新年度への redirect だった。
// しかし GSC では「2級土木施工管理技士 過去問」のように年度を言わない検索が
// 28日で7,602表示あり、その受け皿が無いため「令和7年度〜」という年度入りの
// ページが代わりに出て CTR 1.6% まで落ちていた（年度指定の検索は10〜43%）。
// 年度を決めていない人のための一覧ページを置く。
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ exam: c.id }));
}

type PageProps = { params: Promise<{ exam: string }> };

const PACK_EXAM: Record<string, "1doboku" | "2doboku" | "1zouen" | "2zouen"> = {
  "1doboku": "1doboku",
  "2doboku": "2doboku",
  "1zou": "1zouen",
  "2zou": "2zouen",
};

function benkyohoSlug(examId: string): string | null {
  switch (examId) {
    case "1doboku": return "doboku-1kyu-benkyoho";
    case "2doboku": return "doboku-2kyu-benkyoho";
    case "1zou": return "zouen-1kyu-benkyoho";
    case "2zou": return "zouen-2kyu-benkyoho";
    default: return null;
  }
}

function hinshutsuSlug(examId: string): string | null {
  switch (examId) {
    case "1doboku": return "doboku-1kyu-hinshutu";
    case "2doboku": return "doboku-2kyu-hinshutu";
    case "1zou": return "zouen-1kyu-hinshutu";
    case "2zou": return "zouen-2kyu-hinshutu";
    default: return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  const category = getCategory(exam);
  if (!category) return {};

  const n = category.years.length;
  const newest = category.years[0];
  const oldest = category.years[n - 1];

  const title = `${category.name} 過去問【全${n}年分・問題と解答PDF 無料ダウンロード】`;
  const description = `${category.name}の過去問を${oldest.label}〜${newest.label}の全${n}年分、登録不要・無料でPDFダウンロード。第一次検定・第二次検定の問題用紙と正答を年度ごとにまとめています。印刷してそのまま本番演習に使えます。`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(`${category.name} 過去問`)}&category=${encodeURIComponent(`全${n}年分 無料PDF`)}`;

  return {
    title,
    description,
    keywords: `${category.name} 過去問,${category.shortName} 過去問,${category.shortName} 過去問 無料,${category.shortName} 過去問 pdf,${category.shortName} 過去問 ダウンロード,${category.name} 問題`,
    alternates: { canonical: `/pastproblems/${exam}` },
    openGraph: {
      title: `${category.name} 過去問【全${n}年分・無料PDF】| 土木のトリセツ`,
      description,
      url: `/pastproblems/${exam}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${category.name} 過去問` }],
    },
    twitter: { card: "summary_large_image", images: [ogImageUrl] },
  };
}

export default async function ExamPastProblemsIndex({ params }: PageProps) {
  const { exam } = await params;
  const category = getCategory(exam);
  if (!category || category.years.length === 0) notFound();

  const n = category.years.length;
  const newest = category.years[0];
  const oldest = category.years[n - 1];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const benkyoho = benkyohoSlug(exam);
  const hinshutsu = hinshutsuSlug(exam);
  const packExam = PACK_EXAM[exam];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} 過去問 年度別一覧`,
    itemListElement: category.years.map((y, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${y.label} ${category.name} 過去問`,
      url: `${siteUrl}/pastproblems/${exam}/${y.key}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "過去問", item: `${siteUrl}/pastproblems` },
      { "@type": "ListItem", position: 3, name: `${category.name} 過去問`, item: `${siteUrl}/pastproblems/${exam}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-xs text-secondary/70 mb-4">
        <Link href="/" className="hover:underline">ホーム</Link>
        <span className="mx-1.5">›</span>
        <Link href="/pastproblems" className="hover:underline">過去問</Link>
        <span className="mx-1.5">›</span>
        <span>{category.shortName}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-4">
        {category.name} 過去問
        <span className="block text-base md:text-lg font-bold mt-1" style={{ color: category.hex }}>
          全{n}年分・問題と解答PDFを無料ダウンロード
        </span>
      </h1>

      <p className="text-[15px] text-secondary leading-relaxed mb-3">
        {category.name}の本試験問題と正答を、<strong>{oldest.label}から{newest.label}までの全{n}年分</strong>掲載しています。
        会員登録もメールアドレスの入力も不要で、<strong>そのままPDFをダウンロード</strong>できます。印刷すれば本番と同じ形式で演習できます。
      </p>
      <p className="text-[15px] text-secondary leading-relaxed mb-8">
        解きたい年度を選んでください。各年度のページに、第一次検定・第二次検定の問題用紙と正答をまとめています。
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2" style={{ borderColor: category.hex }}>
          年度を選ぶ
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {category.years.map((y, i) => {
            const isNewest = i === 0;
            return (
            <li key={y.key}>
              <Link
                href={`/pastproblems/${exam}/${y.key}`}
                className="group block h-full rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md hover:border-primary/50"
                style={isNewest ? { borderColor: category.hex } : undefined}
              >
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-lg font-bold text-gray-800">{y.label}</span>
                  <span className="text-xs text-secondary/70">（{yearKeyToWestern(y.key)}年度）</span>
                  {isNewest && (
                    <span className="ml-auto rounded px-1.5 py-0.5 text-[11px] font-bold text-white" style={{ backgroundColor: category.hex }}>
                      最新
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {y.files.map((f) => (
                    <span key={f.path} className="rounded bg-surface px-1.5 py-0.5 text-[11px] text-secondary border border-border">
                      {f.label}
                    </span>
                  ))}
                </div>
                {y.note && (
                  <p className="mb-2 text-xs leading-snug text-secondary/80">{y.note}</p>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:underline">
                  <FiDownload size={14} />
                  PDFを見る
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border bg-white p-5 md:p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-3">どの年度から解けばいい？</h2>
        <ul className="space-y-2.5 text-[15px] text-secondary">
          <li className="flex items-start gap-2">
            <FiCheckCircle size={17} className="mt-1 shrink-0" style={{ color: category.hex }} />
            <span><strong>新しい年度から古い年度へ</strong>。出題の傾向は年々変わるので、{newest.label}・{category.years[1]?.label ?? ""}のような直近から手を付けるほうが本番に近い形で練習できます。</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle size={17} className="mt-1 shrink-0" style={{ color: category.hex }} />
            <span><strong>最低5年分、できれば10年分</strong>。第一次検定は過去問からの類題が多く、繰り返すほど効きます。</span>
          </li>
          <li className="flex items-start gap-2">
            <FiCheckCircle size={17} className="mt-1 shrink-0" style={{ color: category.hex }} />
            <span><strong>1周目で答えを覚えてしまっても問題ありません</strong>。2周目以降は「なぜその選択肢が誤りか」を言えるかで確認してください。</span>
          </li>
        </ul>
        <p className="mt-4 text-xs text-secondary/70">
          ※ 掲載している問題・正答は一般財団法人 全国建設研修センターの許諾を得て掲載しています。第二次検定の正答は記述式のため公表されません。
        </p>
      </section>

      <section className="mb-10 rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
        <h2 className="text-base font-bold text-gray-800 mb-3">PDFを解いたあとに使えるもの（すべて無料）</h2>
        <ul className="space-y-2 text-[15px]">
          <li>
            <Link href="/quiz" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
              <FiArrowRight size={14} />
              過去問チャレンジ（Webで解く一問一答・1,357問）
            </Link>
            <span className="block text-sm text-secondary ml-5">印刷しなくても、スマホのスキマ時間で反復できます。</span>
          </li>
          {hinshutsu && (
            <li>
              <Link href={`/posts/${hinshutsu}`} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
                <FiArrowRight size={14} />
                {category.shortName} 第一次検定の頻出分野
              </Link>
              <span className="block text-sm text-secondary ml-5">時間が足りないときに、どこから潰すかの順番です。</span>
            </li>
          )}
          {benkyoho && (
            <li>
              <Link href={`/posts/${benkyoho}`} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
                <FiArrowRight size={14} />
                {category.shortName}の勉強法（独学合格の手順）
              </Link>
            </li>
          )}
          <li>
            <Link href={`/shikaku/${exam}`} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
              <FiArrowRight size={14} />
              {category.name}の合格率・難易度
            </Link>
          </li>
        </ul>
      </section>

      {packExam && <PackCta exam={packExam} />}

      <p className="text-sm text-secondary">
        <Link href="/pastproblems" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
          <FiArrowRight size={14} />
          他の資格の過去問も見る（1級・2級 土木／造園）
        </Link>
      </p>
    </div>
  );
}
