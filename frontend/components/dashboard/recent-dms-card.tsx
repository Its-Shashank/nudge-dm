import Link from "next/link";
import type { DashboardActivityEntry } from "@/lib/api/dashboard";
import { formatRelativeTime } from "@/lib/format";

export interface RecentDmsCardProps {
  activity: DashboardActivityEntry[];
}

const STATUS_STYLES: Record<string, string> = {
  SENT: "bg-success/10 text-success",
  FAILED: "bg-error/10 text-error",
};

const STATUS_LABELS: Record<string, string> = {
  SENT: "Sent",
  FAILED: "Failed",
};

export function RecentDmsCard({ activity }: RecentDmsCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-surface-container-low/50 px-6 py-4">
        <h3 className="text-label-md font-semibold text-ink">Recent DMs</h3>
        <Link href="/dashboard/messages" className="text-label-sm font-semibold text-violet hover:underline">
          View All
        </Link>
      </div>
      {activity.length === 0 ? (
        <p className="px-6 py-10 text-center text-body-md text-on-surface-variant">
          No DMs sent yet — they&apos;ll show up here once an automation triggers.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {activity.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 text-label-md font-semibold text-violet">
                  {entry.instagramUserId.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-label-md font-semibold text-ink">@{entry.instagramUserId}</p>
                  <p className="truncate text-body-md text-on-surface-variant">{entry.comment}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-label-sm text-on-surface-variant">
                  {formatRelativeTime(entry.createdAt)}
                </p>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-label-sm ${STATUS_STYLES[entry.status] ?? "bg-surface-container-low text-on-surface-variant"}`}
                >
                  {STATUS_LABELS[entry.status] ?? entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
