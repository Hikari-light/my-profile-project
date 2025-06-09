# ポートフォリオウェブサイト

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

Next.js 15で構築された、多言語対応とコンタクトフォームを備えたモダンでレスポンシブなポートフォリオウェブサイトです。

## 機能

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

3. `.env.example`を`.env.local`にコピーして環境変数を設定:
```bash
cp .env.example .env.local
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

このプロジェクトはVercelへのデプロイ用に設定されています。GitHubリポジトリをVercelに接続するだけで、自動的にサイトがデプロイされます。

## 貢献

貢献を歓迎します！プルリクエストを送信してください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。 