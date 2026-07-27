import { cn } from "@/lib/cn";
import { PLATFORM_STATUS_ITEMS } from "@/lib/constants/dashboard";

export function PlatformStatusCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="mb-4 text-label-md font-semibold text-ink">Platform Status</h3>
      <div className="space-y-3">
        {PLATFORM_STATUS_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full bg-success", item.pulse && "animate-pulse")} />
              <span className="text-label-sm text-on-surface-variant">{item.label}</span>
            </div>
            <span className="text-label-sm font-semibold text-success">{item.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-surface-container-low p-4">
        <p className="mb-1 text-label-sm font-semibold text-ink">Weekly Digest</p>
        <p className="text-label-sm leading-relaxed text-on-surface-variant">
          Your automation efficiency improved by 8% this week. Keep it up!
        </p>
      </div>
    </div>
  );
}
