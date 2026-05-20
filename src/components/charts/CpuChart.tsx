import { LiveAreaChart } from "./LiveAreaChart";
import type { MetricPoint } from "@/store/dashboardStore";
export const CpuChart = ({ data }: { data: MetricPoint[] }) => (
  <LiveAreaChart data={data} dataKey="cpu" label="CPU" color="oklch(0.72 0.18 250)" />
);