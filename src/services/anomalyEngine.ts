import type { Pod } from "@/mock/podData";
import type { Alert } from "@/mock/alertsData";

const REASONS: Record<string, (p: Pod) => string> = {
  cpu: (p) => `CPU sustained at ${Math.round(p.cpu)}% on ${p.name}. Burst pattern detected by anomaly model.`,
  mem: (p) => `Memory at ${Math.round(p.memory)}% on ${p.name}. RSS growth anomaly flagged.`,
  pvc: (p) => `PVC usage ${Math.round(p.pvc)}% on ${p.name}. Latency increase predicted within 90s.`,
  net: (p) => `Network throughput burst on ${p.name}. Score ${(0.7 + Math.random() * 0.25).toFixed(2)}.`,
};

export function detectAnomalies(pods: Pod[]): Alert[] {
  const out: Alert[] = [];
  for (const p of pods) {
    if (Math.random() > 0.18) continue;
    if (p.cpu > 82) out.push(make("critical", "High CPU spike detected", p, REASONS.cpu(p)));
    else if (p.memory > 82) out.push(make("warning", "Memory leak suspected", p, REASONS.mem(p)));
    else if (p.pvc > 85) out.push(make("critical", "PVC latency threshold exceeded", p, REASONS.pvc(p)));
    else if (p.network > 75) out.push(make("info", "Network burst detected", p, REASONS.net(p)));
  }
  return out;
}

function make(severity: Alert["severity"], title: string, p: Pod, explanation: string): Alert {
  return { id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, severity, title, pod: p.name, ts: Date.now(), explanation };
}