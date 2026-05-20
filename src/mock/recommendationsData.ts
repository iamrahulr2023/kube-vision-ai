export interface Recommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  severity: "critical" | "warning" | "info";
  impact: string;
}
export const initialRecommendations: Recommendation[] = [
  { id: "r1", title: "Scale frontend replicas", description: "Increase frontend-web deployment from 3 → 5 replicas to absorb traffic surge.", confidence: 92, severity: "warning", impact: "−38% P95 latency" },
  { id: "r2", title: "Optimize database queries", description: "Add composite index on (tenant_id, created_at) for slow query on orders table.", confidence: 87, severity: "warning", impact: "−62% query time" },
  { id: "r3", title: "Increase memory limit", description: "Raise worker-queue memory limit from 512Mi → 1Gi to prevent OOMKill.", confidence: 95, severity: "critical", impact: "Stops restart loop" },
  { id: "r4", title: "Investigate storage bottleneck", description: "Migrate vector-db PVC from gp3 → io2 to lift IOPS ceiling.", confidence: 78, severity: "critical", impact: "−71% I/O latency" },
  { id: "r5", title: "Enable HPA on ai-agent", description: "Configure HorizontalPodAutoscaler targeting 65% CPU for ai-agent-inference.", confidence: 84, severity: "info", impact: "Smoother load" },
];