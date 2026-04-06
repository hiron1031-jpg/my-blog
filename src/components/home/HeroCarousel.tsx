"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiClock, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/post";

interface HeroCarouselProps {
  posts: Post[];
}

const categoryGradients: Record<string, string> = {
  土木施工管理技士: "from-[#1b4332] to-[#2d6a4f]",
  造園施工管理技士: "from-[#2d6a4f] to-[#74c69d]",
  試験対策: "from-[#1b4332] to-[#495057]",
  勉強法: "from-[#2d6a4f] to-[#1b4332]",
  現場のリアル: "from-[#495057] to-[#2d6a4f]",
};

function getGradient(category: string) {
  return categoryGradients[category] ?? "from-[#1b4332] to-[#2d6a4f]";
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = posts.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-advance every 5s
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (total === 0) return null;

  const post = posts[current];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/6" }}>
      {/* Background */}
      {post.frontmatter.thumbnail && post.frontmatter.thumbnail.length > 0 ? (
        <Image
          key={post.slug}
          src={post.frontmatter.thumbnail}
          alt={post.frontmatter.title}
          fill
          className="object-cover transition-opacity duration-700"
          priority
        />
      ) : (
        <div
          key={post.slug}
          className={`absolute inset-0 bg-gradient-to-br ${getGradient(post.frontmatter.category)} transition-all duration-700`}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Text content */}
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <span className="inline-block text-xs font-bold px-3 py-1 bg-primary text-white rounded-full mb-3 w-fit">
          {post.frontmatter.category}
        </span>
        <h2 className="text-white font-bold text-xl md:text-3xl leading-snug mb-2 line-clamp-2 drop-shadow-sm">
          {post.frontmatter.title}
        </h2>
        <p className="text-white/80 text-sm hidden md:block line-clamp-2 mb-4 max-w-2xl">
          {post.frontmatter.description}
        </p>
        <div className="flex items-center gap-4 text-white/70 text-xs">
          <span className="flex items-center gap-1.5">
            <FiCalendar size={12} />
            {formatDate(post.frontmatter.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock size={12} />
            {post.readingTime}
          </span>
        </div>
      </Link>

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            aria-label="前へ"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            aria-label="次へ"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-5" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`スライド ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
