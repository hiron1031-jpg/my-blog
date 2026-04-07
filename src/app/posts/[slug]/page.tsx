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
import { formatDate } from "@/lib/utils";
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
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(slug, post.frontmatter.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const postUrl = `${siteUrl}/posts/${slug}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
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
          <div className="sticky top-24 space-y-6">
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Tag cloud */}
            {post.frontmatter.tags.length > 0 && (
              <div className="bg-surface rounded-xl p-4 border border-border">
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
          </div>
        </aside>
      </div>
    </div>
  );
}
