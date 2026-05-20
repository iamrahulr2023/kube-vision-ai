import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { fmtTime } from "@/utils/formatters";
import { cn } from "@/lib/utils";

const levelColor: Record<string, string> = {
  INFO: "text-[color:var(--neon-cyan)]",
  WARNING: "text-[color:var(--neon-yellow)]",
  CRITICAL: "text-[color:var(--neon-red)]",
  AI: "text-[color:var(--neon-purple)]",
  DEBUG: "text-muted-foreground",
};

export function LogsPanel() {
  const logs = useDashboardStore((s) => s.logs);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);
  return (
    <div className="rounded-lg bg-[oklch(0.12_0.02_265)] border border-[color:var(--glass-border)] font-mono text-[12px]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[color:var(--glass-border)]">
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--neon-red)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--neon-yellow)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--neon-green)]" />
        <span className="ml-2 text-[11px] text-muted-foreground">kubemind@cluster:~$ tail -f /var/log/agent.log</span>
      </div>
      <div ref={ref} className="h-[280px] overflow-y-auto scrollbar-thin p-3 space-y-1">
        {logs.map((l) => (
          <div key={l.id} className="flex gap-2 leading-relaxed">
            <span className="text-muted-foreground/70 shrink-0">{fmtTime(l.ts)}</span>
            <span className={cn("shrink-0 w-[64px]", levelColor[l.level])}>[{l.level}]</span>
            <span className="text-foreground/90">{l.message}</span>
          </div>
        ))}
        <div className="inline-block w-2 h-3.5 bg-[color:var(--neon-cyan)] animate-pulse-glow align-middle" />
      </div>
    </div>
  );
}