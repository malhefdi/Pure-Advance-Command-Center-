import { NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
import { getFinancialModelState } from "@/lib/financial-model";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  return NextResponse.json(await getFinancialModelState());
}
