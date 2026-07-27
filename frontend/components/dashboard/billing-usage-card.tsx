import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export interface BillingUsageCardProps {
  usage: number;
  limit: number;
}

export function BillingUsageCard({ usage, limit }: BillingUsageCardProps) {
  const percent = Math.min(100, Math.round((usage / limit) * 100));

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-xl">
      <div>
        <div className="mb-6 flex items-start justify-between">
          <h3 className="text-headline-md text-ink">Usage Tracking</h3>
          <Icon name="monitoring" className="text-on-surface-variant" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-body-md text-on-surface-variant">Messages Sent</span>
            <span className="text-label-md font-semibold text-ink">
              {usage.toLocaleString()} / {limit.toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
            <div className="h-full rounded-full bg-violet" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
            This calendar month
          </p>
        </div>
      </div>

      <Button variant="secondary" size="md" className="mt-8 w-full">
        <Icon name="upgrade" className="text-[18px]" />
        Upgrade Capacity
      </Button>
    </div>
  );
}
