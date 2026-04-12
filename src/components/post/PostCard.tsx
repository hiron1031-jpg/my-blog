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
            <>
              <Image
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* グラデーション＋タイトルオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6">
                <p className={`text-white font-bold leading-snug drop-shadow-sm line-clamp-2 ${featured ? "text-base" : "text-sm"}`}>
                  {frontmatter.title}
                </p>
              </div>
            </>
          ) : (
            <CategoryThumbnail
              category={frontmatter.category}
              title={frontmatter.title}
            />
          )}
          {/* Category overlay（リンク内のa入れ子を避けるためspanで表示） */}
          <div className="absolute top-3 left-3">
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-white">
              {frontmatter.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* サムネイルなし（CategoryThumbnail）のときだけタイトルを表示 */}
        {(!frontmatter.thumbnail || frontmatter.thumbnail.length === 0) && (
          <Link href={`/posts/${slug}`} className="group">
            <h2 className={`font-bold text-heading group-hover:text-primary transition-colors line-clamp-2 mb-2 ${featured ? "text-lg" : "text-base"}`}>
              {frontmatter.title}
            </h2>
          </Link>
        )}
        <p className="text-xs text-secondary/80 line-clamp-3 flex-1 mb-3">
          {excerpt}
        </p>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-secondary/70 border border-border">
                #{tag}
              </span>
            ))}
          </div>
        )}
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
