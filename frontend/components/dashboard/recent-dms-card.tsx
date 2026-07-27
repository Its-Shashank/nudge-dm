import { RECENT_DMS } from "@/lib/constants/dashboard";

const STATUS_STYLES: Record<string, string> = {
  success: "bg-success/10 text-success",
  info: "bg-violet/10 text-violet",
  warning: "bg-warning/10 text-warning",
};

export function RecentDmsCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-surface-container-low/50 px-6 py-4">
        <h3 className="text-label-md font-semibold text-ink">Recent DMs</h3>
        <button type="button" className="text-label-sm font-semibold text-violet hover:underline">
          View All
        </button>
      </div>
      <div className="divide-y divide-line">
        {RECENT_DMS.map((dm) => (
          <div key={dm.handle} className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 text-label-md font-semibold text-violet">
                {dm.handle[1]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-label-md font-semibold text-ink">{dm.handle}</p>
                <p className="truncate text-body-md text-on-surface-variant">{dm.message}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-label-sm text-on-surface-variant">{dm.time}</p>
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-label-sm ${STATUS_STYLES[dm.statusTone]}`}
              >
                {dm.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
