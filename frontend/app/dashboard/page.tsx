import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { InstagramConnectEmptyState } from "@/components/dashboard/instagram-connect-empty-state";

export const metadata: Metadata = {
  title: "Dashboard | NudgeDM",
  description: "Your Instagram automation activity at a glance.",
};

// Mocked pending real account/session state.
const isInstagramConnected = true;

export default function DashboardPage() {
  if (!isInstagramConnected) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <InstagramConnectEmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <DashboardOverview />
    </div>
  );
}
