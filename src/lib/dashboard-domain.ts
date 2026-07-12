import { daysUntil } from "@/lib/utils";
import type { Invoice, Task, TaskFilter, TaskStatus } from "@/types/command-center";

export function deriveTaskStatus(task: Task, now = new Date()): TaskStatus {
  if (task.status === "blocked" || task.blocker) return "blocked";

  const dueIn = daysUntil(task.dueDate, now);
  if (dueIn === null) return "unknown";
  if (dueIn < 0) return "overdue";
  if (dueIn === 0) return "due-today";
  if (dueIn <= 7) return "soon";
  return "on-track";
}

export function normalizeTasks(taskList: Task[], now = new Date()): Task[] {
  return taskList.map((task) => ({ ...task, status: deriveTaskStatus(task, now) }));
}

export function filterTasks(taskList: Task[], filter?: TaskFilter, now = new Date()): Task[] {
  const normalized = normalizeTasks(taskList, now);
  if (!filter) return normalized;

  if (filter === "week") {
    return normalized.filter((task) => {
      const dueIn = daysUntil(task.dueDate, now);
      return dueIn !== null && dueIn >= 0 && dueIn <= 7;
    });
  }

  return normalized.filter((task) => task.status === filter);
}

export function deriveInvoiceStatus(invoice: Invoice, now = new Date()): Invoice["status"] {
  if (invoice.status === "paid") return "paid";

  const dueIn = daysUntil(invoice.dueDate, now);
  if (dueIn === null) return "unknown";
  return dueIn < 0 ? "overdue" : "upcoming";
}

export function normalizeInvoices(invoiceList: Invoice[], now = new Date()): Invoice[] {
  return invoiceList.map((invoice) => ({ ...invoice, status: deriveInvoiceStatus(invoice, now) }));
}
