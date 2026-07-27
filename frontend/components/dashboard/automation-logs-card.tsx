import { Icon } from "@/components/ui/icon";
import { AUTOMATION_LOG_ENTRIES } from "@/lib/constants/dashboard";

export function AutomationLogsCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-surface-container-low/50 px-6 py-4">
        <h3 className="text-label-md font-semibold text-ink">Automation Logs</h3>
        <button type="button" className="text-label-sm font-semibold text-violet hover:underline">
          View Details
        </button>
      </div>
      <div className="divide-y divide-line">
        {AUTOMATION_LOG_ENTRIES.map((entry) => (
          <div key={entry.title} className="flex items-center justify-between gap-4 px-6 py-4">
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
  );
}
