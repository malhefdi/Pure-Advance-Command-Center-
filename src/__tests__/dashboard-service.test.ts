import { describe, expect, it } from "vitest";
import { buildEscalationPayload, deriveAlerts, getTasks } from "@/lib/dashboard-service";
import { formatSAR, isStale } from "@/lib/utils";

describe("dashboard utilities", () => {
  it("formats dashboard currency as SAR without decimals", () => {
    expect(formatSAR(487200.42)).toBe("487,200 SAR");
    expect(formatSAR(null)).toBe("-");
  });

  it("detects stale data after 24 hours", () => {
    const staleDate = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    expect(isStale(staleDate)).toBe(true);
  });
});

describe("dashboard service", () => {
  it("derives source-linked alerts from seeded records", () => {
    const alerts = deriveAlerts();
    expect(alerts.some((alert) => alert.sourceRef.startsWith("/finance"))).toBe(true);
    expect(alerts.some((alert) => alert.sourceRef.startsWith("/team"))).toBe(true);
  });

  it("filters blocked tasks", () => {
    expect(getTasks("blocked")).toHaveLength(2);
    expect(getTasks("blocked")[0].status).toBe("blocked");
  });

  it("builds escalation payloads for WhatsApp and email", () => {
    const payload = buildEscalationPayload("task-001");
    expect(payload?.channels).toEqual(["whatsapp", "email"]);
    expect(payload?.message).toContain("Escalation:");
  });
});
