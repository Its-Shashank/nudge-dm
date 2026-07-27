import type { Metadata } from "next";
import { ConnectionsView } from "@/components/dashboard/connections-view";
import { InstagramConnectEmptyState } from "@/components/dashboard/instagram-connect-empty-state";

export const metadata: Metadata = {
  title: "Connections | NudgeDM",
  description: "Manage the Instagram account linked to your automations.",
};

// Mocked pending real account/session state.
const isConnected = true;

export default function ConnectionsPage() {
  if (!isConnected) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 md:p-12">
        <InstagramConnectEmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <ConnectionsView />
    </div>
  );
}
