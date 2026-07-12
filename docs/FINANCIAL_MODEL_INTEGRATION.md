# Preliminary Financial Model Integration

## Decision

The workbook belongs in the Finance module as a private planning source. It must not replace the CEO dashboard's actual KPI contract because its values are forecasts and assumptions, not a ledger, bank feed, or approved budget.

The server reads an externally mounted `.xlsx` file configured by `COMMAND_CENTER_FINANCIAL_MODEL_PATH`. It returns a narrow aggregate snapshot from `/api/finance/model`; the raw workbook, filesystem path, payroll rows, and source sheets are never returned.

## Aggregate contract

| Purpose | Workbook source |
| --- | --- |
| Active scenario and operating KPIs | `Dashboard` key-metric block |
| Base, conservative, and upside runway | `Dashboard` scenario block |
| Current-funds runway | `Financials` summary |
| Monthly revenue, costs, net cash flow, and closing cash | `Cash Flow` monthly model |
| Actuals completeness | `Budget vs Actuals` input columns |
| Sources, uses, and funding gap | `Capital Plan` |
| Reconciliation blockers | `Platform Scenarios` variance rows |

The parser is intentionally strict. Renaming required sheets or moving contract cells makes the integration unavailable instead of silently displaying the wrong number.

## Refresh behavior

1. Recalculate the workbook in Excel.
2. Save the workbook so formula results are written into the `.xlsx` file.
3. The server notices the changed modification time and replaces its cached snapshot on the next request.
4. Review the Finance module's warnings before using the forecast in a decision.

The server does not evaluate Excel formulas. This avoids reproducing a finance engine in the web application but means an unsaved workbook produces stale results.

## Model interpretation controls

- Current-funds runway is shown separately from scenario runway. Scenario runway may include undrawn or committed funding.
- Forecast values are never labeled actuals.
- The cumulative Funding Tracker total is not treated as current liquidity.
- A negative capital funding position is surfaced as critical.
- Source variances in the platform scenario model are surfaced as decision blockers.
- Actuals coverage is shown explicitly so an empty variance model cannot appear complete.

## Production requirements

Store the workbook on an encrypted server volume or approved private document service, restrict its operating-system permissions to the application identity, back it up, and audit access. Replace the current Basic gate with managed identity and per-role authorization before exposing real finance data beyond a tightly controlled operator group.
