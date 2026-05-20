import type { LogEntry } from "@/mock/logsData";
import { logTemplates } from "@/mock/logsData";
import type { Pod } from "@/mock/podData";

export function generateLog(pods: Pod[]): LogEntry {
  const t = logTemplates[Math.floor(Math.random() * logTemplates.length)];
  const pod = pods[Math.floor(Math.random() * pods.length)];
  const message = t.message
    .replace("{pod}", pod.name)
    .replace("{score}", (0.5 + Math.random() * 0.5).toFixed(2));
  return { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ts: Date.now(), level: t.level, message };
}