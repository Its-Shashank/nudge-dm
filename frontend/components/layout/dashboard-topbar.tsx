import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function DashboardTopbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-white px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full instagram-gradient">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
          NudgeDM
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-ink"
        >
          <Icon name="notifications" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-ink"
        >
          <Icon name="settings" />
        </button>
        <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface-container-high text-on-surface-variant">
          <Icon name="person" className="text-[18px]" />
        </span>
      </div>
    </header>
  );
}
