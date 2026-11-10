import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import { getAllExamYearParams, CATEGORIES } from "@/lib/pastproblems-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doboku-torisetsu.com";
  const posts = getAllPosts();
  const categories = getAllCategories();

  // lastModified は「最後に中身を直した日」。frontmatter の updated を優先する。
  // date（公開日）だけを使っていたため、大幅に加筆してもサイトマップ上は
  // 公開日のままになり、Googleが「変わっていない」と判断して再クロールに来なかった。
  // （2026-11-11 発覚：11/5に3倍に加筆した記事の前回クロールが9/25のままだった）
  const postUrls = posts.map((p) => ({
    url: `${siteUrl}/posts/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated ?? p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `${siteUrl}/categories/${encodeURIComponent(c.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ※ /tags・/search はnoindexのためsitemapから除外
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/quiz`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/pastproblems`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...postUrls,
    ...categoryUrls,
    // 資格ごとの過去問一覧（年度を指定しない検索の受け皿）。年度ページより上位に置く。
    ...CATEGORIES.map((c) => ({
      url: `${siteUrl}/pastproblems/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...getAllExamYearParams().map((p) => ({
      url: `${siteUrl}/pastproblems/${p.exam}/${p.year}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${siteUrl}/shikaku/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
