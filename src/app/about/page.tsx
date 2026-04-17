import Breadcrumb from "@/components/layout/Breadcrumb";
import BeaverMascot from "@/components/layout/BeaverMascot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "このサイトについて" }]} />

      <h1 className="text-2xl font-bold text-heading mb-8">このサイトについて</h1>

      <div className="bg-white rounded-2xl border border-border p-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <BeaverMascot preset="survey" size={80} className="rounded-2xl flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-heading mb-1">ビーバー監督</h2>
            <p className="text-xs text-primary font-medium mb-2">1級土木施工管理技士・1級造園施工管理技士</p>
            <p className="text-secondary text-sm leading-relaxed">
              造園作業員として働きながら独学で2級・1級造園施工管理技士を取得。その後、1級土木施工管理技士も独学で合格。
              現在は現役の土木職員として働きながら、資格取得を目指す方に役立つ情報を発信しています。
            </p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-secondary">
        <h2 className="text-xl font-bold text-heading mb-4">サイトの目的</h2>
        <p className="mb-4">
          「土木のトリセツ」は、施工管理技士の資格取得を目指す方を応援するブログです。
          1級土木・1級造園施工管理技士を独学・一発合格した現役職員が、実体験をもとにリアルな勉強法と合格戦略を発信しています。
        </p>
        <p className="mb-4">
          「仕事が忙しくて勉強時間がない」「どこから手をつければいいかわからない」——そんな悩みを持つ方のために、
          平日1時間・スキマ時間で合格できる最短ルートを紹介しています。
        </p>
        <p className="mb-8">
          過去問PDF無料ダウンロード・過去問チャレンジ（年度別クイズ）など、
          実際に勉強で役立つコンテンツを無料で提供しています。
        </p>

        <h2 className="text-xl font-bold text-heading mb-4 mt-8">運営者プロフィール</h2>
        <p className="mb-4">
          造園会社の作業員としてキャリアをスタート。2級造園→1級造園→1級土木施工管理技士の順に、
          すべて独学・一発合格。現在は公共工事の施工管理に携わりながら、資格取得を目指す方に向けて情報発信中。
        </p>

        <h2 className="text-xl font-bold text-heading mb-4 mt-8">免責事項</h2>
        <p className="text-sm text-secondary/80">
          当サイトの情報は一般的な情報提供を目的としており、試験の合否を保証するものではありません。
          試験情報・合格率等は変更される場合があります。最新情報は必ず公式機関（一般財団法人 全国建設研修センター等）でご確認ください。
          掲載情報の利用によって生じた損害については責任を負いかねます。
        </p>
      </div>
    </div>
  );
}
