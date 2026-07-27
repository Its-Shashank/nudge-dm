import "server-only";
import { backendFetch } from "./server";

export interface DashboardActivityEntry {
  id: string;
  automationId: string;
  instagramUserId: string;
  comment: string;
  message: string;
  status: string;
  error: string | null;
  createdAt: string;
  automation: { name: string };
}

export interface DashboardStats {
  totalAutomations: number;
  activeAutomations: number;
  messagesSent: number;
  messagesFailed: number;
  connectedAccount: { username: string; instagramId: string; connectedAt: string } | null;
  currentPlan: { plan: string; status: string };
  recentActivity: DashboardActivityEntry[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return backendFetch<DashboardStats>("/dashboard");
}
