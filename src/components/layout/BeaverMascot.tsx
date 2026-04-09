/**
 * BeaverMascot
 *
 * beaver-icon.png  : 1380×752, 単体アイコン（丸フレーム入り）→ ヘッダー/フッター
 *
 * beaver-scenes.png : 1380×752, 5列×2行 (10匹)
 *   row0 col0 : スコップ掘削
 *   row0 col1 : 安全第一・測量
 *   row0 col2 : 指差呼称・安全パトロール
 *   row0 col3 : 重機（ショベル）オペレーター
 *   row0 col4 : 図面確認・コンピュータ
 *   row1 col0 : ドローン操作
 *   row1 col1 : トンネル・坑道
 *   row1 col2 : ボルト締め・橋梁工
 *   row1 col3 : 工程表確認
 *   row1 col4 : 完成！（道路・ダム）
 */

type BeaverPreset =
  | "icon"       // 丸アイコン → ヘッダー/フッター
  | "digger"     // スコップ掘削 → 汎用/トップ
  | "survey"     // 安全第一・測量 → Aboutページ
  | "safety"     // 指差呼称 → 注意喚起 / Quiz結果(低め)
  | "excavator"  // 重機オペレーター → 施工記事
  | "computer"   // 図面確認PC → Quizヒーロー
  | "drone"      // ドローン → 最新技術
  | "tunnel"     // トンネル → 基礎工
  | "repair"     // ボルト締め → 橋梁/補修
  | "schedule"   // 工程表 → 過去問ページ
  | "celebrate"; // 完成！ → Quiz結果(高め)

interface SpriteConfig {
  type: "sprite";
  src: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
  nativeW: number;
  nativeH: number;
}
interface FullConfig {
  type: "full";
  src: string;
}
type PresetConfig = SpriteConfig | FullConfig;

const SCENES_SRC = "/images/beaver-scenes.png";
const SCENES_W = 1380;
const SCENES_H = 752;
const SCENES_COLS = 5;
const SCENES_ROWS = 2;

const sprite = (col: number, row: number): SpriteConfig => ({
  type: "sprite",
  src: SCENES_SRC,
  col,
  row,
  cols: SCENES_COLS,
  rows: SCENES_ROWS,
  nativeW: SCENES_W,
  nativeH: SCENES_H,
});

const PRESETS: Record<BeaverPreset, PresetConfig> = {
  icon:       { type: "full", src: "/images/beaver-icon.png" },
  digger:     sprite(0, 0),
  survey:     sprite(1, 0),
  safety:     sprite(2, 0),
  excavator:  sprite(3, 0),
  computer:   sprite(4, 0),
  drone:      sprite(0, 1),
  tunnel:     sprite(1, 1),
  repair:     sprite(2, 1),
  schedule:   sprite(3, 1),
  celebrate:  sprite(4, 1),
};

interface Props {
  preset?: BeaverPreset;
  /** 表示幅(px)。スプライトはアスペクト比で高さ自動計算。アイコンは正方形 */
  size?: number;
  className?: string;
}

export default function BeaverMascot({ preset = "icon", size = 40, className = "" }: Props) {
  const config = PRESETS[preset];

  if (config.type === "full") {
    // アイコン画像：正方形コンテナにobject-cover
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          backgroundImage: `url('${config.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          flexShrink: 0,
        }}
      />
    );
  }

  // スプライト切り出し
  const { src, col, row, cols, rows, nativeW, nativeH } = config;
  const imgW = size * cols;
  const imgH = (nativeH / nativeW) * imgW;
  const cellH = imgH / rows;
  const posX = -col * size;
  const posY = -row * cellH;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: Math.round(cellH),
        backgroundImage: `url('${src}')`,
        backgroundSize: `${Math.round(imgW)}px ${Math.round(imgH)}px`,
        backgroundPosition: `${Math.round(posX)}px ${Math.round(posY)}px`,
        backgroundRepeat: "no-repeat",
        flexShrink: 0,
      }}
    />
  );
}
