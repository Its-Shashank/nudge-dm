import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PAYMENT_METHOD } from "@/lib/constants/billing";

export function BillingPaymentMethodCard() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-6 shadow-xl md:flex-row md:items-center">
      <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-container-low">
            <Icon name="credit_card" className="text-on-surface-variant" />
          </span>
          <div>
            <p className="text-label-md font-semibold text-ink">
              {PAYMENT_METHOD.brand} ending in {PAYMENT_METHOD.last4}
            </p>
            <p className="text-label-sm text-on-surface-variant">Expires {PAYMENT_METHOD.expiry}</p>
          </div>
        </div>

        <div className="hidden h-8 w-px bg-line sm:block" />

        <div>
          <p className="text-label-md font-semibold text-ink">
            {PAYMENT_METHOD.isPrimary ? "Primary Method" : "Backup Method"}
          </p>
          <p className="text-label-sm text-on-surface-variant">
            {PAYMENT_METHOD.autoRenew ? "Auto-renew is active" : "Auto-renew is off"}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3 md:w-auto">
        <Button variant="secondary" size="md" className="flex-1 md:flex-none">
          Update
        </Button>
        <Button variant="ghost" size="md" className="hover:text-error">
          Remove
        </Button>
      </div>
    </div>
  );
}
