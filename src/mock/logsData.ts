export type LogLevel = "INFO" | "WARNING" | "CRITICAL" | "AI" | "DEBUG";
export interface LogEntry { id: string; ts: number; level: LogLevel; message: string; }
export const initialLogs: LogEntry[] = [
  { id: "l1", ts: Date.now() - 8000, level: "INFO", message: "KubeMind agent connected to cluster prod-eu-west-2" },
  { id: "l2", ts: Date.now() - 7000, level: "INFO", message: "Monitoring initialized — 10 pods across 6 namespaces" },
  { id: "l3", ts: Date.now() - 6000, level: "AI", message: "Anomaly model v3.2 loaded (gradient-boosted, 14 features)" },
  { id: "l4", ts: Date.now() - 5000, level: "WARNING", message: "CPU spike detected on ai-agent-inference-9c (78%)" },
  { id: "l5", ts: Date.now() - 4000, level: "AI", message: "Correlation engine triggered: storage → db → api chain" },
  { id: "l6", ts: Date.now() - 3000, level: "CRITICAL", message: "PVC latency threshold exceeded on vector-db-pvc-3a" },
  { id: "l7", ts: Date.now() - 2000, level: "INFO", message: "Recommendation generated: scale frontend replicas +2" },
];

export const logTemplates: { level: LogLevel; message: string }[] = [
  { level: "INFO", message: "Healthcheck OK for {pod}" },
  { level: "INFO", message: "Reconciled deployment {pod}" },
  { level: "DEBUG", message: "Metrics pushed for {pod}" },
  { level: "WARNING", message: "CPU above 80% on {pod}" },
  { level: "WARNING", message: "Memory pressure on {pod}" },
  { level: "AI", message: "Correlation engine evaluated chain involving {pod}" },
  { level: "AI", message: "Anomaly score {score} for {pod}" },
  { level: "CRITICAL", message: "Restart loop detected on {pod}" },
  { level: "CRITICAL", message: "PVC latency spike on {pod}" },
];