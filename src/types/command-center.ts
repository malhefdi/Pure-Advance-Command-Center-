export type Severity = "green" | "yellow" | "red" | "blue";
export type PlatformId = "bio" | "med" | "aca";
export type StageId = "dd" | "reg" | "mfg" | "market";
export type TaskFilter = "overdue" | "week" | "blocked";
export type TaskPriority = "critical" | "high" | "normal";
export type TaskStatus = "blocked" | "overdue" | "due-today" | "soon" | "on-track";

export interface FinancialPulse {
  period: "mtd";
  revenue: number;
  netProfit: number;
  cash: number;
  burnRate: number;
  runwayMonths: number;
  sparkSeries: number[];
  lastUpdated: string;
}

export interface RevenueProduct {
  productId: string;
  name: string;
  platform: PlatformId;
  amountSAR: number;
  share: number;
}

export interface Invoice {
  invoiceId: string;
  partnerName: string;
  productId: string;
  amountSAR: number;
  dueDate: string;
  status: "upcoming" | "overdue" | "paid";
}

export interface ProductMetric {
  label: string;
  value: string;
  tone?: Severity;
}

export interface Product {
  productId: string;
  name: string;
  subtitle: string;
  platform: PlatformId;
  stage: StageId;
  stageLabel: string;
  metrics: ProductMetric[];
  stock?: { current: number; threshold: number; max: number };
  owner: string;
  actionLabel: string;
}

export interface PlatformBlockData {
  id: PlatformId;
  name: string;
  icon: string;
  productCount: number;
  products: Product[];
}

export interface TeamMember {
  memberId: string;
  name: string;
  status: "working" | "in-meeting" | "offline";
  openTasks: number;
  lastSeen: string;
  manager: string;
}

export interface Task {
  taskId: string;
  title: string;
  assignee: string;
  manager: string;
  product: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  blocker?: string;
}

export interface Alert {
  alertId: string;
  severity: Severity;
  message: string;
  sourceRef: string;
  createdAt: string;
}

export interface DashboardSnapshot {
  financialPulse: FinancialPulse;
  revenueByProduct: RevenueProduct[];
  invoices: Invoice[];
  productStatus: PlatformBlockData[];
  teamPulse: TeamMember[];
  tasks: Task[];
  alerts: Alert[];
}

export interface ModuleSummary {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  status: "live" | "foundation" | "planned";
  bullets: string[];
}
