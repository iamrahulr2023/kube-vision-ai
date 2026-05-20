export const pct = (n: number) => `${Math.round(n)}%`;
export const fmtBytes = (n: number) => {
  if (n < 1024) return `${n.toFixed(0)} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
};
export const fmtTime = (d: number | Date) => {
  const date = typeof d === "number" ? new Date(d) : d;
  return date.toLocaleTimeString("en-US", { hour12: false });
};
export const relTime = (ts: number) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
};
export const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));