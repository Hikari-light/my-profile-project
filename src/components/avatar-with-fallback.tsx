"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarWithFallback() {
  return (
    <Avatar className="h-40 w-40 ring-2 ring-primary/20">
      <AvatarImage
        src="/avatar.jpg"
        alt="Profile"
        onError={() => {
          console.error('Avatar image failed to load');
        }}
        onLoad={() => {
          console.log('Avatar image loaded successfully');
        }}
      />
      <AvatarFallback className="text-2xl font-semibold">ME</AvatarFallback>
    </Avatar>
  )
} 