import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { tickAll } from "@/services/metricsSimulator";
import { detectAnomalies } from "@/services/anomalyEngine";
import { maybeGenerateCorrelation } from "@/services/correlationEngine";
import { generateLog } from "@/services/websocketSimulator";
import { TICK_MS } from "@/utils/constants";

export function useSimulation() {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const id = setInterval(() => {
      const s = useDashboardStore.getState();
      const next = tickAll(s.pods);
      s.setPods(next);
      const avg = (k: "cpu" | "memory" | "network" | "pvc") =>
        next.reduce((acc, p) => acc + p[k], 0) / next.length;
      s.pushMetric({ t: Date.now(), cpu: avg("cpu"), memory: avg("memory"), network: avg("network"), pvc: avg("pvc") });
      const newAlerts = detectAnomalies(next);
      if (newAlerts.length) s.pushAlerts(newAlerts);
      const cor = maybeGenerateCorrelation();
      if (cor) s.pushCorrelation(cor);
      s.pushLog(generateLog(next));
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);
}