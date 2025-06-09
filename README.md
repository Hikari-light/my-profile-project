# Personal Portfolio Website

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

A modern, responsive personal portfolio website built with Next.js 15, featuring multi-language support and a contact form.

## Features

- 🌐 Multi-language support (English, Chinese, Japanese)
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Fully responsive design
- 📝 Contact form with submission limits
- 🌓 Dark/Light mode
- 🔍 SEO optimized

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Form Handling**: React Hook Form + Zod
- **Internationalization**: Custom i18n solution
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy `.env.example` to `.env.local` and fill in your environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/                 # App router pages
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── styles/            # Global styles
├── public/                # Static files
└── ...
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your site.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
