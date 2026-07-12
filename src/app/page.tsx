import { Dashboard } from "@/components/dashboard/Dashboard";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/dashboard-service";

export const dynamic = "force-dynamic";

export default function Home() {
  const user = getCurrentUser();
  return <Dashboard data={getDashboardSnapshot()} userName={user.name} />;
}
