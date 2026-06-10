export type CategoryColor = {
  bg: string;       // Tailwind bg class
  text: string;     // Tailwind text class
  border: string;   // Tailwind border class
  badgeBg: string;  // light bg for badge
  hex: string;      // hex for inline styles
  gradient: string; // gradient classes
};

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  土木施工管理技士: {
    bg: "bg-[#1e3a5f]",
    text: "text-[#1e3a5f]",
    border: "border-[#1e3a5f]",
    badgeBg: "bg-[#1e3a5f]/10",
    hex: "#1e3a5f",
    gradient: "from-[#1e3a5f] to-[#2d5a8e]",
  },
  造園施工管理技士: {
    bg: "bg-[#1a5c38]",
    text: "text-[#1a5c38]",
    border: "border-[#1a5c38]",
    badgeBg: "bg-[#1a5c38]/10",
    hex: "#1a5c38",
    gradient: "from-[#1a5c38] to-[#2d8a57]",
  },
  試験対策: {
    bg: "bg-[#c94f1c]",
    text: "text-[#c94f1c]",
    border: "border-[#c94f1c]",
    badgeBg: "bg-[#c94f1c]/10",
    hex: "#c94f1c",
    gradient: "from-[#c94f1c] to-[#e8622a]",
  },
  勉強法: {
    bg: "bg-[#2d5a8e]",
    text: "text-[#2d5a8e]",
    border: "border-[#2d5a8e]",
    badgeBg: "bg-[#2d5a8e]/10",
    hex: "#2d5a8e",
    gradient: "from-[#2d5a8e] to-[#3a7cb8]",
  },
  現場のリアル: {
    bg: "bg-[#5a3e2b]",
    text: "text-[#5a3e2b]",
    border: "border-[#5a3e2b]",
    badgeBg: "bg-[#5a3e2b]/10",
    hex: "#5a3e2b",
    gradient: "from-[#5a3e2b] to-[#7a5a3e]",
  },
  "1級土木": {
    bg: "bg-[#1e3a5f]",
    text: "text-[#1e3a5f]",
    border: "border-[#1e3a5f]",
    badgeBg: "bg-[#1e3a5f]/10",
    hex: "#1e3a5f",
    gradient: "from-[#1e3a5f] to-[#2d5a8e]",
  },
  "2級土木": {
    bg: "bg-[#2d5a8e]",
    text: "text-[#2d5a8e]",
    border: "border-[#2d5a8e]",
    badgeBg: "bg-[#2d5a8e]/10",
    hex: "#2d5a8e",
    gradient: "from-[#2d5a8e] to-[#3a7cb8]",
  },
  "1級造園": {
    bg: "bg-[#1a5c38]",
    text: "text-[#1a5c38]",
    border: "border-[#1a5c38]",
    badgeBg: "bg-[#1a5c38]/10",
    hex: "#1a5c38",
    gradient: "from-[#1a5c38] to-[#2d8a57]",
  },
  "2級造園": {
    bg: "bg-[#2d8a57]",
    text: "text-[#2d8a57]",
    border: "border-[#2d8a57]",
    badgeBg: "bg-[#2d8a57]/10",
    hex: "#2d8a57",
    gradient: "from-[#2d8a57] to-[#40a96c]",
  },
  土木共通: {
    bg: "bg-[#3d5a80]",
    text: "text-[#3d5a80]",
    border: "border-[#3d5a80]",
    badgeBg: "bg-[#3d5a80]/10",
    hex: "#3d5a80",
    gradient: "from-[#3d5a80] to-[#5c7cae]",
  },
  造園共通: {
    bg: "bg-[#40916c]",
    text: "text-[#40916c]",
    border: "border-[#40916c]",
    badgeBg: "bg-[#40916c]/10",
    hex: "#40916c",
    gradient: "from-[#40916c] to-[#5cb185]",
  },
  共通: {
    bg: "bg-[#c94f1c]",
    text: "text-[#c94f1c]",
    border: "border-[#c94f1c]",
    badgeBg: "bg-[#c94f1c]/10",
    hex: "#c94f1c",
    gradient: "from-[#c94f1c] to-[#e8622a]",
  },
};

export const DEFAULT_CATEGORY_COLOR: CategoryColor = {
  bg: "bg-[#e8622a]",
  text: "text-[#e8622a]",
  border: "border-[#e8622a]",
  badgeBg: "bg-[#e8622a]/10",
  hex: "#e8622a",
  gradient: "from-[#e8622a] to-[#f4a261]",
};

export function getCategoryColor(category: string): CategoryColor {
  return CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
}
