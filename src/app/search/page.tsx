import { generateSearchIndex } from "@/lib/mdx";
import SearchClient from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事検索",
  description:
    "「土木のトリセツ」内の記事をキーワードで検索できます。施工管理技士の勉強法・参考書・経験記述・受験申込みなどから探してください。",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const index = generateSearchIndex();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-heading mb-8">記事を検索</h1>
      <SearchClient index={index} />
    </div>
  );
}
