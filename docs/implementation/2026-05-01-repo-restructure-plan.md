# 2026-05-01 Repo Restructure Plan

## Current structure assessment
- `src/lib/seed-data.ts` mixes multiple domains (finance, product lifecycle, tasks, alerts, modules) into one source file.
- `src/lib/dashboard-service.ts` blends query composition and command simulation (escalation payload).
- `src/app/api/dashboard/*` routes are thin wrappers over in-memory helpers, with no domain boundary.
- `src/components/dashboard/Dashboard.tsx` contains direct action triggers (`fetch('/api/tasks/:id/escalate')`) without action policy metadata.
- `src/lib/auth.ts` is minimal and currently unsuitable for production authorization.

## Proposed structure (evolution, not rewrite)

```txt
src/
  app/                         # keep Next.js routes
  ui/
    dashboard/
    modules/
  application/
    queries/
      dashboard/
    commands/
      tasks/
      escalations/
      approvals/
  domains/
    identity/
    tasks/
    escalations/
    alerts/
    finance/
    approvals/
    trust/
  platform/
    db/
      schema/
      migrations/
    auth/
    audit/
    feature-flags/
    repositories/
  legacy/
    seed/
```

## File-by-file migration suggestions

### Create now
- `src/domains/tasks/{model.ts,service.ts,types.ts}`
  - Purpose: canonical task state and transitions.
  - Replaces command-related logic in `src/lib/dashboard-service.ts`.
- `src/domains/escalations/{model.ts,service.ts}`
  - Purpose: escalation lifecycle and relationships.
  - Replaces `buildEscalationPayload` simulation.
- `src/domains/approvals/{model.ts,service.ts}`
  - Purpose: approval request creation and decision handling.
- `src/domains/trust/{model.ts,freshness.ts}`
  - Purpose: trust classification and freshness scoring used by dashboard payloads.
- `src/application/queries/dashboard/get-dashboard-snapshot.ts`
  - Purpose: compose dashboard read model from repositories.
  - Replaces `getDashboardSnapshot` in `src/lib/dashboard-service.ts`.
- `src/application/commands/tasks/escalate-task.ts`
  - Purpose: command handler with auth/capability/audit.
  - Replaces `POST /api/tasks/[id]/escalate` internals.
- `src/platform/repositories/*`
  - Purpose: DB adapter layer for each domain.
- `src/platform/db/schema/*`
  - Purpose: schema definitions for Phase 1 entities.

### Create later
- `src/ui/dashboard/actions/*` action policy mapping (for front-end gating/refactoring).
- `src/application/commands/alerts/*` for richer alert lifecycle actions.

### Keep (Phase 1)
- `src/app/*` route tree.
- `src/components/modules/ModulePage.tsx` and module shells.
- `src/lib/utils.ts` (move opportunistically later).

### Split
- `src/lib/seed-data.ts` → split into `src/legacy/seed/{tasks.ts,finance.ts,products.ts,team.ts,alerts.ts}`.
- `src/lib/dashboard-service.ts` → split into application query and command handlers.

### Retire (after parity)
- `src/lib/dashboard-service.ts` monolithic service file.
- direct seed-data imports in API routes.

## Keep vs split vs retire summary
- **Keep:** UI composition, route topology, utility helpers.
- **Split:** seed/data/service monoliths into domain and application layers.
- **Retire:** simulated command behavior and unbounded in-memory source of truth.

## Suggested ADR topics
1. ADR-001: Monolith modularization boundaries (`domains/application/platform/ui`).
2. ADR-002: Trust metadata taxonomy (canonical/internal/derived/synced).
3. ADR-003: Approval workflow model and decision authority.
4. ADR-004: Audit event schema and retention strategy.
5. ADR-005: Seed fallback policy and non-prod safeguards.
