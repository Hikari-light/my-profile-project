import { cn } from "@/lib/utils";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "fixed left-0 top-0 z-50 -translate-y-full bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
    >
      Skip to main content
    </a>
  );
} 