import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { getTagDescription } from "@/lib/categoryDescriptions";
import PostGrid from "@/components/home/PostGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Sidebar from "@/components/layout/Sidebar";
import JsonLd from "@/components/JsonLd";
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
  const intro = getTagDescription(name);
  const description =
    intro ??
    `「${name}」タグが付いた記事一覧です。全${posts.length}件。施工管理技士の試験対策・勉強法に関する記事をまとめています。`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent("#" + name)}`;

  return {
    title: `#${name} の記事一覧`,
    description,
    alternates: {
      canonical: `/tags/${encodeURIComponent(name)}`,
    },
    openGraph: {
      title: `#${name} の記事一覧`,
      description,
      url: `/tags/${encodeURIComponent(name)}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `#${name} の記事一覧` }],
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const posts = getPostsByTag(name);
  if (posts.length === 0) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const intro = getTagDescription(name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "タグ一覧", item: `${siteUrl}/tags` },
      {
        "@type": "ListItem",
        position: 3,
        name: `#${name}`,
        item: `${siteUrl}/tags/${encodeURIComponent(name)}`,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb
        items={[
          { label: "タグ一覧", href: "/tags" },
          { label: `#${name}` },
        ]}
      />

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        <main>
          <h1 className="text-2xl font-bold text-heading mb-1">#{name}</h1>
          <p className="text-secondary text-sm mb-4">{posts.length}件の記事</p>
          {intro && (
            <div className="mb-8 p-4 bg-surface border-l-4 border-primary rounded-r-lg">
              <p className="text-sm text-heading leading-relaxed">{intro}</p>
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
