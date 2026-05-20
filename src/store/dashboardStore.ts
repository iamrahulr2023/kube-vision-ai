import { create } from "zustand";
import { initialPods, type Pod } from "@/mock/podData";
import { initialAlerts, type Alert } from "@/mock/alertsData";
import { initialLogs, type LogEntry } from "@/mock/logsData";
import { initialRecommendations, type Recommendation } from "@/mock/recommendationsData";
import { initialCorrelations, type CorrelationChain } from "@/services/correlationEngine";
import { MAX_HISTORY } from "@/utils/constants";

export interface MetricPoint { t: number; cpu: number; memory: number; network: number; pvc: number; }

interface DashboardState {
  pods: Pod[];
  alerts: Alert[];
  logs: LogEntry[];
  recommendations: Recommendation[];
  correlations: CorrelationChain[];
  history: MetricPoint[];
  selectedNode: string | null;
  setPods: (p: Pod[]) => void;
  pushAlerts: (a: Alert[]) => void;
  pushLog: (l: LogEntry) => void;
  pushCorrelation: (c: CorrelationChain) => void;
  pushMetric: (m: MetricPoint) => void;
  setSelectedNode: (id: string | null) => void;
}

const seedHistory = (): MetricPoint[] => {
  const out: MetricPoint[] = [];
  const now = Date.now();
  for (let i = MAX_HISTORY - 1; i >= 0; i--) {
    out.push({
      t: now - i * 2000,
      cpu: 45 + Math.random() * 18,
      memory: 55 + Math.random() * 14,
      network: 30 + Math.random() * 24,
      pvc: 40 + Math.random() * 12,
    });
  }
  return out;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  pods: initialPods,
  alerts: initialAlerts,
  logs: initialLogs,
  recommendations: initialRecommendations,
  correlations: initialCorrelations(),
  history: seedHistory(),
  selectedNode: null,
  setPods: (pods) => set({ pods }),
  pushAlerts: (a) => set((s) => ({ alerts: [...a, ...s.alerts].slice(0, 24) })),
  pushLog: (l) => set((s) => ({ logs: [...s.logs, l].slice(-80) })),
  pushCorrelation: (c) => set((s) => ({ correlations: [c, ...s.correlations].slice(0, 6) })),
  pushMetric: (m) => set((s) => ({ history: [...s.history, m].slice(-MAX_HISTORY) })),
  setSelectedNode: (id) => set({ selectedNode: id }),
}));