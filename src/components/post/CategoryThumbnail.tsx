// Beautiful CSS-based thumbnail for each category
// No external font/image needed — pure React + inline SVG

interface Props {
  category: string;
  title?: string;
}

/* ── Category config ── */
type Config = {
  from: string;
  to: string;
  icon: React.ReactNode;
  label: string;
};

function BridgeIcon() {
  return (
    <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="48">
      {/* Road surface */}
      <rect x="4" y="38" width="56" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
      {/* Arch */}
      <path d="M8 38 C8 20 20 10 32 10 C44 10 56 20 56 38" stroke="rgba(255,255,255,0.8)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Vertical cables */}
      <line x1="20" y1="22" x2="20" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="26" y1="15" x2="26" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="32" y1="12" x2="32" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="38" y1="15" x2="38" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="44" y1="22" x2="44" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      {/* Crown */}
      <ellipse cx="32" cy="22" rx="18" ry="16" fill="rgba(255,255,255,0.8)" />
      <ellipse cx="20" cy="28" rx="13" ry="11" fill="rgba(255,255,255,0.65)" />
      <ellipse cx="44" cy="28" rx="13" ry="11" fill="rgba(255,255,255,0.65)" />
      {/* Trunk */}
      <rect x="28" y="36" width="8" height="18" rx="4" fill="rgba(255,255,255,0.6)" />
      {/* Ground */}
      <ellipse cx="32" cy="54" rx="14" ry="3" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="64">
      {/* Paper */}
      <rect x="4" y="4" width="48" height="56" rx="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
      {/* Lines */}
      <line x1="14" y1="20" x2="42" y2="20" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="30" x2="42" y2="30" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="40" x2="34" y2="40" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Check mark */}
      <path d="M36 46 L40 51 L49 40" stroke="#e8622a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="56">
      {/* Left page */}
      <path d="M6 8 C6 8 18 6 30 10 L30 50 C18 46 6 48 6 48 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      {/* Right page */}
      <path d="M58 8 C58 8 46 6 34 10 L34 50 C46 46 58 48 58 48 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      {/* Spine */}
      <line x1="32" y1="10" x2="32" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Lines on left */}
      <line x1="12" y1="20" x2="26" y2="19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="28" x2="26" y2="27" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="36" x2="22" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelmetIconLarge() {
  return (
    <svg viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="56">
      {/* Dome */}
      <path d="M12 40 C12 24 20 12 32 12 C44 12 52 24 52 40 Z" fill="rgba(255,255,255,0.85)" />
      {/* Brim */}
      <path d="M8 40 L56 40 L56 44 Q32 50 8 44 Z" fill="rgba(255,255,255,0.6)" />
      {/* Highlight */}
      <path d="M19 24 Q24 17 30 15" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const CONFIGS: Record<string, Config> = {
  土木施工管理技士: {
    from: "#1e3a5f",
    to: "#2d5a8e",
    icon: <BridgeIcon />,
    label: "土木施工管理技士",
  },
  造園施工管理技士: {
    from: "#1a5c38",
    to: "#2d8a57",
    icon: <TreeIcon />,
    label: "造園施工管理技士",
  },
  試験対策: {
    from: "#c94f1c",
    to: "#e8622a",
    icon: <DocumentIcon />,
    label: "試験対策",
  },
  勉強法: {
    from: "#1e3a5f",
    to: "#3a5f9e",
    icon: <BookIcon />,
    label: "勉強法",
  },
  現場のリアル: {
    from: "#2c2c2c",
    to: "#4a3a2a",
    icon: <HelmetIconLarge />,
    label: "現場のリアル",
  },
};

const DEFAULT_CONFIG: Config = {
  from: "#1e3a5f",
  to: "#e8622a",
  icon: <HelmetIconLarge />,
  label: "",
};

export default function CategoryThumbnail({ category, title }: Props) {
  const cfg = CONFIGS[category] ?? DEFAULT_CONFIG;

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-white"
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 bg-white"
      />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-primary" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2 p-4">
        {/* Icon */}
        <div className="opacity-90 drop-shadow-md">
          {cfg.icon}
        </div>

        {/* Category label */}
        <span className="text-white/80 text-[10px] font-bold tracking-wider uppercase mt-1">
          {cfg.label || category}
        </span>
      </div>
    </div>
  );
}
