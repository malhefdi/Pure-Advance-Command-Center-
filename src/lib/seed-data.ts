import type { DashboardSnapshot, FinancialPulse, Invoice, ModuleSummary, PlatformBlockData, RevenueProduct, Task, TeamMember } from "@/types/command-center";

export const financialPulse: FinancialPulse = {
  period: "mtd",
  revenue: 487200,
  netProfit: 132600,
  cash: 1180000,
  burnRate: 175000,
  runwayMonths: 6.7,
  sparkSeries: [32, 36, 34, 43, 47, 52, 56, 61],
  lastUpdated: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
};

export const revenueByProduct: RevenueProduct[] = [
  { productId: "bio-enz-clean", name: "BioEnz Cleaner", platform: "bio", amountSAR: 164000, share: 0.34 },
  { productId: "med-dx-kit", name: "MedDx Rapid Kit", platform: "med", amountSAR: 138500, share: 0.28 },
  { productId: "academy-pro", name: "PA Academy Pro", platform: "aca", amountSAR: 96800, share: 0.2 },
  { productId: "bio-remediate", name: "BioRemediate Plus", platform: "bio", amountSAR: 87900, share: 0.18 },
];

export const invoices: Invoice[] = [
  { invoiceId: "inv-1007", partnerName: "Riyadh Health Group", productId: "med-dx-kit", amountSAR: 86000, dueDate: "2026-04-29", status: "upcoming" },
  { invoiceId: "inv-1008", partnerName: "Green Dunes Co.", productId: "bio-enz-clean", amountSAR: 42000, dueDate: "2026-05-02", status: "upcoming" },
  { invoiceId: "inv-1009", partnerName: "North Lab", productId: "bio-remediate", amountSAR: 31500, dueDate: "2026-05-06", status: "upcoming" },
];

export const productStatus: PlatformBlockData[] = [
  {
    id: "bio",
    name: "Bioenvironment",
    icon: "Leaf",
    productCount: 2,
    products: [
      { productId: "bio-enz-clean", name: "BioEnz Cleaner", subtitle: "Industrial enzyme cleaner", platform: "bio", stage: "market", stageLabel: "Market", owner: "Dr. Noura", actionLabel: "Open product", metrics: [{ label: "Stock", value: "1,240 units", tone: "green" }, { label: "MTD", value: "164K SAR", tone: "green" }], stock: { current: 1240, threshold: 400, max: 1800 } },
      { productId: "bio-remediate", name: "BioRemediate Plus", subtitle: "Soil remediation pilot", platform: "bio", stage: "mfg", stageLabel: "Manufacturing", owner: "Eng. Faisal", actionLabel: "Open product", metrics: [{ label: "Pilot", value: "Batch 3", tone: "blue" }, { label: "Stock", value: "140 units", tone: "red" }], stock: { current: 140, threshold: 250, max: 800 } },
    ],
  },
  {
    id: "med",
    name: "Biomedicine",
    icon: "Pulse",
    productCount: 2,
    products: [
      { productId: "med-dx-kit", name: "MedDx Rapid Kit", subtitle: "Point-of-care diagnostics", platform: "med", stage: "reg", stageLabel: "Registration", owner: "Dr. Reem", actionLabel: "Open product", metrics: [{ label: "SFDA", value: "Review", tone: "yellow" }, { label: "MTD", value: "139K SAR", tone: "green" }], stock: { current: 520, threshold: 300, max: 1000 } },
      { productId: "med-cell-media", name: "Cell Media Starter Pack", subtitle: "Lab consumables bundle", platform: "med", stage: "dd", stageLabel: "D&D", owner: "Dr. Hadi", actionLabel: "Open product", metrics: [{ label: "Validation", value: "72%", tone: "blue" }, { label: "Blocker", value: "Supplier", tone: "yellow" }] },
    ],
  },
  {
    id: "aca",
    name: "Academy",
    icon: "Cap",
    productCount: 1,
    products: [
      { productId: "academy-pro", name: "PA Academy Pro", subtitle: "Executive training program", platform: "aca", stage: "market", stageLabel: "Market", owner: "Maha", actionLabel: "Open cohort", metrics: [{ label: "Seats", value: "38/50", tone: "green" }, { label: "MTD", value: "97K SAR", tone: "green" }] },
    ],
  },
];

export const teamPulse: TeamMember[] = [
  { memberId: "tm-1", name: "Dr. Noura", status: "working", openTasks: 4, lastSeen: "08:46", manager: "Sultan" },
  { memberId: "tm-2", name: "Eng. Faisal", status: "in-meeting", openTasks: 7, lastSeen: "09:12", manager: "Sultan" },
  { memberId: "tm-3", name: "Dr. Reem", status: "working", openTasks: 3, lastSeen: "08:55", manager: "Sultan" },
  { memberId: "tm-4", name: "Maha", status: "offline", openTasks: 2, lastSeen: "Yesterday", manager: "Sultan" },
];

export const tasks: Task[] = [
  { taskId: "task-101", title: "Confirm reorder quantity for BioRemediate Plus", assignee: "Eng. Faisal", manager: "Sultan", product: "BioRemediate Plus", dueDate: "2026-04-25", priority: "critical", status: "overdue", blocker: "Awaiting supplier minimum-order confirmation." },
  { taskId: "task-102", title: "Send SFDA response packet", assignee: "Dr. Reem", manager: "Sultan", product: "MedDx Rapid Kit", dueDate: "2026-04-26", priority: "high", status: "due-today" },
  { taskId: "task-103", title: "Finalize Academy cohort schedule", assignee: "Maha", manager: "Sultan", product: "PA Academy Pro", dueDate: "2026-04-30", priority: "normal", status: "soon" },
  { taskId: "task-104", title: "Resolve supplier certificate gap", assignee: "Dr. Hadi", manager: "Sultan", product: "Cell Media Starter Pack", dueDate: "2026-04-28", priority: "high", status: "blocked", blocker: "Supplier certificate does not include lot traceability." },
];

export const moduleSummaries: ModuleSummary[] = [
  { href: "/products", title: "Product Profiles", eyebrow: "Module 2", description: "Lifecycle, ownership, stock, and profitability views for every PA product.", status: "foundation", bullets: ["Product drill-down routes", "Royalty calculator placeholder", "Product finance contracts"] },
  { href: "/team", title: "Team Operations", eyebrow: "Module 3", description: "Task ownership, blockers, daily check-ins, and escalation history.", status: "foundation", bullets: ["Overdue/week/blocked filters", "Escalation workflow", "Manager routing"] },
  { href: "/finance", title: "Finance and Cash Control", eyebrow: "Module 4", description: "Revenue, COGS, expenses, invoices, runway, and source-of-truth net profit.", status: "foundation", bullets: ["Net profit definition", "Runway alerts", "Invoice adapters"] },
  { href: "/pipeline", title: "Regulatory and R&D Pipeline", eyebrow: "Module 5", description: "D&D, registration, manufacturing, and market-stage blockers.", status: "planned", bullets: ["Lifecycle gates", "Compliance blockers", "Source-linked alerts"] },
  { href: "/ownership", title: "Ownership and Strategic Finance", eyebrow: "Module 6", description: "Cap table and SAFE scenarios isolated from operational dashboard scope.", status: "planned", bullets: ["Feature flag", "Scenario inputs", "Audit trail"] },
  { href: "/ai", title: "AI Executive Query Layer", eyebrow: "Module 7", description: "Read-only anomaly detection, natural-language queries, and executive summaries.", status: "planned", bullets: ["Source citations", "Read-only launch", "Anomaly thresholds"] },
];

export const dashboardSnapshot: Omit<DashboardSnapshot, "alerts"> = { financialPulse, revenueByProduct, invoices, productStatus, teamPulse, tasks };
