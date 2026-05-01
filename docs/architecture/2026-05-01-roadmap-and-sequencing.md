# 2026-05-01 Roadmap and Sequencing

## Phase 1 (Foundation of trust, 6-8 weeks)
- Establish domain schema split (finance/tasks/product/crm/identity/integrations).
- Build event + audit backbone and standard action envelopes.
- Implement trust metadata (`source_class`, `last_sync`, `confidence`) on dashboard read models.
- Replace quick-action shortcuts with policy-aware command endpoints.
- Stand up minimal approvals engine for payments/escalations/readiness gates.

## Phase 2 (Operational depth, 8-12 weeks)
- Real finance integration (invoice/payment sync + reconciliation).
- Task/escalation workflow persistence + SLA automation.
- Product readiness gate model with evidence artifacts.
- Integration health control plane and drift alerts.
- Role-based capability enforcement expanded across all modules.

## Phase 3 (Leverage + intelligence, 8-12 weeks)
- AI advisory layer with citation-backed insights and recommendation tracking.
- Forecasting and cross-domain risk correlation.
- Enhanced operator workbench (bulk actions, queue management).
- Optional extraction of integration worker service if throughput requires.

## Dependency ordering and why this order is correct
1. Trust primitives first: without SoR + audit + permissions, additional features amplify risk.
2. Finance/tasks/readiness second: these are direct execution levers for founder operations.
3. AI last: advisory quality depends on trustworthy underlying data and event history.

## What should NOT start before Phase 1 completes
- Autonomous AI actions.
- Advanced forecasting dashboards presented as decision-grade truth.
- Microservice decomposition by domain.
- External user-facing productization.

## Highest-leverage epics
1. “Trust Contract v1” (provenance/freshness/confidence UI + APIs).
2. “Action Policy Engine” (approvals, dual-control, rationale capture).
3. “Execution Kernel” (task/escalation/alert state machines).
4. “Finance Reality Sync” (invoices/payments canonical integration).
5. “Readiness Evidence Graph” (product gate checks + artifacts).

## Suggested GitHub issue themes
- `epic/trust-contract`
- `epic/audit-event-taxonomy`
- `epic/approval-engine`
- `epic/task-escalation-kernel`
- `epic/finance-integration`
- `epic/readiness-gates`
- `epic/integration-health`
- `epic/role-capability-matrix`
- `epic/ai-advisory-readonly`

## Recommended repo/module structure evolution
- `src/domains/{finance,tasks,product,crm,identity,alerts,integrations}/`
- `src/application/{commands,queries,policies,workflows}/`
- `src/platform/{persistence,events,audit,connectors}/`
- `src/ui/{dashboard,workspaces,trust-components}/`
- `docs/architecture/adr/` for key boundary decisions.

Keep as modular monolith initially; preserve extraction seams at integration workers and event consumers.

## What should be true before this system is trusted daily by a CEO
- Phase 1 epics are complete and measured.
- CEO dashboard only shows trust-classified data.
- Execution actions are policy-governed and auditable.
- Integration failures trigger visible operational response.
