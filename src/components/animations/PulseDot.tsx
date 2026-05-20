import { cn } from "@/lib/utils";

export function PulseDot({ className, color = "bg-[color:var(--neon-green)]" }: { className?: string; color?: string }) {
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)}>
      <span className={cn("absolute inset-0 rounded-full opacity-60 animate-pulse-glow", color)} />
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}