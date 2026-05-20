import { useMemo } from "react";
import ReactFlow, { Background, Controls, Handle, Position, type NodeProps } from "reactflow";
import "reactflow/dist/style.css";
import { dependencyNodes, dependencyEdges } from "@/mock/dependencyData";
import { useDashboardStore } from "@/store/dashboardStore";
import { cn } from "@/lib/utils";

function KubeNode({ data, selected }: NodeProps) {
  const status = data.status as "Healthy" | "Warning" | "Critical";
  const dot =
    status === "Critical" ? "bg-[color:var(--neon-red)]"
    : status === "Warning" ? "bg-[color:var(--neon-yellow)]"
    : "bg-[color:var(--neon-green)]";
  const glow =
    status === "Critical" ? "glow-red"
    : status === "Warning" ? "" : "glow-blue";
  return (
    <div className={cn("min-w-[150px] rounded-lg glass px-3 py-2.5 border", glow, selected && "ring-2 ring-[color:var(--neon-cyan)]")}>
      <Handle type="target" position={Position.Left} className="!bg-[color:var(--neon-blue)] !w-2 !h-2 !border-0" />
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{data.role}</div>
        <span className={cn("h-2 w-2 rounded-full animate-pulse-glow", dot)} />
      </div>
      <div className="text-sm font-medium mt-0.5">{data.label}</div>
      <Handle type="source" position={Position.Right} className="!bg-[color:var(--neon-purple)] !w-2 !h-2 !border-0" />
    </div>
  );
}

const nodeTypes = { kube: KubeNode };

export function DependencyGraph() {
  const setSelected = useDashboardStore((s) => s.setSelectedNode);
  const nodes = useMemo(() => dependencyNodes, []);
  const edges = useMemo(() => dependencyEdges, []);
  return (
    <div className="h-[420px] rounded-xl overflow-hidden border border-[color:var(--glass-border)] bg-[oklch(0.14_0.02_265)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        onNodeClick={(_, n) => setSelected(n.id)}
      >
        <Background gap={20} size={1} color="oklch(0.4 0.06 265 / 0.4)" />
        <Controls className="!bg-[oklch(0.2_0.03_265)] !border-[color:var(--glass-border)]" />
      </ReactFlow>
    </div>
  );
}