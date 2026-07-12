import { describe, expect, it } from "vitest";
import { interactions, partners } from "@/lib/crm-seed-data";

describe("sanitized CRM seed data", () => {
  it("contains only explicitly labelled demo records", () => {
    expect(partners.length).toBeGreaterThan(0);
    expect(partners.every((partner) => partner.tags.includes("demo"))).toBe(true);
    expect(partners.every((partner) => partner.notes.toLowerCase().includes("demo"))).toBe(true);
  });

  it("does not embed email addresses, phone numbers, or URLs", () => {
    const serialized = JSON.stringify({ partners, interactions });
    const contentWithoutIsoDates = serialized.replace(/\d{4}-\d{2}-\d{2}/g, "");

    expect(serialized).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(contentWithoutIsoDates).not.toMatch(/(?:\+?\d[\d ()-]{7,}\d)/);
    expect(serialized).not.toMatch(/https?:\/\//i);
    expect(partners.every((partner) => !partner.contactEmail && !partner.contactPhone)).toBe(true);
  });

  it("uses role labels instead of personal creators", () => {
    expect(interactions.length).toBeGreaterThan(0);
    expect(interactions.every((interaction) => /team|office|operations/i.test(interaction.createdBy))).toBe(true);
  });
});
