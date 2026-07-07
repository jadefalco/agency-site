import { NextRequest, NextResponse } from "next/server";

/**
 * Password-gates /admin/* using HTTP Basic Auth.
 *
 * DASHBOARD_PASSWORD is already documented in .env.example and
 * SETUP_TWILIO.md as the intended admin/dashboard password — this wires
 * that variable up to actual access control. Previously /admin/leads had
 * only a `robots: noindex` tag, which stops search engines from listing
 * the page but does not stop anyone who requests the URL directly.
 *
 * If DASHBOARD_PASSWORD is not set, access fails closed (blocked) rather
 * than silently leaving the leads dashboard open.
 */
export function middleware(request: NextRequest) {
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardPassword) {
    return new NextResponse(
      "Admin access is not configured. Set DASHBOARD_PASSWORD.",
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice("Basic ".length);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    const suppliedPassword =
      separatorIndex === -1 ? decoded : decoded.slice(separatorIndex + 1);

    if (suppliedPassword === dashboardPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
