import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { logoutAction } from "@/app/dashboard/actions";

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
        <Link
          href="/dashboard/settings"
          aria-label="Settings"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-ink"
        >
          <Icon name="settings" />
        </Link>

        <details className="group relative ml-2">
          <summary
            aria-label="Account menu"
            className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-surface-container-high text-on-surface-variant [&::-webkit-details-marker]:hidden"
          >
            <Icon name="person" className="text-[18px]" />
          </summary>
          <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-xl">
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-body-md text-ink hover:bg-surface-container-low"
            >
              Settings
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-body-md text-error hover:bg-error/5"
              >
                Log out
              </button>
            </form>
          </div>
        </details>
      </div>
    </header>
  );
}
