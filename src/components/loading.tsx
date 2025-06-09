import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-primary border-t-transparent",
        className
      )}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner className="h-12 w-12" />
    </div>
  );
}

export function LoadingSection() {
  return (
    <div className="flex h-32 w-full items-center justify-center">
      <LoadingSpinner className="h-8 w-8" />
    </div>
  );
} 