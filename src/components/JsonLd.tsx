/**
 * JSON-LD 構造化データ出力コンポーネント（サーバーコンポーネント）
 * schema.org の各スキーマオブジェクトを受け取り <script> タグとして埋め込む。
 * dangerouslySetInnerHTML はサーバー側で組み立てた信頼済みデータのみを渡すため安全。
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
