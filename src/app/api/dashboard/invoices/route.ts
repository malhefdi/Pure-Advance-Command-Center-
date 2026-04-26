import { NextRequest, NextResponse } from "next/server";
import { getUpcomingInvoices } from "@/lib/dashboard-service";
export function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 5);
  return NextResponse.json(getUpcomingInvoices(limit));
}
