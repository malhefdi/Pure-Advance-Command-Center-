import { NextRequest, NextResponse } from "next/server";
import { buildEscalationPayload } from "@/lib/dashboard-service";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = buildEscalationPayload(id);
  if (!payload) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return NextResponse.json(payload, { status: 202 });
}