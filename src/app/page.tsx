import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import CategoryBanner from "@/components/home/CategoryBanner";
import HeroCarousel from "@/components/home/HeroCarousel";
import QuickAccess from "@/components/home/QuickAccess";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured).slice(0, 5);
  const recentPosts = allPosts.slice(0, 6);
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

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
