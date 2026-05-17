const noteItems = [
  {
    href: "https://note.com/dobokutorisetsu/nc8cc72e51116",
    label: "R7 練習用解答用紙 PDF",
    price: "無料",
    priceColor: "bg-emerald-500",
  },
  {
    href: "https://note.com/dobokutorisetsu/n/n051d4898f173",
    label: "R7 解答解説【全10問】",
    price: "500円",
    priceColor: "bg-orange-500",
  },
  {
    href: "https://note.com/dobokutorisetsu/n/nb501fa18250f",
    label: "R7 模範解答入り解答用紙 PDF",
    price: "300円",
    priceColor: "bg-teal-600",
  },
];

export default function NoteBanner() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 bg-primary rounded-full inline-block" />
        <h2 className="text-xl font-bold text-heading">📝 noteで販売中のコンテンツ</h2>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm text-secondary mb-4">
          令和7年度（R7）第二次検定の解答解説・解答用紙をnoteで公開しています。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {noteItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"
            >
              <span className={`shrink-0 ${item.priceColor} text-white text-[11px] font-bold px-2 py-1 rounded-lg min-w-[44px] text-center`}>
                {item.price}
              </span>
              <span className="text-sm font-bold text-heading group-hover:text-primary transition-colors leading-snug">
                {item.label}
              </span>
            </a>
          ))}
        </div>
        <a
          href="https://note.com/dobokutorisetsu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
        >
          note「土木のトリセツ」をもっと見る →
        </a>
      </div>
    </section>
  );
}
