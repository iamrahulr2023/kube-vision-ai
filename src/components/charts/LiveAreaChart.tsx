import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import type { MetricPoint } from "@/store/dashboardStore";
import { fmtTime } from "@/utils/formatters";

interface Props {
  data: MetricPoint[];
  dataKey: keyof Omit<MetricPoint, "t">;
  color: string;
  label: string;
}

export function LiveAreaChart({ data, dataKey, color, label }: Props) {
  const id = `grad-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.55} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="oklch(0.4 0.05 265 / 0.18)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="t"
          tickFormatter={(t) => fmtTime(t).slice(0, 5)}
          stroke="oklch(0.6 0.04 260 / 0.6)"
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="oklch(0.6 0.04 260 / 0.6)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            background: "oklch(0.19 0.03 265)",
            border: "1px solid oklch(0.5 0.1 265 / 0.4)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelFormatter={(t) => fmtTime(t as number)}
          formatter={(v: number) => [`${v.toFixed(1)}%`, label]}
        />
        <Area
          type="monotone"
          dataKey={dataKey as string}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${id})`}
          isAnimationActive
          animationDuration={600}
          dot={false}
          activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: "oklch(0.18 0.03 265)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}