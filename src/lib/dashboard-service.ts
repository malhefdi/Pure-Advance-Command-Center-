import { filterTasks, normalizeInvoices } from "@/lib/dashboard-domain";
import {
  financialPulse,
  invoices,
  productStatus,
  revenueByProduct,
  SOURCE_SNAPSHOT_AT,
  tasks,
  teamPulse,
} from "@/lib/seed-data";
import { daysUntil } from "@/lib/utils";
import type { Alert, DashboardSnapshot, TaskFilter } from "@/types/command-center";

export function getFinancialPulse() { return financialPulse; }
export function getRevenueByProduct() { return revenueByProduct; }
export function getUpcomingInvoices(limit = 5, now = new Date()) {
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(Math.trunc(limit), 0), 50) : 5;
  return normalizeInvoices(invoices, now).filter((invoice) => invoice.status === "upcoming").slice(0, safeLimit);
}
export function getProductStatus() { return productStatus; }
export function getTeamPulse() { return teamPulse; }

export function getTasks(filter?: TaskFilter, now = new Date()) {
  return filterTasks(tasks, filter, now);
}

export function deriveAlerts(now = new Date()): Alert[] {
  const alerts: Alert[] = [];
  const currentTasks = filterTasks(tasks, undefined, now);
  const currentInvoices = normalizeInvoices(invoices, now);

  if (financialPulse.runwayMonths !== null && financialPulse.runwayMonths < 3) {
    alerts.push({
      alertId: "alert-runway",
      severity: "red",
      message: `Cash runway is ${financialPulse.runwayMonths.toFixed(1)} months`,
      sourceRef: "/#financial-pulse",
      createdAt: SOURCE_SNAPSHOT_AT,
    });
  }

  productStatus.flatMap((platform) => platform.products).forEach((product) => {
    if (product.stock && product.stock.current < product.stock.threshold) {
      alerts.push({
        alertId: `alert-stock-${product.productId}`,
        severity: "red",
        message: `${product.name} is below reorder threshold`,
        sourceRef: `/#${product.productId}`,
        createdAt: SOURCE_SNAPSHOT_AT,
      });
    }
  });

  currentTasks.forEach((task) => {
    if (task.status === "overdue") {
      alerts.push({
        alertId: `alert-overdue-${task.taskId}`,
        severity: "red",
        message: `${task.title} is overdue`,
        sourceRef: `/#${task.taskId}`,
        createdAt: SOURCE_SNAPSHOT_AT,
      });
    }
    if (task.status === "blocked") {
      alerts.push({
        alertId: `alert-blocked-${task.taskId}`,
        severity: "yellow",
        message: `${task.product} has a blocked task`,
        sourceRef: `/#${task.taskId}`,
        createdAt: SOURCE_SNAPSHOT_AT,
      });
    }
  });

  currentInvoices.forEach((invoice) => {
    const dueIn = daysUntil(invoice.dueDate, now);
    if (invoice.status === "overdue" && dueIn !== null) {
      alerts.push({
        alertId: `alert-invoice-${invoice.invoiceId}`,
        severity: "red",
        message: `${invoice.partnerName} invoice is ${Math.abs(dueIn)} days overdue`,
        sourceRef: `/#${invoice.invoiceId}`,
        createdAt: SOURCE_SNAPSHOT_AT,
      });
    } else if (invoice.status === "upcoming" && dueIn !== null && dueIn >= 0 && dueIn <= 3) {
      const dueLabel = dueIn === 0 ? "due today" : `due in ${dueIn} days`;
      alerts.push({
        alertId: `alert-invoice-${invoice.invoiceId}`,
        severity: "yellow",
        message: `${invoice.partnerName} invoice ${dueLabel}`,
        sourceRef: `/#${invoice.invoiceId}`,
        createdAt: SOURCE_SNAPSHOT_AT,
      });
    }
  });

  if (alerts.length === 0) {
    alerts.push({
      alertId: "alert-clear",
      severity: "green",
      message: "No alerts could be derived from the source snapshot",
      sourceRef: "/#financial-pulse",
      createdAt: SOURCE_SNAPSHOT_AT,
    });
  }
  return alerts;
}

export function getDashboardSnapshot(now = new Date()): DashboardSnapshot {
  return {
    generatedAt: now.toISOString(),
    financialPulse,
    revenueByProduct,
    invoices: normalizeInvoices(invoices, now),
    productStatus,
    teamPulse,
    tasks: filterTasks(tasks, undefined, now),
    alerts: deriveAlerts(now),
  };
}

export function buildEscalationPayload(taskId: string, now = new Date()) {
  const task = tasks.find((candidate) => candidate.taskId === taskId);
  if (!task) return null;
  return {
    preview: true as const,
    deliveryStatus: "not-sent" as const,
    taskId: task.taskId,
    recipient: task.manager,
    channels: ["whatsapp", "email"],
    message: `Escalation: ${task.title} for ${task.product}. Owner: ${task.assignee}. Due: ${task.dueDate}.`,
    preparedAt: now.toISOString(),
    notice: "Preview only. No message was sent or queued.",
  };
}
