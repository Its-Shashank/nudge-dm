import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BillingHistoryTable } from "./billing-history-table";
import { BillingPaymentMethodCard } from "./billing-payment-method-card";
import { BillingUsageCard } from "./billing-usage-card";
import { PLAN_CATALOG } from "@/lib/constants/billing";
import { upgradePlanAction } from "@/app/dashboard/billing/actions";
import type { SubscriptionDetails } from "@/lib/api/billing";

export interface BillingViewProps {
  subscription: SubscriptionDetails;
}

export function BillingView({ subscription }: BillingViewProps) {
  const plan = PLAN_CATALOG[subscription.plan] ?? PLAN_CATALOG.FREE;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg text-ink">Billing &amp; Subscription</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Manage your workspace&apos;s plan, usage, and payment methods.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-xl lg:col-span-7">
          <Icon
            name="verified"
            filled
            className="pointer-events-none absolute -right-6 -top-6 text-[160px] text-violet/5"
          />
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="instagram-gradient rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                {plan.badge}
              </span>
              <span className="text-body-md capitalize text-on-surface-variant">
                Status: {subscription.status}
              </span>
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-headline-lg text-ink">${plan.price}</span>
              <span className="text-body-md text-on-surface-variant">/month</span>
            </div>
            <p className="mb-8 max-w-md text-body-md text-on-surface-variant">{plan.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {plan.upgradeTo ? (
              <form action={upgradePlanAction.bind(null, plan.upgradeTo)}>
                <Button type="submit" size="md">
                  Upgrade Plan
                </Button>
              </form>
            ) : (
              <span className="text-label-md font-semibold text-violet">You&apos;re on our top plan</span>
            )}
            <Button variant="secondary" size="md">
              Change Billing Cycle
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <BillingUsageCard usage={subscription.usage} limit={subscription.limit} />
        </div>

        <div className="lg:col-span-12">
          <BillingPaymentMethodCard />
        </div>

        <div className="lg:col-span-12">
          <BillingHistoryTable />
        </div>
      </div>
    </div>
  );
}
