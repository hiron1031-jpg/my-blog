import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
      <h1 className="text-2xl font-bold text-heading mb-8">プライバシーポリシー</h1>
      <div className="prose max-w-none text-secondary space-y-6">
        <section>
          <h2 className="text-lg font-bold text-heading mb-3">個人情報の取り扱い</h2>
          <p className="text-sm leading-relaxed">
            当サイト（土木のトリセツ）では、お問い合わせフォームを通じてご提供いただいた氏名・メールアドレス等の個人情報を、ご返信目的のみに使用し、第三者への提供は行いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">アクセス解析</h2>
          <p className="text-sm leading-relaxed">
            当サイトでは、Google Analytics 等のアクセス解析ツールを使用する場合があります。
            これらのツールは Cookie を使用してデータを収集しますが、個人を特定する情報は含まれません。
            ブラウザの設定で Cookie を無効にすることで、この収集を拒否することができます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">アフィリエイトプログラムについて</h2>
          <p className="text-sm leading-relaxed">
            当サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、
            <strong>Amazonアソシエイト・プログラム</strong>の参加者です。
          </p>
          <p className="text-sm leading-relaxed mt-3">
            当サイト内の商品紹介リンクの一部は、上記プログラムによるアフィリエイトリンクとなっています。
            これらのリンクを経由して商品をご購入いただいた場合、当サイトに紹介料が支払われることがあります。
            紹介料は記事の運営・過去問ツールの無料提供の維持に活用されます。
          </p>
          <p className="text-sm leading-relaxed mt-3">
            なお、記事内で紹介している書籍・商品は、筆者が実際に使用・検討したもの、または試験対策として有用と判断したもののみを掲載しています。
            紹介料の有無が記事内容・評価に影響を与えることはありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">免責事項</h2>
          <p className="text-sm leading-relaxed">
            当サイトに掲載している試験情報・合格率・勉強法等の情報は、筆者の独学合格経験および公開情報をもとに記載していますが、その正確性・最新性を保証するものではありません。
            最新の試験情報・受験資格等は、必ず試験実施機関（一般財団法人 全国建設研修センター等）の公式情報をご確認ください。
          </p>
          <p className="text-sm leading-relaxed mt-3">
            当サイトの情報を利用したことによって生じた損害等について、当サイトは一切の責任を負いかねます。あらかじめご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">著作権について</h2>
          <p className="text-sm leading-relaxed">
            当サイトに掲載されているコンテンツ（文章・画像等）の著作権は、原則として当サイトに帰属します。無断転載・複製はご遠慮ください。
            引用される際は、出典を明記のうえ、著作権法で認められた範囲でお願いします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-heading mb-3">お問い合わせ</h2>
          <p className="text-sm leading-relaxed">
            プライバシーポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <p className="text-xs text-secondary mt-10">制定日：2026年4月20日</p>
      </div>
    </div>
  );
}
