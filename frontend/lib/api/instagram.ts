import "server-only";
import { backendFetch } from "./server";

export interface ConnectedInstagramAccount {
  id: string;
  instagramId: string;
  username: string;
  connectedAt: string;
}

export async function getConnectedAccount(): Promise<ConnectedInstagramAccount | null> {
  return backendFetch<ConnectedInstagramAccount | null>("/instagram/account");
}

export async function getConnectUrl(): Promise<string> {
  const { url } = await backendFetch<{ url: string }>("/instagram/connect");
  return url;
}

export async function disconnectInstagram(): Promise<void> {
  await backendFetch<{ success: boolean }>("/instagram/disconnect", { method: "DELETE" });
}
