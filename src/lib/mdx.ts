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
  return getAllPosts()
    .filter(
      (p) => p.slug !== currentSlug && p.frontmatter.category === category
    )
    .slice(0, limit);
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
