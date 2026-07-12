import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { getFinancialModelState } from "@/lib/financial-model";
import { cn, formatSAR } from "@/lib/utils";
import type { FinancialModelSnapshot, FinancialModelWarningSeverity, MonthlyFinancialForecast } from "@/types/financial-model";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const state = await getFinancialModelState();

  return (
    <AppShell active="/finance">
      <MobileNav />
      <main className="mx-auto w-full min-w-0 max-w-[1400px] space-y-5 overflow-x-hidden p-4 md:p-8">
        <header>
          <p className="text-label uppercase text-text-muted">Module 4</p>
          <h1 className="text-2xl font-bold text-brand-navy">Finance and capital planning</h1>
          <p className="mt-1 text-sm text-text-muted">Private preliminary forecast data, kept separate from accounting actuals.</p>
        </header>

        {state.status === "unavailable" ? <UnavailableFinance reason={state.reason} /> : <FinanceModel snapshot={state.snapshot} />}
      </main>
    </AppShell>
  );
}

function UnavailableFinance({ reason }: { reason: "not-configured" | "read-or-validation-failed" }) {
  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
      <h2 className="font-bold">Private financial model unavailable</h2>
      <p className="mt-2 text-sm">
        {reason === "not-configured"
          ? "Set COMMAND_CENTER_FINANCIAL_MODEL_PATH to an external .xlsx file on the server. Never copy the workbook into this repository."
          : "The configured workbook could not be read or failed the expected-sheet validation. The API intentionally hides filesystem details."}
      </p>
    </section>
  );
}

function FinanceModel({ snapshot }: { snapshot: FinancialModelSnapshot }) {
  const activeScenario = snapshot.scenarios.find((scenario) => scenario.name === snapshot.activeScenario);
  const modified = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" }).format(new Date(snapshot.source.modifiedAt));

  return (
    <>
      <section className="min-w-0 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <strong>Private preliminary workbook - {snapshot.activeScenario} scenario</strong>
          <span>Last saved {modified}</span>
        </div>
        <p className="mt-1 text-xs">Only aggregated cells are loaded server-side. Forecasts are not actuals, approved budgets, or available bank balances.</p>
      </section>

      <section aria-label="Financial model key metrics" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Opening cash" value={formatSAR(snapshot.operating.openingCashSAR)} note="Model opening balance" />
        <MetricCard label="Current-funds runway" value={`${snapshot.operating.currentFundsRunwayMonths.toFixed(1)} mo`} note="Before undrawn funding" />
        <MetricCard label="Gross monthly burn" value={formatSAR(snapshot.operating.grossBurnMonthlySAR)} note="Steady state" />
        <MetricCard label="Scenario net burn" value={formatSAR(snapshot.operating.netBurnMonthlySAR)} note={`${snapshot.activeScenario} assumptions`} />
        <MetricCard label="Minimum modeled cash" value={formatSAR(snapshot.operating.minimumCashSAR)} note={`${snapshot.operating.monthsCashPositive}/${snapshot.operating.modeledMonths} months nonnegative`} />
        <MetricCard label="Capital funding gap" value={formatSAR(snapshot.capitalPlan.fundingGapSAR)} note={snapshot.capitalPlan.scenario} critical={snapshot.capitalPlan.fundingGapSAR < 0} />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <article className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
          <h2 className="text-lg font-bold text-brand-navy">Closing-cash forecast</h2>
          <p className="text-xs text-text-muted">Last-saved workbook results; scenario funding produces the visible step change.</p>
          <CashForecastChart forecast={snapshot.forecast} />
        </article>

        <article className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
          <h2 className="text-lg font-bold text-brand-navy">Runway definitions</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <DataPair label="Current funds, before new funding" value={`${snapshot.operating.currentFundsRunwayMonths.toFixed(1)} months`} />
            <DataPair label={`${snapshot.activeScenario} scenario`} value={activeScenario?.cashFlowPositive ? "Cash-flow positive" : activeScenario?.runwayMonths ? `${activeScenario.runwayMonths.toFixed(1)} months` : "Unknown"} />
            <DataPair label="Break-even monthly revenue" value={formatSAR(snapshot.operating.breakEvenRevenueMonthlySAR)} />
            <DataPair label="Payroll share of monthly costs" value={`${(snapshot.operating.payrollShare * 100).toFixed(1)}%`} />
          </dl>
        </article>
      </section>

      <section className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
        <h2 className="text-lg font-bold text-brand-navy">Scenario comparison</h2>
        <div className="mt-4 max-w-full overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead><tr className="border-b border-border-default bg-surface-bg text-left"><th className="p-3">Scenario</th><th className="p-3 text-right">Net burn / month</th><th className="p-3 text-right">Cash assumed</th><th className="p-3 text-right">Runway</th></tr></thead>
            <tbody>{snapshot.scenarios.map((scenario) => (
              <tr key={scenario.name} className={cn("border-b border-border-default", scenario.name === snapshot.activeScenario && "bg-blue-50")}>
                <td className="p-3 font-semibold">{scenario.name}{scenario.name === snapshot.activeScenario ? " (active)" : ""}</td>
                <td className="p-3 text-right font-num">{formatSAR(scenario.netBurnMonthlySAR)}</td>
                <td className="p-3 text-right font-num">{formatSAR(scenario.cashAvailableSAR)}</td>
                <td className="p-3 text-right font-num">{scenario.cashFlowPositive ? "Cash-flow positive" : scenario.runwayMonths === null ? "Unknown" : `${scenario.runwayMonths.toFixed(1)} mo`}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
          <h2 className="text-lg font-bold text-brand-navy">Capital plan</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <DataPair label="Cash uses" value={formatSAR(snapshot.capitalPlan.totalCashUsesSAR)} />
            <DataPair label="Pure Advance cash sources" value={formatSAR(snapshot.capitalPlan.totalCashSourcesSAR)} />
            <DataPair label="Funding gap" value={formatSAR(snapshot.capitalPlan.fundingGapSAR)} critical />
            <DataPair label="In-kind grant assumption" value={formatSAR(snapshot.capitalPlan.inKindGrantSAR)} />
            <DataPair label="Stated commitment" value={formatSAR(snapshot.capitalPlan.statedCommitmentSAR)} />
            <DataPair label="Gap versus stated commitment" value={formatSAR(snapshot.capitalPlan.gapVsStatedCommitmentSAR)} />
          </dl>
        </article>

        <article className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
          <h2 className="text-lg font-bold text-brand-navy">Actuals coverage</h2>
          <p className="mt-2 text-3xl font-bold text-brand-navy">{snapshot.actualsCoverage.completeMonths}/{snapshot.actualsCoverage.modeledMonths}</p>
          <p className="text-sm text-text-muted">months have revenue, cost, and net-cash-flow actuals together.</p>
          <dl className="mt-4 space-y-2 text-sm">
            <DataPair label="Revenue actuals" value={`${snapshot.actualsCoverage.revenueActualMonths} months`} />
            <DataPair label="Cost actuals" value={`${snapshot.actualsCoverage.costActualMonths} months`} />
            <DataPair label="Net cash-flow actuals" value={`${snapshot.actualsCoverage.netCashFlowActualMonths} months`} />
          </dl>
        </article>
      </section>

      <section className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
        <h2 className="text-lg font-bold text-brand-navy">Model controls and reconciliation</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {snapshot.warnings.map((warning) => <WarningCard key={warning.code} severity={warning.severity} message={warning.message} />)}
        </div>
      </section>

      <section className="min-w-0 rounded-xl border border-border-default bg-white p-5 shadow-1">
        <h2 className="text-lg font-bold text-brand-navy">Monthly forecast detail</h2>
        <div className="mt-4 max-w-full overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead><tr className="border-b border-border-default bg-surface-bg"><th className="p-3 text-left">Month</th><th className="p-3 text-right">Revenue</th><th className="p-3 text-right">Operating costs</th><th className="p-3 text-right">Net cash flow</th><th className="p-3 text-right">Closing cash</th></tr></thead>
            <tbody>{snapshot.forecast.map((month) => (
              <tr key={month.month} className="border-b border-border-default"><td className="p-3 font-semibold">{month.month}</td><td className="p-3 text-right font-num">{formatSAR(month.revenueSAR)}</td><td className="p-3 text-right font-num">{formatSAR(month.operatingCostsSAR)}</td><td className={cn("p-3 text-right font-num", month.netCashFlowSAR < 0 && "text-sem-red")}>{formatSAR(month.netCashFlowSAR)}</td><td className="p-3 text-right font-num">{formatSAR(month.closingCashSAR)}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function MetricCard({ label, value, note, critical = false }: { label: string; value: string; note: string; critical?: boolean }) {
  return <article className={cn("min-w-0 rounded-xl border bg-white p-4 shadow-1", critical ? "border-red-200" : "border-border-default")}><p className="text-xs uppercase tracking-wide text-text-muted">{label}</p><p className={cn("mt-2 font-num text-xl font-bold", critical ? "text-sem-red" : "text-brand-navy")}>{value}</p><p className="mt-1 text-xs text-text-muted">{note}</p></article>;
}

function DataPair({ label, value, critical = false }: { label: string; value: string; critical?: boolean }) {
  return <div className="flex min-w-0 items-start justify-between gap-4 border-b border-border-default pb-2"><dt className="min-w-0 text-text-muted">{label}</dt><dd className={cn("shrink-0 text-right font-semibold", critical && "text-sem-red")}>{value}</dd></div>;
}

const WARNING_STYLES: Record<FinancialModelWarningSeverity, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  critical: "border-red-200 bg-red-50 text-red-900",
};

function WarningCard({ severity, message }: { severity: FinancialModelWarningSeverity; message: string }) {
  return <article className={cn("rounded-lg border p-3 text-sm", WARNING_STYLES[severity])}><p className="text-xs font-bold uppercase tracking-wide">{severity}</p><p className="mt-1">{message}</p></article>;
}

function CashForecastChart({ forecast }: { forecast: MonthlyFinancialForecast[] }) {
  const width = 760;
  const height = 240;
  const padding = 36;
  const values = forecast.map((month) => month.closingCashSAR);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const span = max - min || 1;
  const points = forecast.map((month, index) => {
    const x = padding + (index / Math.max(forecast.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((month.closingCashSAR - min) / span) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");
  const labelIndexes = new Set([0, Math.floor((forecast.length - 1) / 2), forecast.length - 1]);

  return (
    <div className="mt-4 max-w-full overflow-x-auto">
      <svg role="img" aria-label="Projected closing cash by month" viewBox={`0 0 ${width} ${height}`} className="min-w-[620px]">
        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#CBD5E1" />
        <polyline points={points} fill="none" stroke="#0F766E" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        {forecast.map((month, index) => {
          if (!labelIndexes.has(index)) return null;
          const x = padding + (index / Math.max(forecast.length - 1, 1)) * (width - padding * 2);
          return <text key={month.month} x={x} y={height - 10} textAnchor={index === 0 ? "start" : index === forecast.length - 1 ? "end" : "middle"} fontSize="12" fill="#64748B">{month.month}</text>;
        })}
      </svg>
    </div>
  );
}
