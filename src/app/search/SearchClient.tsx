"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Badge from "@/components/ui/Badge";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  excerpt: string;
}

interface SearchClientProps {
  index: SearchItem[];
}

export default function SearchClient({ index }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? index.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.excerpt.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <FiSearch
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで検索..."
          className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white"
          autoFocus
        />
      </div>

      {/* Results */}
      {query.trim() && (
        <p className="text-sm text-secondary">
          {results.length > 0
            ? `${results.length}件見つかりました`
            : "該当する記事が見つかりませんでした"}
        </p>
      )}

      <div className="space-y-4">
        {results.map((item) => (
          <article
            key={item.slug}
            className="bg-white rounded-xl p-4 border border-border hover:border-primary transition-colors"
          >
            <Link href={`/posts/${item.slug}`} className="group">
              <h2 className="font-bold text-heading group-hover:text-primary transition-colors mb-1">
                {item.title}
              </h2>
            </Link>
            <p className="text-xs text-secondary/80 mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                label={item.category}
                href={`/categories/${encodeURIComponent(item.category)}`}
              />
              {item.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  label={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  variant="tag"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
