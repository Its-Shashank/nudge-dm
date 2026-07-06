import { Response } from "express";
import { makeSignature } from "better-auth/crypto";

const COOKIE_NAME = "better-auth.session_token";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

async function signSessionToken(token: string): Promise<string> {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is required to sign session cookies");
  }
  return `${token}.${await makeSignature(token, secret)}`;
}

export async function setSessionCookie(res: Response, token: string): Promise<void> {
  const signedToken = await signSessionToken(token);
  const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE_MS);
  res.cookie(COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export function clearSessionCookie(res: Response): void {
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
  });
}
