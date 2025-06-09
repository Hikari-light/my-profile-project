"use client"

import { getClientDictionary } from "@/lib/i18n/client-dictionary"
import type { Locale } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { use } from "react"

interface Props {
  params: Promise<{
    lang: Locale
  }>
}

export default function ProjectsPage({ params }: Props) {
  const { lang } = use(params)
  const dict = getClientDictionary(lang)

  const projects = [
    {
      title: "Personal Portfolio",
      description: "My personal portfolio website built with Next.js 13",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
      link: "https://github.com/yourusername/portfolio",
      preview: "A modern, responsive portfolio showcasing my work and skills."
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution",
      tech: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
      link: "https://github.com/yourusername/ecommerce",
      preview: "Complete e-commerce platform with user authentication, product management, and order processing."
    },
    {
      title: "Task Management System",
      description: "Collaborative task management platform",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      link: "https://github.com/yourusername/task-manager",
      preview: "Real-time task management system with team collaboration features."
    }
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        {dict.projects.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <HoverCard key={project.title}>
            <HoverCardTrigger asChild>
              <Card className="cursor-pointer group transition-colors hover:border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {dict.projects.viewProject} →
                  </a>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{project.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {project.preview}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
