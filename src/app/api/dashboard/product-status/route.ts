import { NextResponse } from "next/server";
import { getProductStatus } from "@/lib/dashboard-service";
export function GET() { return NextResponse.json(getProductStatus()); }
