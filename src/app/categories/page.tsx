import Link from "next/link";
import { getAllCategories } from "@/lib/mdx";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
  description:
    "土木のトリセツのカテゴリ一覧。土木施工管理技士・造園施工管理技士・試験対策の3つのカテゴリから記事を探せます。",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "カテゴリ一覧 | 土木のトリセツ",
    description:
      "土木施工管理技士・造園施工管理技士・試験対策の3カテゴリから記事を探せます。",
    url: "/categories",
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "カテゴリ一覧", item: `${siteUrl}/categories` },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb items={[{ label: "カテゴリ一覧" }]} />
      <h1 className="text-2xl font-bold text-heading mb-2">カテゴリ一覧</h1>
      <p className="text-secondary text-sm mb-8">
        記事を大きなテーマごとに分類しています。気になるカテゴリから記事を探してみてください（全{categories.length}カテゴリ）。
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-xl border-2 border-border hover:border-primary hover:bg-surface transition-all duration-200 text-center"
          >
            <span className="font-bold text-heading">{cat.name}</span>
            <span className="text-xs text-secondary/60">{cat.count}件</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
