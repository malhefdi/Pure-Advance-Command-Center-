export type FinancialModelWarningSeverity = "info" | "warning" | "critical";

export interface FinancialModelWarning {
  code: string;
  severity: FinancialModelWarningSeverity;
  message: string;
}

export interface FinancialScenarioSummary {
  name: string;
  netBurnMonthlySAR: number;
  cashAvailableSAR: number;
  runwayMonths: number | null;
  cashFlowPositive: boolean;
}

export interface MonthlyFinancialForecast {
  month: string;
  revenueSAR: number;
  operatingCostsSAR: number;
  netCashFlowSAR: number;
  closingCashSAR: number;
}

export interface FinancialModelSnapshot {
  classification: "private";
  modelStatus: "preliminary";
  source: {
    label: "External private workbook";
    modifiedAt: string;
    loadedAt: string;
    readMode: "last-saved-values";
  };
  activeScenario: string;
  operating: {
    openingCashSAR: number;
    grossBurnMonthlySAR: number;
    netBurnMonthlySAR: number;
    breakEvenRevenueMonthlySAR: number;
    minimumCashSAR: number;
    currentFundsRunwayMonths: number;
    activeScenarioRunwayMonths: number | null;
    payrollShare: number;
    monthsCashPositive: number;
    modeledMonths: number;
  };
  scenarios: FinancialScenarioSummary[];
  forecast: MonthlyFinancialForecast[];
  capitalPlan: {
    scenario: string;
    totalCashUsesSAR: number;
    totalCashSourcesSAR: number;
    fundingGapSAR: number;
    inKindGrantSAR: number;
    statedCommitmentSAR: number;
    gapVsStatedCommitmentSAR: number;
  };
  actualsCoverage: {
    modeledMonths: number;
    completeMonths: number;
    revenueActualMonths: number;
    costActualMonths: number;
    netCashFlowActualMonths: number;
  };
  warnings: FinancialModelWarning[];
}

export type FinancialModelState =
  | { status: "ready"; snapshot: FinancialModelSnapshot }
  | { status: "unavailable"; reason: "not-configured" | "read-or-validation-failed" };
