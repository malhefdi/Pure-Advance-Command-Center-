# 2026-05-01 Phase 1 Implementation Blueprint

## Current state summary
- The current app is a Next.js monolith with a dashboard-first UX where most operational data is seeded from `src/lib/seed-data.ts` and transformed in `src/lib/dashboard-service.ts`.
- API routes under `src/app/api/dashboard/*` expose read endpoints but currently proxy in-memory seed data rather than a persistence layer.
- A single action route (`POST /api/tasks/:id/escalate`) returns a generated payload and does not persist escalation events or state.
- Role/auth logic is currently hardcoded in `src/lib/auth.ts` with no capability matrix, no session verification, and no audit logging.
- UI currently presents operational actions (e.g., Escalate, Mark paid) that imply execution authority, but backend support is partial/non-transactional.
- The requested `docs/architecture/2026-05-01` package is not present in this repository snapshot; this plan therefore uses current repo artifacts plus adjacent planning docs under `docs/plans/` as the operational baseline.

## Target Phase 1 scope
Phase 1 is **not** a rewrite. It is a trust and controllability pass on top of the existing monolith:
1. Introduce canonical persistence for core operational entities.
2. Split dashboard read composition from domain command handling.
3. Add capability-checked command APIs with audit trails.
4. Add data freshness/trust metadata to all dashboard-facing payloads.
5. Triage risky UI actions into read-only / approval-gated flows.

## Exact first productionization goals
### Must do now
- Establish `src/domains`, `src/application`, and `src/platform` boundaries while keeping Next.js app routing intact.
- Add first schema/migrations for: users, roles/capabilities, tasks, escalations, alerts, invoices, approval_requests, audit_events, data_sync_status.
- Replace seed-only reads with repository-backed reads plus seed fallback feature flag.
- Replace fake escalation payload endpoint with persisted escalation command.
- Add standard API envelope including `trust`, `freshness`, and `source` metadata.

### Should do soon
- Introduce approval workflow for payment/invoice actions.
- Add alert acknowledgement endpoint with actor and rationale.
- Add task lifecycle commands (`start`, `block`, `complete`, `reassign`) with audit.

### Later
- Decompose high-volume domains (CRM, Coolvex analytics) after trust primitives stabilize.
- Add async workflow engine for escalations and approvals.

### Avoid in Phase 1
- Microservices split.
- Agentic automation touching payment or compliance actions.
- Large UI rewrite or replacement of existing dashboard contract.

## What success looks like after Phase 1
- Dashboard can still render existing modules, but each dataset is tagged as canonical/internal/derived/synced and freshness-scored.
- Every mutating action has: authenticated actor, capability check, persisted state transition, audit event, and deterministic response.
- "Escalate" and finance action pathways no longer simulate; they create traceable records.
- Seed data remains available only as non-prod fallback with explicit UI trust banner.
- Engineering can add new modules without growing `seed-data.ts` into a central bottleneck.

## What remains prototype after Phase 1
- Deep product analytics and AI query layers remain read-only and partly seed-backed.
- CRM and Coolvex enriched datasets may still use batch-synced snapshots rather than full transactional ownership.
- Mobile and workflow UX polish, notification delivery guarantees, and SLA automation are deferred.
