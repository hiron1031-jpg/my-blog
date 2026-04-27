import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { Post } from "@/types/post";

interface PostNavigationProps {
  prev: Post | null;
  next: Post | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="記事ナビゲーション"
      className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="group flex flex-col gap-1 p-4 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all"
        >
          <span className="text-xs text-secondary/70 flex items-center gap-1">
            <FiArrowLeft size={12} /> 前の記事
          </span>
          <span className="text-sm font-bold text-heading line-clamp-2 group-hover:text-primary transition-colors">
            {prev.frontmatter.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group flex flex-col gap-1 p-4 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all sm:text-right sm:items-end"
        >
          <span className="text-xs text-secondary/70 flex items-center gap-1 sm:flex-row-reverse">
            次の記事 <FiArrowRight size={12} />
          </span>
          <span className="text-sm font-bold text-heading line-clamp-2 group-hover:text-primary transition-colors">
            {next.frontmatter.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}
    </nav>
  );
}
