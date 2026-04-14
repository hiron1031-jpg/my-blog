import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Sidebar from "@/components/layout/Sidebar";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const posts = getPostsByTag(name);

  return {
    title: `#${name} の記事一覧`,
    description: `「${name}」タグが付いた記事一覧です。全${posts.length}件。施工管理技士の試験対策・勉強法に関する記事をまとめています。`,
    alternates: {
      canonical: `/tags/${encodeURIComponent(name)}`,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const posts = getPostsByTag(name);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: `#${name}` }]} />

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        <main>
          <h1 className="text-2xl font-bold text-heading mb-1">#{name}</h1>
          <p className="text-secondary text-sm mb-8">{posts.length}件の記事</p>
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
