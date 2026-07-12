import { NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
import { getProductStatus } from "@/lib/dashboard-service";

export function GET(request: Request) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  return NextResponse.json(getProductStatus());
}
