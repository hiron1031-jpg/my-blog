import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import BeaverMascot from "./BeaverMascot";
import { formatDate } from "@/lib/utils";

export default function Sidebar() {
  const recentPosts = getAllPosts().slice(0, 5);
  const categories = getAllCategories();

  return (
    <aside className="space-y-5">
      {/* Author Profile */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
        <div className="flex flex-col items-center text-center gap-3">
          <BeaverMascot preset="icon" size={64} className="rounded-full shadow-sm" />
          <div>
            <p className="font-bold text-heading text-sm">ヒロ</p>
            <p className="text-xs text-primary font-medium mt-0.5">
              1級土木・造園施工管理技士
            </p>
          </div>
          <p className="text-xs text-secondary/70 leading-relaxed">
            造園作業員から独学で1級土木・造園施工管理技士を取得。
            資格取得のリアルな体験と勉強法を発信中。
          </p>
          <Link
            href="/about"
            className="text-xs text-primary hover:underline flex items-center gap-0.5"
          >
            プロフィール詳細 <FiChevronRight size={11} />
          </Link>
        </div>
      </div>

      {/* Quiz CTA */}
      <Link
        href="/quiz"
        className="block bg-gradient-to-br from-[#7b2d8b] to-[#a855a8] rounded-2xl p-5 text-white text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
      >
        <p className="text-[11px] font-bold opacity-75 mb-1 tracking-wide">🎯 無料で腕試し！</p>
        <p className="text-base font-bold leading-snug">過去問チャレンジ</p>
        <p className="text-xs opacity-70 mt-1">年度別・4択クイズ 1,178問</p>
      </Link>

      {/* Categories */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
        <p className="text-sm font-bold text-heading mb-3 flex items-center gap-1.5">
          <span className="w-1 h-4 bg-primary rounded-full inline-block" />
          カテゴリ
        </p>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/categories/${encodeURIComponent(cat.name)}`}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface text-sm text-secondary hover:text-primary transition-colors group"
              >
                <span className="flex items-center gap-1.5">
                  <FiChevronRight
                    size={11}
                    className="text-primary/40 group-hover:text-primary transition-colors"
                  />
                  {cat.name}
                </span>
                <span className="text-xs bg-surface text-secondary/60 px-2 py-0.5 rounded-full border border-border">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/categories"
          className="mt-3 block text-center text-xs text-primary hover:underline"
        >
          すべてのカテゴリ →
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
        <p className="text-sm font-bold text-heading mb-4 flex items-center gap-1.5">
          <span className="w-1 h-4 bg-accent rounded-full inline-block" />
          最新記事
        </p>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="flex gap-3 group"
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-surface border border-border">
                  {post.frontmatter.thumbnail && post.frontmatter.thumbnail.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.frontmatter.thumbnail}
                      alt={post.frontmatter.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/60 to-accent/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-heading leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-[10px] text-secondary/50 mt-1">
                    {formatDate(post.frontmatter.date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/posts"
          className="mt-4 block text-center text-xs text-primary hover:underline"
        >
          記事一覧をすべて見る →
        </Link>
      </div>

      {/* Past Problems CTA */}
      <Link
        href="/pastproblems"
        className="block bg-gradient-to-br from-[#e8622a] to-[#f08c4b] rounded-2xl p-5 text-white text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        <p className="text-[11px] font-bold opacity-75 mb-1 tracking-wide">📥 完全無料！</p>
        <p className="text-base font-bold leading-snug">過去問PDF ダウンロード</p>
        <p className="text-xs opacity-70 mt-1">H24〜R7年度 全対応</p>
      </Link>
    </aside>
  );
}
