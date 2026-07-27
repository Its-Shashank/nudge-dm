import { NextRequest, NextResponse } from "next/server";

// Fast, optimistic gate based on cookie presence only — real session
// validity is enforced downstream by each dashboard page's backend call,
// which redirects to /login itself on a 401.
const SESSION_COOKIE_NAME = "better-auth.session_token";
const AUTH_ROUTES = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (AUTH_ROUTES.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
