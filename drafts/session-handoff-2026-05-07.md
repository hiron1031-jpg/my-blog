# セッション引継ぎメモ（2026-05-07作成）

新セッション開始時、このファイルをまず読んで状況把握してください。

---

## ✅ 完了済みの作業

### ドメイン移行（完了）
- 旧：`doboku-torisetsu.vercel.app` → 新：`https://doboku-torisetsu.com`
- お名前.com で取得 → ネームサーバーを `01-04.dnsv.jp` に切替で解決
- Vercel 環境変数 `NEXT_PUBLIC_SITE_URL` を新ドメインに設定済
- canonical / og:url / sitemap.xml すべて新ドメインに切替済
- Search Console に新プロパティ追加・サイトマップ送信成功（143ページ検出）

### note アカウント
- URL: `note.com/dobokutorisetsu`
- プロフィール完成（ヘッダー画像・アイコン・自己紹介文121字）
- ファイル：`my-blog/note-assets/`（profile-icon.png / header.png）

### 商品作成状況
- **商品C：解答用紙PDF（白紙・練習用 R7対応）** ✅ 完成
  - `my-blog/note-assets/answer-sheets/1doboku-2ji-r7-answer-sheet.html / .pdf`
- **商品A：1級土木 R7 解答解説** 下書き完成・予備校3社で検証済
  - `my-blog/drafts/note-1doboku-2ji-r7-kaitou-kaisetsu.md`
  - 日建学院・九州建設専門学院・TAC の3社解答試案で照合済
  - hiroさんが最新編集で「予備校3社照合済」を明記する形に微修正
- **商品B：経験記述ガイド（4テーマ）** 未着手
- **商品D：模範解答記入済み解答用紙** 未着手

### 新規作成記事
- **`zouen-goukaku-career`** ＝ 造園キャリア・年収専用記事（新規）
  - 既存の `goukaku-career`（土木中心）と並列で運用

### 既存記事の修正
- **`keiken-kijutsu-kakikata`** 完了：
  - 4テーマ対応（環境対策追加）
  - 24時間→5日間（湿潤養生）
  - 保温養生の補足追加
  - アイキャッチ画像 v3 化
- **`doboku-keiken-kijutsu`** 完了：
  - 4テーマ対応（5箇所）
  - 練混ぜ水冷却 → JIS A 5308暑中コンクリート仕様で発注 に修正
  - フルハーネス型安全帯 → フルハーネス型墜落制止用器具
  - 立入禁止ロープ → カラーコーン+バリケード
  - フィニッシャー2台並行 → 2工区分割
  - 早朝5時/25℃以下 → 8時始業/35℃以下（実務感覚へ修正）
- **`zouen-keiken-kijutsu`** 完了：
  - 活着率100% → 95%以上
  - 安全管理に対策①②を追加
  - 「工程表の作成」をテーマ表から削除
  - 石材単位 1m²あたり → 1個あたり
  - 幹周 cm/m 表記統一
- **`sankosho-hikaku`** 完了：
  - 「ランキング」表現を「テキスト・過去問集」に統一（リンクテキストを実タイトルと一致）
- **`zouen-sankosho`** 完了：
  - 日建学院 AmazonLink を削除し、メルカリ案内に置換
  - 各 MultiStoreLink に書影画像 imageUrl を追加
  - Amazon承認前の長文警告 → 簡潔な案内に変更

### コンポーネント改修
- **`MultiStoreLink.tsx`** ：書影画像対応（asin → OpenBD or imageUrl手動指定）
- **`AmazonLink.tsx`** ：書影画像対応（asin指定時のみ）
- **`SchoolCard.tsx`** ：「PR・広告」→「[PR]」シンプル化済
- 注意文簡素化：「※ 楽天/Yahoo!は検索結果ページへ遷移します...」だけ残す

### 書影画像ファイル
`my-blog/public/images/books/` に以下が保存済：
- cic-1zou-1ji.jpg
- cic-1zou-2ji.jpg
- miyaken-1zou-1ji.jpg
- miyaken-2zou.jpg
- natsume-1doboku-1ji.jpg
- seibundo-1zou.jpg
- 1zou.jpeg / 2zou.jpeg ← セクション見出し画像として未使用

---

## 🔄 進行中・未完了の作業

### 1. zouen-sankosho の構造整理
**ユーザー指摘**：
- 「例題で学ぶ造園施工管理技士」は最新版が入手困難
- 1級と2級を分けていない
- 下のランキングセクションを推す形に書き換えたい
- 1zou.jpeg / 2zou.jpeg を1級/2級セクションの見出し画像に使うか検討中

**やるべきこと**：
- トップの AmazonLink（例題で学ぶ）を削除 or 「現在入手困難、下記参照」に変更
- 1級造園 / 2級造園 のセクション分け
- 1zou.jpeg を 1級セクション、2zou.jpeg を 2級セクションの見出し画像として配置

### 2. アイキャッチ画像差替（タイトルと画像文字が一致しない記事）
ユーザーが用意した3つのChatGPT画像：
```
C:\Users\hiron\OneDrive\デスクトップ\Claude code\画像\アイキャッチ画像\
- ChatGPT Image 2026年5月7日 05_20_09.png  → 「合格率と難易度比較」（土木・造園比較） → sekoukanri-goukakuritsu
- ChatGPT Image 2026年5月7日 05_23_09.png  → 内容未確認
- ChatGPT Image 2026年5月7日 05_28_06.png  → 内容未確認
```

**やるべきこと**：
- 3画像の内容を Read で確認
- 各記事のタイトルと画像内文字を照合
- ファイル名を整えて `public/images/posts/` にコピー
- 該当記事の `thumbnail` フィールドを更新

### 3. 既存記事の実務目線チェック（継続）
チェック順（優先度順）：
1. ✅ keiken-kijutsu-kakikata
2. ✅ doboku-keiken-kijutsu
3. ✅ zouen-keiken-kijutsu
4. ⏳ doboku-1kyu-hinshutu
5. ⏳ doboku-2kyu-hinshutu
6. ⏳ zouen-1kyu-hinshutu （hiroさんが手動編集中：合格率52.1%・出題65問・能力問題足切り条件など最新化済み）
7. ⏳ zouen-2kyu-hinshutu （hiroさんが手動編集中：19歳→17歳新制度・40問60%基準など最新化済み）
8. ⏳ 4資格 × 第二次検定記述（4本）
9. ⏳ 4資格 × 申込み（4本）
10. ⏳ 合格率3記事
11. ⏳ 4資格 × 当日マニュアル（4本）
12. ⏳ 4資格 × 勉強法（4本）
13. ⏳ 横断記事系9本

**チェックの観点**：
- 数値の正確性（合格率・試験日・条文番号）
- 専門用語の正確性（指針・示方書ベース）
- 法改正対応（17歳新制度・能力問題6問足切りなど）
- 記事間の整合性
- **実務目線**（机上知識すぎる表現がないか）

### 4. 商品Aドラフトの最終化
- hiroさんが手動編集で「予備校3社照合済」を明記済（line 9）
- 各問題の解答も予備校3社の最新値に更新済
- 残：note にアップロード（hiroさん作業）

### 5. 商品B・D の作成
- 商品B（経験記述ガイド）：未着手
- 商品D（模範解答記入済み解答用紙）：商品Aの解答を商品Cテンプレに埋める形

---

## ⚠️ ユーザー指示の重要原則

1. **実務目線でチェック**（机上知識だけで書かない）
   - 「これ実務的に大丈夫？」と疑問が湧いたら即提起
   - hiroさんが造園作業員→3冠取得した実体験ベースで判断
2. **コードブロック（```）は使わない**（hiroさんの環境で表示されない）
3. **読者目線**（「アフィリエイトプログラム承認前のため〜」みたいな運営側都合の文言は削除）
4. **設定変更時は細部まで確認**（過去にお名前.com NS設定で27時間ロスした反省）
5. **記事修正は1記事ずつ → 確認 → コミット → 次へ**

---

## 🛠️ 環境情報

- 本番URL：https://doboku-torisetsu.com
- リポジトリ：https://github.com/hiron1031-jpg/my-blog
- Vercel プロジェクト：doboku-torisetsu
- 現在のブランチ：main
- ローカル：`C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog`
- 最終コミット：1667487（造園参考書記事の警告ブロック簡素化）
- ※ ローカルに未コミット変更あり：zouen-sankosho の各MultiStoreLinkに imageUrl 追加分（手動 git status で確認）

---

## 📋 次セッション開始時にやること

1. このファイルを読む
2. `git status` で未コミット変更を確認
3. ユーザーに「前回の続きで、次はどれからやりますか？」と聞く
4. 候補：
   - A. zouen-sankosho の構造整理（1級/2級分割）+ 書影画像コミット
   - B. 3つのアイキャッチ画像差替
   - C. 頻出問題記事の実務目線チェック続行
   - D. 商品Aを note にアップロード支援
   - E. 商品B・D の作成
