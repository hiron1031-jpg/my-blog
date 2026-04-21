import { notFound } from "next/navigation";
import Image from "next/image";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  extractHeadings,
} from "@/lib/mdx";
import MdxContent from "@/components/post/MdxContent";
import TableOfContents from "@/components/post/TableOfContents";
import ShareButtons from "@/components/post/ShareButtons";
import RelatedPosts from "@/components/post/RelatedPosts";
import AuthorBox from "@/components/post/AuthorBox";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/ui/Badge";
import JsonLd from "@/components/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&category=${encodeURIComponent(post.frontmatter.category)}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags.join(", "),
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      url: `${siteUrl}/posts/${slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(slug, post.frontmatter.category);
  const recentPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 4);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のトリセツ";
  const postUrl = `${siteUrl}/posts/${slug}`;
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&category=${encodeURIComponent(post.frontmatter.category)}`;
  const categoryUrl = `${siteUrl}/categories/${encodeURIComponent(post.frontmatter.category)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        "headline": post.frontmatter.title,
        "description": post.frontmatter.description,
        "datePublished": post.frontmatter.date,
        "dateModified": post.frontmatter.date,
        "author": {
          "@type": "Person",
          "name": post.frontmatter.author,
          "url": `${siteUrl}/about`,
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl,
        },
        "image": ogImageUrl,
        "url": postUrl,
        "keywords": post.frontmatter.tags.join(", "),
        "articleSection": post.frontmatter.category,
        "inLanguage": "ja-JP",
        "isPartOf": {
          "@type": "Blog",
          "@id": `${siteUrl}#blog`,
          "name": siteName,
          "url": siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "記事一覧", "item": `${siteUrl}/posts` },
          { "@type": "ListItem", "position": 3, "name": post.frontmatter.category, "item": categoryUrl },
          { "@type": "ListItem", "position": 4, "name": post.frontmatter.title, "item": postUrl },
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
      <Breadcrumb
        items={[
          { label: "記事一覧", href: "/posts" },
          { label: post.frontmatter.category, href: `/categories/${encodeURIComponent(post.frontmatter.category)}` },
          { label: post.frontmatter.title },
        ]}
      />

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        {/* Main Content */}
        <article>
          {/* Header */}
          <header className="mb-8">
            <Badge
              label={post.frontmatter.category}
              href={`/categories/${encodeURIComponent(post.frontmatter.category)}`}
              className="mb-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-heading mb-4 leading-snug">
              {post.frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary/70">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock size={14} />
                {post.readingTime}で読めます
              </span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.frontmatter.tags.map((tag) => (
                <Badge
                  key={tag}
                  label={`#${tag}`}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  variant="tag"
                />
              ))}
            </div>
          </header>

          {/* Thumbnail */}
          {post.frontmatter.thumbnail && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-surface">
              <Image
                src={post.frontmatter.thumbnail}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* TOC (mobile) */}
          {headings.length > 0 && (
            <div className="lg:hidden mb-8">
              <TableOfContents headings={headings} />
            </div>
          )}

          {/* Body */}
          <MdxContent content={post.content} />

          {/* Share */}
          <ShareButtons title={post.frontmatter.title} url={postUrl} />

          {/* Author */}
          <AuthorBox />

          {/* Related */}
          <RelatedPosts posts={related} />
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {/* TOC */}
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Quiz CTA */}
            <Link
              href="/quiz"
              className="block bg-gradient-to-br from-[#7b2d8b] to-[#a855a8] rounded-2xl p-4 text-white text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="text-[11px] font-bold opacity-75 mb-0.5 tracking-wide">🎯 無料で腕試し！</p>
              <p className="text-sm font-bold leading-snug">過去問チャレンジ</p>
              <p className="text-xs opacity-70 mt-0.5">年度別・4択クイズ</p>
            </Link>

            {/* Recent Posts */}
            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <p className="text-sm font-bold text-heading mb-3 flex items-center gap-1.5">
                <span className="w-1 h-4 bg-accent rounded-full inline-block" />
                最新記事
              </p>
              <ul className="space-y-3">
                {recentPosts.map((rp) => (
                  <li key={rp.slug}>
                    <Link href={`/posts/${rp.slug}`} className="flex gap-2.5 group">
                      <div className="w-20 aspect-video rounded-lg overflow-hidden shrink-0 bg-surface border border-border">
                        {rp.frontmatter.thumbnail && rp.frontmatter.thumbnail.length > 0 ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rp.frontmatter.thumbnail}
                            alt={rp.frontmatter.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/50 to-accent/50" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-heading leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {rp.frontmatter.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tag cloud */}
            {post.frontmatter.tags.length > 0 && (
              <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                <p className="text-sm font-bold text-heading mb-3 flex items-center gap-1.5">
                  <FiTag size={14} />
                  タグ
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      label={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      variant="tag"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Problems CTA */}
            <Link
              href="/pastproblems"
              className="block bg-gradient-to-br from-[#e8622a] to-[#f08c4b] rounded-2xl p-4 text-white text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="text-[11px] font-bold opacity-75 mb-0.5 tracking-wide">📥 完全無料！</p>
              <p className="text-sm font-bold leading-snug">過去問PDF ダウンロード</p>
              <p className="text-xs opacity-70 mt-0.5">H24〜R7年度 全対応</p>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
