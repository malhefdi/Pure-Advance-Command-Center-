import { NextResponse } from "next/server";
import { getTeamPulse } from "@/lib/dashboard-service";
export function GET() { return NextResponse.json(getTeamPulse()); }
