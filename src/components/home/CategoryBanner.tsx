"use client";

import Link from "next/link";
import { getCategoryColor } from "@/lib/category-colors";

interface CategoryBannerProps {
  categories: { name: string; count: number }[];
}

export default function CategoryBanner({ categories }: CategoryBannerProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const color = getCategoryColor(cat.name);
        return (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              borderColor: color.hex,
              color: color.hex,
              backgroundColor: `${color.hex}0f`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = color.hex;
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${color.hex}0f`;
              (e.currentTarget as HTMLAnchorElement).style.color = color.hex;
            }}
          >
            {cat.name}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${color.hex}25`, color: color.hex }}
            >
              {cat.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
