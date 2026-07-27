import { Icon } from "@/components/ui/icon";
import type { DashboardStats } from "@/lib/api/dashboard";

export interface DashboardStatCardsProps {
  stats: DashboardStats;
}

export function DashboardStatCards({ stats }: DashboardStatCardsProps) {
  const { connectedAccount, messagesSent, activeAutomations, currentPlan } = stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Connected Instagram</p>
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
            <Icon name="photo_camera" className="text-[18px] text-on-surface-variant/60" />
            {connectedAccount && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
            )}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-label-md font-semibold text-ink">
              {connectedAccount ? `@${connectedAccount.username}` : "Not connected"}
            </h3>
            {connectedAccount && (
              <p className="flex items-center gap-1 text-label-sm text-success">
                <Icon name="check_circle" filled className="text-[12px]" />
                Connected
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Messages Sent</p>
        <h2 className="text-headline-lg text-ink">{messagesSent.toLocaleString()}</h2>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Active Automations</p>
        <h2 className="text-headline-lg text-ink">{String(activeAutomations).padStart(2, "0")}</h2>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Current Plan</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Icon name="verified" filled className="text-violet" />
            <h3 className="text-label-md font-semibold capitalize text-ink">
              {currentPlan.plan.toLowerCase()}
            </h3>
          </div>
          <p className="text-label-sm capitalize text-on-surface-variant">
            Status: {currentPlan.status}
          </p>
        </div>
      </div>
    </div>
  );
}
