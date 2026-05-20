import { LiveAreaChart } from "./LiveAreaChart";
import type { MetricPoint } from "@/store/dashboardStore";
export const PvcChart = ({ data }: { data: MetricPoint[] }) => (
  <LiveAreaChart data={data} dataKey="pvc" label="PVC" color="oklch(0.78 0.2 150)" />
);