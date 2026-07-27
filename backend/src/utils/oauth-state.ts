import crypto from "crypto";

// The Instagram OAuth callback is a public route hit directly by Meta's
// redirect (or the sandbox mock), with no session cookie available — the
// frontend proxies /instagram/connect but the browser leaves our origin for
// the OAuth hop. This signed, time-boxed state param is how the callback
// recovers which user initiated the connection.
const STATE_TTL_MS = 10 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is required to sign the Instagram OAuth state param");
  }
  return secret;
}

export function signOAuthState(userId: string): string {
  const payload = `${userId}.${Date.now()}`;
  const signature = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyOAuthState(state: string): string {
  let decoded: string;
  try {
    decoded = Buffer.from(state, "base64url").toString("utf8");
  } catch {
    throw new Error("Malformed OAuth state param");
  }

  const [userId, timestamp, signature] = decoded.split(".");
  if (!userId || !timestamp || !signature) {
    throw new Error("Malformed OAuth state param");
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(`${userId}.${timestamp}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expectedSignature);
  const actualBuf = Buffer.from(signature);
  if (expectedBuf.length !== actualBuf.length || !crypto.timingSafeEqual(expectedBuf, actualBuf)) {
    throw new Error("Invalid OAuth state signature");
  }

  if (Date.now() - Number(timestamp) > STATE_TTL_MS) {
    throw new Error("OAuth state param has expired");
  }

  return userId;
}
