import { NextRequest, NextResponse } from "next/server";
import { enforceApiAccess, enforceSameOrigin } from "@/lib/access-control";
import { buildEscalationPayload } from "@/lib/dashboard-service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  const crossOrigin = enforceSameOrigin(request);
  if (crossOrigin) return crossOrigin;
  const { id } = await params;
  const payload = buildEscalationPayload(id);
  if (!payload) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return NextResponse.json(payload, { status: 200 });
}
