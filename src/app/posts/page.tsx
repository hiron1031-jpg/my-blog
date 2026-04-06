import { getAllPosts, getAllCategories } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "すべての記事の一覧です。",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "記事一覧" }]} />
      <h1 className="text-2xl font-bold text-heading mb-2">記事一覧</h1>
      <p className="text-secondary text-sm mb-8">全 {posts.length} 件</p>

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
    </div>
  );
}
