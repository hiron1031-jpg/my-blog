import Link from "next/link";
import Image from "next/image";
import { FiClock, FiCalendar } from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import CategoryThumbnail from "@/components/post/CategoryThumbnail";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime, excerpt } = post;

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-border flex flex-col">
      {/* Thumbnail */}
      <Link href={`/posts/${slug}`} className="relative block overflow-hidden">
        <div className={`relative w-full ${featured ? "aspect-video" : "aspect-[16/9]"} bg-surface`}>
          {frontmatter.thumbnail && frontmatter.thumbnail.length > 0 ? (
            <Image
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <CategoryThumbnail
              category={frontmatter.category}
              title={frontmatter.title}
            />
          )}
          {/* Category overlay */}
          <div className="absolute top-3 left-3">
            <Badge
              label={frontmatter.category}
              href={`/categories/${encodeURIComponent(frontmatter.category)}`}
            />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/posts/${slug}`} className="group">
          <h2 className={`font-bold text-heading group-hover:text-primary transition-colors line-clamp-2 mb-2 ${featured ? "text-lg" : "text-base"}`}>
            {frontmatter.title}
          </h2>
        </Link>
        <p className="text-xs text-secondary/80 line-clamp-3 flex-1 mb-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-secondary/60 mt-auto">
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
