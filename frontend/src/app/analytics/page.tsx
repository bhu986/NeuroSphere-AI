import Analytics from "@/pages/Analytics";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  );
}
