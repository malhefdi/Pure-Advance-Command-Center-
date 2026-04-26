import { NextResponse } from "next/server";
import { getRevenueByProduct } from "@/lib/dashboard-service";
export function GET() { return NextResponse.json(getRevenueByProduct()); }
