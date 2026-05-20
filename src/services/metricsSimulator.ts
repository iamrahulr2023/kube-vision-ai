import type { Pod, PodStatus } from "@/mock/podData";
import { clamp } from "@/utils/formatters";

const jitter = (v: number, span = 6) => v + (Math.random() - 0.5) * span;

export function tickPod(p: Pod): Pod {
  const spike = Math.random() < 0.08;
  const cpu = clamp(jitter(p.cpu, spike ? 24 : 8));
  const memory = clamp(jitter(p.memory, spike ? 14 : 5));
  const network = clamp(jitter(p.network, 10));
  const pvc = clamp(jitter(p.pvc, 3), 0, 100);
  let status: PodStatus = "Healthy";
  if (cpu > 85 || memory > 85 || pvc > 90) status = "Critical";
  else if (cpu > 70 || memory > 70 || pvc > 75) status = "Warning";
  const restarts = status === "Critical" && Math.random() < 0.06 ? p.restarts + 1 : p.restarts;
  return { ...p, cpu, memory, network, pvc, status, restarts };
}

export function tickAll(pods: Pod[]): Pod[] {
  return pods.map(tickPod);
}