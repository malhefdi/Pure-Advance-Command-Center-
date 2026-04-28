import { NextResponse } from "next/server";
import { partners } from "@/lib/crm-seed-data";

export async function GET() {
  return NextResponse.json(partners);
}
