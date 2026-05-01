import type { DashboardSnapshot, FinancialPulse, Invoice, ModuleSummary, PlatformBlockData, RevenueProduct, Task, TeamMember } from "@/types/command-center";

/* ──────────────────────────────────────────────────────────────
   Pure Advance — Real Data from pureadvance-v2 Source of Truth
   Last verified: 2026-04-28
   ────────────────────────────────────────────────────────────── */

// ── Financial Pulse ──────────────────────────────────────────
// Pre-revenue startup. Coolvex quote pending. No MTD revenue yet.
export const financialPulse: FinancialPulse = {
  period: "mtd",
  revenue: 0,
  netProfit: 0,
  cash: 0, // Not disclosed
  burnRate: 0, // Not disclosed
  runwayMonths: 0, // Not disclosed
  sparkSeries: [0, 0, 0, 0, 0, 0, 0, 0],
  lastUpdated: new Date().toISOString(),
};

// ── Revenue by Product ───────────────────────────────────────
// Pre-revenue — no product revenue yet. Coolvex quote pending (SAR 51,750).
export const revenueByProduct: RevenueProduct[] = [
  { productId: "insebt", name: "INSEBT", platform: "bio", amountSAR: 0, share: 0 },
  { productId: "coolvex", name: "Coolvex", platform: "med", amountSAR: 0, share: 0 },
  { productId: "letha", name: "LETHA", platform: "med", amountSAR: 0, share: 0 },
  { productId: "palmora", name: "PALMORA", platform: "bio", amountSAR: 0, share: 0 },
];

// ── Invoices ─────────────────────────────────────────────────
export const invoices: Invoice[] = [
  { invoiceId: "accmi-s00163", partnerName: "ACCMi", productId: "coolvex", amountSAR: 51750, dueDate: "2026-05-26", status: "upcoming" },
];

// ── Product Status ───────────────────────────────────────────
export const productStatus: PlatformBlockData[] = [
  {
    id: "bio",
    name: "Bioenvironment",
    icon: "Leaf",
    productCount: 2,
    products: [
      {
        productId: "insebt",
        name: "INSEBT",
        subtitle: "Bt biopesticide — Bacillus thuringiensis kurstaki",
        platform: "bio",
        stage: "dd",
        stageLabel: "R&D / D&D",
        owner: "Dr. Faisal Alzahrani",
        actionLabel: "Open product",
        metrics: [
          { label: "Status", value: "80% URS", tone: "blue" },
          { label: "Bioreactor", value: "5,000L target", tone: "yellow" },
          { label: "kLa", value: "≥120 h⁻¹", tone: "green" },
          { label: "Partner", value: "Delta (signed)", tone: "green" },
        ],
      },
      {
        productId: "palmora",
        name: "PALMORA",
        subtitle: "Red Palm Weevil biocontrol",
        platform: "bio",
        stage: "dd",
        stageLabel: "Field Research",
        owner: "Dr. Faisal Alzahrani",
        actionLabel: "Open product",
        metrics: [
          { label: "Field", value: "Al-Ahsa (Jan 2026)", tone: "blue" },
          { label: "Target", value: "RPW pest", tone: "yellow" },
        ],
      },
    ],
  },
  {
    id: "med",
    name: "Biomedicine",
    icon: "Pulse",
    productCount: 4,
    products: [
      {
        productId: "coolvex",
        name: "Coolvex",
        subtitle: "Topical ointment for intensive care of the perianal area — oak bark, zinc oxide, nanotechnology",
        platform: "med",
        stage: "mfg",
        stageLabel: "Manufacturing",
        owner: "Dr. Sultan Alhayyani",
        actionLabel: "Open product",
        metrics: [
          { label: "Patent", value: "SA 1020257888", tone: "green" },
          { label: "50% Paid", value: "Apr 28", tone: "green" },
          { label: "Ingredient", value: "May 4 delivery", tone: "blue" },
          { label: "Ready", value: "May 5-14", tone: "yellow" },
          { label: "SFDA", value: "CN-2026-59889 ✓", tone: "green" },
          { label: "Manufacturer", value: "ACCMi — 5K units quoted", tone: "blue" },
        ],
      },
      {
        productId: "letha",
        name: "LETHA",
        subtitle: "Biotech gum comfort gel — peptide + chitosan nanoparticle delivery",
        platform: "med",
        stage: "dd",
        stageLabel: "R&D",
        owner: "Dr. Sultan Alhayyani",
        actionLabel: "Open product",
        metrics: [
          { label: "Target", value: "DZRT users KSA", tone: "blue" },
          { label: "Timeline", value: "12-15 months", tone: "yellow" },
          { label: "Price", value: "SAR 120-180", tone: "green" },
          { label: "Regulatory", value: "SFDA cosmetic", tone: "blue" },
        ],
      },
      {
        productId: "colnano",
        name: "Colnano",
        subtitle: "Nanotechnology R&D",
        platform: "med",
        stage: "dd",
        stageLabel: "R&D (Early)",
        owner: "Dr. Sultan Alhayyani",
        actionLabel: "Open product",
        metrics: [
          { label: "Status", value: "R&D", tone: "yellow" },
        ],
      },
      {
        productId: "vitashield",
        name: "VitaShield",
        subtitle: "Nanotechnology R&D",
        platform: "med",
        stage: "dd",
        stageLabel: "R&D (Early)",
        owner: "Dr. Sultan Alhayyani",
        actionLabel: "Open product",
        metrics: [
          { label: "Status", value: "R&D", tone: "yellow" },
        ],
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
        productId: "pure-academy",
        name: "Pure Academy",
        subtitle: "Biomedical sciences training — SAFEA MoU",
        platform: "aca",
        stage: "reg",
        stageLabel: "MoU Active",
        owner: "Dr. Fayez Alshehri",
        actionLabel: "Open academy",
        metrics: [
          { label: "MoU", value: "SAFEA (Apr 8)", tone: "green" },
          { label: "Term", value: "1 year", tone: "blue" },
          { label: "Exit", value: "15-day notice", tone: "yellow" },
        ],
      },
    ],
  },
];

// ── Team Pulse ───────────────────────────────────────────────
export const teamPulse: TeamMember[] = [
  { memberId: "sultan", name: "Dr. Sultan Alhayyani", status: "working", openTasks: 5, lastSeen: "Now", manager: "CEO" },
  { memberId: "faisal", name: "Dr. Faisal Alzahrani", status: "working", openTasks: 4, lastSeen: "Now", manager: "Sultan" },
  { memberId: "ahmed", name: "Prof. Ahmed Tayel", status: "working", openTasks: 3, lastSeen: "Today", manager: "Sultan" },
  { memberId: "mohammed", name: "Mohammed Alhefdi", status: "working", openTasks: 6, lastSeen: "Now", manager: "Sultan" },
  { memberId: "abdulrahman", name: "Abdulrahman Alalmaee", status: "working", openTasks: 2, lastSeen: "Today", manager: "Sultan" },
  { memberId: "ishteaq", name: "Ishteaq Mustaque", status: "working", openTasks: 2, lastSeen: "Today", manager: "Sultan" },
  { memberId: "fayez", name: "Dr. Fayez Alshehri", status: "working", openTasks: 3, lastSeen: "Today", manager: "Sultan" },
  { memberId: "ammar", name: "Ammar Alshehri", status: "working", openTasks: 2, lastSeen: "Today", manager: "Sultan" },
];

// ── Tasks ────────────────────────────────────────────────────
export const tasks: Task[] = [
  { taskId: "task-001", title: "Complete INSEBT URS (User Requirements Specification)", assignee: "Dr. Faisal Alzahrani", manager: "Sultan", product: "INSEBT", dueDate: "2026-05-15", priority: "critical", status: "on-track" },
  { taskId: "task-002", title: "Submit Coolvex manufacturing PO to ACCMi", assignee: "Ishteaq Mustaque", manager: "Sultan", product: "Coolvex", dueDate: "2026-05-01", priority: "high", status: "soon" },
  { taskId: "task-003", title: "Prepare V4 slides for Chouayekh meeting (May 1)", assignee: "Mohammed Alhefdi", manager: "Sultan", product: "INSEBT", dueDate: "2026-05-01", priority: "critical", status: "due-today" },
  { taskId: "task-004", title: "Delta technical transfer planning", assignee: "Dr. Faisal Alzahrani", manager: "Sultan", product: "INSEBT", dueDate: "2026-05-15", priority: "high", status: "on-track" },
  { taskId: "task-005", title: "LETHA peptide sourcing — identify synthesis partner", assignee: "Dr. Sultan Alhayyani", manager: "CEO", product: "LETHA", dueDate: "2026-05-30", priority: "normal", status: "on-track" },
  { taskId: "task-006", title: "Pure Academy program design with SAFEA", assignee: "Dr. Fayez Alshehri", manager: "Sultan", product: "Pure Academy", dueDate: "2026-05-15", priority: "high", status: "on-track" },
  { taskId: "task-007", title: "5,000L bioreactor RFQ — send to 3 vendors", assignee: "Mohammed Alhefdi", manager: "Sultan", product: "INSEBT", dueDate: "2026-05-10", priority: "critical", status: "blocked", blocker: "Waiting on URS completion" },
  { taskId: "task-008", title: "Btk strain HD-1 confirmation from Delta", assignee: "Dr. Faisal Alzahrani", manager: "Sultan", product: "INSEBT", dueDate: "2026-05-05", priority: "high", status: "blocked", blocker: "Delta not yet confirmed strain identity" },
];

// ── Alerts ───────────────────────────────────────────────────
export const alerts = [
  { alertId: "alert-001", severity: "red" as const, message: "ACCMi pro forma expires May 26 — submit PO before deadline", sourceRef: "coolvex", createdAt: new Date().toISOString() },
  { alertId: "alert-002", severity: "yellow" as const, message: "Chouayekh meeting in 3 days (May 1) — V4 slides ready", sourceRef: "insebt", createdAt: new Date().toISOString() },
  { alertId: "alert-003", severity: "yellow" as const, message: "Bioreactor RFQ blocked — waiting on URS completion", sourceRef: "insebt", createdAt: new Date().toISOString() },
  { alertId: "alert-004", severity: "blue" as const, message: "SAFEA MoU active — Pure Academy program design in progress", sourceRef: "pure-academy", createdAt: new Date().toISOString() },
];

// ── Module Summaries ─────────────────────────────────────────
export const moduleSummaries: ModuleSummary[] = [
  { href: "/products", title: "Product Profiles", eyebrow: "Module 2", description: "Lifecycle, ownership, stock, and profitability views for every PA product.", status: "live", bullets: ["7 products across 3 platforms", "INSEBT (Bt biopesticide)", "Coolvex (patent SA 1020257888)", "LETHA (biotech gum gel)", "PALMORA (Red Palm Weevil)", "Pure Academy (SAFEA MoU)"] },
  { href: "/team", title: "Team Operations", eyebrow: "Module 3", description: "Task ownership, blockers, daily check-ins, and escalation history.", status: "live", bullets: ["8 active team members", "Real task tracking", "Blocker visibility", "Manager routing"] },
  { href: "/finance", title: "Finance and Cash Control", eyebrow: "Module 4", description: "Revenue, COGS, expenses, invoices, runway, and source-of-truth net profit.", status: "foundation", bullets: ["Pre-revenue startup", "Coolvex quote: SAR 51,750", "Invoice tracking", "Budget planning"] },
  { href: "/crm", title: "Partners & CRM", eyebrow: "Module 5b", description: "Current partners, prospects, outreach targets, interaction log, and follow-up tracking.", status: "live", bullets: ["14 partners tracked", "Interaction timeline", "Add partner & log interactions", "Follow-up reminders"] },
  { href: "/pipeline", title: "Regulatory and R&D Pipeline", eyebrow: "Module 5", description: "D&D, registration, manufacturing, and market-stage blockers.", status: "planned", bullets: ["Lifecycle gates", "Compliance blockers", "Source-linked alerts"] },
  { href: "/ownership", title: "Ownership and Strategic Finance", eyebrow: "Module 6", description: "Cap table and SAFE scenarios isolated from operational dashboard scope.", status: "planned", bullets: ["Feature flag", "Scenario inputs", "Audit trail"] },
  { href: "/ai", title: "AI Executive Query Layer", eyebrow: "Module 7", description: "Read-only anomaly detection, natural-language queries, and executive summaries.", status: "planned", bullets: ["Source citations", "Read-only launch", "Anomaly thresholds"] },
];

// ── Dashboard Snapshot ───────────────────────────────────────
export const dashboardSnapshot = { financialPulse, revenueByProduct, invoices, productStatus, teamPulse, tasks, alerts };
