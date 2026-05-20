import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlowWrapper({ children, tone = "blue", className }: { children: ReactNode; tone?: "blue" | "purple" | "cyan" | "red" | "green"; className?: string }) {
  const map = {
    blue: "glow-blue",
    purple: "glow-purple",
    cyan: "glow-cyan",
    red: "glow-red",
    green: "glow-green",
  } as const;
  return <div className={cn("rounded-xl", map[tone], className)}>{children}</div>;
}