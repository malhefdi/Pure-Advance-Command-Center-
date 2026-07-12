import type {
  FinancialModelSnapshot,
  FinancialModelWarning,
  FinancialScenarioSummary,
  MonthlyFinancialForecast,
} from "@/types/financial-model";

export type FinancialSheet = readonly (readonly unknown[])[];

export interface FinancialModelSheets {
  dashboard: FinancialSheet;
  financials: FinancialSheet;
  cashFlow: FinancialSheet;
  budgetVsActuals: FinancialSheet;
  capitalPlan: FinancialSheet;
  platformScenarios: FinancialSheet;
}

export function parseFinancialModelSheets(
  sheets: FinancialModelSheets,
  metadata: { modifiedAt: string; loadedAt?: string },
): FinancialModelSnapshot {
  const forecast = parseForecast(sheets.cashFlow);
  const scenarios = [15, 16, 17].map((row) => parseScenario(sheets.dashboard, row));
  const activeScenario = requiredText(sheets.dashboard, 4, 2, "Dashboard active scenario");
  const activeScenarioSummary = scenarios.find((scenario) => scenario.name === activeScenario);
  if (!activeScenarioSummary) throw new Error("Active scenario is not represented in the scenario table");

  const actualsRows = Array.from({ length: 14 }, (_, index) => index + 5);
  const revenueActualMonths = countNumericCells(sheets.budgetVsActuals, actualsRows, 3);
  const costActualMonths = countNumericCells(sheets.budgetVsActuals, actualsRows, 6);
  const netCashFlowActualMonths = countNumericCells(sheets.budgetVsActuals, actualsRows, 9);
  const completeMonths = actualsRows.filter((row) =>
    [3, 6, 9].every((column) => optionalNumber(sheets.budgetVsActuals, row, column) !== null),
  ).length;

  const fundingGapSAR = requiredNumber(sheets.capitalPlan, 23, 2, "Capital Plan funding gap");
  const grantVarianceSAR = requiredNumber(sheets.platformScenarios, 20, 2, "Grant variance");
  const scenarioOneVarianceSAR = requiredNumber(sheets.platformScenarios, 33, 2, "Scenario 1a variance");
  const scenarioTwoVarianceSAR = requiredNumber(sheets.platformScenarios, 33, 3, "Scenario 1b variance");
  const currentFundsRunwayMonths = requiredNumber(sheets.financials, 35, 2, "Current-funds runway");

  const warnings: FinancialModelWarning[] = [
    {
      code: "preliminary-model",
      severity: "info",
      message: "This is a preliminary planning model, not an accounting ledger or approved budget.",
    },
    {
      code: "last-saved-values",
      severity: "info",
      message: "The integration reads last-saved Excel values. Recalculate and save the workbook before expecting a refresh.",
    },
  ];

  if (completeMonths < actualsRows.length) {
    warnings.push({
      code: "actuals-incomplete",
      severity: "warning",
      message: `Budget-vs-actuals is complete for ${completeMonths} of ${actualsRows.length} modeled months. Forecast values must not be presented as actuals.`,
    });
  }
  if (fundingGapSAR < 0) {
    warnings.push({
      code: "capital-funding-gap",
      severity: "critical",
      message: "The active platform capital plan has a funding gap and depends on external capital and/or in-kind support.",
    });
  }
  if (Math.abs(grantVarianceSAR) > 1 || Math.abs(scenarioOneVarianceSAR) > 1 || Math.abs(scenarioTwoVarianceSAR) > 1) {
    warnings.push({
      code: "source-reconciliation",
      severity: "critical",
      message: "The platform scenario sheet contains unreconciled source variances. Treat its headline capital figures as decision-blocked until reviewed.",
    });
  }
  if (activeScenarioSummary.runwayMonths !== null && activeScenarioSummary.runwayMonths > currentFundsRunwayMonths + 1) {
    warnings.push({
      code: "runway-definition",
      severity: "warning",
      message: "Scenario runway includes scenario funding assumptions; current-funds runway excludes undrawn funding. Keep these measures separate.",
    });
  }
  warnings.push({
    code: "funding-tracker-semantics",
    severity: "info",
    message: "The Funding Tracker total is cumulative source history, not currently available cash; do not use it as liquidity.",
  });

  return {
    classification: "private",
    modelStatus: "preliminary",
    source: {
      label: "External private workbook",
      modifiedAt: new Date(metadata.modifiedAt).toISOString(),
      loadedAt: metadata.loadedAt ?? new Date().toISOString(),
      readMode: "last-saved-values",
    },
    activeScenario,
    operating: {
      openingCashSAR: requiredNumber(sheets.dashboard, 5, 2, "Opening cash"),
      grossBurnMonthlySAR: requiredNumber(sheets.dashboard, 6, 2, "Gross monthly burn"),
      netBurnMonthlySAR: requiredNumber(sheets.dashboard, 7, 2, "Net monthly burn"),
      breakEvenRevenueMonthlySAR: requiredNumber(sheets.dashboard, 8, 2, "Break-even revenue"),
      minimumCashSAR: requiredNumber(sheets.dashboard, 9, 2, "Minimum cash"),
      currentFundsRunwayMonths,
      activeScenarioRunwayMonths: activeScenarioSummary.runwayMonths,
      payrollShare: requiredRatio(sheets.dashboard, 11, 2, "Payroll share"),
      monthsCashPositive: forecast.filter((month) => month.closingCashSAR >= 0).length,
      modeledMonths: forecast.length,
    },
    scenarios,
    forecast,
    capitalPlan: {
      scenario: requiredText(sheets.capitalPlan, 4, 2, "Capital Plan scenario"),
      totalCashUsesSAR: requiredNumber(sheets.capitalPlan, 12, 2, "Capital Plan cash uses"),
      totalCashSourcesSAR: requiredNumber(sheets.capitalPlan, 18, 2, "Capital Plan cash sources"),
      fundingGapSAR,
      inKindGrantSAR: requiredNumber(sheets.capitalPlan, 26, 2, "Capital Plan in-kind grant"),
      statedCommitmentSAR: requiredNumber(sheets.capitalPlan, 27, 2, "Capital Plan stated commitment"),
      gapVsStatedCommitmentSAR: requiredNumber(sheets.capitalPlan, 28, 2, "Capital Plan gap versus commitment"),
    },
    actualsCoverage: {
      modeledMonths: actualsRows.length,
      completeMonths,
      revenueActualMonths,
      costActualMonths,
      netCashFlowActualMonths,
    },
    warnings,
  };
}

function parseForecast(sheet: FinancialSheet): MonthlyFinancialForecast[] {
  return Array.from({ length: 14 }, (_, index) => {
    const column = index + 2;
    return {
      month: requiredMonth(sheet, 4, column, `Cash Flow month ${index + 1}`),
      revenueSAR: requiredNumber(sheet, 8, column, `Cash Flow revenue ${index + 1}`),
      operatingCostsSAR: requiredNumber(sheet, 14, column, `Cash Flow operating costs ${index + 1}`),
      netCashFlowSAR: requiredNumber(sheet, 18, column, `Cash Flow net cash flow ${index + 1}`),
      closingCashSAR: requiredNumber(sheet, 20, column, `Cash Flow closing cash ${index + 1}`),
    };
  });
}

function parseScenario(sheet: FinancialSheet, row: number): FinancialScenarioSummary {
  const runwayValue = cell(sheet, row, 4);
  return {
    name: requiredText(sheet, row, 1, `Scenario name at row ${row}`),
    netBurnMonthlySAR: requiredNumber(sheet, row, 2, `Scenario net burn at row ${row}`),
    cashAvailableSAR: requiredNumber(sheet, row, 3, `Scenario cash at row ${row}`),
    runwayMonths: typeof runwayValue === "number" && Number.isFinite(runwayValue) ? runwayValue : null,
    cashFlowPositive: typeof runwayValue === "string" && runwayValue.toLowerCase().includes("positive"),
  };
}

function cell(sheet: FinancialSheet, row: number, column: number) {
  return sheet[row - 1]?.[column - 1];
}

function requiredText(sheet: FinancialSheet, row: number, column: number, label: string) {
  const value = cell(sheet, row, column);
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} is missing`);
  return value.trim();
}

function optionalNumber(sheet: FinancialSheet, row: number, column: number) {
  const value = cell(sheet, row, column);
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function requiredNumber(sheet: FinancialSheet, row: number, column: number, label: string) {
  const value = optionalNumber(sheet, row, column);
  if (value === null || Math.abs(value) > 1_000_000_000_000) throw new Error(`${label} is missing or invalid`);
  return value;
}

function requiredRatio(sheet: FinancialSheet, row: number, column: number, label: string) {
  const value = requiredNumber(sheet, row, column, label);
  if (value < 0 || value > 1) throw new Error(`${label} must be between zero and one`);
  return value;
}

function requiredMonth(sheet: FinancialSheet, row: number, column: number, label: string) {
  const value = cell(sheet, row, column);
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string") {
    date = new Date(value);
  } else if (typeof value === "number") {
    date = new Date(Math.round((value - 25569) * 86_400_000));
  } else {
    throw new Error(`${label} is missing`);
  }
  if (!Number.isFinite(date.getTime())) throw new Error(`${label} is invalid`);
  return date.toISOString().slice(0, 7);
}

function countNumericCells(sheet: FinancialSheet, rows: number[], column: number) {
  return rows.filter((row) => optionalNumber(sheet, row, column) !== null).length;
}
