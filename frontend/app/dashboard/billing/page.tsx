import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BillingView } from "@/components/dashboard/billing-view";
import { getSubscription } from "@/lib/api/billing";
import { ApiError } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Billing & Subscription | NudgeDM",
  description: "Manage your workspace's plan, usage, and payment methods.",
};

export default async function BillingPage() {
  let subscription;
  try {
    subscription = await getSubscription();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    throw err;
  }

  return (
    <div className="p-6 md:p-12">
      <BillingView subscription={subscription} />
    </div>
  );
}
