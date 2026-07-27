import "server-only";
import type { User } from "@/types/user";
import { ApiError, backendFetch, parseResponse, rawBackendFetch, relaySessionCookie } from "./server";

interface AuthResponse {
  user: User;
  session: { token: string };
}

export async function registerUser(input: { name: string; email: string; password: string }): Promise<User> {
  const response = await rawBackendFetch("/auth/register", { method: "POST", body: input });
  const { user } = await parseResponse<AuthResponse>(response);
  await relaySessionCookie(response);
  return user;
}

export async function loginUser(input: { email: string; password: string }): Promise<User> {
  const response = await rawBackendFetch("/auth/login", { method: "POST", body: input });
  const { user } = await parseResponse<AuthResponse>(response);
  await relaySessionCookie(response);
  return user;
}

export async function logoutUser(): Promise<void> {
  const response = await rawBackendFetch("/auth/logout", { method: "POST" });
  await relaySessionCookie(response);
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { user } = await backendFetch<{ user: User }>("/auth/me");
    return user;
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return null;
    throw err;
  }
}
