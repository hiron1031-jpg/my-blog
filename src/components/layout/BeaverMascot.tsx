/**
 * BeaverMascot — スプライト画像からビーバーを切り出して表示するコンポーネント
 *
 * beaver.png        : 1536×1024, 4列×3行 (10匹)
 *   col0,row0 : スコップ持ち（デフォルト）
 *   col1,row0 : 鉛筆（勉強中）
 *   col2,row0 : ノート読み
 *   col3,row0 : 看板チェック
 *   col0,row1 : 看板2
 *   col1,row1 : 測量機器+重機
 *   col2,row1 : 手を振る（お祝い）
 *   col3,row1 : 傘+コーン
 *   col0,row2 : OKサイン
 *   col1,row2 : 屋外スコップ
 *
 * beaver-collection.png : 1536×1024, 4列×2行 (8匹)
 *   col0,row0 : もぐもぐビーバー
 *   col1,row0 : 監督ビーバー（クリップボード）
 *   col2,row0 : 安全第一ビーバー
 *   col3,row0 : 測量ビーバー
 *   col0,row1 : パワー系
 *   col1,row1 : 案内係
 *   col2,row1 : 未来の土木
 *   col3,row1 : 川・橋の守り手
 */

type BeaverPreset =
  | "default"     // スコップ → ヘッダー・フッター
  | "study"       // 鉛筆 → クイズ
  | "reading"     // ノート → 記事
  | "check"       // 看板チェック → 過去問
  | "celebrate"   // 手を振る → クイズ結果
  | "ok"          // OKサイン → 励まし
  | "outdoor"     // 屋外スコップ
  | "supervisor"  // 監督 → Aboutページ
  | "safety"      // 安全第一
  | "guide";      // 案内係

interface PresetConfig {
  src: string;
  col: number;
  row: number;
  cols: number;
  rows: number;
}

const PRESETS: Record<BeaverPreset, PresetConfig> = {
  default:    { src: "/images/beaver.png",            col: 0, row: 0, cols: 4, rows: 3 },
  study:      { src: "/images/beaver.png",            col: 1, row: 0, cols: 4, rows: 3 },
  reading:    { src: "/images/beaver.png",            col: 2, row: 0, cols: 4, rows: 3 },
  check:      { src: "/images/beaver.png",            col: 3, row: 0, cols: 4, rows: 3 },
  celebrate:  { src: "/images/beaver.png",            col: 2, row: 1, cols: 4, rows: 3 },
  ok:         { src: "/images/beaver.png",            col: 0, row: 2, cols: 4, rows: 3 },
  outdoor:    { src: "/images/beaver.png",            col: 1, row: 2, cols: 4, rows: 3 },
  supervisor: { src: "/images/beaver-collection.png", col: 1, row: 0, cols: 4, rows: 2 },
  safety:     { src: "/images/beaver-collection.png", col: 2, row: 0, cols: 4, rows: 2 },
  guide:      { src: "/images/beaver-collection.png", col: 1, row: 1, cols: 4, rows: 2 },
};

interface Props {
  preset?: BeaverPreset;
  /** セル1個分の表示幅(px)。高さはアスペクト比で自動計算 */
  size?: number;
  className?: string;
}

const NATIVE_W = 1536;
const NATIVE_H = 1024;

export default function BeaverMascot({ preset = "default", size = 40, className = "" }: Props) {
  const { src, col, row, cols, rows } = PRESETS[preset];

  // 画像全体の表示サイズ
  const imgW = size * cols;
  const imgH = (NATIVE_H / NATIVE_W) * imgW;

  // 表示セルの高さ
  const cellH = imgH / rows;

  // 背景オフセット
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
