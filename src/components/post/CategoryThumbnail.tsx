// カテゴリ別サムネイル — ビーバーキャラクター入り

interface Props {
  category: string;
  title?: string;
}

type Config = {
  from: string;
  to: string;
  label: string;
  // beaver-scenes.png (1380×752, 5列×2行) のセル位置
  beaverCol: number;
  beaverRow: number;
};

const CONFIGS: Record<string, Config> = {
  土木施工管理技士: {
    from: "#1e3a5f", to: "#2d5a8e",
    label: "土木施工管理技士",
    beaverCol: 0, beaverRow: 0, // スコップ掘削
  },
  造園施工管理技士: {
    from: "#1a5c38", to: "#2d8a57",
    label: "造園施工管理技士",
    beaverCol: 4, beaverRow: 1, // 完成！（ダム・道路）
  },
  試験対策: {
    from: "#c94f1c", to: "#e8622a",
    label: "試験対策",
    beaverCol: 2, beaverRow: 0, // 指差呼称・安全パトロール
  },
  勉強法: {
    from: "#1e3a5f", to: "#3a5f9e",
    label: "勉強法",
    beaverCol: 4, beaverRow: 0, // 図面確認・PC
  },
  現場のリアル: {
    from: "#2c2c2c", to: "#4a3a2a",
    label: "現場のリアル",
    beaverCol: 3, beaverRow: 0, // 重機オペレーター
  },
};

const DEFAULT_CONFIG: Config = {
  from: "#1e3a5f", to: "#e8622a",
  label: "",
  beaverCol: 0, beaverRow: 0,
};

// beaver-scenes.png スプライト計算
const NATIVE_W = 1380;
const NATIVE_H = 752;
const COLS = 5;
const ROWS = 2;
const BEAVER_SIZE = 96; // 表示幅(px)
const IMG_W = BEAVER_SIZE * COLS;
const IMG_H = (NATIVE_H / NATIVE_W) * IMG_W;
const CELL_H = IMG_H / ROWS;

function beaverStyle(col: number, row: number): React.CSSProperties {
  return {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: BEAVER_SIZE,
    height: Math.round(CELL_H),
    backgroundImage: `url('/images/beaver-scenes.png')`,
    backgroundSize: `${Math.round(IMG_W)}px ${Math.round(IMG_H)}px`,
    backgroundPosition: `${-col * BEAVER_SIZE}px ${-row * CELL_H}px`,
    backgroundRepeat: "no-repeat",
    flexShrink: 0,
    mixBlendMode: "multiply",
  };
}

export default function CategoryThumbnail({ category, title }: Props) {
  const cfg = CONFIGS[category] ?? DEFAULT_CONFIG;

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
      }}
    >
      {/* 装飾円 */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-white" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10 bg-white" />

      {/* 左アクセントバー */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-primary" />

      {/* テキストエリア（左） */}
      <div className="relative z-10 h-full flex flex-col justify-center pl-5 pr-28">
        {/* カテゴリラベル */}
        <span className="text-white/60 text-[9px] font-bold tracking-widest uppercase mb-1.5 block">
          {cfg.label || category}
        </span>
        {/* タイトル（あれば） */}
        {title && (
          <p className="text-white font-bold text-xs leading-snug line-clamp-3 drop-shadow-sm">
            {title}
          </p>
        )}
      </div>

      {/* ビーバーキャラクター（右下） */}
      <div style={beaverStyle(cfg.beaverCol, cfg.beaverRow)} />
    </div>
  );
}
