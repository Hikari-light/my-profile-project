"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getClientDictionary } from "@/lib/i18n/client-dictionary";
import type { Locale } from "@/lib/i18n/client-dictionary";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNav() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLang = segments[1] as Locale || "en";
  const dict = getClientDictionary(currentLang);

  const routes = [
    {
      href: `/${currentLang}`,
      label: dict.nav.home,
      active: segments.length === 2,
    },
    {
      href: `/${currentLang}/projects`,
      label: dict.nav.projects,
      active: segments.includes("projects"),
    },
    {
      href: `/${currentLang}/contact`,
      label: dict.nav.contact,
      active: segments.includes("contact"),
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            <Link
              href={route.href}
              className={cn(
                navigationMenuTriggerStyle(),
                route.active ? "text-primary" : "text-muted-foreground",
                "transition-colors"
              )}
            >
              {route.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
