import { getAllPosts, getAllCategories } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Sidebar from "@/components/layout/Sidebar";
import Badge from "@/components/ui/Badge";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "施工管理技士の勉強法・試験対策・過去問分析・参考書レビュー・経験記述の書き方まで、すべての記事を一覧表示。土木・造園、1級・2級の各資格を独学合格者の体験ベースで解説しています。",
  alternates: {
    canonical: "/posts",
  },
  openGraph: {
    title: "記事一覧 | 土木のトリセツ",
    description:
      "施工管理技士の勉強法・試験対策・参考書レビュー・経験記述の書き方まで全記事を一覧表示。",
    url: "/posts",
    images: [
      {
        url: "/api/og?title=" + encodeURIComponent("記事一覧"),
        width: 1200,
        height: 630,
        alt: "土木のトリセツ 記事一覧",
      },
    ],
  },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "記事一覧", item: `${siteUrl}/posts` },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb items={[{ label: "記事一覧" }]} />

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        {/* Main */}
        <main>
          <h1 className="text-2xl font-bold text-heading mb-1">記事一覧</h1>
          <p className="text-secondary text-sm mb-6">全 {posts.length} 件</p>

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <Badge
                  key={cat.name}
                  label={`${cat.name} (${cat.count})`}
                  href={`/categories/${encodeURIComponent(cat.name)}`}
                  variant="tag"
                />
              ))}
            </div>
          )}

          <PostGrid posts={posts} />
        </main>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
