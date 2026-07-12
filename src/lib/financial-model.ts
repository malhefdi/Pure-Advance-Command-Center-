import "server-only";

import { readFile, stat } from "node:fs/promises";
import { extname } from "node:path";
import { readSheet } from "read-excel-file/node";
import { parseFinancialModelSheets } from "@/lib/financial-model-schema";
import type { FinancialModelState } from "@/types/financial-model";

const MAX_WORKBOOK_BYTES = 20 * 1024 * 1024;
let cached: { key: string; state: FinancialModelState } | null = null;

export async function getFinancialModelState(): Promise<FinancialModelState> {
  const modelPath = process.env.COMMAND_CENTER_FINANCIAL_MODEL_PATH?.trim();
  if (!modelPath) return { status: "unavailable", reason: "not-configured" };

  try {
    if (extname(modelPath).toLowerCase() !== ".xlsx") throw new Error("Unsupported workbook type");
    const fileStat = await stat(modelPath);
    if (!fileStat.isFile() || fileStat.size <= 0 || fileStat.size > MAX_WORKBOOK_BYTES) {
      throw new Error("Workbook size is outside the allowed range");
    }

    const key = `${modelPath}:${fileStat.size}:${fileStat.mtimeMs}`;
    if (cached?.key === key) return cached.state;

    const bytes = await readFile(modelPath);
    const [dashboard, financials, cashFlow, budgetVsActuals, capitalPlan, platformScenarios] = await Promise.all([
      readSheet(bytes, "Dashboard"),
      readSheet(bytes, "Financials"),
      readSheet(bytes, "Cash Flow"),
      readSheet(bytes, "Budget vs Actuals", { trim: false }),
      readSheet(bytes, "Capital Plan"),
      readSheet(bytes, "Platform Scenarios"),
    ]);

    const snapshot = parseFinancialModelSheets(
      { dashboard, financials, cashFlow, budgetVsActuals, capitalPlan, platformScenarios },
      { modifiedAt: fileStat.mtime.toISOString() },
    );
    const state: FinancialModelState = { status: "ready", snapshot };
    cached = { key, state };
    return state;
  } catch {
    return { status: "unavailable", reason: "read-or-validation-failed" };
  }
}
