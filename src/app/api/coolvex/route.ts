import { NextResponse } from "next/server";
import {
  milestones,
  gtmStats,
  competitors,
  y1Scenarios,
  pharmacyData,
  marketData,
  actionItems,
  evidenceSources,
  manufacturingQuote,
  patentInfo,
} from "@/lib/coolvex-epic-data";

export function GET() {
  return NextResponse.json({
    milestones,
    gtmStats,
    competitors,
    y1Scenarios,
    pharmacyData,
    marketData,
    actionItems,
    evidenceSources,
    manufacturingQuote,
    patentInfo,
  });
}
