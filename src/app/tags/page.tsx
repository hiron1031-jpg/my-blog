import Link from "next/link";
import { getAllTags } from "@/lib/mdx";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タグ一覧",
  description:
    "土木のトリセツの全タグを一覧表示。1級土木・2級土木・1級造園・2級造園・独学・経験記述・参考書など、関心のあるテーマから記事を探せます。",
  alternates: {
    canonical: "/tags",
  },
  openGraph: {
    title: "タグ一覧",
    description:
      "土木のトリセツの全タグを一覧表示。関心のあるテーマから記事を探せます。",
    url: "/tags",
  },
};

export default function TagsPage() {
  const tags = getAllTags();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "タグ一覧", item: `${siteUrl}/tags` },
    ],
  };

  // 件数の多い順にソート
  const sorted = [...tags].sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb items={[{ label: "タグ一覧" }]} />
      <h1 className="text-2xl font-bold text-heading mb-2">タグ一覧</h1>
      <p className="text-secondary text-sm mb-8">
        記事に付いているタグを一覧表示。気になるテーマからピンポイントで記事を探せます（全{tags.length}タグ）。
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sorted.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="flex items-center justify-between gap-2 px-4 py-3 bg-white rounded-lg border border-border hover:border-primary hover:bg-surface transition-all duration-200"
          >
            <span className="font-medium text-heading text-sm">
              #{tag.name}
            </span>
            <span className="text-xs text-secondary/60 shrink-0">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
