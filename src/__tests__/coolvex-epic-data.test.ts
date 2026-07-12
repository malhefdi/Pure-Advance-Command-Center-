import { describe, expect, it } from "vitest";
import {
  evidenceSources,
  gtmStats,
  manufacturingQuote,
  oakParkSupplierQuote,
  productStrategyStory,
  regulatoryCertificate,
} from "@/lib/coolvex-epic-data";

describe("sanitized Coolvex epic data", () => {
  it("labels dashboard values as sanitized, private, withheld, or unverified", () => {
    expect(gtmStats.some((stat) => stat.value === "Sanitized demo")).toBe(true);
    expect(gtmStats.every((stat) => stat.source.includes("Sanitized demo"))).toBe(true);
    expect(evidenceSources.every((source) => source.source.includes("Sanitized demo"))).toBe(true);
  });

  it("does not expose quote contacts or commercial values", () => {
    expect(manufacturingQuote.email).toBe("Withheld");
    expect(manufacturingQuote.phone).toBe("Withheld");
    expect(manufacturingQuote.totalPriceSAR).toBe(0);
    expect(oakParkSupplierQuote.unitPrice).toBe(0);
  });

  it("includes an explicit non-therapeutic regulatory guardrail", () => {
    const story = JSON.stringify(productStrategyStory);

    expect(story).toContain("Do not infer prevention, treatment, cure, pain relief");
    expect(regulatoryCertificate.scope).toContain("No therapeutic approval");
  });
});
