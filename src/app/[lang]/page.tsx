import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Locale } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { use } from "react"
import { AvatarWithFallback } from "@/components/avatar-with-fallback"

interface Props {
  params: Promise<{
    lang: Locale
  }>
}

interface SkillEntry {
  name: string;
  level: string;
  desc: string;
}

export default function Home({ params }: Props) {
  const { lang } = use(params)
  const dict = use(getDictionary(lang))

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="w-full bg-background pt-16 pb-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-fade-up animate-duration-1000 animate-delay-100">
                {dict.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px] animate-fade-up animate-duration-1000 animate-delay-300">
                {dict.hero.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-up animate-duration-1000 animate-delay-500">
                <Button size="lg" asChild className="animate-pulse animate-infinite animate-duration-[5000ms]">
                  <a href={`/${lang}/contact`}>{dict.hero.contactButton}</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`/${lang}/projects`}>{dict.hero.projectsButton}</a>
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 animate-fade-left animate-duration-1000 animate-delay-700">
              <AvatarWithFallback />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full bg-background container max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 animate-fade-up animate-duration-1000">{dict.skills.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Frontend */}
          <Card className="animate-fade-up animate-duration-1000 animate-delay-100 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>{dict.skills.frontend.title}</CardTitle>
              <CardDescription>{dict.skills.frontend.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {Object.entries(dict.skills.frontend)
                .filter(([key]) => !["title", "description"].includes(key))
                .map(([key, skill]) => {
                  const typedSkill = skill as SkillEntry;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{typedSkill.name}</span>
                        <span className="text-sm text-muted-foreground">{typedSkill.level}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{typedSkill.desc}</p>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Backend */}
          <Card className="animate-fade-up animate-duration-1000 animate-delay-300 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>{dict.skills.backend.title}</CardTitle>
              <CardDescription>{dict.skills.backend.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {Object.entries(dict.skills.backend)
                .filter(([key]) => !["title", "description"].includes(key))
                .map(([key, skill]) => {
                  const typedSkill = skill as SkillEntry;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{typedSkill.name}</span>
                        <span className="text-sm text-muted-foreground">{typedSkill.level}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{typedSkill.desc}</p>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* DevOps */}
          <Card className="animate-fade-up animate-duration-1000 animate-delay-500 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle>{dict.skills.devops.title}</CardTitle>
              <CardDescription>{dict.skills.devops.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {Object.entries(dict.skills.devops)
                .filter(([key]) => !["title", "description"].includes(key))
                .map(([key, skill]) => {
                  const typedSkill = skill as SkillEntry;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{typedSkill.name}</span>
                        <span className="text-sm text-muted-foreground">{typedSkill.level}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{typedSkill.desc}</p>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
