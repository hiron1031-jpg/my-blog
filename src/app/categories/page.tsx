import Link from "next/link";
import { getAllCategories } from "@/lib/mdx";
import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "カテゴリ一覧" }]} />
      <h1 className="text-2xl font-bold text-heading mb-8">カテゴリ一覧</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-xl border-2 border-border hover:border-primary hover:bg-surface transition-all duration-200 text-center"
          >
            <span className="font-bold text-heading">{cat.name}</span>
            <span className="text-xs text-secondary/60">{cat.count}件</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
