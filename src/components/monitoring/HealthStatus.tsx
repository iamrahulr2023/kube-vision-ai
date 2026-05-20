import { PulseDot } from "@/components/animations/PulseDot";

export function HealthStatus({ healthy, warn, crit }: { healthy: number; warn: number; crit: number }) {
  const total = healthy + warn + crit || 1;
  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5"><PulseDot color="bg-[color:var(--neon-green)]" /><span className="tabular-nums">{healthy}</span><span className="text-muted-foreground">healthy</span></div>
      <div className="flex items-center gap-1.5"><PulseDot color="bg-[color:var(--neon-yellow)]" /><span className="tabular-nums">{warn}</span><span className="text-muted-foreground">warn</span></div>
      <div className="flex items-center gap-1.5"><PulseDot color="bg-[color:var(--neon-red)]" /><span className="tabular-nums">{crit}</span><span className="text-muted-foreground">crit</span></div>
      <div className="h-1.5 w-32 rounded-full overflow-hidden bg-white/[0.05] flex">
        <div style={{ width: `${(healthy / total) * 100}%` }} className="bg-[color:var(--neon-green)]" />
        <div style={{ width: `${(warn / total) * 100}%` }} className="bg-[color:var(--neon-yellow)]" />
        <div style={{ width: `${(crit / total) * 100}%` }} className="bg-[color:var(--neon-red)]" />
      </div>
    </div>
  );
}