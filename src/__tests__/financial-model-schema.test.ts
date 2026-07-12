import { describe, expect, it } from "vitest";
import { parseFinancialModelSheets, type FinancialSheet } from "@/lib/financial-model-schema";

function sheet(rows: number, columns: number): unknown[][] {
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => null));
}

function set(target: unknown[][], row: number, column: number, value: unknown) {
  target[row - 1][column - 1] = value;
}

function fixture() {
  const dashboard = sheet(39, 15);
  set(dashboard, 4, 2, "Base");
  set(dashboard, 5, 2, 100_000);
  set(dashboard, 6, 2, 20_000);
  set(dashboard, 7, 2, 5_000);
  set(dashboard, 8, 2, 20_000);
  set(dashboard, 9, 2, 80_000);
  set(dashboard, 11, 2, 0.4);
  [[15, "Base", 5_000, 300_000, 60], [16, "Conservative", 10_000, 100_000, 10], [17, "Upside", 1, 300_000, "Cash-flow positive"]].forEach(([row, name, burn, cash, runway]) => {
    set(dashboard, Number(row), 1, name);
    set(dashboard, Number(row), 2, burn);
    set(dashboard, Number(row), 3, cash);
    set(dashboard, Number(row), 4, runway);
  });

  const financials = sheet(36, 4);
  set(financials, 35, 2, 5);

  const cashFlow = sheet(23, 15);
  for (let index = 0; index < 14; index += 1) {
    const column = index + 2;
    set(cashFlow, 4, column, new Date(Date.UTC(2026, 7 + index, 1)));
    set(cashFlow, 8, column, 10_000);
    set(cashFlow, 14, column, 20_000);
    set(cashFlow, 18, column, -10_000);
    set(cashFlow, 20, column, 100_000 - index * 5_000);
  }

  const budgetVsActuals = sheet(19, 10);
  const capitalPlan = sheet(30, 3);
  set(capitalPlan, 4, 2, "Scenario A");
  set(capitalPlan, 12, 2, 500_000);
  set(capitalPlan, 18, 2, 300_000);
  set(capitalPlan, 23, 2, -200_000);
  set(capitalPlan, 26, 2, 250_000);
  set(capitalPlan, 27, 2, 100_000);
  set(capitalPlan, 28, 2, 150_000);

  const platformScenarios = sheet(41, 5);
  set(platformScenarios, 20, 2, 10_000);
  set(platformScenarios, 33, 2, 20_000);
  set(platformScenarios, 33, 3, 30_000);

  return { dashboard, financials, cashFlow, budgetVsActuals, capitalPlan, platformScenarios } satisfies Record<string, FinancialSheet>;
}

describe("financial model schema", () => {
  it("extracts only the aggregate integration contract", () => {
    const snapshot = parseFinancialModelSheets(fixture(), {
      modifiedAt: "2026-07-12T09:23:43.000Z",
      loadedAt: "2026-07-12T10:00:00.000Z",
    });

    expect(snapshot.activeScenario).toBe("Base");
    expect(snapshot.operating).toMatchObject({
      openingCashSAR: 100_000,
      currentFundsRunwayMonths: 5,
      activeScenarioRunwayMonths: 60,
      modeledMonths: 14,
      monthsCashPositive: 14,
    });
    expect(snapshot.forecast).toHaveLength(14);
    expect(snapshot.forecast[0]).toMatchObject({ month: "2026-08", revenueSAR: 10_000, closingCashSAR: 100_000 });
    expect(snapshot.actualsCoverage.completeMonths).toBe(0);
    expect(snapshot.warnings.map((warning) => warning.code)).toEqual(expect.arrayContaining([
      "actuals-incomplete",
      "capital-funding-gap",
      "source-reconciliation",
      "runway-definition",
    ]));
    expect(JSON.stringify(snapshot).toLowerCase()).not.toContain("employee");
  });

  it("rejects an invalid aggregate ratio", () => {
    const sheets = fixture();
    set(sheets.dashboard as unknown[][], 11, 2, 2);
    expect(() => parseFinancialModelSheets(sheets, { modifiedAt: "2026-07-12T00:00:00.000Z" })).toThrow("Payroll share");
  });
});
