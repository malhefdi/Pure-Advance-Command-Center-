import { NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
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
  oakParkSupplierQuote,
  coolvexStorageLogisticsQuote,
  patentInfo,
  regulatoryCertificate,
} from "@/lib/coolvex-epic-data";

export function GET(request: Request) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
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
    oakParkSupplierQuote,
    coolvexStorageLogisticsQuote,
    patentInfo,
    regulatoryCertificate,
  });
}
