import type { Metadata } from "next";
import { BillingView } from "@/components/dashboard/billing-view";

export const metadata: Metadata = {
  title: "Billing & Subscription | NudgeDM",
  description: "Manage your workspace's plan, usage, and payment methods.",
};

export default function BillingPage() {
  return (
    <div className="p-6 md:p-12">
      <BillingView />
    </div>
  );
}
