# ポートフォリオウェブサイト

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

Next.js 15で構築された、多言語対応とコンタクトフォーム機能を備えたモダンでレスポンシブなポートフォリオウェブサイト。

## 主な機能

- 🌐 多言語対応（英語、中国語、日本語）
- 🎨 Tailwind CSSとshadcn/uiを使用したモダンなUI
- 📱 完全レスポンシブデザイン
- 📝 送信制限付きコンタクトフォーム
- 🌓 ダーク/ライトモード
- 🔍 SEO最適化

## 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **データベース**: Supabase
- **フォーム処理**: React Hook Form + Zod
- **国際化**: カスタムi18nソリューション
- **デプロイ**: Vercel

## 始め方

1. リポジトリをクローン:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. 依存関係をインストール:
```bash
npm install
# または
yarn install
# または
pnpm install
```

3. 環境変数の設定:
   - `.env.example`を`.env.local`にコピー
   - Supabaseの認証情報とその他の設定を入力
   ```bash
   cp .env.example .env.local
   ```
   必要な環境変数:
   ```env
   # Supabase設定
   NEXT_PUBLIC_SUPABASE_URL=あなたのプロジェクトURL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたの匿名キー

   # コンタクトフォーム設定
   NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_LIMIT=5
   NEXT_PUBLIC_CONTACT_FORM_RESET_HOURS=24

   # サイト設定
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. 開発サーバーを起動:
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## プロジェクト構造

```
├── src/
│   ├── app/                 # App routerページ
│   ├── components/         # Reactコンポーネント
│   ├── lib/               # ユーティリティ関数
│   └── styles/            # グローバルスタイル
├── public/                # 静的ファイル
└── ...
```

## デプロイ

このプロジェクトはVercelデプロイ用に設定されています。GitHubリポジトリをVercelに接続するだけで、自動的にウェブサイトがデプロイされます。

### 本番環境変数の設定

Vercelにデプロイする際は、以下の環境変数をプロジェクト設定で設定してください：

1. Vercelプロジェクト設定に移動
2. 「環境変数」セクションに移動
3. `.env.local`ファイルのすべての変数を追加
4. プロジェクトをデプロイ

## 貢献

コードの貢献を歓迎します！プルリクエストを送信してください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。 