import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Activity, Network, AlertTriangle, Brain, Settings, ChevronLeft, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Activity, label: "Monitoring" },
  { icon: Network, label: "Dependencies" },
  { icon: AlertTriangle, label: "Alerts" },
  { icon: Brain, label: "AI Insights" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 240 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="relative hidden md:flex flex-col glass border-r border-[color:var(--glass-border)] py-5"
    >
      <div className="flex items-center gap-3 px-5 pb-6">
        <div className="relative h-9 w-9 shrink-0 rounded-lg grid place-items-center bg-gradient-to-br from-[color:var(--neon-cyan)] to-[color:var(--neon-purple)] glow-purple">
          <Cpu className="h-5 w-5 text-background" />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">KubeMind</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI · Cluster Ops</div>
          </div>
        )}
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {items.map((it) => (
          <button
            key={it.label}
            className={cn(
              "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              it.active
                ? "bg-[color:var(--neon-blue)]/10 text-foreground glow-blue"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
            )}
          >
            <it.icon className={cn("h-4.5 w-4.5 shrink-0", it.active && "text-[color:var(--neon-cyan)]")} />
            {!collapsed && <span className="truncate">{it.label}</span>}
            {it.active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded-full bg-gradient-to-b from-[color:var(--neon-cyan)] to-[color:var(--neon-purple)]" />
            )}
          </button>
        ))}
      </nav>
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mx-3 mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        {!collapsed && <span>Collapse</span>}
      </button>
    </motion.aside>
  );
}