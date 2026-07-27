import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="mb-4 text-label-md font-semibold text-ink">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        <Link href="/dashboard/automations/new">
          <Button type="button" className="w-full">
            <Icon name="add_circle" />
            Create Automation
          </Button>
        </Link>
        <Link href="/dashboard/connections">
          <Button type="button" variant="secondary" className="w-full">
            <Icon name="link" />
            Connect Instagram
          </Button>
        </Link>
        <Link href="/dashboard/billing">
          <Button type="button" variant="secondary" className="w-full">
            <Icon name="upgrade" />
            Upgrade Plan
          </Button>
        </Link>
      </div>
    </div>
  );
}
