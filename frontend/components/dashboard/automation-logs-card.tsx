import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { DashboardActivityEntry } from "@/lib/api/dashboard";
import { formatRelativeTime } from "@/lib/format";

export interface AutomationLogsCardProps {
  activity: DashboardActivityEntry[];
}

export function AutomationLogsCard({ activity }: AutomationLogsCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-surface-container-low/50 px-6 py-4">
        <h3 className="text-label-md font-semibold text-ink">Automation Logs</h3>
        <Link href="/dashboard/activity" className="text-label-sm font-semibold text-violet hover:underline">
          View Details
        </Link>
      </div>
      {activity.length === 0 ? (
        <p className="px-6 py-10 text-center text-body-md text-on-surface-variant">
          No automation activity yet.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {activity.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
                  <Icon name={entry.status === "FAILED" ? "error_outline" : "mark_email_read"} />
                </span>
                <div className="min-w-0">
                  <p className="text-label-md font-semibold text-ink">{entry.automation.name}</p>
                  <p className="truncate text-label-sm text-on-surface-variant">
                    {entry.status === "FAILED"
                      ? (entry.error ?? "Failed to send")
                      : `Executed for @${entry.instagramUserId}`}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-label-sm text-on-surface-variant">
                {formatRelativeTime(entry.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
