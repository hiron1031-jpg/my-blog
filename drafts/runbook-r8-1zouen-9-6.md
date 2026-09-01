# 9月6日（日）1級造園 第一次検定 当日〜数日の手順書

対象試験：令和8年度 1級造園施工管理技士 第一次検定（2026-09-06 実施）
合格発表：2026-10-08（木） ／ 第二次検定：2026-12-06（日）

---

## いちばん大事なこと

**試験当日の夜〜翌日が、1級造園で年間いちばんアクセスが集まる瞬間**です。
公式の問題・正答は数日かかるので、**当日は「各社速報リンク」だけ先に出す**のが最優先。
公式PDFの掲載は後追いで問題ありません。

---

## フェーズ1：当日夜（9/6 20時〜）── 30分

**やること：解答速報ページに各社リンクを載せる**

- Claudeに「1級造園の速報リンク追加して」と言えば、各社サイトを確認して
  `content/posts/kaitou-sokuhou/index.mdx` を更新→デプロイ→IndexNow送信まで実施します。
- 併せてX（Buffer外の手動投稿）で速報ページを告知すると効果的。

---

## フェーズ2：公式PDFが出たら（**9/7(月) 以降**）

公式の掲載先：**https://www.jctc.jp/mondai/** （「試験問題/正答肢」ページ。ここに全資格がまとまっている）

### PDFのURL規則（2026-09-02にJCTCのページを調査して判明）

```
https://www.jctc.jp/wjctcp/wp-content/uploads/YYYY/MM/YYYYMMDD{資格}_{種別}.pdf
```

- `YYYYMMDD` は **試験日の翌日（月曜）** で統一されている
  （例：R8 1級土木＝試験7/5(日) → `20260706d_...`／R8 2級土木前期＝6/7(日) → `20260608d_...`）
- 資格コード：`d`＝土木、`z`＝造園、`k`＝管工事、`e`＝電気工事
- 種別：`mondaia`＝問題A、`mondaib`＝問題B、`mondai`＝問題（A/B分割なし）、`seitou`＝正答肢
- 第二次検定は `mondai` のみで `seitou` は無い（記述式のため正答非公開）

### 今回（1級造園 R8）の想定URL

試験日 9/6(日) → 翌日 9/7(月) 付。おそらく以下：

```
https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaia.pdf
https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaib.pdf
https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_seitou.pdf
```

※ 過去に `_seitou-1.pdf` `_seitou-2.pdf` のように連番が付いた例もあるため、
**推測URLを直打ちせず、必ず https://www.jctc.jp/mondai/ を開いて実際のリンクを取得すること。**

### ⚠️ ここだけは監督にしかできない作業があります

PDFは**Cloudflare R2から配信**しています（`pub-4c110a6010144a5db375ef2fb80338cd.r2.dev`）。
リポジトリに置くだけでは本番に出ません。**R2へのアップロードは監督の作業**です。

**行き方**：Cloudflareダッシュボード → 左メニュー「ストレージとデータベース」→「R2オブジェクトストレージ」
→ バケット **`doboku-pdf`** → `pastproblems/1zou/` を開いてアップロード

⚠️ 必ず `1zou` フォルダの**中に入ってから**アップすること。バケット直下に置くとサイトから見つからない。
ファイル名は渡されたものを**変更しない**（サイトがその名前で探しにいく）。

### 手順

| # | 誰が | やること |
|---|---|---|
| 1 | Claude | JCTCから R8 の問題PDF・正答PDFをダウンロード |
| 2 | Claude | `public/pastproblems/1zou/` に規定のファイル名で保存 |
| 3 | **監督** | **同じファイルをR2の `pastproblems/1zou/` にアップロード** |
| 4 | Claude | `src/lib/pastproblems-data.ts` にR8の行を追加 |
| 5 | Claude | ビルド→デプロイ→IndexNow送信 |
| 6 | 監督 | 本番でPDFが開けるか1本だけクリック確認 |

### ファイル名の規約（1zouの既存に合わせる）

```
R8_A.pdf       第一次検定 問題A
R8_B.pdf       第一次検定 問題B
R8_kaitou.pdf  正答
R8_jitti.pdf   第二次検定（12/6実施後に追加）
```

---

## フェーズ3：クイズへの追加（9月中旬〜）

- 正答は**必ず公式の正答PDF原本から抽出**する。過去にメモ側の値に誤りが複数見つかっている
- 図表問題は `pdftoppm` で切り出して `public/images/quiz/1zou/` に配置（R2不要・Vercel CDN配信）
- 追加後は `drafts/quiz-kaisetsu/audit-answers.cjs` で照合し、**不一致0**を確認してからデプロイ

---

## フェーズ4：12/6 第二次検定に向けて（10月〜）

- 一次の合格発表（10/8）を待たず、**9月中から二次の導線を回す**
- 造園の二次は**R6から経験記述なし**。この事実を知らせられるのは現状うちだけ＝最大の差別化
- 造園パックを作るなら10月中。1級造園は
  無料解答用紙 `nd58fb8b0dc66` ／ 500円解説 `n77af23ad86bb` ／ 300円模範解答 `nb4729f913dec` が既にある

---

## 当日に使うリンク

- 解答速報ページ：https://doboku-torisetsu.com/posts/kaitou-sokuhou
- 1級造園 過去問ページ：https://doboku-torisetsu.com/pastproblems/1zou
- 公式（JCTC）：https://www.jctc.jp/exam/zouen-1/
