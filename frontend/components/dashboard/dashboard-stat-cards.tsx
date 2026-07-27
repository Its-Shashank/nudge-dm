import { Icon } from "@/components/ui/icon";
import {
  CONNECTED_INSTAGRAM_ACCOUNT,
  CURRENT_PLAN,
  DASHBOARD_METRICS,
} from "@/lib/constants/dashboard";

export function DashboardStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Connected Instagram</p>
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
            <Icon name="photo_camera" className="text-[18px] text-on-surface-variant/60" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-label-md font-semibold text-ink">
              {CONNECTED_INSTAGRAM_ACCOUNT.handle}
            </h3>
            <p className="flex items-center gap-1 text-label-sm text-success">
              <Icon name="check_circle" filled className="text-[12px]" />
              {CONNECTED_INSTAGRAM_ACCOUNT.status}
            </p>
          </div>
        </div>
      </div>

      {DASHBOARD_METRICS.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-line bg-white p-5">
          <p className="mb-4 text-label-sm text-on-surface-variant">{metric.label}</p>
          <div className="flex items-end justify-between">
            <h2 className="text-headline-lg text-ink">{metric.value}</h2>
            {metric.delta && <span className="mb-1 text-label-sm text-success">{metric.delta}</span>}
            {metric.meta && (
              <span className="mb-1 rounded bg-surface-container-low px-2 py-0.5 text-label-sm text-on-surface-variant">
                {metric.meta}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-4 text-label-sm text-on-surface-variant">Current Plan</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Icon name="verified" filled className="text-violet" />
            <h3 className="text-label-md font-semibold text-ink">{CURRENT_PLAN.name}</h3>
          </div>
          <p className="text-label-sm text-on-surface-variant">{CURRENT_PLAN.nextBilling}</p>
        </div>
      </div>
    </div>
  );
}
