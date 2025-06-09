"use client"

import { useParams } from "next/navigation";
import { getClientDictionary } from "@/lib/i18n/client-dictionary";
import type { Locale } from "@/lib/i18n/get-dictionary";

export function Footer() {
  const params = useParams();
  const lang = (params?.lang as Locale) || "en";
  const dict = getClientDictionary(lang);
  const currentYear = new Date().getFullYear();
  
  const technologies = [
    { 
      name: "Next.js 15", 
      url: "https://nextjs.org/",
      description: "React framework for production"
    },
    { 
      name: "Vercel", 
      url: "https://vercel.com/",
      description: "Cloud platform for frontend developers"
    },
    { 
      name: "TypeScript", 
      url: "https://www.typescriptlang.org/",
      description: "Strongly typed programming language"
    },
    { 
      name: "Tailwind CSS", 
      url: "https://tailwindcss.com/",
      description: "Utility-first CSS framework"
    },
    { 
      name: "shadcn/ui", 
      url: "https://ui.shadcn.com/",
      description: "Re-usable components built with Radix UI and Tailwind"
    },
    { 
      name: "Supabase", 
      url: "https://supabase.com/",
      description: "Open source Firebase alternative"
    },
  ];

  // 技术图标映射
  const TechIcon = ({ tech }: { tech: string }) => {
    switch(tech) {
      case "Next.js 15":
        return (
          <svg className="h-10 w-10" viewBox="0 0 128 128">
            <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/>
          </svg>
        );
      case "Vercel":
        return (
          <svg className="h-10 w-10" viewBox="0 0 128 128">
            <path fill="#000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 111.8L19.2 46H109L64 111.8z"/>
          </svg>
        );
      case "TypeScript":
        return (
          <svg className="h-10 w-10" viewBox="0 0 128 128">
            <path fill="#007acc" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 0 1 7.82 4.5 20.58 20.58 0 0 1 3 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 0 0-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 0 0 .54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.31 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 0 1-9.52-.1A23 23 0 0 1 80 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 0 1 1.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 0 0 4.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 0 0 .69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 0 1-3.43-6.25 25 25 0 0 1-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 0 1 9.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 0 1 .14-5.16c.06-.08 10-.12 22-.1h21.81z"/>
          </svg>
        );
      case "Tailwind CSS":
        return (
          <svg className="h-10 w-10" viewBox="0 0 128 128">
            <path fill="#38b2ac" d="M64 25.6c-17.2 0-27.9 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6 6.3 6.3 13.5 13.5 29.4 13.5 17.2 0 27.9-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6-6.3-6.3-13.5-13.5-29.4-13.5zM32 64c-17.2 0-27.9 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6 6.3 6.3 13.5 13.5 29.4 13.5 17.2 0 27.9-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6-6.3-6.3-13.5-13.5-29.4-13.5z"/>
          </svg>
        );
      case "shadcn/ui":
        return (
          <svg className="h-10 w-10" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
          </svg>
        );
      case "Supabase":
        return (
          <svg className="h-10 w-10" viewBox="0 0 128 128">
            <path fill="#3ecf8e" d="M61.44 0H34.1a5.12 5.12 0 0 0-4.75 3.15L.58 91.84a5.12 5.12 0 0 0 4.75 7.1h28.6a5.12 5.12 0 0 0 4.83-3.5l28.91-92.16A3 3 0 0 0 64.61 0a3.19 3.19 0 0 0-3.17 0z"/>
            <path fill="#3ecf8e" d="M96.8 0H69.6a5.12 5.12 0 0 0-4.75 3.15l-28.77 88.7a5.12 5.12 0 0 0 4.75 7.1h28.6a5.12 5.12 0 0 0 4.83-3.5l28.91-92.16A3 3 0 0 0 100 0a3.19 3.19 0 0 0-3.21 0z" transform="translate(31.897)"/>
          </svg>
        );
      default:
        return <div className="h-10 w-10 bg-muted rounded-full"></div>;
    }
  };

  return (
    <footer className="border-t">
      <div className="container max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-base font-medium text-muted-foreground">Powered by</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <TechIcon tech={tech.name} />
              </div>
              <div>
                <div className="font-medium text-foreground">{tech.name}</div>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>{dict.footer.copyright.replace("{year}", currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
} 