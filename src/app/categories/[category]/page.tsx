import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
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
  return { title: `${name}の記事一覧` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getPostsByCategory(name);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
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
