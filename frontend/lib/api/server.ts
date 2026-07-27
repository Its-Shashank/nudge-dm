import "server-only";
import { cookies } from "next/headers";

// The browser never talks to the backend directly — every call here runs
// server-side (Server Components, Server Actions, Route Handlers) and
// forwards the session cookie manually. This sidesteps SameSite=Lax dropping
// the cookie on cross-origin fetches, and matches .ai/FRONTEND.md's rule to
// fetch server-side rather than from the client.
const API_URL = process.env.API_URL || "http://localhost:5001";
export const SESSION_COOKIE_NAME = "better-auth.session_token";

export interface ApiErrorDetail {
  path: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details?: ApiErrorDetail[];

  constructor(status: number, message: string, details?: ApiErrorDetail[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

interface BackendRequestInit extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function buildHeaders(init: BackendRequestInit): Promise<Headers> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (sessionCookie) {
    headers.set("Cookie", `${SESSION_COOKIE_NAME}=${sessionCookie.value}`);
  }
  return headers;
}

/** Low-level call — use when the caller needs the raw Response (e.g. to relay Set-Cookie). */
export async function rawBackendFetch(path: string, init: BackendRequestInit = {}): Promise<Response> {
  const headers = await buildHeaders(init);
  return fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
}

export async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const body = payload as { error?: string; details?: ApiErrorDetail[] } | null;
    throw new ApiError(response.status, body?.error ?? response.statusText, body?.details);
  }

  return payload as T;
}

/** High-level call for the common case: parse JSON, throw ApiError on failure. */
export async function backendFetch<T>(path: string, init: BackendRequestInit = {}): Promise<T> {
  const response = await rawBackendFetch(path, init);
  return parseResponse<T>(response);
}

function extractSetCookieHeaders(response: Response): string[] {
  const headersWithGetSetCookie = response.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof headersWithGetSetCookie.getSetCookie === "function") {
    return headersWithGetSetCookie.getSetCookie();
  }
  const single = response.headers.get("set-cookie");
  return single ? [single] : [];
}

/**
 * Relays the backend's session cookie from a raw login/register/logout
 * Response onto the Next response, so the browser gets a first-party cookie
 * for our own origin instead of the backend's. Must be called from a Server
 * Action or Route Handler (cookies().set/delete aren't allowed elsewhere).
 */
export async function relaySessionCookie(response: Response): Promise<void> {
  const setCookieHeaders = extractSetCookieHeaders(response);
  const sessionHeader = setCookieHeaders.find((h) => h.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!sessionHeader) return;

  const valueMatch = sessionHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]*)`));
  const expiresMatch = sessionHeader.match(/expires=([^;]*)/i);
  const value = valueMatch?.[1] ? decodeURIComponent(valueMatch[1]) : "";

  const cookieStore = await cookies();
  if (!value) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return;
  }

  cookieStore.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresMatch?.[1] ? new Date(expiresMatch[1]) : undefined,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
