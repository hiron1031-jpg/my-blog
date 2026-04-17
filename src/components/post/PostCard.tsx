import Link from "next/link";
import Image from "next/image";
import { FiClock, FiCalendar } from "react-icons/fi";
import CategoryThumbnail from "@/components/post/CategoryThumbnail";
import { formatDate } from "@/lib/utils";
import { getCategoryColor } from "@/lib/category-colors";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime, excerpt } = post;
  const color = getCategoryColor(frontmatter.category);

  return (
    <article
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-border flex flex-col group"
      style={{ borderLeft: `3px solid ${color.hex}` }}
    >
      {/* Thumbnail */}
      <Link href={`/posts/${slug}`} className="relative block overflow-hidden">
        <div className={`relative w-full ${featured ? "aspect-video" : "aspect-[16/9]"} bg-surface`}>
          {frontmatter.thumbnail && frontmatter.thumbnail.length > 0 ? (
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <CategoryThumbnail
              category={frontmatter.category}
              title={frontmatter.title}
            />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <div className="mb-2">
          <span
            className="inline-block text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: `${color.hex}18`,
              color: color.hex,
              borderColor: `${color.hex}40`,
            }}
          >
            {frontmatter.category}
          </span>
        </div>
        <Link href={`/posts/${slug}`}>
          <h2 className={`font-bold text-heading hover:text-primary transition-colors line-clamp-2 mb-2 ${featured ? "text-lg" : "text-base"}`}>
            {frontmatter.title}
          </h2>
        </Link>
        <p className="text-xs text-secondary/70 line-clamp-2 flex-1 mb-3 leading-relaxed">
          {excerpt}
        </p>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-secondary/60 border border-border">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 text-xs text-secondary/50 mt-auto pt-3 border-t border-border">
          <span className="flex items-center gap-1">
            <FiCalendar size={11} />
            {formatDate(frontmatter.date)}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={11} />
            {readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}
