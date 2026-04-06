export default function AuthorBox() {
  const name = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "管理者";
  const bio =
    process.env.NEXT_PUBLIC_AUTHOR_BIO ??
    "ビジネス・経営に関する専門知識を発信しています。実務経験をもとに、わかりやすく実践的な情報をお届けします。";

  return (
    <div className="mt-10 p-5 bg-surface rounded-xl border border-border flex gap-4 items-start">
      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-heading text-sm mb-1">{name}</p>
        <p className="text-xs text-secondary leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
