import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Footer } from "@/components/footer";
import { SkipLink } from "@/components/skip-link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/get-dictionary";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const defaultLocale: Locale = 'en';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(
  { params }: { params: { lang?: Locale } }
): Promise<Metadata> {
  const lang = params.lang || defaultLocale;
  
  try {
    const dict = await getDictionary(lang);
    return {
      title: dict.metadata.title,
      description: dict.metadata.description,
      openGraph: {
        title: dict.metadata.title,
        description: dict.metadata.description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: dict.metadata.title,
        description: dict.metadata.description,
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        languages: {
          'en': '/en',
          'zh': '/zh',
        },
      },
    };
  } catch (error) {
    console.error(`Failed to load dictionary for language ${lang}:`, error);
    return {
      title: "My Portfolio",
      description: "Full Stack Engineer Portfolio",
      openGraph: {
        title: "My Portfolio",
        description: "Full Stack Engineer Portfolio",
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "My Portfolio",
        description: "Full Stack Engineer Portfolio",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: Locale };
}) {
  const lang = params.lang || defaultLocale;
  
  return (
    <html lang={lang} className={geist.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="system">
          <SkipLink />
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex h-14 items-center justify-between" aria-label="Main navigation">
                  <MainNav />
                  <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                  </div>
                </nav>
              </div>
            </header>
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
