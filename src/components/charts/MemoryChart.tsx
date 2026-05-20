import { LiveAreaChart } from "./LiveAreaChart";
import type { MetricPoint } from "@/store/dashboardStore";
export const MemoryChart = ({ data }: { data: MetricPoint[] }) => (
  <LiveAreaChart data={data} dataKey="memory" label="Memory" color="oklch(0.68 0.22 305)" />
);