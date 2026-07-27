import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CURRENT_PLAN } from "@/lib/constants/dashboard";

export function SettingsBillingTab() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-xl">
      <h2 className="text-headline-md text-ink mb-6">Subscription Summary</h2>

      <div className="flex flex-col gap-5 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-violet">
            Current Plan
          </p>
          <p className="mt-1 text-headline-lg text-ink">{CURRENT_PLAN.name}</p>
          <p className="mt-1 text-body-md text-on-surface-variant">{CURRENT_PLAN.nextBilling}</p>
        </div>

        <Link href="/dashboard/billing">
          <Button type="button" variant="secondary" className="w-full sm:w-auto">
            Go to Billing Portal
            <Icon name="arrow_forward" className="text-[16px]" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
