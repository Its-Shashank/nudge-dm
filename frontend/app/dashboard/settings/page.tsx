import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SettingsView } from "@/components/dashboard/settings-view";
import { getConnectedAccount } from "@/lib/api/instagram";
import { getSubscription } from "@/lib/api/billing";
import { ApiError } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Settings | NudgeDM",
  description: "Manage your account preferences and integrations.",
};

export default async function SettingsPage() {
  let account, subscription;
  try {
    [account, subscription] = await Promise.all([getConnectedAccount(), getSubscription()]);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    throw err;
  }

  return (
    <div className="p-6 md:p-12">
      <SettingsView account={account} subscription={subscription} />
    </div>
  );
}
