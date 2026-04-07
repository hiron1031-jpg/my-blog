import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: encodeURIComponent(cat.name),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getPostsByCategory(name);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const ogImageUrl = `/api/og?title=${encodeURIComponent(name + "の記事一覧")}&category=${encodeURIComponent(name)}`;

  return {
    title: `${name}の記事一覧`,
    description: `${name}に関する記事一覧です。全${posts.length}件の記事を掲載しています。施工管理技士の試験対策・勉強法をわかりやすく解説します。`,
    alternates: {
      canonical: `/categories/${encodeURIComponent(name)}`,
    },
    openGraph: {
      title: `${name}の記事一覧`,
      description: `${name}に関する記事一覧（${posts.length}件）。施工管理技士の試験対策・勉強法をわかりやすく解説。`,
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
      <h1 className="text-2xl font-bold text-heading mb-2">{name}</h1>
      <p className="text-secondary text-sm mb-8">{posts.length}件の記事</p>
      <PostGrid posts={posts} />
    </div>
  );
}
