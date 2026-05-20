import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { useDashboardStore } from "@/store/dashboardStore";

export function RecommendationsPanel() {
  const recs = useDashboardStore((s) => s.recommendations);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {recs.map((r) => <RecommendationCard key={r.id} rec={r} />)}
    </div>
  );
}