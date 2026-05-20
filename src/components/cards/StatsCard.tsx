import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  tone?: "blue" | "cyan" | "purple" | "green" | "red" | "yellow";
  delta?: string;
}

const toneMap = {
  blue: { glow: "glow-blue", from: "from-[color:var(--neon-blue)]/30", text: "text-[color:var(--neon-blue)]" },
  cyan: { glow: "glow-cyan", from: "from-[color:var(--neon-cyan)]/30", text: "text-[color:var(--neon-cyan)]" },
  purple: { glow: "glow-purple", from: "from-[color:var(--neon-purple)]/30", text: "text-[color:var(--neon-purple)]" },
  green: { glow: "glow-green", from: "from-[color:var(--neon-green)]/30", text: "text-[color:var(--neon-green)]" },
  red: { glow: "glow-red", from: "from-[color:var(--neon-red)]/30", text: "text-[color:var(--neon-red)]" },
  yellow: { glow: "", from: "from-[color:var(--neon-yellow)]/30", text: "text-[color:var(--neon-yellow)]" },
};

export function StatsCard({ label, value, suffix, decimals = 0, icon: Icon, tone = "blue", delta }: Props) {
  const t = toneMap[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4 }}
      className={cn("relative overflow-hidden rounded-xl glass p-4 group", t.glow)}
    >
      <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-50 bg-gradient-to-br to-transparent", t.from)} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">
            <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
          </div>
          {delta && <div className={cn("mt-1 text-[11px]", t.text)}>{delta}</div>}
        </div>
        <div className={cn("h-9 w-9 grid place-items-center rounded-lg bg-white/[0.04] border border-[color:var(--glass-border)] transition-transform group-hover:scale-110", t.text)}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
    </motion.div>
  );
}