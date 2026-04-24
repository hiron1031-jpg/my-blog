import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "広告表記",
  description:
    "当サイトで掲載しているアフィリエイト広告・PR記事に関する表記方針をご案内します。",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "広告表記" }]} />
      <h1 className="text-2xl font-bold text-heading mb-4">広告表記</h1>
      <p className="text-sm text-secondary mb-8">
        景品表示法（2023年10月施行のステルスマーケティング規制）に基づき、当サイトに掲載する広告について以下のとおり明示します。
      </p>

      <div className="prose max-w-none text-secondary space-y-6">
        <section>
          <h2 className="text-lg font-bold text-heading mb-3">
            アフィリエイトプログラムへの参加
          </h2>
          <p className="text-sm leading-relaxed">
            当サイト「土木のトリセツ」は、以下のアフィリエイトプログラムに参加しています。
          </p>
          <ul className="text-sm leading-relaxed mt-3 list-disc pl-5 space-y-1">
            <li>Amazon.co.jp アソシエイト・プログラム</li>
            <li>もしもアフィリエイト（株式会社もしも）</li>
            <li>A8.net（株式会社ファンコミュニケーションズ）</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3 p-3 bg-surface border-l-4 border-accent rounded">
            <strong>
              Amazonのアソシエイトとして、土木のトリセツは適格販売により収入を得ています。
            </strong>
            <br />
            また当サイトはアフィリエイト広告（Amazonアソシエイト含む）を掲載しています。
          </p>
          <p className="text-sm leading-relaxed mt-3">
            読者が当サイトのリンクを経由して商品・サービスを購入または申込した場合、当サイトに成果報酬が支払われることがあります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">
            広告リンクの明示方法
          </h2>
          <p className="text-sm leading-relaxed">
            アフィリエイトリンクを含む記事・コンテンツには以下のいずれかの方法で明示しています。
          </p>
          <ul className="text-sm leading-relaxed mt-3 list-disc pl-5 space-y-1">
            <li>記事内の紹介カードに「PR・広告」ラベルを表示</li>
            <li>リンクに <code className="text-xs bg-surface px-1 py-0.5 rounded">rel=&quot;sponsored&quot;</code> 属性を付与</li>
            <li>リンク下部に「本リンクはアフィリエイトリンクを含みます」と注記</li>
            <li>全ページのフッターに広告掲載の旨を表示</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">
            紹介する商品・サービスの選定方針
          </h2>
          <p className="text-sm leading-relaxed">
            当サイトで紹介する商品・サービスは、以下のいずれかに該当するものに限定しています。
          </p>
          <ul className="text-sm leading-relaxed mt-3 list-disc pl-5 space-y-1">
            <li>筆者が実際に使用した・検討したもの</li>
            <li>施工管理技士の受験者にとって有用と客観的に判断できるもの</li>
            <li>公式情報・複数の利用者レビューをもとに信頼性を確認したもの</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3">
            <strong>
              紹介報酬の有無が記事内容・評価・ランキングに影響を与えることはありません。
            </strong>
            広告提供者から記事内容の変更要求があっても、読者の利益を優先します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">
            読者の皆さまへ
          </h2>
          <p className="text-sm leading-relaxed">
            広告収入は、当サイトの運営（過去問無料ダウンロード・クイズツール等の維持）に活用されます。
            読者の皆さまに有益な情報をお届けし続けるため、ご理解・ご協力をお願いします。
          </p>
          <p className="text-sm leading-relaxed mt-3">
            商品・サービスのご購入・お申込みにあたっては、必ず公式サイトで最新情報・条件をご確認の上、ご判断ください。
            当サイトは、広告提供者の商品・サービスに関する責任を負うものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">お問い合わせ</h2>
          <p className="text-sm leading-relaxed">
            広告表記に関するご質問は、お問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <p className="text-xs text-secondary mt-10">制定日：2026年4月22日</p>
      </div>
    </div>
  );
}
