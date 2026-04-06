import Link from "next/link";

interface CategoryBannerProps {
  categories: { name: string; count: number }[];
}

export default function CategoryBanner({ categories }: CategoryBannerProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/categories/${encodeURIComponent(cat.name)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-primary/20 text-secondary text-sm font-medium rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
        >
          {cat.name}
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            {cat.count}
          </span>
        </Link>
      ))}
    </div>
  );
}
