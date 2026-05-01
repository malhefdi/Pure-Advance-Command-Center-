# 2026-05-01 Migration Sequence

## Guiding principle
Progressively replace prototype internals behind stable UI contracts; avoid big-bang rewrites.

## Stepwise sequence
1. **Baseline safeguards (must do now)**
   - Add feature flags: `USE_SEED_FALLBACK`, `ENABLE_COMMAND_APIS_V1`, `ENFORCE_APPROVALS`.
   - Add environment marker in UI header when running with seed fallback.
2. **Schema + repositories**
   - Introduce Phase 1 tables and repository interfaces.
   - Keep dashboard reads unchanged externally.
3. **Task domain cutover**
   - Move tasks query to DB-backed repository; preserve existing `Task` DTO shape.
   - Introduce task status command endpoint.
4. **Escalation cutover**
   - Replace simulated escalation endpoint with persisted command.
   - Keep old endpoint temporarily returning deprecation warning and forwarding call.
5. **Approval + invoice cutover**
   - Add approval request and decision flow.
   - Change finance CTA from action implication to explicit approval request.
6. **Alerts and trust metadata**
   - Add alert ack persistence.
   - Add trust/freshness envelope to dashboard APIs.
7. **Seed isolation cleanup**
   - Move all seed datasets into `src/legacy/seed`.
   - Remove direct seed imports from route handlers.

## Rollback-safe approach
- Every cutover is guarded by flag-based adapters so read/query path can fall back to seed.
- Keep schema additive first; avoid destructive migrations until parity proven.
- Use dual-write only for short windows (command writes to DB and optional seed event log for UI consistency in non-prod).

## Parallelizable workstreams
- **Workstream A (backend platform):** schema, repositories, auth/capability, audit.
- **Workstream B (application APIs):** commands/queries and route rewiring.
- **Workstream C (UI safety):** action triage updates, trust banners, capability-based hiding.
- **Workstream D (quality):** integration tests, migration smoke tests, contract snapshots.

## Feature flags / environment markers
- `USE_SEED_FALLBACK`: enables legacy data provider.
- `ENABLE_COMMAND_APIS_V1`: exposes new v1 command routes.
- `ENFORCE_APPROVALS`: requires approval requests for payment actions.
- `SHOW_TRUST_BADGES`: toggles trust/freshness labels in UI while rolling out.

## What to avoid rewriting too early
- Do not refactor all dashboard components while backend is in flux.
- Do not replace all API routes with GraphQL/event sourcing in Phase 1.
- Do not redesign every type in `src/types/command-center.ts` before compatibility layer exists.

## Preserving demo value while improving honesty
- Keep current visual density and executive narrative.
- Add explicit badges: `Demo Seed`, `Synced`, `Canonical`.
- Disable unsafe actions with short rationale text when backend prerequisites are absent.
