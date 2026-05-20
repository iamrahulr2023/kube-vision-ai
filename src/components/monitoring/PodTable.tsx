import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Pod } from "@/mock/podData";
import { statusDot } from "@/utils/colors";
import { cn } from "@/lib/utils";

type SortKey = keyof Pick<Pod, "name" | "namespace" | "cpu" | "memory" | "network" | "pvc" | "status" | "restarts">;

const cols: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "name", label: "Pod" },
  { key: "namespace", label: "Namespace" },
  { key: "cpu", label: "CPU %", align: "right" },
  { key: "memory", label: "Memory %", align: "right" },
  { key: "network", label: "Network", align: "right" },
  { key: "pvc", label: "PVC", align: "right" },
  { key: "status", label: "Status" },
  { key: "restarts", label: "Restarts", align: "right" },
];

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-20 h-1.5 rounded-full bg-white/[0.05] overflow-hidden inline-block align-middle ml-2">
      <motion.div
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6 }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

export function PodTable({ pods }: { pods: Pod[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "cpu", dir: "desc" });
  const sorted = useMemo(() => {
    const arr = [...pods];
    arr.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") return sort.dir === "asc" ? av - bv : bv - av;
      return sort.dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [pods, sort]);

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-[color:var(--glass-border)]">
            {cols.map((c) => (
              <th
                key={c.key}
                onClick={() => setSort((s) => ({ key: c.key, dir: s.key === c.key && s.dir === "desc" ? "asc" : "desc" }))}
                className={cn("py-3 px-3 font-medium cursor-pointer hover:text-foreground transition", c.align === "right" && "text-right")}
              >
                <span className="inline-flex items-center gap-1">
                  {c.label}
                  {sort.key === c.key && <ChevronDown className={cn("h-3 w-3 transition-transform", sort.dir === "asc" && "rotate-180")} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {sorted.map((p) => (
              <motion.tr
                key={p.id}
                layout
                className="border-b border-[color:var(--glass-border)]/60 hover:bg-white/[0.02] transition"
              >
                <td className="py-2.5 px-3 font-mono text-[12.5px]">{p.name}</td>
                <td className="py-2.5 px-3 text-muted-foreground">{p.namespace}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">
                  {Math.round(p.cpu)}%
                  <Bar value={p.cpu} color="oklch(0.72 0.18 250)" />
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums">
                  {Math.round(p.memory)}%
                  <Bar value={p.memory} color="oklch(0.68 0.22 305)" />
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums">{Math.round(p.network)}%</td>
                <td className="py-2.5 px-3 text-right tabular-nums">{Math.round(p.pvc)}%</td>
                <td className="py-2.5 px-3">
                  <span className="inline-flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full animate-pulse-glow", statusDot(p.status))} />
                    <span className="text-xs">{p.status}</span>
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums">{p.restarts}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}