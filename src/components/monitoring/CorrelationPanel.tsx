import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { relTime } from "@/utils/formatters";

export function CorrelationPanel() {
  const chains = useDashboardStore((s) => s.correlations);
  return (
    <div className="space-y-4 max-h-[460px] overflow-y-auto scrollbar-thin pr-1">
      {chains.map((c) => (
        <motion.div
          key={c.id}
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl glass p-4 border border-[color:var(--neon-purple)]/30"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[color:var(--neon-purple)]" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Event chain</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{relTime(c.ts)}</span>
          </div>
          <ol className="space-y-2">
            {c.steps.map((s, i) => (
              <li key={i}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-6 w-6 grid place-items-center rounded-md bg-[color:var(--neon-purple)]/15 text-[11px] text-[color:var(--neon-purple)] tabular-nums">{i + 1}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-[11px] text-muted-foreground">{s.detail}</div>
                  </div>
                </div>
                {i < c.steps.length - 1 && (
                  <div className="ml-3 my-1 text-muted-foreground/60"><ArrowDown className="h-3.5 w-3.5" /></div>
                )}
              </li>
            ))}
          </ol>
        </motion.div>
      ))}
    </div>
  );
}