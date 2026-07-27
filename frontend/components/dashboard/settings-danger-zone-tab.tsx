"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { disconnectInstagramAction } from "@/app/dashboard/connections/actions";

type DangerAction = "disconnect" | "delete";

export interface SettingsDangerZoneTabProps {
  isConnected: boolean;
}

export function SettingsDangerZoneTab({ isConnected }: SettingsDangerZoneTabProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState<DangerAction | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  async function handleDisconnect() {
    setIsDisconnecting(true);
    await disconnectInstagramAction();
    setIsDisconnecting(false);
    setConfirming(null);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-error/20 bg-error-container/10 p-6 shadow-xl">
      <div className="mb-6 flex items-center gap-2 text-error">
        <Icon name="warning" className="text-[20px]" />
        <h2 className="text-headline-md">Danger Zone</h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 border-b border-error/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-body-lg font-semibold text-ink">Disconnect Instagram</p>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Immediately stops all active DM automations. You can reconnect at any time.
            </p>
          </div>

          {confirming === "disconnect" ? (
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-body-md font-medium text-error">Are you sure?</span>
              <Button
                type="button"
                size="sm"
                className="border-error bg-error text-on-error hover:bg-error/90"
                variant="secondary"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? "Disconnecting…" : "Yes, Disconnect"}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setConfirming(null)} disabled={isDisconnecting}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0 text-error hover:text-error/80 disabled:text-on-surface-variant"
              onClick={() => setConfirming("disconnect")}
              disabled={!isConnected}
            >
              <Icon name="link_off" className="text-[16px]" />
              {isConnected ? "Disconnect" : "Not connected"}
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-body-lg font-semibold text-ink">Delete Account</p>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Once you delete your account, there is no going back. This clears all your
              automations, messages, and history.
            </p>
          </div>

          {confirming === "delete" ? (
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-body-md font-medium text-error">Are you sure?</span>
              <Button type="button" size="sm" variant="secondary" className="border-error bg-error text-on-error hover:bg-error/90" onClick={() => setConfirming(null)}>
                Yes, Delete
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setConfirming(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="shrink-0 border-error/30 bg-error text-on-error hover:bg-error/90"
              onClick={() => setConfirming("delete")}
            >
              <Icon name="delete" className="text-[16px]" />
              Delete Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
