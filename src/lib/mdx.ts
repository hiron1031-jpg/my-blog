import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter, PostWithContent, Heading } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => {
    const full = path.join(POSTS_DIR, f);
    return fs.statSync(full).isDirectory();
  });
}

export function getAllPosts(): Post[] {
  const slugs = getPostFiles();
  const posts = slugs.map((slug) => {
    const filePath = path.join(POSTS_DIR, slug, "index.mdx");
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    const excerpt = content
      .replace(/#{1,6}\s+/g, "")
      .replace(/[*_`\[\]]/g, "")
      .slice(0, 150)
      .trim();
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      readingTime: `${Math.ceil(rt.minutes)}分`,
      excerpt,
    } satisfies Post;
  });
  return posts
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  const excerpt = content
    .replace(/#{1,6}\s+/g, "")
    .replace(/[*_`\[\]]/g, "")
    .slice(0, 150)
    .trim();
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    readingTime: `${Math.ceil(rt.minutes)}分`,
    excerpt,
    content,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);
  const currentTags: string[] = current?.frontmatter.tags ?? [];
  const all = allPosts.filter((p) => p.slug !== currentSlug);

  // 改良版スコアリング：
  //   タグ一致数 × 4（強め）
  //   カテゴリ一致 × 2
  //   featured 記事 +1（編集部のおすすめを優先）
  //   新しさボーナス（直近1年で 0〜1.0 の連続値、古いほど 0 に近づく）
  const now = Date.now();
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

  const scored = all.map((p) => {
    const tagOverlap = p.frontmatter.tags.filter((t) => currentTags.includes(t)).length;
    const categoryMatch = p.frontmatter.category === category ? 1 : 0;
    const featuredBonus = p.frontmatter.featured ? 1 : 0;
    const ageMs = now - new Date(p.frontmatter.date).getTime();
    const recencyBonus = Math.max(0, 1 - ageMs / ONE_YEAR_MS); // 1年以内は連続的に減衰
    const score =
      tagOverlap * 4 + categoryMatch * 2 + featuredBonus + recencyBonus;
    return { post: p, score };
  });

  // スコア順 → 同点は新しい順
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.post.frontmatter.date).getTime() -
      new Date(a.post.frontmatter.date).getTime()
    );
  });

  // スコア0は除外（タグ・カテゴリどちらも一致しないものは関連なし）
  // ただし結果が空なら最新記事でフォールバック
  const filtered = scored.filter((s) => s.score > 0).map((s) => s.post);
  const result = filtered.length > 0 ? filtered : all;
  return result.slice(0, limit);
}

/**
 * 同カテゴリ内で日付順に並べたときの前後の記事を返す。
 * - prev: 1つ古い記事（今の記事より日付が前）
 * - next: 1つ新しい記事（今の記事より日付が後）
 * カテゴリ内に該当がなければ全記事から日付順でフォールバック。
 */
export function getAdjacentPosts(
  currentSlug: string,
  category: string
): { prev: Post | null; next: Post | null } {
  const all = getAllPosts(); // 新しい順
  const sameCategory = all.filter((p) => p.frontmatter.category === category);
  const pool = sameCategory.length >= 2 ? sameCategory : all;

  // 日付昇順に並べ直す（古い→新しい）
  const ordered = [...pool].sort(
    (a, b) =>
      new Date(a.frontmatter.date).getTime() -
      new Date(b.frontmatter.date).getTime()
  );
  const idx = ordered.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  posts.forEach((p) => {
    const cat = p.frontmatter.category;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  posts.forEach((p) => {
    p.frontmatter.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 指定カテゴリ内で出現頻度の高いタグを上位 N 件返す。
 */
export function getPopularTagsInCategory(
  category: string,
  limit = 5
): { name: string; count: number }[] {
  const posts = getAllPosts().filter((p) => p.frontmatter.category === category);
  const counts: Record<string, number> = {};
  posts.forEach((p) => {
    p.frontmatter.tags.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function extractHeadings(content: string): Heading[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u3040-\u9FFF\uFF00-\uFFEF-]/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

export function generateSearchIndex(): {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  excerpt: string;
}[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    category: p.frontmatter.category,
    tags: p.frontmatter.tags,
    excerpt: p.excerpt,
  }));
}
