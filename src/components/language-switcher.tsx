"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const languages = [
  { code: "en", name: "English", shortName: "EN" },
  { code: "zh", name: "中文", shortName: "中" },
  { code: "ja", name: "日本語", shortName: "日" },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = pathname.split("/")[1] || "en"
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  const handleLanguageChange = (lang: string) => {
    if (lang === currentLang) return
    const newPath = pathname.replace(`/${currentLang}`, "") || "/"
    router.push(`/${lang}${newPath}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2 h-9">
          {currentLanguage.shortName}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLang === lang.code ? "bg-secondary/50" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
