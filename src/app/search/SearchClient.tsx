"use client";

import { useState, useMemo } from "react";
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

const POPULAR_KEYWORDS = [
  "経験記述",
  "勉強法",
  "合格率",
  "参考書",
  "1級土木",
  "1級造園",
  "2級土木",
  "2級造園",
];

export default function SearchClient({ index }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.excerpt.toLowerCase().includes(q)
    );
  }, [query, index]);

  const categories = useMemo(() => {
    const set = new Set(index.map((i) => i.category));
    return Array.from(set);
  }, [index]);

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

      {/* Empty state — show shortcuts */}
      {!query.trim() && (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-heading mb-2">
              よく検索されるキーワード
            </h2>
            <div className="flex flex-wrap gap-2">
              {POPULAR_KEYWORDS.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 text-sm rounded-full border-2 border-border hover:border-primary hover:bg-surface transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-heading mb-2">カテゴリーから探す</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${encodeURIComponent(cat)}`}
                  className="border-2 border-border rounded-lg px-3 py-2 text-sm hover:border-primary hover:bg-surface transition-colors"
                >
                  <span className="font-semibold text-heading">{cat}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-heading mb-2">無料ツール</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              <Link
                href="/quiz"
                className="border-2 border-border rounded-lg px-3 py-2 text-sm hover:border-primary hover:bg-surface transition-colors"
              >
                📝 過去問チャレンジ
              </Link>
              <Link
                href="/pastproblems"
                className="border-2 border-border rounded-lg px-3 py-2 text-sm hover:border-primary hover:bg-surface transition-colors"
              >
                📄 過去問PDF 14年分
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      {query.trim() && (
        <p className="text-sm text-secondary">
          {results.length > 0
            ? `「${query}」で${results.length}件見つかりました`
            : `「${query}」に該当する記事はありませんでした`}
        </p>
      )}

      {/* No results — suggestion */}
      {query.trim() && results.length === 0 && (
        <div className="border-2 border-border rounded-lg p-5 bg-surface">
          <p className="text-sm text-secondary mb-3">他のキーワードで検索してみてください：</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_KEYWORDS.slice(0, 5).map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                className="px-3 py-1 text-xs rounded-full bg-white border border-border hover:border-primary transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
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
