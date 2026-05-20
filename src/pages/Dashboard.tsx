import { motion } from "framer-motion";
import { Activity, AlertTriangle, Cpu, HardDrive, Heart, MemoryStick, Network } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/cards/StatsCard";
import { CpuChart } from "@/components/charts/CpuChart";
import { MemoryChart } from "@/components/charts/MemoryChart";
import { NetworkChart } from "@/components/charts/NetworkChart";
import { PvcChart } from "@/components/charts/PvcChart";
import { PodTable } from "@/components/monitoring/PodTable";
import { AlertsPanel } from "@/components/monitoring/AlertsPanel";
import { LogsPanel } from "@/components/monitoring/LogsPanel";
import { RecommendationsPanel } from "@/components/monitoring/RecommendationsPanel";
import { CorrelationPanel } from "@/components/monitoring/CorrelationPanel";
import { HealthStatus } from "@/components/monitoring/HealthStatus";
import { DependencyGraph } from "@/components/dependency/DependencyGraph";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSimulation } from "@/hooks/useSimulation";

function Section({ title, subtitle, right, children, delay = 0 }: { title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl glass p-5"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </motion.section>
  );
}

export function Dashboard() {
  useSimulation();
  const pods = useDashboardStore((s) => s.pods);
  const history = useDashboardStore((s) => s.history);
  const alerts = useDashboardStore((s) => s.alerts);

  const avg = (k: "cpu" | "memory" | "pvc") => pods.reduce((a, p) => a + p[k], 0) / pods.length;
  const healthy = pods.filter((p) => p.status === "Healthy").length;
  const warn = pods.filter((p) => p.status === "Warning").length;
  const crit = pods.filter((p) => p.status === "Critical").length;
  const clusterHealth = Math.max(0, 100 - warn * 4 - crit * 12);
  const activeAlerts = alerts.filter((a) => a.severity !== "info").length;

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="text-gradient">KubeMind AI</span> — Cluster Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Live monitoring · anomaly detection · dependency correlation</p>
        </div>
        <HealthStatus healthy={healthy} warn={warn} crit={crit} />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatsCard label="Total Pods" value={pods.length} icon={Activity} tone="cyan" delta="across 6 namespaces" />
        <StatsCard label="Active Alerts" value={activeAlerts} icon={AlertTriangle} tone="red" delta={`${alerts.length} total`} />
        <StatsCard label="Cluster Health" value={clusterHealth} suffix="%" icon={Heart} tone="green" delta="SLA 99.95%" />
        <StatsCard label="CPU Usage" value={avg("cpu")} suffix="%" decimals={1} icon={Cpu} tone="blue" delta="avg / pod" />
        <StatsCard label="Memory Usage" value={avg("memory")} suffix="%" decimals={1} icon={MemoryStick} tone="purple" delta="avg / pod" />
        <StatsCard label="PVC Health" value={avg("pvc")} suffix="%" decimals={1} icon={HardDrive} tone="yellow" delta="storage saturation" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section title="CPU Utilization" subtitle="cluster-wide average · 2s tick" delay={0.05}>
          <CpuChart data={history} />
        </Section>
        <Section title="Memory Pressure" subtitle="rolling 60s window" delay={0.08}>
          <MemoryChart data={history} />
        </Section>
        <Section title="Network Traffic" subtitle="ingress + egress %" delay={0.1}>
          <NetworkChart data={history} />
        </Section>
        <Section title="PVC Saturation" subtitle="storage volume usage" delay={0.12}>
          <PvcChart data={history} />
        </Section>
      </div>

      <Section title="Pod Monitoring" subtitle="real-time pod metrics · click headers to sort" right={<div className="flex items-center gap-2 text-xs"><Network className="h-3.5 w-3.5 text-[color:var(--neon-cyan)]" /><span className="text-muted-foreground">{pods.length} pods · live</span></div>}>
        <PodTable pods={pods} />
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Section title="AI Anomaly Alerts" subtitle="model v3.2 · ensemble" delay={0.05}>
          <AlertsPanel />
        </Section>
        <Section title="AI Correlation Insights" subtitle="event chain reasoning" delay={0.08}>
          <CorrelationPanel />
        </Section>
        <Section title="Live Logs" subtitle="cluster agent stream" delay={0.1}>
          <LogsPanel />
        </Section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Section title="Service Dependency Graph" subtitle="topology · click nodes to inspect" delay={0.05}>
          <div className="xl:col-span-2"><DependencyGraph /></div>
        </Section>
        <Section title="AI Recommendations" subtitle="ranked by confidence" delay={0.08}>
          <RecommendationsPanel />
        </Section>
      </div>
    </DashboardLayout>
  );
}