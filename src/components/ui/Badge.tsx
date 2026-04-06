import Link from "next/link";
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  href?: string;
  variant?: "category" | "tag";
  className?: string;
}

export default function Badge({ label, href, variant = "category", className }: BadgeProps) {
  const base = cn(
    "inline-block text-xs font-medium px-2.5 py-1 rounded-full transition-colors",
    variant === "category"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "bg-accent/20 text-secondary hover:bg-accent/40",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {label}
      </Link>
    );
  }
  return <span className={base}>{label}</span>;
}
