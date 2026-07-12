/**
 * Sanitized demonstration data for the Coolvex dashboard.
 *
 * This module intentionally contains no personal contact information, supplier
 * correspondence, quote terms, filing identifiers, source-document paths, or
 * therapeutic claims. Real operational evidence belongs in access-controlled
 * storage and must be joined to the application only through an authorized
 * server-side data service.
 */

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
  verified?: boolean;
  source?: string;
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

export interface IngredientSupplierQuote {
  supplier: string;
  receivedDate: string;
  scope: string;
  minimumOrderKg: number;
  leadTimeBusinessDays: number;
  manufacturingStart: string;
  unitPrice: number;
  currency: string;
  vatIncluded: boolean;
  incoterm: string;
  transportationNote: string;
  status: string;
  riskNote: string;
  source: string;
}

export interface StorageLogisticsQuote {
  scope: string;
  quoteAge: string;
  warehouseAnnualPriceSAR: number;
  deliveryTripPriceSAR: number;
  status: string;
  riskNote: string;
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

export interface ProductStrategyStorySection {
  title: string;
  summary: string;
  bullets: string[];
  source: string;
  mergeNote?: string;
}

const SANITIZED_SOURCE = "Sanitized demo dataset; private source register withheld";

export const milestones: Milestone[] = [
  {
    label: "Formula and packaging review",
    date: "Legacy demo milestone",
    status: "done",
    icon: "Done",
    owner: "Product team",
    source: SANITIZED_SOURCE,
  },
  {
    label: "Manufacturing readiness review",
    date: "Before purchase approval",
    status: "next",
    icon: "Next",
    owner: "Operations",
    source: SANITIZED_SOURCE,
  },
  {
    label: "Confirm cosmetic regulatory status",
    date: "Before launch",
    status: "blocked",
    icon: "Blocked",
    owner: "Regulatory",
    source: SANITIZED_SOURCE,
  },
  {
    label: "Approve channel-specific product wording",
    date: "Before publication",
    status: "blocked",
    icon: "Blocked",
    owner: "Regulatory",
    source: SANITIZED_SOURCE,
  },
  {
    label: "Run controlled channel pilot",
    date: "After approvals",
    status: "pending",
    icon: "Pending",
    owner: "Commercial team",
    source: SANITIZED_SOURCE,
  },
];

export const gtmStats: GtmStat[] = [
  {
    label: "Data Posture",
    value: "Sanitized demo",
    sub: "Not production evidence",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
  {
    label: "Target Price",
    value: "Not published",
    sub: "Requires approved commercial model",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
  {
    label: "Year-one Forecast",
    value: "Not published",
    sub: "Legacy assumptions removed",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
  {
    label: "Manufacturing Quote",
    value: "Private",
    sub: "Retrieve from approved contract store",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
  {
    label: "Ingredient Quote",
    value: "Private",
    sub: "Supplier terms intentionally withheld",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
  {
    label: "Channel Footprint",
    value: "To validate",
    sub: "Use current licensed-source data",
    source: SANITIZED_SOURCE,
    confidence: "unverified",
  },
];

export const productStrategyStory: ProductStrategyStorySection[] = [
  {
    title: "Cosmetic product concept",
    summary:
      "Coolvex is represented here only as a cosmetic topical skin-care concept. Product composition and performance statements require approved source evidence and regulatory review.",
    bullets: [
      "Treat every product attribute in this demo as an unapproved legacy assumption.",
      "Do not infer prevention, treatment, cure, pain relief, or other therapeutic effects.",
      "Keep formula details, supplier records, and packaging specifications in controlled storage.",
      "Publish only wording approved for the relevant market and sales channel.",
    ],
    source: SANITIZED_SOURCE,
    mergeNote: "Safety-oriented replacement for the removed evidence pack.",
  },
  {
    title: "Validation-first launch motion",
    summary:
      "The demo workflow models a gated launch: verify evidence, approve cosmetic wording, validate unit economics, then run a measurable channel pilot.",
    bullets: [
      "Confirm regulatory scope before any public or pharmacy-facing material is released.",
      "Require a finance-approved model before showing price, profit, or volume targets.",
      "Use authorized public onboarding channels instead of committed personal contact data.",
      "Track pilot results with source date, owner, confidence, and approval status.",
    ],
    source: SANITIZED_SOURCE,
  },
];

export const competitors: Competitor[] = [
  {
    name: "Comparable Product A",
    share: "Withheld",
    price: "Withheld",
    trend: "Unknown",
    position: "Illustrative category leader",
    sales2024: 0,
    sales2025E: 0,
    growth: "Unknown",
  },
  {
    name: "Comparable Product B",
    share: "Withheld",
    price: "Withheld",
    trend: "Unknown",
    position: "Illustrative premium product",
    sales2024: 0,
    sales2025E: 0,
    growth: "Unknown",
  },
  {
    name: "Coolvex",
    share: "New",
    price: "Not approved",
    trend: "Pre-launch",
    position: "Cosmetic concept under validation",
    sales2024: 0,
    sales2025E: 0,
    growth: "Not applicable",
  },
];

export const y1Scenarios: Y1Scenario[] = [
  {
    scenario: "Illustrative floor",
    units: 0,
    velocity: 0,
    profit: 0,
    marketShareRiyadh: "Not modeled",
    marketShareNational: "Not modeled",
    confidence: "Unverified demo",
    risk: "Requires finance approval",
    vsNeoHealar: "Not compared",
    vsRohelar: "Not compared",
  },
  {
    scenario: "Illustrative base",
    units: 0,
    velocity: 0,
    profit: 0,
    marketShareRiyadh: "Not modeled",
    marketShareNational: "Not modeled",
    confidence: "Unverified demo",
    risk: "Requires finance approval",
    vsNeoHealar: "Not compared",
    vsRohelar: "Not compared",
  },
];

export const pharmacyData: PharmacyData[] = [
  {
    city: "Riyadh",
    cityEn: "Riyadh",
    region: "Riyadh",
    count: 0,
    chains: ["Authorized channel data required"],
    verified: false,
    source: SANITIZED_SOURCE,
  },
  {
    city: "Jeddah",
    cityEn: "Jeddah",
    region: "Makkah",
    count: 0,
    verified: false,
    source: SANITIZED_SOURCE,
  },
];

export const marketData: MarketData[] = [
  {
    product: "Comparable Product A",
    units2024: 0,
    units2025E: 0,
    sales2024: 0,
    sales2025E: 0,
    growth: "Withheld",
    position: "Illustrative category leader",
  },
  {
    product: "Comparable Product B",
    units2024: 0,
    units2025E: 0,
    sales2024: 0,
    sales2025E: 0,
    growth: "Withheld",
    position: "Illustrative premium product",
  },
];

export const actionItems: ActionItem[] = [
  {
    title: "Confirm cosmetic regulatory scope in the private evidence register",
    owner: "Regulatory",
    status: "blocked",
    due: "Before launch",
    priority: "critical",
    product: "Coolvex",
    source: SANITIZED_SOURCE,
  },
  {
    title: "Approve non-therapeutic, channel-specific product wording",
    owner: "Regulatory",
    status: "open",
    due: "Before publication",
    priority: "critical",
    product: "Coolvex",
    source: SANITIZED_SOURCE,
  },
  {
    title: "Reconcile the commercial model using current private quotes",
    owner: "Finance and operations",
    status: "open",
    due: "Before purchase approval",
    priority: "high",
    product: "Coolvex",
    source: SANITIZED_SOURCE,
  },
  {
    title: "Verify manufacturing and supplier readiness",
    owner: "Quality and operations",
    status: "open",
    due: "Before purchase approval",
    priority: "high",
    product: "Coolvex",
    source: SANITIZED_SOURCE,
  },
  {
    title: "Define a privacy-safe channel pilot and measurement plan",
    owner: "Commercial team",
    status: "open",
    due: "After approvals",
    priority: "medium",
    product: "Coolvex",
    source: SANITIZED_SOURCE,
  },
];

export const evidenceSources: EvidenceSource[] = [
  {
    claim: "Dataset classification",
    value: "Sanitized demonstration only",
    source: SANITIZED_SOURCE,
    modified: "2026-07-12",
    confidence: "verified",
    notes: "Confidential source files and personal data have been removed from the working tree.",
  },
  {
    claim: "Commercial model",
    value: "Withheld pending approved private source",
    source: SANITIZED_SOURCE,
    modified: "2026-07-12",
    confidence: "unverified",
  },
  {
    claim: "Manufacturing terms",
    value: "Withheld",
    source: SANITIZED_SOURCE,
    modified: "2026-07-12",
    confidence: "unverified",
  },
  {
    claim: "Regulatory status",
    value: "Verify against the current private authority record",
    source: SANITIZED_SOURCE,
    modified: "2026-07-12",
    confidence: "unverified",
    notes: "A cosmetic notification must not be represented as therapeutic approval.",
  },
  {
    claim: "Market and channel data",
    value: "Removed pending licensed, current source",
    source: SANITIZED_SOURCE,
    modified: "2026-07-12",
    confidence: "unverified",
  },
];

export const manufacturingQuote: ManufacturingQuote = {
  partner: "Manufacturing Partner A (sanitized demo)",
  partnerId: "p-manufacturer-a",
  contact: "Authorized commercial team",
  email: "Withheld",
  phone: "Withheld",
  product: "Coolvex",
  quantity: 0,
  unitPriceSAR: 0,
  totalPriceSAR: 0,
  status: "Private values withheld",
  nextAction: "Retrieve a current approved quote from controlled storage before any commitment.",
  source: SANITIZED_SOURCE,
};

export const oakParkSupplierQuote: IngredientSupplierQuote = {
  supplier: "Ingredient Supplier A (sanitized demo)",
  receivedDate: "Withheld",
  scope: "Potential cosmetic ingredient supply",
  minimumOrderKg: 0,
  leadTimeBusinessDays: 0,
  manufacturingStart: "Not approved",
  unitPrice: 0,
  currency: "Private",
  vatIncluded: false,
  incoterm: "Withheld",
  transportationNote: "Commercial and logistics terms are stored privately.",
  status: "Current quote required",
  riskNote: "Do not place an order using values from this demo module.",
  source: SANITIZED_SOURCE,
};

export const coolvexStorageLogisticsQuote: StorageLogisticsQuote = {
  scope: "Potential Coolvex storage and delivery logistics",
  quoteAge: "Private quote required",
  warehouseAnnualPriceSAR: 0,
  deliveryTripPriceSAR: 0,
  status: "Commercial values withheld",
  riskNote: "Confirm current scope, handling requirements, insurance, tax, and service terms privately.",
  source: SANITIZED_SOURCE,
};

export const patentInfo: PatentInfo = {
  number: "Withheld",
  product: "Coolvex",
  filedDate: "Withheld",
  status: "Verify privately",
  timeline: "Not published",
  authority: "Relevant intellectual-property authority",
  source: SANITIZED_SOURCE,
};

export interface RegulatoryCertificate {
  certificateNumber: string;
  product: string;
  type: string;
  status: string;
  issuedDate: string;
  authority: string;
  source: string;
  compliantWording: string;
  scope: string;
}

export const regulatoryCertificate: RegulatoryCertificate = {
  certificateNumber: "Withheld",
  product: "Coolvex",
  type: "Cosmetic product record",
  status: "Verify privately",
  issuedDate: "Withheld",
  authority: "Relevant cosmetic-product authority",
  source: SANITIZED_SOURCE,
  compliantWording: "Regulatory status must be verified before publication or sale.",
  scope: "No therapeutic approval or therapeutic effect is asserted by this demo record.",
};
