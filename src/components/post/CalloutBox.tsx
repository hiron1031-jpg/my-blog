import type { ReactNode } from "react";

type CalloutType = "target" | "conclusion" | "point" | "warn";

interface CalloutBoxProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<
  CalloutType,
  { icon: string; label: string; bg: string; border: string; text: string }
> = {
  target: {
    icon: "📌",
    label: "こんな方におすすめ",
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-heading",
  },
  conclusion: {
    icon: "💡",
    label: "この記事の結論",
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-heading",
  },
  point: {
    icon: "✅",
    label: "ポイント",
    bg: "bg-blue-50",
    border: "border-blue-400",
    text: "text-heading",
  },
  warn: {
    icon: "⚠️",
    label: "注意",
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    text: "text-heading",
  },
};

export default function CalloutBox({
  type = "point",
  title,
  children,
}: CalloutBoxProps) {
  const c = config[type];
  const displayTitle = title ?? c.label;

  return (
    <div
      className={`${c.bg} ${c.border} border-l-4 rounded-r-lg px-5 py-4 my-6`}
    >
      <div className={`flex items-center gap-2 font-bold mb-2 ${c.text}`}>
        <span className="text-lg" aria-hidden>
          {c.icon}
        </span>
        <span>{displayTitle}</span>
      </div>
      <div className="text-secondary text-[15px] leading-relaxed [&>p]:my-1 [&>ul]:my-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:my-1 [&>ol]:list-decimal [&>ol]:pl-5">
        {children}
      </div>
    </div>
  );
}
