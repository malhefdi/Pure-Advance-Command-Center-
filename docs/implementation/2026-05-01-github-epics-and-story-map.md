# 2026-05-01 GitHub Epics and Story Map

## Labels
- `phase1`
- `productionization`
- `trust`
- `api`
- `data-model`
- `frontend`
- `backend`
- `audit`
- `approval`
- `tech-debt`

## Epic 1: Trustable core data model
### Story 1.1: Introduce baseline schema
- Tasks:
  - Create migrations for users/roles/capabilities.
  - Create tasks, escalations, alerts, invoices.
  - Create approval_requests, audit_events, data_sync_status.
  - Add seed bootstrap script for local dev.

### Story 1.2: Repository layer
- Tasks:
  - Implement repository interfaces per domain.
  - Add DB adapters and transaction helpers.
  - Add test fixtures for repository contract tests.

**Dependencies:** none (first epic).

## Epic 2: Command authorization + audit
### Story 2.1: Capability checks
- Tasks:
  - Replace `src/lib/auth.ts` with platform auth service abstraction.
  - Add `can(actor, capability)` guard.
  - Add middleware/helper for API route capability enforcement.

### Story 2.2: Audit trail
- Tasks:
  - Implement audit event writer.
  - Include correlation_id propagation in command handlers.
  - Add immutable audit query for admin diagnostics.

**Dependencies:** Epic 1 schema ready.

## Epic 3: Phase 1 command APIs
### Story 3.1: Task lifecycle command API
- Tasks:
  - Implement `POST /api/v1/tasks/{id}/status`.
  - Add validation and rationale enforcement.
  - Add tests for authorized/unauthorized flows.

### Story 3.2: Escalation lifecycle commands
- Tasks:
  - Implement create escalation, ack, resolve endpoints.
  - Persist escalation records and emit audit events.
  - Deprecate old `/api/tasks/:id/escalate` route.

### Story 3.3: Approval workflow commands
- Tasks:
  - Implement approval request creation on invoices.
  - Implement approval decision endpoint.
  - Add rejection reason requirement.

**Dependencies:** Epics 1 and 2.

## Epic 4: Dashboard query and trust metadata
### Story 4.1: Query composition layer
- Tasks:
  - Implement `application/queries/dashboard/get-dashboard-snapshot`.
  - Swap `/api/dashboard/*` internals to query layer.
  - Preserve existing response compatibility where possible.

### Story 4.2: Freshness metadata
- Tasks:
  - Add `data_sync_status` read API.
  - Attach trust/freshness metadata to snapshot responses.
  - Add stale-data UI badge logic keyed by metadata, not `lastUpdated` only.

**Dependencies:** Epic 1.

## Epic 5: Dashboard action safety
### Story 5.1: Action triage implementation
- Tasks:
  - Replace "Mark paid" CTA with approval initiation flow.
  - Add explicit read-only badges for prototype-only widgets.
  - Gate escalation button by capability and task state.

### Story 5.2: Drill-down and read-only reframing
- Tasks:
  - Convert pseudo-action KPI buttons to detail links.
  - Add alert acknowledgement UI action.

**Dependencies:** Epic 3 and 4.

## Epic 6: Seed-data migration without rewrite trap
### Story 6.1: Seed fallback strategy
- Tasks:
  - Split `src/lib/seed-data.ts` into `src/legacy/seed/*`.
  - Add env marker `USE_SEED_FALLBACK=true|false`.
  - Emit warning banner when seed fallback active.

### Story 6.2: Progressive cutover
- Tasks:
  - Cut tasks first, then escalations, then approvals, then invoices.
  - Maintain adapter translating old types to new DTOs during transition.
  - Remove dead seed paths once each domain reaches parity.

**Dependencies:** Epic 4.

## Recommended PR slices
1. PR-1: docs + ADR stubs + folder scaffolding (no behavior change).
2. PR-2: schema migrations + repositories + contract tests.
3. PR-3: auth/capability + audit infrastructure.
4. PR-4: task/escalation command APIs + deprecate old route.
5. PR-5: approvals APIs + finance action UX gating.
6. PR-6: dashboard query layer + trust/freshness envelope.
7. PR-7: seed fallback isolation + cleanup.
