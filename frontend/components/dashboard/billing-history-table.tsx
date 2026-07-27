import { Icon } from "@/components/ui/icon";
import { BILLING_HISTORY, type BillingStatus } from "@/lib/constants/billing";

const COLUMNS = ["Date", "Description", "Amount", "Status", "Invoice"];

const STATUS_STYLES: Record<BillingStatus, string> = {
  paid: "bg-success/10 text-success",
  failed: "bg-error/10 text-error",
};

const STATUS_LABELS: Record<BillingStatus, string> = {
  paid: "Paid",
  failed: "Failed",
};

export function BillingHistoryTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
      <div className="border-b border-line px-6 py-4">
        <h3 className="text-headline-md text-ink">Billing History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-surface-container-low">
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant last:text-right"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {BILLING_HISTORY.map((entry) => (
              <tr key={entry.id} className="transition-colors hover:bg-surface-container-low/50">
                <td className="px-6 py-4 text-body-md text-ink">{entry.date}</td>
                <td className="px-6 py-4 text-body-md text-on-surface-variant">{entry.description}</td>
                <td className="px-6 py-4 text-label-md font-semibold text-ink">{entry.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm ${STATUS_STYLES[entry.status]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {STATUS_LABELS[entry.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Download invoice from ${entry.date}`}
                    className="ml-auto inline-flex items-center gap-1 text-label-md font-semibold text-violet hover:underline"
                  >
                    <Icon name="download" className="text-[18px]" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
