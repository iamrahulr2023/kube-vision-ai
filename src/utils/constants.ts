export const NAMESPACES = ["production", "staging", "ai-platform", "ingress", "data", "kube-system"] as const;
export const STATUS_COLORS = {
  Healthy: "var(--neon-green)",
  Warning: "var(--neon-yellow)",
  Critical: "var(--neon-red)",
} as const;
export const MAX_HISTORY = 30;
export const TICK_MS = 2000;