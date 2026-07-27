import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ConnectionsView } from "@/components/dashboard/connections-view";
import { InstagramConnectEmptyState } from "@/components/dashboard/instagram-connect-empty-state";
import { getConnectedAccount } from "@/lib/api/instagram";
import { ApiError } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Connections | NudgeDM",
  description: "Manage the Instagram account linked to your automations.",
};

export default async function ConnectionsPage() {
  let account;
  try {
    account = await getConnectedAccount();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    throw err;
  }

  if (!account) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <InstagramConnectEmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <ConnectionsView account={account} />
    </div>
  );
}
