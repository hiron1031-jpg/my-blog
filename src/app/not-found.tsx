import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description: "お探しのページは見つかりませんでした。",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-6">🦫</div>
      <h1 className="text-3xl font-bold text-heading mb-4">
        404 — ページが見つかりません
      </h1>
      <p className="text-secondary mb-10 leading-relaxed">
        お探しのページは移動または削除された可能性があります。
        <br />
        URLをご確認のうえ、以下のリンクからお進みください。
      </p>

      <div className="grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto">
        <Link
          href="/"
          className="border-2 border-border rounded-lg p-4 hover:border-primary hover:bg-surface transition-colors"
        >
          <div className="font-bold text-heading">🏠 トップページ</div>
          <div className="text-sm text-secondary mt-1">最新記事を見る</div>
        </Link>
        <Link
          href="/posts"
          className="border-2 border-border rounded-lg p-4 hover:border-primary hover:bg-surface transition-colors"
        >
          <div className="font-bold text-heading">📚 記事一覧</div>
          <div className="text-sm text-secondary mt-1">全記事を探す</div>
        </Link>
        <Link
          href="/quiz"
          className="border-2 border-border rounded-lg p-4 hover:border-primary hover:bg-surface transition-colors"
        >
          <div className="font-bold text-heading">📝 過去問チャレンジ</div>
          <div className="text-sm text-secondary mt-1">無料Webクイズ</div>
        </Link>
        <Link
          href="/pastproblems"
          className="border-2 border-border rounded-lg p-4 hover:border-primary hover:bg-surface transition-colors"
        >
          <div className="font-bold text-heading">📄 過去問PDF</div>
          <div className="text-sm text-secondary mt-1">14年分ダウンロード</div>
        </Link>
      </div>
    </div>
  );
}
