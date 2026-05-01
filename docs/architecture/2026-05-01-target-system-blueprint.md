# 2026-05-01 Target System Blueprint

## System purpose
Pure Advance Command Center should become an **internal operating system for founder-led multi-product execution**, not a presentation dashboard. It should unify execution truth across money, product readiness, partner commitments, and team accountability, while preserving explicit confidence boundaries between live facts and advisory AI.

## Core principles
1. **Truth over polish**: every card must show provenance, freshness, and confidence.
2. **Operational actionability**: every critical signal maps to an owner + next action + due date.
3. **Controlled write surfaces**: high-risk updates require workflowed approvals, never ad hoc edits.
4. **Domain-owned models**: finance, product, CRM, tasks, and identity have independent write models.
5. **Event-first auditability**: user actions and system syncs emit immutable events.
6. **Progressive autonomy**: AI begins as advisor, then earns authority only per action class.

## Operating assumptions
- Founder/CEO needs one morning control plane for capital, product milestones, external commitments, and escalations.
- Operators and functional leads need scoped execution surfaces beyond the CEO summary board.
- Current repo is seed-data heavy; prototype values are useful for shape validation but unsafe for operational truth.
- Integrations will be hybrid: some systems become canonical externally (e.g., accounting), others internal-first (e.g., escalations).

## Target architecture diagram (described in words)
1. **Experience layer (Next.js)**: dashboard + domain workspaces + approval inbox + audit explorer.
2. **Application layer**: domain use-cases (create task, approve payment, escalate blocker, ingest partner interaction).
3. **Domain layer**: bounded contexts (Identity/Access, Finance, Product Lifecycle, Task/Escalation, Alerts/Incidents, CRM/Pipeline, People Ops, Ownership, AI Advisory).
4. **Data platform layer**:
   - canonical OLTP store by domain,
   - event log/audit stream,
   - read-model projections for dashboard cards,
   - sync metadata store for provenance/freshness.
5. **Integration layer**: connectors, scheduled ingestion, webhook handlers, idempotent sync jobs, reconciliation queues.
6. **Policy layer**: permission engine + approval policy engine + environment safeguards.

## Key technical layers
- **Command APIs**: write endpoints enforcing policy and state transitions.
- **Query APIs**: read models with explicit source metadata and staleness indicators.
- **Workflow engine**: state machines for tasks, invoices, approvals, alerts, readiness gates.
- **Event taxonomy**: domain events + integration events + audit events with correlation IDs.
- **Trust rendering layer**: UI primitives for authoritative/derived/simulated/operator-entered data.

## What makes this system trustworthy vs just attractive
Current UI is highly legible but risks confidence theater because it mixes mock + derived signals in one visual grammar. Trustworthy v2 requires:
- per-widget source labels (Canonical / Synced / Derived / Manual / Simulated),
- freshness SLA badges with absolute timestamps,
- write-action risk tiering and required approval confirmations,
- traceability from executive card → record → event history → external source link,
- hard separation between live-production and prototype/sandbox data.

## Prototype scaffolding vs blockers vs opportunities
- **Prototype scaffolding**: `src/lib/seed-data.ts`, inline alert derivation in `dashboard-service`, static module status cards.
- **Production blockers**: no true persistence for tasks/escalations/approvals, no audit/event store, no role-based enforcement beyond simple role check, no provenance/freshness model.
- **Strategic opportunity**: unify product readiness + capital/risk + partner execution in one founder-grade operating graph.
- **Optional enhancement**: AI copilots that draft actions once trust and provenance scaffolding is complete.

## What should be true before this system is trusted daily by a CEO
1. Top 10 executive cards have declared system-of-record and freshness SLAs.
2. High-risk actions (payments, ownership edits, external commitments) require workflowed approvals.
3. Every alert routes to explicit owner, SLA, and escalation chain.
4. Dashboard values are reconstructable from event/audit logs.
5. Simulated data is visually and technically isolated from live truth.
6. Sync failures are first-class incidents, not silent degradation.
