import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CONNECTED_INSTAGRAM_ACCOUNT } from "@/lib/constants/dashboard";

export function ConnectedAccountCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
        Connected Account
      </p>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0">
            <div className="flex h-full w-full items-center justify-center rounded-full instagram-gradient text-headline-md text-white">
              {CONNECTED_INSTAGRAM_ACCOUNT.handle[1]?.toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-success" />
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

        <div className="flex shrink-0 items-center gap-3">
          <Button type="button" variant="secondary" size="sm">
            <Icon name="refresh" className="text-[16px]" />
            Reconnect
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-error hover:text-error/80"
          >
            <Icon name="link_off" className="text-[16px]" />
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
