import { Icon } from "@/components/ui/icon";
import { ConnectedAccountCard } from "./connected-account-card";
import type { ConnectedInstagramAccount } from "@/lib/api/instagram";

const GRANTED_PERMISSIONS = [
  { icon: "comment", label: "Read comments & story replies" },
  { icon: "send", label: "Send automated direct messages" },
  { icon: "person", label: "Access basic profile info" },
] as const;

function PermissionsCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
        Granted Permissions
      </p>
      <div className="mt-4 space-y-3">
        {GRANTED_PERMISSIONS.map((permission) => (
          <div key={permission.label} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet/10">
              <Icon name={permission.icon} className="text-[16px] text-violet" />
            </span>
            <p className="text-body-md text-on-surface-variant">{permission.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SyncStatusCard({ connectedAt }: { connectedAt: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
        Sync Status
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-success" />
        <p className="text-body-md text-ink">Connected since</p>
        <span className="text-[12px] text-on-surface-variant">
          {new Date(connectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-on-surface-variant/70">
        <Icon name="verified_user" className="text-[16px]" />
        <span className="text-label-sm">Enterprise-grade encryption</span>
      </div>
    </div>
  );
}

export interface ConnectionsViewProps {
  account: ConnectedInstagramAccount;
}

export function ConnectionsView({ account }: ConnectionsViewProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Instagram Connections</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Manage the Instagram account linked to your automations.
        </p>
      </div>

      <div className="space-y-6">
        <ConnectedAccountCard account={account} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PermissionsCard />
          <SyncStatusCard connectedAt={account.connectedAt} />
        </div>
      </div>
    </div>
  );
}
