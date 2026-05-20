import { AnimatePresence } from "framer-motion";
import { AlertCard } from "@/components/cards/AlertCard";
import { useDashboardStore } from "@/store/dashboardStore";

export function AlertsPanel() {
  const alerts = useDashboardStore((s) => s.alerts);
  return (
    <div className="max-h-[460px] overflow-y-auto scrollbar-thin pr-1 space-y-2.5">
      <AnimatePresence initial={false}>
        {alerts.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </AnimatePresence>
    </div>
  );
}