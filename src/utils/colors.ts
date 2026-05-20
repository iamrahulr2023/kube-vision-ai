export const statusColor = (status: "Healthy" | "Warning" | "Critical") => {
  if (status === "Critical") return "text-[color:var(--neon-red)]";
  if (status === "Warning") return "text-[color:var(--neon-yellow)]";
  return "text-[color:var(--neon-green)]";
};
export const statusDot = (status: "Healthy" | "Warning" | "Critical") => {
  if (status === "Critical") return "bg-[color:var(--neon-red)]";
  if (status === "Warning") return "bg-[color:var(--neon-yellow)]";
  return "bg-[color:var(--neon-green)]";
};
export const severityRing = (sev: "critical" | "warning" | "info") => {
  if (sev === "critical") return "border-[color:var(--neon-red)]/60 glow-red";
  if (sev === "warning") return "border-[color:var(--neon-yellow)]/60";
  return "border-[color:var(--neon-blue)]/60 glow-blue";
};