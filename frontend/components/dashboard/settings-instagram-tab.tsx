import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CONNECTED_INSTAGRAM_ACCOUNT } from "@/lib/constants/dashboard";

export function SettingsInstagramTab() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-headline-md text-ink">Instagram Connection</h2>
        <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-success">
          {CONNECTED_INSTAGRAM_ACCOUNT.status}
        </span>
      </div>

      <div className="flex flex-col gap-5 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full instagram-gradient text-headline-md text-white">
            {CONNECTED_INSTAGRAM_ACCOUNT.handle[1]?.toUpperCase()}
          </div>
          <div>
            <p className="text-headline-md text-ink">{CONNECTED_INSTAGRAM_ACCOUNT.handle}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-success">
                {CONNECTED_INSTAGRAM_ACCOUNT.status}
              </span>
            </div>
          </div>
        </div>

        <Link href="/dashboard/connections">
          <Button type="button" variant="secondary" className="w-full sm:w-auto">
            Manage Connection
            <Icon name="arrow_forward" className="text-[16px]" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
