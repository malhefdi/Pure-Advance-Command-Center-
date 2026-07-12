import type {
  Alert,
  DashboardSnapshot,
  FinancialPulse,
  Invoice,
  ModuleSummary,
  PlatformBlockData,
  RevenueProduct,
  Task,
  TeamMember,
} from "@/types/command-center";

/**
 * Synthetic demonstration fixtures.
 *
 * Production financial, people, partner, product, and regulatory records must
 * be loaded by an authenticated server-side adapter. They must never be
 * committed to this repository or bundled into the browser application.
 */
export const SOURCE_SNAPSHOT_AT = "2026-07-12T00:00:00.000Z";

export const financialPulse: FinancialPulse = {
  period: "mtd",
  revenue: 0,
  netProfit: 0,
  cash: null,
  burnRate: null,
  runwayMonths: null,
  sparkSeries: [0, 0, 0, 0, 0, 0, 0, 0],
  lastUpdated: SOURCE_SNAPSHOT_AT,
};

export const revenueByProduct: RevenueProduct[] = [
  { productId: "bio-demo-a", name: "Bio Product A", platform: "bio", amountSAR: 0, share: 0 },
  { productId: "care-demo-a", name: "Care Product A", platform: "med", amountSAR: 0, share: 0 },
  { productId: "academy-demo-a", name: "Training Program A", platform: "aca", amountSAR: 0, share: 0 },
];

export const invoices: Invoice[] = [
  {
    invoiceId: "invoice-demo-001",
    partnerName: "Manufacturing Partner A",
    productId: "care-demo-a",
    amountSAR: null,
    dueDate: "2026-07-15",
    status: "upcoming",
  },
];

export const productStatus: PlatformBlockData[] = [
  {
    id: "bio",
    name: "Bioenvironment",
    icon: "Leaf",
    productCount: 1,
    products: [
      {
        productId: "bio-demo-a",
        name: "Bio Product A",
        subtitle: "Synthetic biological product profile",
        platform: "bio",
        stage: "dd",
        stageLabel: "Research and development",
        owner: "Research lead",
        actionLabel: "Open product",
        metrics: [
          { label: "Evidence", value: "Demo only", tone: "blue" },
          { label: "Next gate", value: "Requirements review", tone: "yellow" },
        ],
      },
    ],
  },
  {
    id: "med",
    name: "Biomedicine",
    icon: "Pulse",
    productCount: 2,
    products: [
      {
        productId: "care-demo-a",
        name: "Care Product A",
        subtitle: "Synthetic cosmetic product profile",
        platform: "med",
        stage: "reg",
        stageLabel: "Regulatory review",
        owner: "Product lead",
        actionLabel: "Open product",
        metrics: [
          { label: "Commercial terms", value: "Withheld", tone: "blue" },
          { label: "Regulatory status", value: "Verify privately", tone: "yellow" },
          { label: "Manufacturing", value: "Readiness review", tone: "yellow" },
        ],
      },
      {
        productId: "care-demo-b",
        name: "Care Product B",
        subtitle: "Synthetic early-stage product profile",
        platform: "med",
        stage: "dd",
        stageLabel: "Concept validation",
        owner: "Product lead",
        actionLabel: "Open product",
        metrics: [{ label: "Status", value: "Demo only", tone: "blue" }],
      },
    ],
  },
  {
    id: "aca",
    name: "Academy",
    icon: "Cap",
    productCount: 1,
    products: [
      {
        productId: "academy-demo-a",
        name: "Training Program A",
        subtitle: "Synthetic professional-training program",
        platform: "aca",
        stage: "reg",
        stageLabel: "Program review",
        owner: "Program lead",
        actionLabel: "Open program",
        metrics: [
          { label: "Partner", value: "Academic Partner A", tone: "blue" },
          { label: "Approval", value: "Pending review", tone: "yellow" },
        ],
      },
    ],
  },
];

export const teamPulse: TeamMember[] = [
  { memberId: "executive-lead", name: "Executive lead", status: "working", openTasks: 2, lastSeen: "Demo snapshot", manager: "Board" },
  { memberId: "research-lead", name: "Research lead", status: "working", openTasks: 3, lastSeen: "Demo snapshot", manager: "Executive lead" },
  { memberId: "product-lead", name: "Product lead", status: "in-meeting", openTasks: 2, lastSeen: "Demo snapshot", manager: "Executive lead" },
  { memberId: "finance-lead", name: "Finance lead", status: "offline", openTasks: 1, lastSeen: "Demo snapshot", manager: "Executive lead" },
  { memberId: "program-lead", name: "Program lead", status: "working", openTasks: 1, lastSeen: "Demo snapshot", manager: "Executive lead" },
];

export const tasks: Task[] = [
  {
    taskId: "task-demo-overdue",
    title: "Review the synthetic product requirements",
    assignee: "Research lead",
    manager: "Executive lead",
    product: "Bio Product A",
    dueDate: "2026-07-10",
    priority: "high",
    status: "overdue",
  },
  {
    taskId: "task-demo-week",
    title: "Validate the demonstration finance adapter",
    assignee: "Finance lead",
    manager: "Executive lead",
    product: "Finance",
    dueDate: "2026-07-14",
    priority: "normal",
    status: "soon",
  },
  {
    taskId: "task-demo-blocked",
    title: "Confirm the regulatory evidence source",
    assignee: "Product lead",
    manager: "Executive lead",
    product: "Care Product A",
    dueDate: "2026-07-18",
    priority: "critical",
    status: "blocked",
    blocker: "Production evidence is intentionally absent from this repository",
  },
  {
    taskId: "task-demo-track",
    title: "Prepare a privacy-safe pilot measurement plan",
    assignee: "Program lead",
    manager: "Executive lead",
    product: "Training Program A",
    dueDate: "2026-08-01",
    priority: "normal",
    status: "on-track",
  },
];

export const alerts: Alert[] = [
  {
    alertId: "alert-demo-classification",
    severity: "blue",
    message: "Synthetic demonstration data only",
    sourceRef: "/#data-classification",
    createdAt: SOURCE_SNAPSHOT_AT,
  },
];

export const moduleSummaries: ModuleSummary[] = [
  {
    href: "/products",
    title: "Product Profiles",
    eyebrow: "Module 2",
    description: "Lifecycle, ownership, readiness, and evidence views for product portfolios.",
    status: "live",
    bullets: ["Synthetic product fixtures", "Lifecycle-stage summaries", "Evidence-aware metrics"],
  },
  {
    href: "/team",
    title: "Team Operations",
    eyebrow: "Module 3",
    description: "Role-based workload and availability signals without personal profile data.",
    status: "live",
    bullets: ["Role-based demo members", "Open-task counts", "Availability snapshot"],
  },
  {
    href: "/finance",
    title: "Finance and Cash Control",
    eyebrow: "Module 4",
    description: "Revenue, invoices, runway, and data-quality controls.",
    status: "foundation",
    bullets: ["Unknown values stay unknown", "Due-date normalization", "Private adapter required"],
  },
  {
    href: "/pipeline",
    title: "Regulatory and R&D Pipeline",
    eyebrow: "Module 5",
    description: "Lifecycle gates, evidence provenance, and blocker tracking.",
    status: "planned",
    bullets: ["Lifecycle gates", "Compliance blockers", "Source-linked alerts"],
  },
  {
    href: "/ownership",
    title: "Ownership and Governance",
    eyebrow: "Module 6",
    description: "Decision rights, approvals, and accountability boundaries.",
    status: "planned",
    bullets: ["Role-based access", "Approval records", "Audit history"],
  },
  {
    href: "/ai",
    title: "AI Operations",
    eyebrow: "Module 7",
    description: "Source-grounded analysis and automation with human approval gates.",
    status: "planned",
    bullets: ["Retrieval with citations", "Explicit approval gates", "Prompt and action audit logs"],
  },
];

export function getModuleSummary(href: string) {
  const summary = moduleSummaries.find((candidate) => candidate.href === href);
  if (!summary) throw new Error(`No module summary configured for ${href}`);
  return summary;
}

export const dashboardSnapshot: DashboardSnapshot = {
  generatedAt: SOURCE_SNAPSHOT_AT,
  financialPulse,
  revenueByProduct,
  invoices,
  productStatus,
  teamPulse,
  tasks,
  alerts,
};
