import { dashboardSnapshot, financialPulse, invoices, productStatus, revenueByProduct, tasks, teamPulse } from "@/lib/seed-data";
import { daysUntil } from "@/lib/utils";
import type { Alert, DashboardSnapshot, TaskFilter } from "@/types/command-center";

const nowIso = () => new Date().toISOString();

export function getFinancialPulse() { return financialPulse; }
export function getRevenueByProduct() { return revenueByProduct; }
export function getUpcomingInvoices(limit = 5) { return invoices.filter((invoice) => invoice.status === "upcoming").slice(0, limit); }
export function getProductStatus() { return productStatus; }
export function getTeamPulse() { return teamPulse; }

export function getTasks(filter?: TaskFilter) {
  if (!filter) return tasks;
  if (filter === "week") return tasks.filter((task) => daysUntil(task.dueDate) <= 7 && daysUntil(task.dueDate) >= 0);
  return tasks.filter((task) => task.status === filter);
}

export function deriveAlerts(): Alert[] {
  const alerts: Alert[] = [];

  if (financialPulse.runwayMonths < 3) {
    alerts.push({ alertId: "alert-runway", severity: "red", message: `Cash runway is ${financialPulse.runwayMonths.toFixed(1)} months`, sourceRef: "/finance#runway", createdAt: nowIso() });
  }

  productStatus.flatMap((platform) => platform.products).forEach((product) => {
    if (product.stock && product.stock.current < product.stock.threshold) {
      alerts.push({ alertId: `alert-stock-${product.productId}`, severity: "red", message: `${product.name} is below reorder threshold`, sourceRef: `/products#${product.productId}`, createdAt: nowIso() });
    }
  });

  tasks.forEach((task) => {
    if (task.status === "overdue") alerts.push({ alertId: `alert-overdue-${task.taskId}`, severity: "red", message: `${task.title} is overdue`, sourceRef: `/team#${task.taskId}`, createdAt: nowIso() });
    if (task.status === "blocked") alerts.push({ alertId: `alert-blocked-${task.taskId}`, severity: "yellow", message: `${task.product} has a blocked task`, sourceRef: `/team#${task.taskId}`, createdAt: nowIso() });
  });

  invoices.forEach((invoice) => {
    const dueIn = daysUntil(invoice.dueDate);
    if (invoice.status === "upcoming" && dueIn <= 3) {
      alerts.push({ alertId: `alert-invoice-${invoice.invoiceId}`, severity: "yellow", message: `${invoice.partnerName} invoice due in ${Math.max(dueIn, 0)} days`, sourceRef: `/finance#${invoice.invoiceId}`, createdAt: nowIso() });
    }
  });

  if (alerts.length === 0) alerts.push({ alertId: "alert-clear", severity: "green", message: "No critical alerts right now", sourceRef: "/", createdAt: nowIso() });
  return alerts;
}

export function getDashboardSnapshot(): DashboardSnapshot {
  return { ...dashboardSnapshot, alerts: deriveAlerts() };
}

export function buildEscalationPayload(taskId: string) {
  const task = tasks.find((candidate) => candidate.taskId === taskId);
  if (!task) return null;
  return {
    taskId: task.taskId,
    recipient: task.manager,
    channels: ["whatsapp", "email"],
    message: `Escalation: ${task.title} for ${task.product}. Owner: ${task.assignee}. Due: ${task.dueDate}.`,
    sentAt: nowIso(),
  };
}
