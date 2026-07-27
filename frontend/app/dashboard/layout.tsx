import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <DashboardTopbar />
      <DashboardSidebar />
      <main className="pt-16 md:pl-60">{children}</main>
    </div>
  );
}
