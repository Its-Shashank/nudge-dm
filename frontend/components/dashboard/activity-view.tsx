import { Icon } from "@/components/ui/icon";
import { ACTIVITY_LOG_ENTRIES, ACTIVITY_SUMMARY_STATS } from "@/lib/constants/activity";

export function ActivityView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Activity</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          A running log of every automation trigger and message across your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITY_SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
                <Icon name={stat.icon} className="text-[18px]" />
              </span>
              <p className="text-label-sm text-on-surface-variant">{stat.label}</p>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="text-headline-lg text-ink">{stat.value}</h2>
              {stat.delta && <span className="mb-1 text-label-sm text-success">{stat.delta}</span>}
              {stat.meta && (
                <span className="mb-1 rounded bg-surface-container-low px-2 py-0.5 text-label-sm text-on-surface-variant">
                  {stat.meta}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line bg-surface-container-low/50 px-6 py-4">
          <h3 className="text-label-md font-semibold text-ink">Activity Log</h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
            Last 30 days
          </span>
        </div>
        <div className="divide-y divide-line">
          {ACTIVITY_LOG_ENTRIES.map((entry, index) => (
            <div
              key={`${entry.title}-${index}`}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
                  <Icon name={entry.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-label-md font-semibold text-ink">{entry.title}</p>
                  <p className="text-label-sm text-on-surface-variant">{entry.subtitle}</p>
                </div>
              </div>
              <p className="shrink-0 text-label-sm text-on-surface-variant">{entry.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
