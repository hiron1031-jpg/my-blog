import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCategories,
  getPostsByCategory,
  getPopularTagsInCategory,
} from "@/lib/mdx";
import { getCategoryDescription } from "@/lib/categoryDescriptions";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Sidebar from "@/components/layout/Sidebar";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: cat.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getPostsByCategory(name);
  const intro = getCategoryDescription(name);
  const description =
    intro ??
    `${name}に関する記事一覧です。全${posts.length}件の記事を掲載しています。施工管理技士の試験対策・勉強法をわかりやすく解説します。`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(name + "の記事一覧")}&category=${encodeURIComponent(name)}`;

  return {
    title: `${name}の記事一覧`,
    description,
    alternates: {
      canonical: `/categories/${encodeURIComponent(name)}`,
    },
    openGraph: {
      title: `${name}の記事一覧`,
      description,
      url: `/categories/${encodeURIComponent(name)}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${name}の記事一覧` }],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getPostsByCategory(name);
  if (posts.length === 0) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const intro = getCategoryDescription(name);
  const popularTags = getPopularTagsInCategory(name, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "カテゴリ一覧", "item": `${siteUrl}/categories` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": `${siteUrl}/categories/${encodeURIComponent(name)}`,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb
        items={[
          { label: "カテゴリ一覧", href: "/categories" },
          { label: name },
        ]}
      />

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        <main>
          <h1 className="text-2xl font-bold text-heading mb-1">{name}</h1>
          <p className="text-secondary text-sm mb-4">{posts.length}件の記事</p>
          {intro && (
            <div className="mb-6 p-4 bg-surface border-l-4 border-primary rounded-r-lg">
              <p className="text-sm text-heading leading-relaxed">{intro}</p>
            </div>
          )}
          {popularTags.length > 0 && (
            <div className="mb-8 p-4 bg-card border border-border rounded-xl">
              <p className="text-xs font-bold text-secondary mb-2">
                よく使われているタグ TOP{popularTags.length}
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((t) => (
                  <Link
                    key={t.name}
                    href={`/tags/${encodeURIComponent(t.name)}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-surface text-secondary text-xs rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    #{t.name}
                    <span className="text-[10px] opacity-70">({t.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <PostGrid posts={posts} />
        </main>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
