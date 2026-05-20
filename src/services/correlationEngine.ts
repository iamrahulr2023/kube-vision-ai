export interface CorrelationChain {
  id: string;
  ts: number;
  steps: { label: string; detail: string }[];
}

const TEMPLATES: CorrelationChain["steps"][] = [
  [
    { label: "PVC latency increased", detail: "vector-db-pvc-3a P95 480ms" },
    { label: "Database slowed", detail: "postgres-primary-0 query time +2.3x" },
    { label: "API response degraded", detail: "api-gateway-5d2 P99 1.8s" },
    { label: "Frontend timeout occurred", detail: "frontend-web-7f9 4xx +12%" },
  ],
  [
    { label: "CPU spike on ai-agent", detail: "ai-agent-inference-9c 92%" },
    { label: "Inference queue grew", detail: "+148 pending requests" },
    { label: "Gateway P95 doubled", detail: "api-gateway-5d2 980ms" },
  ],
  [
    { label: "Memory leak suspected", detail: "worker-queue-8e RSS +18%" },
    { label: "OOMKill restart loop", detail: "4 restarts in 6m" },
    { label: "Job backlog growing", detail: "+2,300 unprocessed events" },
  ],
];

export function initialCorrelations(): CorrelationChain[] {
  return TEMPLATES.map((steps, i) => ({ id: `c${i}`, ts: Date.now() - (i + 1) * 60_000, steps }));
}

export function maybeGenerateCorrelation(): CorrelationChain | null {
  if (Math.random() > 0.25) return null;
  const t = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  return { id: `c-${Date.now()}`, ts: Date.now(), steps: t };
}