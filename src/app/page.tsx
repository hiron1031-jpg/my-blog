import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import CategoryBanner from "@/components/home/CategoryBanner";
import HeroCarousel from "@/components/home/HeroCarousel";
import QuickAccess from "@/components/home/QuickAccess";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "土木のヒロブログ | 施工管理技士 資格取得サポート",
  },
  description:
    "1級・2級土木施工管理技士、造園施工管理技士を目指す方のための勉強法・過去問・試験対策ブログ。現役土木職員ヒロが合格への道を徹底解説します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "土木のヒロブログ | 施工管理技士 資格取得サポート",
    description:
      "1級・2級土木施工管理技士、造園施工管理技士を目指す方のための勉強法・過去問・試験対策ブログ。",
    url: "/",
    type: "website",
    images: [
      {
        url: "/api/og?title=%E5%9C%9F%E6%9C%A8%E3%81%AE%E3%83%92%E3%83%AD%E3%83%96%E3%83%AD%E3%82%B0",
        width: 1200,
        height: 630,
        alt: "土木のヒロブログ",
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
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のヒロブログ";

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
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <JsonLd schema={jsonLd} />

      {/* Hero Carousel */}
      {featuredPosts.length > 0 && (
        <section>
          <HeroCarousel posts={featuredPosts} />
        </section>
      )}

      {/* Quick Access */}
      <QuickAccess />

      {/* Category Links */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-heading flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full inline-block" />
              カテゴリ
            </h2>
            <Link href="/categories" className="text-sm text-primary hover:underline">
              すべて見る →
            </Link>
          </div>
          <CategoryBanner categories={categories} />
        </section>
      )}

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
