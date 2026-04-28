import { NextResponse } from "next/server";
import { interactions } from "@/lib/crm-seed-data";

export async function GET() {
  return NextResponse.json(interactions);
}
