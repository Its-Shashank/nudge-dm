import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { ConnectedInstagramAccount } from "@/lib/api/instagram";

export interface SettingsInstagramTabProps {
  account: ConnectedInstagramAccount | null;
}

export function SettingsInstagramTab({ account }: SettingsInstagramTabProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-headline-md text-ink">Instagram Connection</h2>
        <span
          className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${
            account ? "bg-success/10 text-success" : "bg-surface-container-low text-on-surface-variant"
          }`}
        >
          {account ? "Connected" : "Not connected"}
        </span>
      </div>

      {account ? (
        <div className="flex flex-col gap-5 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full instagram-gradient text-headline-md text-white">
              {account.username[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-headline-md text-ink">@{account.username}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-success">
                  Connected
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
      ) : (
        <div className="flex flex-col gap-5 rounded-xl border border-dashed border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-md text-on-surface-variant">
            No Instagram account linked yet — connect one to start automating DMs.
          </p>
          <Link href="/dashboard/connections">
            <Button type="button" className="w-full sm:w-auto">
              Connect Instagram
              <Icon name="arrow_forward" className="text-[16px]" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
