import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import type { Recommendation } from "@/mock/recommendationsData";
import { cn } from "@/lib/utils";

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  const tone =
    rec.severity === "critical" ? "text-[color:var(--neon-red)]"
    : rec.severity === "warning" ? "text-[color:var(--neon-yellow)]"
    : "text-[color:var(--neon-blue)]";
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl glass p-4 hover:bg-white/[0.04] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className={cn("h-4 w-4", tone)} />
          <div className="text-sm font-medium">{rec.title}</div>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] border border-[color:var(--glass-border)]">
          {rec.severity}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>AI Confidence</span>
            <span className="tabular-nums">{rec.confidence}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${rec.confidence}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-purple)]"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-[color:var(--neon-green)] shrink-0">
          <TrendingUp className="h-3.5 w-3.5" />
          {rec.impact}
        </div>
      </div>
    </motion.div>
  );
}