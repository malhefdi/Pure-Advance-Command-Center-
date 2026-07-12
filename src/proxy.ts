import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decideAccess } from "@/lib/access-control";

export function proxy(request: NextRequest) {
  const decision = decideAccess(request.headers.get("authorization"));
  if (decision.allowed) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-command-center-user", decision.username);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const missingConfiguration = decision.reason === "missing-configuration";
  const status = missingConfiguration ? 503 : 401;
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": request.nextUrl.pathname.startsWith("/api/")
      ? "application/json; charset=utf-8"
      : "text/plain; charset=utf-8",
  });
  if (!missingConfiguration) {
    headers.set("WWW-Authenticate", 'Basic realm="PA Command Center", charset="UTF-8"');
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        error: missingConfiguration
          ? "Command Center access is not configured"
          : "Authentication required",
      },
      { status, headers },
    );
  }

  return new NextResponse(
    missingConfiguration
      ? "Command Center access is not configured. Set the required server environment variables."
      : "Authentication required.",
    { status, headers },
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
