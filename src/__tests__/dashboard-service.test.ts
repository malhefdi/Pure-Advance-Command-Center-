import { describe, expect, it } from "vitest";
import { deriveInvoiceStatus, deriveTaskStatus, filterTasks } from "@/lib/dashboard-domain";
import { buildEscalationPayload, deriveAlerts, getTasks, getUpcomingInvoices } from "@/lib/dashboard-service";
import { daysUntil, formatSAR, isStale } from "@/lib/utils";
import { tasks } from "@/lib/seed-data";

const snapshotNow = new Date("2026-07-12T12:00:00.000Z");

describe("dashboard utilities", () => {
  it("formats dashboard currency without inventing unknown values", () => {
    expect(formatSAR(487200.42)).toBe("487,200 SAR");
    expect(formatSAR(null)).toBe("Unknown");
    expect(formatSAR(Number.NaN)).toBe("Unknown");
  });

  it("detects stale and invalid timestamps", () => {
    expect(isStale("2026-07-11T10:59:59.000Z", snapshotNow)).toBe(true);
    expect(isStale("not-a-date", snapshotNow)).toBe(true);
    expect(isStale("2026-07-12T11:30:00.000Z", snapshotNow)).toBe(false);
  });

  it("validates ISO calendar dates in UTC", () => {
    expect(daysUntil("2026-07-12", snapshotNow)).toBe(0);
    expect(daysUntil("2026-07-13", snapshotNow)).toBe(1);
    expect(daysUntil("2026-02-30", snapshotNow)).toBeNull();
    expect(daysUntil("07/13/2026", snapshotNow)).toBeNull();
  });
});

describe("dashboard domain rules", () => {
  it("derives task status from blockers and dates", () => {
    expect(deriveTaskStatus(tasks.find((task) => task.taskId === "task-demo-overdue")!, snapshotNow)).toBe("overdue");
    expect(deriveTaskStatus(tasks.find((task) => task.taskId === "task-demo-blocked")!, snapshotNow)).toBe("blocked");
    expect(filterTasks(tasks, "week", snapshotNow).map((task) => task.taskId)).toEqual([
      "task-demo-week",
      "task-demo-blocked",
    ]);
  });

  it("derives invoice status and safely clamps limits", () => {
    const invoice = { invoiceId: "test", partnerName: "Demo", productId: "demo", amountSAR: null, dueDate: "2026-07-11", status: "upcoming" as const };
    expect(deriveInvoiceStatus(invoice, snapshotNow)).toBe("overdue");
    expect(getUpcomingInvoices(-10, snapshotNow)).toEqual([]);
    expect(getUpcomingInvoices(Number.NaN, snapshotNow)).toHaveLength(1);
  });
});

describe("dashboard service", () => {
  it("derives alerts linked to existing dashboard records", () => {
    const alerts = deriveAlerts(snapshotNow);
    expect(alerts.some((alert) => alert.alertId === "alert-overdue-task-demo-overdue")).toBe(true);
    expect(alerts.some((alert) => alert.alertId === "alert-blocked-task-demo-blocked")).toBe(true);
    expect(alerts.every((alert) => alert.sourceRef.startsWith("/#"))).toBe(true);
  });

  it("filters blocked tasks", () => {
    const blocked = getTasks("blocked", snapshotNow);
    expect(blocked).toHaveLength(1);
    expect(blocked[0].taskId).toBe("task-demo-blocked");
    expect(blocked[0].status).toBe("blocked");
  });

  it("builds a non-delivering escalation preview", () => {
    const payload = buildEscalationPayload("task-demo-overdue", snapshotNow);
    expect(payload).toMatchObject({ preview: true, deliveryStatus: "not-sent" });
    expect(payload?.channels).toEqual(["whatsapp", "email"]);
    expect(payload?.notice).toContain("No message was sent or queued");
  });

  it("returns null for an unknown escalation target", () => {
    expect(buildEscalationPayload("missing-task", snapshotNow)).toBeNull();
  });
});
