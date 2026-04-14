import BeaverMascot from "@/components/layout/BeaverMascot";
import Link from "next/link";

export default function AuthorBox() {
  return (
    <div className="mt-10 p-5 bg-surface rounded-2xl border border-border flex gap-4 items-start">
      <div className="shrink-0">
        <BeaverMascot preset="icon" size={56} className="rounded-xl shadow-sm" />
      </div>
      <div>
        <p className="font-bold text-heading text-sm mb-0.5">ヒロ</p>
        <p className="text-xs text-primary font-medium mb-2">1級土木・造園施工管理技士</p>
        <p className="text-xs text-secondary/80 leading-relaxed">
          造園作業員として働きながら独学で2級・1級造園施工管理技士を取得。その後、1級土木施工管理技士も独学で合格。
          現在は現役の土木職員として働きながら、資格取得を目指す方に役立つ情報を発信しています。
        </p>
        <Link
          href="/about"
          className="mt-2 inline-block text-xs text-primary hover:underline"
        >
          プロフィール詳細を見る →
        </Link>
      </div>
    </div>
  );
}
