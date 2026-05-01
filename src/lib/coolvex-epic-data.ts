/* ──────────────────────────────────────────────────────────────
   Coolvex Epic — Enriched Data Module
   Source: Google Drive mining + Command Center seed data
   Last verified: 2026-04-30
   ────────────────────────────────────────────────────────────── */

// ── Types ──────────────────────────────────────────────────────

export type MilestoneStatus = "done" | "next" | "pending" | "blocked";
export type ActionPriority = "critical" | "high" | "medium" | "low";
export type ActionStatus = "open" | "in-progress" | "blocked" | "done";
export type ConfidenceLevel = "verified" | "corrected" | "unverified" | "estimated";

export interface Milestone {
  label: string;
  date: string;
  status: MilestoneStatus;
  icon: string;
  owner?: string;
  source: string;
}

export interface GtmStat {
  label: string;
  value: string;
  sub: string;
  source: string;
  confidence: ConfidenceLevel;
}

export interface Competitor {
  name: string;
  share: string;
  price: string;
  trend: string;
  position: string;
  sales2024: number;
  sales2025E: number;
  growth: string;
}

export interface Y1Scenario {
  scenario: string;
  units: number;
  velocity: number;
  profit: number;
  marketShareRiyadh: string;
  marketShareNational: string;
  confidence: string;
  risk: string;
  vsNeoHealar: string;
  vsRohelar: string;
}

export interface PharmacyData {
  city: string;
  cityEn: string;
  region: string;
  count: number;
  chains?: string[];
}

export interface MarketData {
  product: string;
  units2024: number;
  units2025E: number;
  sales2024: number;
  sales2025E: number;
  growth: string;
  position: string;
}

export interface ActionItem {
  title: string;
  owner: string;
  status: ActionStatus;
  due: string;
  priority: ActionPriority;
  product: string;
  source: string;
}

export interface EvidenceSource {
  claim: string;
  value: string;
  source: string;
  modified: string;
  confidence: ConfidenceLevel;
  notes?: string;
}

export interface ManufacturingQuote {
  partner: string;
  partnerId: string;
  contact: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  unitPriceSAR: number;
  totalPriceSAR: number;
  status: string;
  nextAction: string;
  source: string;
}

export interface PatentInfo {
  number: string;
  product: string;
  filedDate: string;
  status: string;
  timeline: string;
  authority: string;
  source: string;
}

// ── Milestones ─────────────────────────────────────────────────

export const milestones: Milestone[] = [
  { label: "Oak Park Ingredient Failed Specs", date: "Mar 2026", status: "done", icon: "❌", owner: "Dr. Sultan", source: "src/app/coolvex/page.tsx" },
  { label: "Ingredient Procured & Paid by PA", date: "Apr 2026", status: "done", icon: "✅", owner: "Mohammed", source: "src/app/coolvex/page.tsx" },
  { label: "50% Manufacturing Payment", date: "Apr 28, 2026", status: "done", icon: "✅", owner: "Dr. Sultan", source: "src/lib/crm-seed-data.ts" },
  { label: "Oak Park Delivery to ACCMi", date: "May 4, 2026", status: "next", icon: "📦", owner: "Dr. Sultan", source: "src/app/coolvex/page.tsx" },
  { label: "Product Ready (1-10 days)", date: "May 5-14, 2026", status: "pending", icon: "⏳", owner: "ACCMi", source: "src/app/coolvex/page.tsx" },
  { label: "SFDA Cosmetic Notification Certificate Obtained (CN-2026-59889)", date: "May 2026", status: "done", icon: "✅", owner: "Dr. Sultan", source: "src/app/coolvex/page.tsx" },
  { label: "SFDA Pharmacy Sale Authorization (required for pharmacy channel)", date: "TBD", status: "blocked", icon: "🔴", owner: "SFDA", source: "src/app/coolvex/page.tsx" },
  { label: "First Pharmacy Delivery", date: "TBD", status: "blocked", icon: "🏪", owner: "Dr. Sultan", source: "src/app/coolvex/page.tsx" },
];

// ── GTM Stats (reconciled with extracted data) ─────────────────

export const gtmStats: GtmStat[] = [
  { label: "Market Size (KSA C05A2)", value: "SAR 91.8M", sub: "2025 projected", source: "Market Overview C05A2.xlsx", confidence: "verified" },
  { label: "Target Price", value: "SAR 69", sub: "wholesale", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", confidence: "verified" },
  { label: "Y1 Base Case", value: "10,500 units", sub: "IMS-validated", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", confidence: "verified" },
  { label: "Y1 Base Profit", value: "SAR 132,825", sub: "12.65 SAR/unit", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", confidence: "verified" },
  { label: "Riyadh Pharmacies Mapped", value: "420", sub: "7 chains", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", confidence: "verified" },
  { label: "Manufacturing Quote", value: "SAR 51,750", sub: "5,000 units @ 9 SAR", source: "crm-seed-data.ts / intelligence-report.md", confidence: "verified" },
];

// ── Competitors (enriched with market data) ────────────────────

export const competitors: Competitor[] = [
  { name: "Neo Healar", share: "46.9%", price: "SAR 58-75", trend: "Flat", position: "Market Leader", sales2024: 48022469, sales2025E: 42969197, growth: "-10.5%" },
  { name: "Hemagel Procto", share: "17.4%", price: "~SAR 86", trend: "Stable", position: "Super-Premium", sales2024: 15335076, sales2025E: 15924814, growth: "+3.8%" },
  { name: "Procto-Glyvenol", share: "12.3%", price: "SAR 26-47", trend: "+61%", position: "Chemical Challenger", sales2024: 6979299, sales2025E: 11292314, growth: "+61.8%" },
  { name: "Rohelar", share: "5.2%", price: "~SAR 68", trend: "Growing", position: "Best Coolvex Analog", sales2024: 4666015, sales2025E: 4788062, growth: "+2.6%" },
  { name: "Healarido", share: "4.6%", price: "~SAR 69", trend: "Explosive", position: "Local Disruptor", sales2024: 18000, sales2025E: 4237056, growth: "+23,439%" },
  { name: "Pilocin", share: "6.1%", price: "~SAR 15", trend: "Declining", position: "Value/Generic", sales2024: 7757346, sales2025E: 5542565, growth: "-28.5%" },
  { name: "Haemoproct", share: "4.3%", price: "Generic", trend: "Growing", position: "Tender/Public", sales2024: 529456, sales2025E: 3969658, growth: "+649.6%" },
  { name: "Coolvex", share: "NEW", price: "SAR 69", trend: "🚀", position: "Premium Herbal Entry", sales2024: 0, sales2025E: 0, growth: "N/A" },
];

// ── Y1 Scenarios ───────────────────────────────────────────────

export const y1Scenarios: Y1Scenario[] = [
  { scenario: "Floor", units: 6000, velocity: 1.19, profit: 75900, marketShareRiyadh: "0.58%", marketShareNational: "0.29%", confidence: "Very Low", risk: "Low", vsNeoHealar: "0.8%", vsRohelar: "27%" },
  { scenario: "Conservative", units: 7500, velocity: 1.49, profit: 94875, marketShareRiyadh: "0.72%", marketShareNational: "0.36%", confidence: "Low", risk: "Low", vsNeoHealar: "1.0%", vsRohelar: "34%" },
  { scenario: "Base Case", units: 10500, velocity: 2.08, profit: 132825, marketShareRiyadh: "1.01%", marketShareNational: "0.50%", confidence: "Medium", risk: "Moderate", vsNeoHealar: "1.3%", vsRohelar: "47%" },
  { scenario: "Aggressive", units: 15000, velocity: 2.98, profit: 189750, marketShareRiyadh: "1.44%", marketShareNational: "0.72%", confidence: "High", risk: "High", vsNeoHealar: "1.9%", vsRohelar: "67%" },
];

// ── Pharmacy Data (from SFDA Licensed Pharmacies List) ─────────

export const pharmacyData: PharmacyData[] = [
  { city: "الرياض", cityEn: "Riyadh", region: "الرياض", count: 2402, chains: ["LEMON (135)", "Innova (88)", "Zahrat (76)", "Shams (33)", "Orange (33)", "Al Jazea (32)", "Adam (23)"] },
  { city: "جدة", cityEn: "Jeddah", region: "جدة", count: 1091 },
  { city: "مكة المكرمة", cityEn: "Makkah", region: "مكة المكرمة", count: 548 },
  { city: "المدينة المنورة", cityEn: "Madinah", region: "المدينة المنورة", count: 389 },
  { city: "الطائف", cityEn: "Taif", region: "الطائف", count: 291 },
  { city: "بريدة", cityEn: "Buraydah", region: "القصيم", count: 271 },
  { city: "الدمام", cityEn: "Dammam", region: "المنطقة الشرقية", count: 248 },
  { city: "حائل", cityEn: "Hail", region: "حائل", count: 206 },
  { city: "خميس مشيط", cityEn: "Khamis Mushait", region: "عسير", count: 195 },
  { city: "تبوك", cityEn: "Tabuk", region: "تبوك", count: 178 },
  { city: "ابها", cityEn: "Abha", region: "عسير", count: 153 },
  { city: "الخرج", cityEn: "Al Kharj", region: "الرياض", count: 149 },
  { city: "الخبر", cityEn: "Al Khobar", region: "المنطقة الشرقية", count: 139 },
  { city: "حفر الباطن", cityEn: "Hafar Al Batin", region: "المنطقة الشرقية", count: 94 },
];

// ── Market Data (C05A2 Anti-haemorrhoid without corticosteroids) ──

export const marketData: MarketData[] = [
  { product: "NEO HEALAR", units2024: 913745, units2025E: 807343, sales2024: 48022469, sales2025E: 42969197, growth: "-10.5%", position: "Market Leader" },
  { product: "HEMAGEL PROCTO", units2024: 178793, units2025E: 185669, sales2024: 15335076, sales2025E: 15924814, growth: "+3.8%", position: "Super-Premium" },
  { product: "PROCTO GLYVENOL", units2024: 258839, units2025E: 423780, sales2024: 6979299, sales2025E: 11292314, growth: "+61.8%", position: "Chemical Challenger" },
  { product: "PILOCIN", units2024: 626347, units2025E: 443405, sales2024: 7757346, sales2025E: 5542565, growth: "-28.5%", position: "Value/Generic" },
  { product: "ROHELAR", units2024: 79085, units2025E: 81154, sales2024: 4666015, sales2025E: 4788062, growth: "+2.6%", position: "Best Coolvex Analog" },
  { product: "HEALARIDO", units2024: 300, units2025E: 70618, sales2024: 18000, sales2025E: 4237056, growth: "+23,439%", position: "Local Disruptor" },
  { product: "HAEMOPROCT", units2024: 54809, units2025E: 410938, sales2024: 529456, sales2025E: 3969658, growth: "+649.6%", position: "Tender/Public" },
  { product: "RECTACURE", units2024: 350239, units2025E: 219869, sales2024: 4377992, sales2025E: 2748365, growth: "-37.2%", position: "Value" },
];

// ── Action Items ───────────────────────────────────────────────

export const actionItems: ActionItem[] = [
  { title: "Verify ACCMI SFDA registrations and GMP certifications before PO", owner: "Dr. Sultan", status: "open", due: "2026-05-05", priority: "critical", product: "Coolvex", source: "intelligence-report.md" },
  { title: "Export Feb 2026 Coolvex competitive intelligence Google Slides", owner: "Mohammed", status: "open", due: "2026-05-01", priority: "critical", product: "Coolvex", source: "SOURCE-INVENTORY.csv" },
  { title: "Reconcile Y1 profit discrepancy (132K vs 180K-320K)", owner: "Mohammed", status: "open", due: "2026-05-01", priority: "high", product: "Coolvex", source: "enrichment audit" },
  { title: "Confirm PO terms and batch timeline with ACCMI", owner: "Dr. Sultan", status: "open", due: "2026-05-05", priority: "high", product: "Coolvex", source: "crm-seed-data.ts" },
  { title: "Validate claims language against SFDA cosmetic regulations", owner: "Regulatory", status: "open", due: "2026-05-10", priority: "medium", product: "Coolvex", source: "KSA Hemorrhoid Market Analysis.md" },
  { title: "Decide launch channel order (pharmacy pilot vs Amazon/Noon/Salasa)", owner: "Dr. Sultan", status: "open", due: "2026-05-15", priority: "medium", product: "Coolvex", source: "Antigravity_MultiAgent_Plan.md" },
];

// ── Evidence Sources ───────────────────────────────────────────

export const evidenceSources: EvidenceSource[] = [
  { claim: "Market Size KSA C05A2 2025E", value: "SAR ~91.8M", source: "Market Overview C05A2 A-HEMORRHOIDS WITHOUT CORTIC.xlsx", modified: "2025-12-08", confidence: "verified" },
  { claim: "Coolvex Y1 Base Case Units", value: "10,500", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", modified: "2025-12-11", confidence: "verified" },
  { claim: "Coolvex Y1 Base Case Profit", value: "SAR 132,825", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", modified: "2025-12-11", confidence: "verified", notes: "12.65 SAR/unit net profit" },
  { claim: "Riyadh Pilot Pharmacies", value: "420 across 7 chains", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", modified: "2025-12-11", confidence: "verified" },
  { claim: "SFDA Licensed Pharmacies Total", value: "9,359 records", source: "Licensed Pharmacies List.xlsx", modified: "2025-12-17", confidence: "verified" },
  { claim: "ACCMI Manufacturing Quote", value: "5,000 units @ 9 SAR = 51,750 SAR", source: "crm-seed-data.ts / intelligence-report.md", modified: "2026-04-28", confidence: "verified" },
  { claim: "Patent Application", value: "SA 1020257888 filed Oct 2025", source: "crm-seed-data.ts", modified: "2026-04-28", confidence: "verified" },
  { claim: "Rohelar Y1 Trajectory", value: "22,264 units / 500 locations", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", modified: "2025-12-11", confidence: "verified", notes: "Best Coolvex launch analog" },
  { claim: "Healarido Y2 Trajectory", value: "70,618 units / 1,170 locations", source: "Coolvex_Y1_Target_Dashboard_2.xlsx", modified: "2025-12-11", confidence: "verified", notes: "Aggressive growth model, Al Nahdi pharmacies" },
  { claim: "Competitive Intelligence Slides", value: "Feb 2026 presentation", source: "Coolvex-Competitive-Intelligence-Feb2026.gslides", modified: "2026-02-16", confidence: "unverified", notes: "Google shortcut only — needs Drive API export" },
  { claim: "SFDA Cosmetic Notification Certificate", value: "CN-2026-59889", source: "SFDA Certificate Document (to be linked)", modified: "May 2026", confidence: "verified", notes: "Certificate for cosmetic notification allows marketing and online sale; pharmacy sale requires additional authorization" },
];

// ── Manufacturing Quote ────────────────────────────────────────

export const manufacturingQuote: ManufacturingQuote = {
  partner: "Arab Chemists Co for Cosmetics and Medical Industries Ltd (ACCMi)",
  partnerId: "p-accmi",
  contact: "Basheer Mohamed (CEO)",
  email: "basheer@accmi.co",
  phone: "+966 5661 31239 / +966 1149 84790 / +966 5464 29039",
  product: "Coolvex",
  quantity: 5000,
  unitPriceSAR: 9,
  totalPriceSAR: 51750,
  status: "Pending PO",
  nextAction: "Verify SFDA registrations and GMP certifications before PO",
  source: "crm-seed-data.ts",
};

// ── Patent Info ────────────────────────────────────────────────

export const patentInfo: PatentInfo = {
  number: "SA 1020257888",
  product: "Coolvex",
  filedDate: "Oct 2025",
  status: "Under review",
  timeline: "18-24 months from filing",
  authority: "SAIP (Saudi Authority for Intellectual Property)",
  source: "crm-seed-data.ts / intelligence-report.md",
};
