import { LiveAreaChart } from "./LiveAreaChart";
import type { MetricPoint } from "@/store/dashboardStore";
export const NetworkChart = ({ data }: { data: MetricPoint[] }) => (
  <LiveAreaChart data={data} dataKey="network" label="Network" color="oklch(0.82 0.16 200)" />
);