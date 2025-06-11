# 个人作品集网站

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

一个使用 Next.js 15 构建的现代化、响应式个人作品集网站，支持多语言和联系表单功能。

## 功能特点

- 🌐 多语言支持（英文、中文、日语）
- 🎨 使用 Tailwind CSS 和 shadcn/ui 的现代化界面
- 📱 完全响应式设计
- 📝 带提交限制的联系表单
- 🌓 深色/浅色模式
- 🔍 SEO 优化

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: shadcn/ui
- **数据库**: Supabase
- **表单处理**: React Hook Form + Zod
- **国际化**: 自定义 i18n 解决方案
- **部署**: Vercel

## 开始使用

1. 克隆仓库:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. 安装依赖:
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 配置环境变量:
   - 复制 `.env.example` 到 `.env.local`
   - 填写你的 Supabase 凭证和其他配置
   ```bash
   cp .env.example .env.local
   ```
   必需的环境变量:
   ```env
   # Supabase 配置
   NEXT_PUBLIC_SUPABASE_URL=你的项目URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥

   # 联系表单配置
   NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_LIMIT=5
   NEXT_PUBLIC_CONTACT_FORM_RESET_HOURS=24

   # 站点配置
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. 运行开发服务器:
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
├── src/
│   ├── app/                 # App router 页面
│   ├── components/         # React 组件
│   ├── lib/               # 工具函数
│   └── styles/            # 全局样式
├── public/                # 静态文件
└── ...
```

## 部署

本项目已配置好 Vercel 部署。只需将 GitHub 仓库连接到 Vercel，它将自动部署你的网站。

### 生产环境变量配置

在部署到 Vercel 时，请确保在项目设置中配置以下环境变量：

1. 进入 Vercel 项目设置
2. 导航到"环境变量"部分
3. 添加 `.env.local` 文件中的所有变量
4. 部署项目

## 贡献

欢迎贡献代码！请随时提交 Pull Request。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。 