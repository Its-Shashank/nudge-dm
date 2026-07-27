import { NextResponse } from "next/server";
import { getConnectUrl } from "@/lib/api/instagram";

// Proxies the OAuth kickoff so the browser leaves our origin only for the
// unavoidable hop to Meta (or the sandbox mock) — everything up to here
// stays same-origin, matching the connections/[connect|disconnect] flow.
export async function GET() {
  const url = await getConnectUrl();
  return NextResponse.redirect(url);
}
