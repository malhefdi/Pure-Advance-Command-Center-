# 2026-05-01 Source of Truth and Integration Map

## Data classification model
- **Canonical SoR**: authoritative write system.
- **Synchronized mirror**: local replica of external canonical system.
- **Derived analytics view**: computed KPIs/risk scores.
- **Manual operator data**: structured human inputs with accountability.
- **Simulated/prototype data**: non-authoritative data for UX scaffolding.

## Per-module source of truth map

| UI area | Data shown | Recommended SoR type | Source | Refresh | Class |
|---|---|---|---|---|---|
| Financial Pulse | revenue/profit/cash/runway | Canonical external + derived | accounting ERP + warehouse calc | hourly for cash, daily for runway | authoritative (base) + advisory (projection) |
| Revenue by Product | MTD contribution | Derived analytics | finance ledger + product mapping | daily | advisory with confidence |
| Invoices panel | upcoming/overdue/paid | Canonical finance | accounting/AP system mirrored | every 15 min | authoritative |
| Product status board | stage, readiness metrics, stock | Internal canonical + synced evidence | lifecycle DB + regulatory/manufacturing connectors | stage updates event-driven, nightly reconciliation | authoritative if evidence-backed |
| Tasks panel | due/blocked/overdue + escalations | Internal canonical | task/escalation domain DB | near real-time | authoritative |
| Team pulse | open tasks, last seen, status | Internal canonical + optional HRIS sync | people ops DB | 5-15 min | semi-authoritative |
| Alerts strip | cross-domain alerts | Derived | alert engine over domain events | stream + 1 min projection | advisory, must include provenance |
| CRM module | partners/interactions/follow-ups | Internal canonical | CRM domain DB + comms sync | near real-time + nightly reconcile | authoritative (internal) |
| Ownership module | cap table scenarios | External canonical legal cap platform + internal scenario workspace | cap-table provider | daily sync; manual trigger on transaction | authoritative read / advisory scenario |
| AI module | summaries/anomalies/recommendations | Derived | AI on trusted read models | scheduled + on-demand | advisory only |

## Freshness and provenance rules
1. Every widget includes `last_updated_at`, `source_system`, `data_class`, `confidence`.
2. Freshness badge states: `fresh`, `aging`, `stale`, `unknown`.
3. Confidence badge states: `verified`, `derived`, `operator-entered`, `simulated`.
4. If stale beyond SLA, disable high-risk actions tied to that data.

## Manual entry policy
- **Acceptable**: blocker notes, escalation rationale, follow-up notes, interim product narrative.
- **Dangerous unless gated**: financial amounts/status, cap table ownership, regulatory submission status, payment execution state.

## Integration recommendations
Phase-1 must-real integrations:
- accounting/AP system for invoice/payment truth,
- communication channels for escalation delivery/audit,
- document evidence store for product readiness proofs.

Phase-2 integrations:
- CRM enrichment (email/calendar),
- HRIS for team availability,
- regulatory status feeds.

Phase-3 optional:
- advanced forecasting models,
- external benchmark feeds.

## Ingestion and sync architecture
- Connector workers pull/push by source.
- Raw payloads stored immutable (`integration_raw_events`).
- Mapping/normalization pipeline creates canonical upserts by domain ACL.
- Reconciliation jobs compare checksums/record counts and emit drift events.
- Sync health domain tracks state machine per connector + dataset.

## Dashboard trust model (recommended)
- Card header: value + trust badge + freshness timer.
- Card footer: source system + last sync absolute timestamp + “view lineage”.
- Action buttons gated by trust state:
  - `authoritative+fresh`: action allowed.
  - `derived/aging`: action allowed with warning.
  - `stale/unknown/simulated`: action blocked or drill-down required.

## What should be true before this system is trusted daily by a CEO
- Source classification complete for all dashboard cards.
- No simulated data mixed without explicit simulation labels.
- Sync failures visible on main dashboard within 1 minute.
- Financial and ownership data always traceable to external source refs.
