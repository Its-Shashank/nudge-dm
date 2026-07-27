import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { InstagramConnectEmptyState } from "@/components/dashboard/instagram-connect-empty-state";
import { getDashboardStats } from "@/lib/api/dashboard";
import { ApiError } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Dashboard | NudgeDM",
  description: "Your Instagram automation activity at a glance.",
};

export default async function DashboardPage() {
  let stats;
  try {
    stats = await getDashboardStats();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    throw err;
  }

  if (!stats.connectedAccount) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <InstagramConnectEmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <DashboardOverview stats={stats} />
    </div>
  );
}
