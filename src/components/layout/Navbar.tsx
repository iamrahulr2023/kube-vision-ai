import { Bell, Search, ChevronDown, Sparkles } from "lucide-react";
import { PulseDot } from "@/components/animations/PulseDot";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 glass border-b border-[color:var(--glass-border)]">
      <div className="flex items-center gap-4 px-4 md:px-6 py-3">
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search pods, namespaces, alerts…"
            className="w-full bg-white/[0.03] border border-[color:var(--glass-border)] rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[color:var(--neon-blue)]/60 transition"
          />
        </div>
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-[color:var(--glass-border)] text-sm hover:bg-white/[0.06] transition">
          <span className="h-2 w-2 rounded-full bg-[color:var(--neon-cyan)]" />
          prod-eu-west-2
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg glass">
          <Sparkles className="h-4 w-4 text-[color:var(--neon-purple)]" />
          <span className="text-xs">AI Engine</span>
          <PulseDot color="bg-[color:var(--neon-green)]" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
        <button className="relative h-9 w-9 grid place-items-center rounded-lg bg-white/[0.03] border border-[color:var(--glass-border)] hover:bg-white/[0.06] transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[color:var(--neon-red)] animate-pulse-glow" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-[color:var(--glass-border)]">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[color:var(--neon-cyan)] to-[color:var(--neon-purple)] grid place-items-center text-sm font-semibold text-background">AK</div>
          <div className="hidden md:block leading-tight">
            <div className="text-xs font-medium">Anya Kovalenko</div>
            <div className="text-[10px] text-muted-foreground">SRE · Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}