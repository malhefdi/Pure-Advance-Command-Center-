# 2026-05-01 Domain Model and Boundaries

## Domain list and boundaries

| Domain | Purpose | Hypothetical Owner | Core entities | Write model | Read model | Internal vs integration-fed | Major risks |
|---|---|---|---|---|---|---|---|
| Identity & Access | AuthN/AuthZ, role scopes, approvals policy | Security/Platform Lead | User, Role, Permission, Session, Policy, Delegation | Internal | Permission summaries by page/action | Internal-first, IdP-fed identities | Privilege drift, hidden superuser behavior |
| Finance | Cash, invoices, approvals, runway | Finance Lead | LedgerAccount, Invoice, Payment, BudgetLine, CashSnapshot | External accounting canonical + controlled internal workflow records | KPI cards, payable queues, runway projections | Integration-fed + internal workflow metadata | Incorrect financial truth, unauthorized payments |
| Tasks & Escalations | Work accountability and unblock flow | Ops Lead | Task, Blocker, Escalation, SLAClock | Internal canonical | Dashboard filtered queues and owner workload | Internal canonical with optional PM-tool sync | Task entropy, escalation spam |
| Alerts & Incidents | Multi-domain risk surfacing | Chief of Staff / Ops | Alert, Incident, AlertRule, Suppression, RunbookRef | Internal derived+curated | CEO strip and incident board | Derived from other domains + manual override | Alert fatigue, false confidence |
| Product Lifecycle | Stage gates readiness across R&D→market | Product Program Lead | Product, StageGate, ReadinessCheck, Dependency, Milestone | Internal canonical with evidence links | Portfolio maturity views | Hybrid: internal stages + external regulatory/manufacturing evidence | Stage inflation, unverifiable readiness |
| Pipeline/CRM | Partner pipeline and interaction system | BD Lead | Partner, Opportunity, Interaction, FollowUp, Commitment | Internal canonical | pipeline health and commitment risk views | Internal-first + comms/calendar sync | Lost commitments, duplicate entities |
| Team/People Ops | capacity, check-ins, ownership map | People/Ops Lead | TeamMember, TeamAssignment, CheckIn, Availability | Internal canonical | team pulse, load heatmap | Internal + HRIS sync optional | outdated ownership map |
| Ownership/Cap Table | share structure, scenarios, instruments | CFO/Legal | Shareholder, Instrument, Grant, Scenario, ApprovalMemo | External legal/cap-table source canonical | sanitized scenario views | Integration-fed with strict internal mirror | sensitive leakage, mistaken governance actions |
| Integrations & Sync | source connectivity and reconciliation | Platform Integrations Lead | Connector, SyncJob, SyncRun, Mapping, ReconcileIssue | Internal canonical for sync ops | sync health panels | external-fed payloads | silent data drift |
| AI/Analysis | advisory analysis, anomaly narratives | Data/AI Lead | AnalysisRun, Insight, Recommendation, ConfidenceScore | Internal derived | executive briefs with citations | derived from trusted read models | hallucinated authority |

## Domain events (recommended taxonomy)
- `identity.user.role_assigned`
- `finance.invoice.recorded`, `finance.payment.approval_requested`, `finance.payment.executed`
- `task.created`, `task.blocked`, `task.escalated`, `task.resolved`
- `alert.raised`, `alert.acknowledged`, `incident.opened`, `incident.closed`
- `product.readiness_stage_entered`, `product.readiness_gate_failed`
- `crm.interaction.logged`, `crm.commitment.missed`
- `people.assignment.changed`
- `ownership.instrument.updated`
- `integration.sync.completed`, `integration.sync.failed`, `integration.drift.detected`
- `ai.insight.published`, `ai.recommendation.accepted/rejected`

## Anti-corruption layers (ACLs)
- Finance ACL: normalize accounting/ERP invoice and payment schemas into internal finance aggregate.
- CRM ACL: map partner identities from email/calendar/CRM tools into canonical Partner ID.
- Regulatory/Product ACL: map external filing/manufacturing milestones into StageGate evidence.
- Identity ACL: map IdP groups to internal action-oriented capabilities.

## Where coupling is currently too high (evidence)
1. `src/lib/seed-data.ts` co-locates finance, product, tasks, team, and alert scaffolding in one file.
2. `src/lib/dashboard-service.ts` derives alerts by directly traversing multiple domain arrays, creating implicit cross-domain coupling.
3. `src/components/dashboard/Dashboard.tsx` includes direct action affordances (e.g., mark paid/escalate) without policy gates or domain-specific command segregation.
4. `src/lib/auth.ts` contains only coarse role checks and no capability matrix.

## Recommended target entity model (minimum)
- `Task(id, title, owner_user_id, domain_ref_type, domain_ref_id, priority, due_at, status, blocker_state, created_at, updated_at)`
- `Escalation(id, task_id, triggered_by, severity, route_policy_id, status, acknowledged_by, acknowledged_at)`
- `Invoice(id, vendor_id, amount, currency, due_at, status, external_ref, payment_approval_id)`
- `Approval(id, object_type, object_id, policy_id, state, requested_by, decided_by, rationale, decided_at)`
- `DataAssetStatus(asset_key, source_type, source_ref, freshness_sla_min, last_synced_at, confidence_score, state)`

## What should be true before this system is trusted daily by a CEO
- Domain owners are explicitly assigned.
- At least finance, tasks/escalations, and product readiness have independent write models.
- ACL mappings are versioned and testable.
- Cross-domain views are read models, not shared mutable records.
