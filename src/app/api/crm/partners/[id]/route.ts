import { NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
import { partners, interactions } from "@/lib/crm-seed-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  const { id } = await params;
  const partner = partners.find((p) => p.partnerId === id);
  if (!partner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const partnerInteractions = interactions.filter(
    (i) => i.partnerId === id
  );
  return NextResponse.json({ partner, interactions: partnerInteractions });
}
