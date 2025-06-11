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

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials and other configuration
   ```bash
   cp .env.example .env.local
   ```
   Required environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Contact Form Configuration
   NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_LIMIT=5
   NEXT_PUBLIC_CONTACT_FORM_RESET_HOURS=24

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

### Environment Variables in Production

When deploying to Vercel, make sure to configure the following environment variables in your project settings:

1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add all the variables from your `.env.local` file
4. Deploy your project

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
