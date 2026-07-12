import { NextRequest, NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
import { getUpcomingInvoices } from "@/lib/dashboard-service";
export function GET(request: NextRequest) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 5);
  return NextResponse.json(getUpcomingInvoices(limit));
}
