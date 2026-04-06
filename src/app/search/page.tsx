import { generateSearchIndex } from "@/lib/mdx";
import SearchClient from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検索",
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
