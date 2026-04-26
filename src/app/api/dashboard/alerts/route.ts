import { NextResponse } from "next/server";
import { deriveAlerts } from "@/lib/dashboard-service";
export function GET() { return NextResponse.json(deriveAlerts()); }
