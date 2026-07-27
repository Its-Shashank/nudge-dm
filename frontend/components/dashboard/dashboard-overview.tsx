import type { DashboardStats } from "@/lib/api/dashboard";
import { AutomationLogsCard } from "./automation-logs-card";
import { DashboardStatCards } from "./dashboard-stat-cards";
import { PlatformStatusCard } from "./platform-status-card";
import { QuickActionsCard } from "./quick-actions-card";
import { RecentDmsCard } from "./recent-dms-card";

export interface DashboardOverviewProps {
  stats: DashboardStats;
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Dashboard</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Your Instagram automation activity at a glance.
        </p>
      </div>

      <DashboardStatCards stats={stats} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <RecentDmsCard activity={stats.recentActivity} />
          <AutomationLogsCard activity={stats.recentActivity} />
        </div>
        <div className="space-y-6 lg:col-span-4">
          <QuickActionsCard />
          <PlatformStatusCard />
        </div>
      </div>
    </div>
  );
}
