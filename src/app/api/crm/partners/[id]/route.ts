import { NextResponse } from "next/server";
import { partners, interactions } from "@/lib/crm-seed-data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
