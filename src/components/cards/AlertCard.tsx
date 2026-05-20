import { motion } from "framer-motion";
import { AlertTriangle, AlertOctagon, Info } from "lucide-react";
import type { Alert } from "@/mock/alertsData";
import { severityRing } from "@/utils/colors";
import { relTime } from "@/utils/formatters";
import { cn } from "@/lib/utils";

const iconFor = (s: Alert["severity"]) =>
  s === "critical" ? AlertOctagon : s === "warning" ? AlertTriangle : Info;
const iconColor = (s: Alert["severity"]) =>
  s === "critical" ? "text-[color:var(--neon-red)]" : s === "warning" ? "text-[color:var(--neon-yellow)]" : "text-[color:var(--neon-blue)]";

export function AlertCard({ alert }: { alert: Alert }) {
  const Icon = iconFor(alert.severity);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("rounded-xl glass p-3.5 border", severityRing(alert.severity))}
    >
      <div className="flex items-start gap-3">
        <div className={cn("h-8 w-8 grid place-items-center rounded-lg bg-white/[0.04] shrink-0", iconColor(alert.severity), alert.severity === "critical" && "animate-pulse-glow")}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-medium truncate">{alert.title}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">{relTime(alert.ts)}</div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{alert.pod}</div>
          <div className="text-xs text-foreground/80 mt-2 leading-relaxed">{alert.explanation}</div>
        </div>
      </div>
    </motion.div>
  );
}