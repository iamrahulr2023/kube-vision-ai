export type Severity = "critical" | "warning" | "info";
export interface Alert {
  id: string;
  severity: Severity;
  title: string;
  pod: string;
  ts: number;
  explanation: string;
}
const now = Date.now();
export const initialAlerts: Alert[] = [
  { id: "a1", severity: "critical", title: "PVC latency threshold exceeded", pod: "vector-db-pvc-3a", ts: now - 1000 * 42, explanation: "P95 read latency 480ms (>250ms baseline). Likely IOPS saturation on attached EBS volume." },
  { id: "a2", severity: "warning", title: "High CPU spike detected", pod: "ai-agent-inference-9c", ts: now - 1000 * 120, explanation: "CPU sustained >80% for 90s. Correlated with request burst from api-gateway." },
  { id: "a3", severity: "warning", title: "Memory leak suspected", pod: "worker-queue-8e", ts: now - 1000 * 240, explanation: "RSS growth +18% over last 10m without traffic increase. Heap snapshot recommended." },
  { id: "a4", severity: "info", title: "Dependency bottleneck detected", pod: "api-gateway-5d2", ts: now - 1000 * 380, explanation: "Downstream postgres-primary-0 P99 latency degraded by 2.3x in the last 5m." },
  { id: "a5", severity: "info", title: "Network burst detected", pod: "ingress-nginx-4f", ts: now - 1000 * 520, explanation: "Ingress throughput +312% above 1h trailing average. Auto-scaling evaluated." },
];