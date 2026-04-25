import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import CategoryBanner from "@/components/home/CategoryBanner";
import HeroCarousel from "@/components/home/HeroCarousel";
import HomeHero from "@/components/home/HomeHero";
import ExamSelector from "@/components/home/ExamSelector";
import FreeTools from "@/components/home/FreeTools";
import LearningSteps from "@/components/home/LearningSteps";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "土木のトリセツ | 施工管理技士 資格取得サポート",
  },
  description:
    "1級・2級土木施工管理技士、造園施工管理技士を目指す方のための勉強法・過去問・試験対策ブログ。現役土木職員が合格への道を徹底解説します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "土木のトリセツ | 施工管理技士 資格取得サポート",
    description:
      "1級・2級土木施工管理技士、造園施工管理技士を目指す方のための勉強法・過去問・試験対策ブログ。",
    url: "/",
    type: "website",
    images: [
      {
        url: "/api/og?title=%E5%9C%9F%E6%9C%A8%E3%81%AE%E3%83%88%E3%83%AA%E3%82%BB%E3%83%84",
        width: 1200,
        height: 630,
        alt: "土木のトリセツ",
      },
    ],
  },
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured).slice(0, 5);
  const recentPosts = allPosts.slice(0, 6);
  const categories = getAllCategories();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のトリセツ";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": siteName,
        "description": "1級・2級土木施工管理技士、造園施工管理技士の資格取得サポートブログ",
        "inLanguage": "ja-JP",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": siteName,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/favicon.svg`,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <JsonLd schema={jsonLd} />

      {/* 1. Welcome Hero */}
      <HomeHero />

      {/* 2. Exam Selector (4 qualification buttons) */}
      <ExamSelector />

      {/* 3. Free Tools (2 big buttons) */}
      <FreeTools />

      {/* 4. Featured posts carousel */}
      {featuredPosts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-accent rounded-full inline-block" />
            <h2 className="text-xl font-bold text-heading">注目の記事</h2>
          </div>
          <HeroCarousel posts={featuredPosts} />
        </section>
      )}

      {/* 5. Learning step guide (affiliate funnel) */}
      <LearningSteps />

      {/* 6. Categories */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-heading flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full inline-block" />
              カテゴリから探す
            </h2>
            <Link href="/categories" className="text-sm text-primary hover:underline">
              すべて見る →
            </Link>
          </div>
          <CategoryBanner categories={categories} />
        </section>
      )}

      {/* Features */}
      <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-xl font-bold text-heading flex items-center gap-2 mb-6">
          <span className="w-1 h-6 bg-accent rounded-full inline-block" />
          このブログの特徴
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-heading text-sm mb-1">現役土木職員が執筆</p>
              <p className="text-xs text-secondary/70 leading-relaxed">実際に資格を取得した現役職員が、試験のポイントを分かりやすく解説します。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-accent" stroke="currentColor" strokeWidth="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-heading text-sm mb-1">過去問PDF 無料配布</p>
              <p className="text-xs text-secondary/70 leading-relaxed">H24〜R7年度の過去問をPDFで無料ダウンロード。繰り返し解いて合格力を高めよう。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#7b2d8b]/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#7b2d8b]" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-heading text-sm mb-1">過去問チャレンジ</p>
              <p className="text-xs text-secondary/70 leading-relaxed">年度別・試験別の4択で隙間時間に実力チェック。R4〜R7年度の過去問1,178問搭載。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-heading flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            最新記事
          </h2>
          <Link href="/posts" className="text-sm text-primary hover:underline">
            すべて見る →
          </Link>
        </div>
        <PostGrid posts={recentPosts} />
      </section>

    </div>
  );
}
