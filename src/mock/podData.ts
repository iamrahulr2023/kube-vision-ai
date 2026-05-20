export type PodStatus = "Healthy" | "Warning" | "Critical";
export interface Pod {
  id: string;
  name: string;
  namespace: string;
  cpu: number;
  memory: number;
  network: number;
  pvc: number;
  status: PodStatus;
  restarts: number;
}

export const initialPods: Pod[] = [
  { id: "p1", name: "frontend-web-7f9", namespace: "production", cpu: 42, memory: 58, network: 22, pvc: 36, status: "Healthy", restarts: 0 },
  { id: "p2", name: "api-gateway-5d2", namespace: "production", cpu: 61, memory: 64, network: 48, pvc: 30, status: "Healthy", restarts: 1 },
  { id: "p3", name: "ai-agent-inference-9c", namespace: "ai-platform", cpu: 78, memory: 81, network: 56, pvc: 44, status: "Warning", restarts: 2 },
  { id: "p4", name: "vector-db-pvc-3a", namespace: "ai-platform", cpu: 55, memory: 72, network: 38, pvc: 88, status: "Warning", restarts: 0 },
  { id: "p5", name: "postgres-primary-0", namespace: "data", cpu: 47, memory: 69, network: 31, pvc: 74, status: "Healthy", restarts: 0 },
  { id: "p6", name: "redis-cache-2b", namespace: "data", cpu: 28, memory: 41, network: 19, pvc: 22, status: "Healthy", restarts: 0 },
  { id: "p7", name: "ingress-nginx-4f", namespace: "ingress", cpu: 35, memory: 44, network: 67, pvc: 12, status: "Healthy", restarts: 0 },
  { id: "p8", name: "worker-queue-8e", namespace: "production", cpu: 92, memory: 88, network: 41, pvc: 58, status: "Critical", restarts: 4 },
  { id: "p9", name: "metrics-exporter-1c", namespace: "kube-system", cpu: 18, memory: 26, network: 14, pvc: 8, status: "Healthy", restarts: 0 },
  { id: "p10", name: "auth-service-6d", namespace: "production", cpu: 52, memory: 60, network: 33, pvc: 28, status: "Healthy", restarts: 1 },
];