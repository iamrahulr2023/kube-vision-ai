import type { Node, Edge } from "reactflow";

export const dependencyNodes: Node[] = [
  { id: "frontend", position: { x: 0, y: 0 }, data: { label: "Frontend", role: "UI", status: "Healthy" }, type: "kube" },
  { id: "gateway", position: { x: 240, y: 0 }, data: { label: "API Gateway", role: "Ingress", status: "Healthy" }, type: "kube" },
  { id: "ai", position: { x: 480, y: -90 }, data: { label: "AI Agent", role: "Inference", status: "Warning" }, type: "kube" },
  { id: "auth", position: { x: 480, y: 90 }, data: { label: "Auth Service", role: "Service", status: "Healthy" }, type: "kube" },
  { id: "db", position: { x: 720, y: 0 }, data: { label: "Postgres", role: "DB", status: "Warning" }, type: "kube" },
  { id: "pvc", position: { x: 960, y: 0 }, data: { label: "Database PVC", role: "Storage", status: "Critical" }, type: "kube" },
];

const edge = (id: string, source: string, target: string): Edge => ({
  id, source, target, animated: true,
  style: { stroke: "oklch(0.72 0.18 250)", strokeWidth: 1.5 },
});

export const dependencyEdges: Edge[] = [
  edge("e1", "frontend", "gateway"),
  edge("e2", "gateway", "ai"),
  edge("e3", "gateway", "auth"),
  edge("e4", "ai", "db"),
  edge("e5", "auth", "db"),
  edge("e6", "db", "pvc"),
];