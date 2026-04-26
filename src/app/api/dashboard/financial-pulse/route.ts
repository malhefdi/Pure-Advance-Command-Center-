import { NextResponse } from "next/server";
import { getFinancialPulse } from "@/lib/dashboard-service";
export function GET() { return NextResponse.json(getFinancialPulse()); }
